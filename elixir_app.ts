import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionMessage,
  VersionedTransaction
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {AnchorProvider, BN, Program, utils, Wallet} from "@project-serum/anchor";
import axios from "axios";
import {Compose, COMPOSE_IDL} from "./elixirComposed";

const FULFILLMENT_KEYS = {
  devnet: new PublicKey("BWjEMEtrW2BfdCrjkUcCZKCddQwM3SeiCFB9D1TTFFw6"),
  mainnet: new PublicKey("E6WNTMKecxpDvN4gNPE7zCeubXMSNoXgCnC8mEudXKXY"),
};
export const METADATA_PREFIX = "metadata";

export const defaultVerifierAuthorityId = new PublicKey(
  "AcAJFFQLZ6zgpropNYU4cwnVjz2numBkPoMYWGYSeyFx"
);

const vaultProgramId = new PublicKey(
  "2qGyiNeWyZxNdkvWHc2jT5qkCnYa1j1gDLSSUmyoWMh8"
);

const augurProgramId = new PublicKey(
  "AUGUREpS2W6T5FgTiycU9oD7WFrbbf4mtvi6nwEkob5T"
);

const multiAssetPoolProgramId = new PublicKey(
  "CurZttATHFmd9vfeYvV9faBkXBeCrfEdXQp9n5j8kP6x"
);

const rentalProgramId = new PublicKey(
  "rentxNUvmi2jSsm41jkuNDSZbxFyJzgrE83XxvfSKYk"
);

const rentalsAuxilaryProgramId = new PublicKey(
  "rAUXwct9rF3cX8fb1n2sjgniiQ8dp9mBtNwTQ2kXKbc"
);

const lotteryProgramId = new PublicKey(
  "1otEfEhS4FQaJRwkv6saaw7iqM1nPegfaNpfFxge4Li"
);

const parliamentProgramId = new PublicKey(
  "houseKq5iHRX7hjyeFWk6dwALTUE6BG6RQptNSiJY6s"
);

const augurAuthorityId = new PublicKey(
  "AbZU2HupUBLkz9mUF2i6Q9UT1vjxULN9TdRK1uSQP67G"
);

const FEE_PID = new PublicKey("fee6uQpfQYhfZUxiYLvpAjuCGNE7NTJrCoXV8tsqsn6");

const DEX_PROGRAMS = {
  devnet: new PublicKey("DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY"),
  mainnet: new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"),
};

const AMM_PROGRAMS = {
  devnet: new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),
  mainnet: new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"),
};

const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

const SWAP_PROGRAMS = {
  devnet: new PublicKey("ziR2PGyshLYwLsGsH5hXH5rkZTf6GNJ6RzvX23v52iY"),
  mainnet: new PublicKey("ziR2PGyshLYwLsGsH5hXH5rkZTf6GNJ6RzvX23v52iY"),
};

const TREASURY_ACCOUNTS = {
  devnet: new PublicKey("6kLLewcYCvUK6xLQE1ep36ReamuTLFuTWwhCnbMCb3pd"),
  mainnet: new PublicKey("6kLLewcYCvUK6xLQE1ep36ReamuTLFuTWwhCnbMCb3pd"),
};

const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const MEMO_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

const APPRAISER = new PublicKey("3RDTwtVmMcH9zvzqj8mZi9GH8apqWpRZyXB9DWL7QqrP");
const COMPOSE_PID = new PublicKey(
  "E1XRkj9fPF2NQUdoq41AHPqwMDHykYfn5PzBXAyDs7Be"
);
const PROGRAMS_LOOKUP_TABLE = new PublicKey(
  "FDU3PjpftvmM1g6d8ocF8dXzdYrB5zoCbs5Kv9PSJAgo"
);

export const SOL_SWITCHBOARD_KEYS = {
  devnet: new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL"),
  mainnet: new PublicKey("AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL"),
};

export const BRIDGESPLIT_API = "https://backend.bridgesplit.com";

export const ELIXIR_PROGRAM_IDS = {
  token: TOKEN_PROGRAM_ID,
  associatedToken: ASSOCIATED_TOKEN_PROGRAM_ID,
  system: SystemProgram.programId,
  rent: SYSVAR_RENT_PUBKEY,
  fulfillment: FULFILLMENT_KEYS.mainnet,
  vault: vaultProgramId,
  augur: augurProgramId,
  multi_asset: multiAssetPoolProgramId,
  augur_authority: augurAuthorityId,
  metadata: METADATA_PROGRAM_ID,
  treasury: TREASURY_ACCOUNTS.mainnet,
  dex: DEX_PROGRAMS.mainnet,
  amm: AMM_PROGRAMS.mainnet,
  sol_oracle: SOL_SWITCHBOARD_KEYS.mainnet,
  wrapped_sol: WRAPPED_SOL_MINT,
  sol: NATIVE_MINT.toString(),
  swap: SWAP_PROGRAMS.mainnet,
  memo: MEMO_ID,
  rental: rentalProgramId,
  rental_auxilary: rentalsAuxilaryProgramId,
  lottery: lotteryProgramId,
  parliament: parliamentProgramId,
  appraiser: APPRAISER,
  fee: FEE_PID,
  compose: COMPOSE_PID,
  lookups: PROGRAMS_LOOKUP_TABLE,
};

export const findVaultAccPda = (fnftMint: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode("vault")), fnftMint.toBytes()],
    ELIXIR_PROGRAM_IDS.vault
  );
};

export const findFeeAccPda = (poolMint: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode("deposit")), poolMint.toBytes()],
    ELIXIR_PROGRAM_IDS.vault
  );
};

export const findAppraisalAccPda = (
  poolMint: PublicKey,
  nftMint: PublicKey
) => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode("appraisal")),
      poolMint.toBytes(),
      nftMint.toBytes(),
    ],
    ELIXIR_PROGRAM_IDS.vault
  );
};

export const findExternalAccPda = (poolMint: PublicKey) => {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode("fractions-seed")),
      poolMint.toBytes(),
    ],
    ELIXIR_PROGRAM_IDS.vault
  );
};

export const findPoolAccPda = (poolMint: PublicKey) => {
  return PublicKey.findProgramAddress(
    [Buffer.from(utils.bytes.utf8.encode("fractions")), poolMint.toBytes()],
    ELIXIR_PROGRAM_IDS.vault
  );
};

const CONNECTION = new Connection(process.env.CONN!)
const SIGNER_WALLET = Keypair.fromSecretKey(
  Uint8Array.from(require("/Users/ilmoi/.config/solana/id.json"))
);

const wallet = new Wallet(SIGNER_WALLET)
const provider = new AnchorProvider(CONNECTION, wallet, {});
const prog = new Program<Compose>(COMPOSE_IDL, ELIXIR_PROGRAM_IDS.compose, provider);

const buildBuyTx = async ({
    shares = new BN(10000),
    maxLamports = new BN(0), //max amount someone is willing to pay
    doSwap = true,
    buyer,
    nftMint,
    fNftMint,
    pNftMint,
  }: any & {
    buyer: PublicKey;
    nftMint: PublicKey;
    fNftMint: PublicKey;
    pNftMint: PublicKey;
  }) => {
    const lookupTableAddresses = (
      await axios.get<{ addresses: string[] }>(
        `${BRIDGESPLIT_API}/token/lookup_table/${pNftMint}`
      )
    ).data.addresses.map((a) => new PublicKey(a));

    console.log(shares.toNumber(), maxLamports.toNumber(), doSwap);

    console.log("LUT addresses are", JSON.stringify(lookupTableAddresses));

    const [vaultAccount] = await findVaultAccPda(fNftMint);
    const [poolAccount] = await findPoolAccPda(pNftMint);
    const [appraisalAccount] = await findAppraisalAccPda(pNftMint, nftMint);
    const [feeAccount] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(utils.bytes.utf8.encode("fee")),
        pNftMint.toBytes(),
        lookupTableAddresses[2].toBytes(),
      ],
      ELIXIR_PROGRAM_IDS.fee
    );

    const appAccExists = await CONNECTION.getAccountInfo(
      appraisalAccount
    );
    if (!!appAccExists) {
      console.log("✅ appraisal acc exists", appAccExists);
    } else {
      console.log("❌ appraisal acc missing", appAccExists);
    }

    //initializer's TAs
    const initializerSolTa = await getAssociatedTokenAddress(
      ELIXIR_PROGRAM_IDS.wrapped_sol,
      buyer
    );
    const initializerNftTa = await getAssociatedTokenAddress(nftMint, buyer);
    const initializerFractionsTa = await getAssociatedTokenAddress(
      fNftMint,
      buyer
    );
    const initializerPoolTa = await getAssociatedTokenAddress(pNftMint, buyer);
    //elixir's TAs
    const vaultProgramNftTa = await getAssociatedTokenAddress(
      nftMint,
      vaultAccount,
      true
    );
    const vaultProgramFractionsTa = await getAssociatedTokenAddress(
      fNftMint,
      vaultAccount,
      true
    );
    const composeFeeSolTa = await getAssociatedTokenAddress(
      ELIXIR_PROGRAM_IDS.wrapped_sol,
      feeAccount,
      true
    );
    const treasurySolFeeTa = await getAssociatedTokenAddress(
      ELIXIR_PROGRAM_IDS.wrapped_sol,
      ELIXIR_PROGRAM_IDS.treasury,
      true
    );
    const treasuryPoolFeeTa = await getAssociatedTokenAddress(
      pNftMint,
      ELIXIR_PROGRAM_IDS.treasury,
      true
    );

    console.log(
      "accounts",
      JSON.stringify(
        {
          initializer: buyer,
          nftMint,
          fractionsMint: fNftMint,
          poolMint: pNftMint,
          vaultAccount,
          poolAccount,
          initializerSolTa,
          initializerNftTa,
          initializerFractionsTa,
          initializerPoolTa,
          vaultProgramNftTa,
          vaultProgramFractionsTa,
          composeFeeMint: ELIXIR_PROGRAM_IDS.wrapped_sol,
          composeFeeAccount: feeAccount,
          composeFeeSolTa,
          treasurySolFeeTa,
          treasuryPoolFeeTa,
          feeProgram: ELIXIR_PROGRAM_IDS.fee,
          treasury: ELIXIR_PROGRAM_IDS.treasury,
          vaultProgram: ELIXIR_PROGRAM_IDS.vault,
          ammProgram: ELIXIR_PROGRAM_IDS.amm,
          mplTokenMetadata: ELIXIR_PROGRAM_IDS.metadata,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
          clock: SYSVAR_CLOCK_PUBKEY,
        },
        null,
        4
      )
    );

    const builder = prog.methods
      .buy(shares, maxLamports, doSwap)
      .accounts({
        initializer: buyer,
        nftMint,
        fractionsMint: fNftMint,
        poolMint: pNftMint,
        vaultAccount,
        poolAccount,
        initializerSolTa,
        initializerNftTa,
        initializerFractionsTa,
        initializerPoolTa,
        vaultProgramNftTa,
        vaultProgramFractionsTa,
        composeFeeMint: ELIXIR_PROGRAM_IDS.wrapped_sol,
        composeFeeAccount: feeAccount,
        composeFeeSolTa,
        treasurySolFeeTa,
        treasuryPoolFeeTa,
        feeProgram: ELIXIR_PROGRAM_IDS.fee,
        treasury: ELIXIR_PROGRAM_IDS.treasury,
        vaultProgram: ELIXIR_PROGRAM_IDS.vault,
        ammProgram: ELIXIR_PROGRAM_IDS.amm,
        mplTokenMetadata: ELIXIR_PROGRAM_IDS.metadata,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        clock: SYSVAR_CLOCK_PUBKEY,
      })
      .remainingAccounts([
        {
          pubkey: appraisalAccount,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[2],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[3],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[4],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[5],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[6],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[7],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[8],
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: lookupTableAddresses[9],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[10],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[11],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[12],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[13],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[14],
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: lookupTableAddresses[15],
          isSigner: false,
          isWritable: true,
        },
      ]);

    console.log("tx is", await builder.instruction());

    return {
      builder,
      tx: { ixs: [await builder.instruction()], extraSigners: [] },
    };
  }

export const waitMS = (ms: number) => new Promise((res) => setTimeout(res, ms));


export const getExtraComputeTxn = (compute: number) => {
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: compute
    });
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1
    });
    return [modifyComputeUnits, addPriorityFee];
};

(async () => {
  const {tx: {ixs}} = await buildBuyTx({
    shares: new BN(100000),
    maxLamports: new BN(2 * LAMPORTS_PER_SOL),
    doSwap: true,
    buyer: SIGNER_WALLET.publicKey,
    nftMint: new PublicKey("DHPPjfCQiZn51xJ7S46C6PnGHquC7SSzucbdqgkPTpNK"),
    fNftMint: new PublicKey("GemHtghDrLSLV4Mv8cE7G4pHcbpzBEoVjRY7cUTWdY8"),
    pNftMint: new PublicKey("9pXifXKWkudXuKn9DaU1d4y8pZPMjfj154AgQnkccvbf")
  })

  const lookupTableAccount = (
      await CONNECTION.getAddressLookupTable(
        new PublicKey('3NHft4SEXiRUkg1SCqywKA9abjsQWmmHknL8gLqzn2BL'),
      )
    ).value;

  const instructions = [];
  instructions.push(...getExtraComputeTxn(800_000));
  instructions.push(...ixs);

  const msg = new TransactionMessage({
    payerKey: SIGNER_WALLET.publicKey,
    recentBlockhash: (await CONNECTION.getLatestBlockhash('confirmed'))
      .blockhash,
    instructions,
  }).compileToV0Message([lookupTableAccount!]);
  const tx = new VersionedTransaction(msg);

  tx.sign([SIGNER_WALLET])

  let keepTrying = true;
  while (keepTrying) {
    try {
      const sig = await CONNECTION.sendTransaction(tx,{skipPreflight: true, preflightCommitment: 'confirmed'})
      console.log('sig', sig)
      keepTrying = false;
    } catch (e) {
      console.log(e)
      await waitMS(1000);
    }
  }
})()


