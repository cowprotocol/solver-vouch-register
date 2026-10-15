import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { SOLANA_CONTRACT_NAME } from "../ts";

const deploySolanaVouchRegister: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy(SOLANA_CONTRACT_NAME, {
    from: deployer,
    gasLimit: 2000000,
    log: true,
    args: [],
    deterministicDeployment: true,
  });
};

deploySolanaVouchRegister.tags = [SOLANA_CONTRACT_NAME];

export default deploySolanaVouchRegister;
