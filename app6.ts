import {Connection, PublicKey} from "@solana/web3.js";
import {utils} from "@project-serum/anchor";

export const findAppraisalAccPda = (
  poolMint: PublicKey,
  nftMint: PublicKey
) => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode("vault")),
      poolMint.toBytes(),
      nftMint.toBytes(),
    ],
    new PublicKey("2qGyiNeWyZxNdkvWHc2jT5qkCnYa1j1gDLSSUmyoWMh8")
  );
};

(async () => {
  const conn = new Connection("https://api.mainnet-beta.solana.com")
  // const lut = await conn.getAddressLookupTable(new PublicKey("3MSMXTuggkfJ3x2yUt9pCLQubNMfyAcReXubz3dGFDLD"))
  // console.log('lut is', lut.value?.state.addresses.map(a => a.toBase58()));

  const [appraisalAccount] = await findAppraisalAccPda(pNftMint, nftMint);
})()
