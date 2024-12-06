import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { CONTRACT_NAME } from "../ts";

const deployAuthenticator: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy(CONTRACT_NAME, {
    from: deployer,
    gasLimit: 2000000,
    log: true,
    args: [],
    deterministicDeployment: true,
  });
};

export default deployAuthenticator;
