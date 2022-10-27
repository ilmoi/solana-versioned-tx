import {
  AddressLookupTableProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL, Message, MessageV0, PublicKey,
  SystemProgram, Transaction,
  TransactionInstruction,
  TransactionMessage, TransactionResponse,
  VersionedTransaction, VersionedTransactionResponse
} from '@solana/web3.js';
import bs58 from "bs58";
import fs from "fs";

const SIGNER_WALLET = Keypair.fromSecretKey(
  Uint8Array.from(require("/Users/ilmoi/.config/solana/id.json"))
);

const DESTINATION_WALLET = new PublicKey("dNCnRxNgCUxktTtvgx9YHnkGK1kyqRxTCjF9CvRVs94");

const conn = new Connection("https://api.devnet.solana.com");

const storeSig = async (sig: string, name: string) => {
  let fetchedTx;
  while (!fetchedTx) {
    fetchedTx = await getTransactionBackwardsCompatible(conn, sig);
    await waitMS(1000);
  }
  // console.log('fetched tx', JSON.stringify(fetchedTx, null, 4))
  fs.writeFileSync(`${name}.json`, JSON.stringify(fetchedTx))
}

const getTransactionBackwardsCompatible = async (
  conn: Connection,
  sig: string
): Promise<TransactionResponse | null> => {
  const tx: VersionedTransactionResponse | null = await conn.getTransaction(sig, {
    commitment: 'confirmed',
    maxSupportedTransactionVersion: 0,
  });
  if (!tx) return null;
  //handle legacy, return as is
  if (tx.version === undefined || tx.version === null || tx.version === "legacy") {
    console.log('LEGACY:', sig)
    return tx as TransactionResponse;
  }
  //handle v0
  if (tx.version === 0) {
    console.log('v0:', sig)
    const v0msg = tx.transaction.message as MessageV0;
    const legacyMsg = new Message({
      header: v0msg.header,
      accountKeys: [
        ...(tx.meta?.loadedAddresses?.readonly ?? []),
        ...(tx.meta?.loadedAddresses?.writable ?? []),
        ...v0msg.staticAccountKeys,
      ],
      instructions: v0msg.compiledInstructions.map((i) => {
        return {
          ...i,
          accounts: i.accountKeyIndexes,
          data: bs58.encode(i.data),
        };
      }),
      recentBlockhash: v0msg.recentBlockhash,
    });
    return {
      ...tx,
      transaction: {
        ...tx.transaction,
        message: legacyMsg,
      },
    };
  }
  throw new Error("unknown tx version");
};

async function waitMS(ms: number) {
  await new Promise((response) =>
    setTimeout(() => {
      response(0);
    }, ms)
  );
}

(async () => {
  const instructions: TransactionInstruction[] = [
    SystemProgram.transfer({
      fromPubkey: SIGNER_WALLET.publicKey,
      toPubkey: DESTINATION_WALLET,
      lamports: 1,
    }),
  ];

  const bh = (await conn.getLatestBlockhash()).blockhash;

  // --------------------------------------- send legacy

  const tx = new Transaction({
    recentBlockhash: bh,
    feePayer: SIGNER_WALLET.publicKey,
  })
  tx.add(...instructions);
  tx.sign(SIGNER_WALLET)

  const sig = (await conn.sendRawTransaction(tx.serialize()))
  await conn.confirmTransaction(sig, 'confirmed')

  // --------------------------------------- send v0

  const msg = new TransactionMessage({
    payerKey: SIGNER_WALLET.publicKey,
    recentBlockhash: bh,
    instructions
  }).compileToV0Message()

  const tx2 = new VersionedTransaction(msg);

  tx2.sign([SIGNER_WALLET])

  const sig2 = (await conn.sendTransaction(tx2))
  await conn.confirmTransaction(sig2, 'confirmed')

  // --------------------------------------- look up table

  const slot = await conn.getSlot("confirmed");

  //create
  const [lookupTableInst, lookupTableAddress] =
    AddressLookupTableProgram.createLookupTable({
      authority: SIGNER_WALLET.publicKey,
      payer: SIGNER_WALLET.publicKey,
      recentSlot: slot - 100,
    });
  console.log("lookup table address:", lookupTableAddress.toBase58());

  //add addresses
  const extendInstruction = AddressLookupTableProgram.extendLookupTable({
    payer: SIGNER_WALLET.publicKey,
    authority: SIGNER_WALLET.publicKey,
    lookupTable: lookupTableAddress,
    addresses: [
      SIGNER_WALLET.publicKey,
      DESTINATION_WALLET,
      SystemProgram.programId,
    ],
  });

  const msg2 = new TransactionMessage({
    payerKey: SIGNER_WALLET.publicKey,
    recentBlockhash: bh,
    instructions: [lookupTableInst, extendInstruction]
  }).compileToV0Message()
  const tx3 = new VersionedTransaction(msg2);
  tx3.sign([SIGNER_WALLET])
  console.log('created lut', await conn.sendTransaction(tx3))

  //fetch
  let lookupTableAccount;
  while (!lookupTableAccount) {
    console.log('trying to fetch lut...')
    lookupTableAccount = (await conn.getAddressLookupTable(lookupTableAddress)).value;
    console.log(lookupTableAccount)
    await waitMS(1000)
  }

  if (lookupTableAccount) {
    console.log("Table address from cluster:", lookupTableAccount.key.toBase58());
    for (let i = 0; i < lookupTableAccount.state.addresses.length; i++) {
      const address = lookupTableAccount.state.addresses[i];
      console.log('stored addr:', i, address.toBase58());
    }

    //send a tx
    const msg = new TransactionMessage({
      payerKey: SIGNER_WALLET.publicKey,
      recentBlockhash: bh,
      instructions
    }).compileToV0Message([lookupTableAccount])
    const tx = new VersionedTransaction(msg);
    tx.sign([SIGNER_WALLET])
    const sig3 = (await conn.sendTransaction(tx))
    await conn.confirmTransaction(sig3, 'confirmed')

    // --------------------------------------- parse

    await storeSig(sig, 'new_parser_legacy')
    await storeSig(sig2, 'new_parser_v0')
    await storeSig(sig3, 'new_parser_v0_lut')
  }

})()
