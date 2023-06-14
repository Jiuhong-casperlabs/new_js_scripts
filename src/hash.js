import {
  CasperClient,
  CLAccountHash,
  CLPublicKey,
  CLKey,
  decodeBase64,
  CLValueParsers,
  CLValueBuilder,
  decodeBase16,
  CLKeyBytesParser,
  encodeBase16,
} from "casper-js-sdk";
import { blake2b } from "@noble/hashes/blake2b";

function byteHash(x) {
  return blake2b(x, {
    dkLen: 32,
  });
}
const main = async () => {
  const value = CLValueBuilder.key(
    new CLAccountHash(
      decodeBase16(
        "account-hash-d3c96f1eb8d9ec445c0d67678f9dc0a1e5aafe0b16cff9cf7aa20374d3cbadc1".slice(
          13
        )
      )
    )
  );

  const blaked = byteHash(new CLKeyBytesParser().toBytes(value).unwrap());

  const result = encodeBase16(blaked);
  console.log("result", result);
};

// 95fd692b7d293ebe22d0126abcb7479b82107a6d2c8342696ac29cbce312dc00
main();
