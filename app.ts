import {
  AddressLookupTableProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL, PublicKey,
  SystemProgram, Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction
} from '@solana/web3.js';

const SIGNER_WALLET = Keypair.fromSecretKey(
  Uint8Array.from(require("/Users/ilmoi/.config/solana/id.json"))
);

const DESTINATION_WALLET = new PublicKey("dNCnRxNgCUxktTtvgx9YHnkGK1kyqRxTCjF9CvRVs94");

async function waitMS(ms: number) {
  await new Promise((response) =>
    setTimeout(() => {
      response(0);
    }, ms)
  );
}

(async () => {
  const conn = new Connection("https://api.devnet.solana.com");

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
  await conn.confirmTransaction(sig, 'finalized')
  const tx1 = await conn.getTransaction(sig, {maxSupportedTransactionVersion: 0});
  console.log(JSON.stringify(tx1, null, 4))

  // --------------------------------------- send v0

  const msg = new TransactionMessage({
    payerKey: SIGNER_WALLET.publicKey,
    recentBlockhash: bh,
    instructions
  }).compileToV0Message()

  const tx2 = new VersionedTransaction(msg);

  tx2.sign([SIGNER_WALLET])

  console.log('// =============================================================================')
  const sig2 = (await conn.sendTransaction(tx2))
  await conn.confirmTransaction(sig2, 'finalized')
  const tx22 = await conn.getTransaction(sig2, {maxSupportedTransactionVersion: 0});
  console.log(JSON.stringify(tx22, null, 4))

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

  const msg = new TransactionMessage({
    payerKey: SIGNER_WALLET.publicKey,
    recentBlockhash: bh,
    instructions: [lookupTableInst, extendInstruction]
  }).compileToV0Message()
  const tx = new VersionedTransaction(msg);
  tx.sign([SIGNER_WALLET])
  console.log('created lut', await conn.sendTransaction(tx))

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
    console.log('fired off tx using lut', await conn.sendTransaction(tx))
  }

  // --------------------------------------- parse

  //legacy: 36tvHY3qWRPDrPj4x9NNR2St4zDgaFrSttTtw4gBvZhpTyXyGuqEf6ffs8RyXWArp4xSP8EQswrGdAeudK8gRi1m
  //v0: gjwHZUUs9wM6jMkNDZ4BSWKUArzfHnKappaz7UWbBKFnyxkX6VyuSeo6DabZwoZeVKXsM58cx84K1mafeNeaU2f
  //lut: 44qEuSxAoGGmyyHJ7G2AXRjgUjbwJstKLX6Fq6oC2nPjVve1wVkRXCKySKofBubj8qAeVTw5YcD8bbVAGCogFrsj

  // const parsedTx = await conn.getParsedTransaction("44qEuSxAoGGmyyHJ7G2AXRjgUjbwJstKLX6Fq6oC2nPjVve1wVkRXCKySKofBubj8qAeVTw5YcD8bbVAGCogFrsj", {maxSupportedTransactionVersion: 0});
  // console.log(JSON.stringify(parsedTx, null, 4))
})()
