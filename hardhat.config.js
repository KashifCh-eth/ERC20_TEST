require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config({ path: __dirname + "/.env" });

const { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY } = process.env;

// console.log({ GOERLI_PRIVATE_KEY });

module.exports = {
  defaultNetwork: "localhost",
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf",
          },
        },
      },
    },
  },
  networks: {
    hardhat: {
      gas: 120000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    },
    // goerli: {
    //  url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //  accounts: [GOERLI_PRIVATE_KEY],
    //  gasPrice: "auto",
    //  gas: 9712388,
    //  gasMultiplier: 2,
    //  allowUnlimitedContractSize: true,
    // },

    //   goerli: {
    //    url: "https://eth-goerli.g.alchemy.com/v2/cIKZ3mwhOyF_nml4rfKwnmgE1RoxXQfn",
    //    accounts: [process.env.WALLET_SECRET],
    //   },

    //   arbitrum: {
    //    url: "https://arb-mainnet.g.alchemy.com/v2/bLgM0ece4lYG100MNB8_7K2alh37hHme",
    //    accounts: [process.env.WALLET_SECRET],
    //   },

    //   sepolia: {
    //    url: "https://eth-sepolia.g.alchemy.com/v2/w1K63JE7ZZzK4aqAzsg4U5tfv42bHh5M",
    //    accounts: [process.env.WALLET_SECRET],
    //   },
    //   mainnet: {
    //    url: "https://eth-mainnet.g.alchemy.com/v2/XlvxNaKVsuGqMl50WFZ8-rKytSnBvBCH",
    //    accounts: [process.env.WALLET_SECRET],
    //   },
  },
  //  etherscan: {
  //   // Your API key for Etherscan
  //   // Obtain one at https://etherscan.io/
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  //  },
  //  arbiscan: {
  //   apiKey: process.env.ARBISCAN_API_KEY,
  //  },

  //  gasReporter: {
  //   currency: "GBP",
  //   enabled: process.env.REPORT_GAS ? true : false,
  //   coinmarketcap: process.env.COINKEY,
  //  },
  //  tenderly: {
  //   project: process.env.TENDERLY_PROJECT,
  //   username: process.env.TENDERLY_USERNAME,
  //  },

  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: false,
  },
};
