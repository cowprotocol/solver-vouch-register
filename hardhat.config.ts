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
  ["rinkeby", "mainnet"].includes(argv.network) &&
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
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      ...sharedNetworkConfig,
      chainId: 4,
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
      xdai: "any api key is good currently",
      mainnet: ETHERSCAN_API_KEY,
      rinkeby: ETHERSCAN_API_KEY,
    },
  },
};
