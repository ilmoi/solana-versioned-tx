import {Connection} from "@solana/web3.js";
import fs from "fs";

const conn = new Connection("https://api.devnet.solana.com");

(async () => {
  const sig = '21c7xR6sKT1m82ZRnPMVwRSKdjYohrV7tYWGpb9ccfEbEkDdRukhhP3djzz4fGqCfPjFpDXGPxxrLhwo47iRCRX6'
  const tx = await conn.getParsedTransaction('21c7xR6sKT1m82ZRnPMVwRSKdjYohrV7tYWGpb9ccfEbEkDdRukhhP3djzz4fGqCfPjFpDXGPxxrLhwo47iRCRX6', {maxSupportedTransactionVersion: 0});
  console.log(JSON.stringify(tx, null, 4))
  // const fetchedTxCurr = await conn.getTransaction(sig, )
  // const fetchedTxOld = await conn.getTransaction(sig, {maxSupportedTransactionVersion: 0})
  // const fetchedTxNew = await conn.getParsedTransaction(sig, {maxSupportedTransactionVersion: 0})
  // fs.writeFileSync(`me_tx_curr.json`, JSON.stringify(fetchedTxCurr))
  // fs.writeFileSync(`me_tx_old.json`, JSON.stringify(fetchedTxOld))
  // fs.writeFileSync(`me_tx_new.json`, JSON.stringify(fetchedTxNew))
})()
