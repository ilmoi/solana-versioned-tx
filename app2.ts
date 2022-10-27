import {
  AddressLookupTableAccount,
  AddressLookupTableProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from '@solana/web3.js';
import {
  createMint,
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import fs from 'fs';

const WALLET_1 = Keypair.fromSecretKey(
  Uint8Array.from(require("/Users/ilmoi/.config/solana/id.json"))
);
const WALLET_2 = Keypair.generate();

const DESTINATION_WALLET = new PublicKey("dNCnRxNgCUxktTtvgx9YHnkGK1kyqRxTCjF9CvRVs94");

async function waitMS(ms: number) {
  await new Promise((response) =>
    setTimeout(() => {
      response(0);
    }, ms)
  );
}

const storeSig = async (sig: string, name: string) => {
  let fetchedTx;
  while (!fetchedTx) {
    fetchedTx = await conn.getParsedTransaction(sig, {maxSupportedTransactionVersion: 0})
    await waitMS(1000);
  }
  // console.log('fetched tx', JSON.stringify(fetchedTx, null, 4))
  fs.writeFileSync(`${name}.json`, JSON.stringify(fetchedTx))
}

const conn = new Connection("https://api.devnet.solana.com");

const sendV0Tx = async (ixs: TransactionInstruction[], payer: Keypair, lookupTableAccounts?: [AddressLookupTableAccount] | undefined) => {
  const bh = (await conn.getLatestBlockhash()).blockhash;
  const msg = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash: bh,
    instructions: ixs
  }).compileToV0Message(lookupTableAccounts)
  const tx = new VersionedTransaction(msg);
  tx.sign([payer])
  const sig = await conn.sendTransaction(tx);
  console.log('✅ tx successful', sig)
  return sig;
}

(async () => {
  // --------------------------------------- prep

  //fund 2nd wallet
  const fundIxs: TransactionInstruction[] = [
    SystemProgram.transfer({
      fromPubkey: WALLET_1.publicKey,
      toPubkey: WALLET_2.publicKey,
      lamports: LAMPORTS_PER_SOL / 10,
    }),
  ];
  await sendV0Tx(fundIxs, WALLET_1);

  //mint
  const mint = Keypair.generate();
  console.log('✅ create mint', await createMint(conn, WALLET_1, WALLET_1.publicKey, WALLET_1.publicKey, 0, mint))

  //atas
  const wallet1Ata = await getOrCreateAssociatedTokenAccount(conn, WALLET_1, mint.publicKey, WALLET_1.publicKey, false)
  const wallet2Ata = await getOrCreateAssociatedTokenAccount(conn, WALLET_2, mint.publicKey, WALLET_2.publicKey, false)

  //mint
  console.log('✅ mint to', await mintTo(conn, WALLET_1, mint.publicKey, wallet1Ata.address, WALLET_1.publicKey, 10));

  // --------------------------------------- no lut
  console.log('// --------------------------------------- no lut')

  const sendTokenIx = createTransferCheckedInstruction(wallet1Ata.address, mint.publicKey, wallet2Ata.address, WALLET_1.publicKey, 1, 0)
  console.log('accounts', sendTokenIx.keys.map(k => k.pubkey.toBase58()))

  const sig = await sendV0Tx([sendTokenIx], WALLET_1);
  await storeSig(sig, '1_normal')

  // --------------------------------------- with lut
  console.log('// --------------------------------------- lut')

  const slot = await conn.getSlot("confirmed");

  //create
  const [lookupTableInst, lookupTableAddress] =
    AddressLookupTableProgram.createLookupTable({
      authority: WALLET_1.publicKey,
      payer: WALLET_1.publicKey,
      recentSlot: slot - 100,
    });
  console.log("lookup table address:", lookupTableAddress.toBase58());

  //add addresses
  const extendInstruction = AddressLookupTableProgram.extendLookupTable({
    payer: WALLET_1.publicKey,
    authority: WALLET_1.publicKey,
    lookupTable: lookupTableAddress,
    addresses: [
      WALLET_1.publicKey,
      mint.publicKey,
      wallet1Ata.address,
      wallet2Ata.address,
      SystemProgram.programId,
      TOKEN_PROGRAM_ID,
    ],
  });

  console.log('stored', [WALLET_1.publicKey,
    mint.publicKey,
    wallet1Ata.address,
    wallet2Ata.address,
    SystemProgram.programId,
    TOKEN_PROGRAM_ID,].map(x => x.toBase58()))

  await sendV0Tx([lookupTableInst, extendInstruction], WALLET_1);
  console.log('created lut')

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
    const sig = await sendV0Tx([sendTokenIx], WALLET_1, [lookupTableAccount]);
    await storeSig(sig, '2_lut')
    console.log('done!')
  }

  // --------------------------------------- parse

  //legacy: 36tvHY3qWRPDrPj4x9NNR2St4zDgaFrSttTtw4gBvZhpTyXyGuqEf6ffs8RyXWArp4xSP8EQswrGdAeudK8gRi1m
  //v0: gjwHZUUs9wM6jMkNDZ4BSWKUArzfHnKappaz7UWbBKFnyxkX6VyuSeo6DabZwoZeVKXsM58cx84K1mafeNeaU2f
  //lut: 44qEuSxAoGGmyyHJ7G2AXRjgUjbwJstKLX6Fq6oC2nPjVve1wVkRXCKySKofBubj8qAeVTw5YcD8bbVAGCogFrsj

  // const parsedTx = await conn.getParsedTransaction("44qEuSxAoGGmyyHJ7G2AXRjgUjbwJstKLX6Fq6oC2nPjVve1wVkRXCKySKofBubj8qAeVTw5YcD8bbVAGCogFrsj", {maxSupportedTransactionVersion: 0});
  // console.log(JSON.stringify(parsedTx, null, 4))
})()
