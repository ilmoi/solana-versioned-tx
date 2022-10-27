import {Connection} from "@solana/web3.js";
import fs from "fs";

const conn = new Connection("https://api.mainnet-beta.solana.com");

(async () => {
  const sig = '34mMYA5AunJJtW9VTGzcDUCbSUiQkUSPTaP9CWQfcNb2Aa2KuGGrD8R2buaChu4WE4aQXoWMUNw6LLsjhhdzBERk'
  const fetchedTxCurr = await conn.getTransaction(sig, )
  const fetchedTxOld = await conn.getTransaction(sig, {maxSupportedTransactionVersion: 0})
  const fetchedTxNew = await conn.getParsedTransaction(sig, {maxSupportedTransactionVersion: 0})
  fs.writeFileSync(`me_tx_curr.json`, JSON.stringify(fetchedTxCurr))
  fs.writeFileSync(`me_tx_old.json`, JSON.stringify(fetchedTxOld))
  fs.writeFileSync(`me_tx_new.json`, JSON.stringify(fetchedTxNew))
})()
