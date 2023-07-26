import { CLByteArray, decodeBase16 } from "casper-js-sdk";

import { CEP18Client } from "casper-cep18-js-client";

const NETWORK_NAME = "integration-test";
const NODE_URL = "https://rpc.integration.casperlabs.io/rpc";

const main = async () => {
  const cep18 = new CEP18Client(NODE_URL, NETWORK_NAME);

  const contractPackageHash =
    "hash-3cbdf16b0ac8d789b82629a0315ff06a25689eb166513800496e074c0c318057";
  const contractHash =
    "hash-f898715a7c5d2922de51d283cf8a0fc87d2952b568b73d86fd4ec337af7ae7fe";
  cep18.setContractHash(contractHash);

  const hexString2 =
    "0ff3a9cb0cfb8629bc3b252b37f6f4fc1b3e2e9b976cbd1ce4618ede9c6790f0 ";

  const contract_package = new CLByteArray(decodeBase16(hexString2));
  const balance = await cep18.balanceOf(contract_package);
  console.log(balance.toNumber());
};

main();
