import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";

import dotenv from "dotenv";
import { utils } from "ethers";
import type { HttpNetworkUserConfig } from "hardhat/types";
import yargs from "yargs";

const argv = yargs
  .option("network", {
    type: "string",
    default: "hardhat",
  })
  .help(false)
  .version(false)
  .parseSync();

// Load environment variables.
dotenv.config();
const {
  INFURA_KEY,
  MNEMONIC,
  PK,
  REPORT_GAS,
  NODE_URL,
  ETHERSCAN_API_KEY,
  GAS_PRICE_GWEI,
} = process.env;

const DEFAULT_MNEMONIC =
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

if (
  ["sepolia", "mainnet"].includes(argv.network) &&
  NODE_URL === undefined &&
  INFURA_KEY === undefined
) {
  throw new Error(
    `Could not find Infura key in env, unable to connect to network ${argv.network}`,
  );
}

const sharedNetworkConfig: HttpNetworkUserConfig = {};
if (NODE_URL) {
  sharedNetworkConfig.url = NODE_URL;
}
if (PK) {
  sharedNetworkConfig.accounts = [PK];
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
  };
}
if (GAS_PRICE_GWEI) {
  sharedNetworkConfig.gasPrice = utils
    .parseUnits(GAS_PRICE_GWEI, "gwei")
    .toNumber();
}

export default {
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    deploy: "src/deploy",
    sources: "src/contracts",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      blockGasLimit: 12.5e6,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      ...sharedNetworkConfig,
      chainId: 1,
    },
    gnosis: {
      url: `https://rpc.gnosischain.com`,
      ...sharedNetworkConfig,
      chainId: 100,
    },
    arbitrum: {
      url: `https://arbitrum.llamarpc.com`,
      ...sharedNetworkConfig,
      chainId: 42161,
    },
    base: {
      url: `https://mainnet.base.org`,
      ...sharedNetworkConfig,
      chainId: 8453,
    },
    polygon: {
      url: `https://polygon-rpc.com/`,
      ...sharedNetworkConfig,
      chainId: 137,
    },
    avalanche: {
        url: `https://api.avax.network/ext/bc/C/rpc`,
        ...sharedNetworkConfig,
        chainId: 43114,
    },
    optimism: {
        url: `https://mainnet.optimism.io`,
        ...sharedNetworkConfig,
        chainId: 10,
    },
    bnb: {
        url: `https://bsc-dataseed.binance.org`,
        ...sharedNetworkConfig,
        chainId: 56,
    },
    lens: {
      url: `https://rpc.lens.xyz`,
      ...sharedNetworkConfig,
      chainId: 232,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      ...sharedNetworkConfig,
      chainId: 11155111,
    },
  },
  namedAccounts: {
    // Note: accounts defined by a number refer to the the accounts as configured
    // by the current network.
    deployer: 0,
  },
  gasReporter: {
    enabled: REPORT_GAS ? true : false,
    currency: "USD",
    gasPrice: 100,
  },
  etherscan: {
    apiKey: {
      gnosis: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
