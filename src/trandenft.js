/**
 * @fileOverview CSPR JS SDK demo: ERC20 - install contract.
 */

import {
  CasperServiceByJsonRPC,
  DeployUtil,
  RuntimeArgs,
  CLString,
  CLMap,
  CLList,
  CLU256,
  CLU512,
  decodeBase16,
  CLKey,
  CLByteArray,
} from "casper-js-sdk";
import * as constants from "../constants";
import * as utils from "../utils";

// Path to contract to be installed.
const PATH_TO_CONTRACT = `/home/jh/mywork/transfer_contract/contract/target/wasm32-unknown-unknown/release/trade_nft.wasm`;

/**
 * Demonstration entry point.
 */
const main = async () => {
  // Step 1: Set casper node client.
  // const client = new CasperClient(" http://94.130.10.55:7777/rpc");
  // const client = new CasperClient("https://rpc.integration.casperlabs.io/rpc"); // -> sometimes no response at all
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  // Step 2: Set contract operator key pair.
  const keyPairOfContract = utils.getKeyPairOfContract(
    "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1"
  );

  const myKey1 = new CLString("token_0");
  const myVal1 = new CLString("token_0 description");
  const myKey2 = new CLString("token_1");
  const myVal2 = new CLString("token_1 description");
  const token_metas = new CLList([
    new CLMap([[myKey1, myVal1]]),
    new CLMap([[myKey2, myVal2]]),
  ]);

  const token_ids = new CLList([new CLU256(2), new CLU256(3)]);

  // the contract hash including trade_NFT
  const contract_hash_string =
    "3b60b8cda69643d23b94d42993f3568c4d61997a6f0fb2be24aac4c2f62595eb";

  const contract_hash = new CLKey(
    new CLByteArray(decodeBase16(contract_hash_string))
  );

  // const hexString2 =
  //   "3b60b8cda69643d23b94d42993f3568c4d61997a6f0fb2be24aac4c2f62595eb";

  // const hex2 = Uint8Array.from(Buffer.from(hexString2, "hex"));

  // const contract_hash = new CLKey(new CLByteArray(hex2));

  // Step 3: Set contract installation deploy (unsigned).
  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairOfContract.publicKey,
      // "casper-test",
      "casper-net-1",
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_CONTRACT),
      RuntimeArgs.fromMap({
        // let amount: U512 = runtime::get_named_arg("amount");
        // let token_ids: Vec<TokenId> = runtime::get_named_arg("token_ids");
        // let token_metas = runtime::get_named_arg::<Vec<Meta>>("token_metas");
        // contract_hash:key
        // hash-3b60b8cda69643d23b94d42993f3568c4d61997a6f0fb2be24aac4c2f62595eb
        amount: new CLU512(123456789),
        token_ids,
        token_metas,
        contract_hash,
      })
    ),
    DeployUtil.standardPayment(200000000000)
  );

  // Step 4: Sign deploy.
  deploy = DeployUtil.signDeploy(deploy, keyPairOfContract);

  // Step 5: Dispatch deploy to node.
  const deployHash = await client.deploy(deploy);

  // Step 6: Render deploy details.
  logDetails(deployHash);
};

/**
 * Emits to stdout deploy details.
 * @param {String} deployHash - Identifer of dispatched deploy.
 */
const logDetails = (deployHash) => {
  console.log(`
---------------------------------------------------------------------
trade NFT -> 
... deploy hash = ${JSON.stringify(deployHash)}
---------------------------------------------------------------------
    `);
};

main();
