/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import {
  CasperClient,
  CLValueBuilder,
  DeployUtil,
  RuntimeArgs,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = constants.PATH_TO_CONTRACT_ERC_20;

// Token parameters.
const TOKEN_NAME = "Acme Token";
const TOKEN_SYMBOL = "ACME";
const TOKEN_DECIMALS = 11;
const TOKEN_SUPPLY = 1e15;

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  const client = new CasperClient("https://rpc.integration.casperlabs.io/rpc"); // -> sometimes no response at all
  // const client = new CasperClient("https://3.144.137.38:7777/rpc");       // -> always return something

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract("/home/jh/keys/test2");

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      // "casper-net-1",
      // "casper-test",
      "integration-test",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        decimals: CLValueBuilder.u8(TOKEN_DECIMALS),
        name: CLValueBuilder.string(TOKEN_NAME),
        symbol: CLValueBuilder.string(TOKEN_SYMBOL),
        total_supply: CLValueBuilder.u256(TOKEN_SUPPLY),
      })
    ),
    DeployUtil.standardPayment(200000000000)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.putDeploy(deploy);
  console.log("deployhash1", `${deployHash}`);
};

main();
