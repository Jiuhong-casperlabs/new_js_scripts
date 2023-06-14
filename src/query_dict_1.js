import { CasperServiceByJsonRPC } from "casper-js-sdk";

const main = async () => {
  let client = new CasperServiceByJsonRPC("http://3.140.179.157:7777/rpc");

  const state_root_hash = client.getStateRootHash();

  const contract_hash =
    "hash-bbdbf32fcc89b9113fe951f82c55c8af88e1ab1b058ac55d4ba785b434ff9734";
  const dictionary_name = "count_uref";
  const dictionary_item_key = "count";
  const seed_uref =
    "a4f46ea9705ea826c0ae469ef7c092eb801f77ff32061bbd8ac58865130b95d1";

  // const storedValue = await client.getDictionaryItemByName(
  //   state_root_hash,
  //   contract_hash,
  //   dictionary_name,
  //   dictionary_item_key
  // );

  // if (storedValue && storedValue.CLValue.isCLValue) {
  //   console.log("result is ", storedValue.CLValue);
  // }
  const storedValue = await client.getDictionaryItemByURef(
    state_root_hash,
    dictionary_item_key,
    seed_uref
  );

  console.log("storedValue ", storedValue);
};

main();
