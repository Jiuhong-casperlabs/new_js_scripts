import { Keys } from "casper-js-sdk";

const main = async () => {
  //   public key
  // 02026f4e13b4a5cad7031dca7da8a7ac5f18ee4db639ac144a65857abd7f7d71ebae

  // private key
  // 26741a39773e31a63559cc73337acf2e8d88d86698a7dfc9a4764a75c97d8b52

  const PrivateKey =
    "1511d3b16356f78d1def7a9d3cd20e946dcbeb9ab1640965084196d1f4c278dc";

  const publickey = Keys.Secp256K1.privateToPublicKey(
    Buffer.from(PrivateKey, "hex")
  );
  console.log(Buffer.from(publickey).toString("hex"));
};

main();
