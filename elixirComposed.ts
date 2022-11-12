export type Compose = {
  version: "0.1.0";
  name: "compose";
  instructions: [
    {
      name: "buy";
      accounts: [
        {
          name: "initializer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "nftMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fractionsMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerSolTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerNftTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerFractionsTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerPoolTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultProgramNftTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultProgramFractionsTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: false;
          isSigner: false;
        },
        {
          name: "composeFeeMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "composeFeeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "composeFeeSolTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurySolFeeTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryPoolFeeTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vaultProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "ammProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mplTokenMetadata";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "doSwap";
          type: "bool";
        }
      ];
    },
    {
      name: "sell";
      accounts: [
        {
          name: "initializer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "nftMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fractionsMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerSolTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerNftTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerFractionsTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "initializerPoolTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultProgramNftTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultProgramFractionsTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "composeFeeMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: false;
          isSigner: false;
        },
        {
          name: "composeFeeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "composeFeeSolTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurySolFeeTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasuryPoolFeeTa";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vaultProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "ammProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mplTokenMetadata";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "nonce";
          type: "publicKey";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "doSwap";
          type: "bool";
        }
      ];
    }
  ];
};

export const COMPOSE_IDL: Compose = {
  version: "0.1.0",
  name: "compose",
  instructions: [
    {
      name: "buy",
      accounts: [
        {
          name: "initializer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "nftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fractionsMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerSolTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerNftTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerFractionsTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerPoolTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultProgramNftTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultProgramFractionsTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: false,
          isSigner: false,
        },
        {
          name: "composeFeeMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "composeFeeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "composeFeeSolTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurySolFeeTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryPoolFeeTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaultProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ammProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mplTokenMetadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "shares",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "doSwap",
          type: "bool",
        },
      ],
    },
    {
      name: "sell",
      accounts: [
        {
          name: "initializer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "nftMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fractionsMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerSolTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerNftTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerFractionsTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializerPoolTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultProgramNftTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultProgramFractionsTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "composeFeeMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: false,
          isSigner: false,
        },
        {
          name: "composeFeeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "composeFeeSolTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurySolFeeTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryPoolFeeTa",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaultProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ammProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mplTokenMetadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "nonce",
          type: "publicKey",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "doSwap",
          type: "bool",
        },
      ],
    },
  ],
};
