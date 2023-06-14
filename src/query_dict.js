import { CasperClient, Contracts } from "casper-js-sdk";

const main = async () => {
  const client = new CasperClient("http://3.140.179.157:7777/rpc");

  const { Contract } = Contracts;

  const contractClient = new Contract(client);
  const contract_hash =
    "hash-7fe61c5732c47a68bbb83f60db1a1c9fa4f6ecb44e22292202f7105c9787ab3b"; //
  contractClient.setContractHash(contract_hash);

  const result = await contractClient.queryContractDictionary(
    "events",
    "count"
  );

  console.log("result", result.data.toString());
};

main();
