import {
  CLAccountHash,
  CLValueBuilder,
  decodeBase16,
  CLKeyBytesParser,
  encodeBase16,
  CLByteArray,
} from "casper-js-sdk";
import { blake2b } from "@noble/hashes/blake2b";

function byteHash(x) {
  return blake2b(x, {
    dkLen: 32,
  });
}

function concatTypedArrays(a, b) {
  // a, b TypedArray of same type
  var c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}
const main = async () => {
  // owner: account address
  const account_address = CLValueBuilder.key(
    new CLAccountHash(
      decodeBase16(
        "account-hash-53ad1794247addf2e7f8ce6436a2d7f9e6252f90454b66d6b086d9968b6d61a5".slice(
          13
        )
      )
    )
  );

  // spender: contract package address
  const spender_address = CLValueBuilder.key(
    new CLByteArray(
      decodeBase16(
        "hash-a133484f7efb6f3bad059b504bc664646ad57f9b0b918d1fe3a50ab657c58f19".slice(
          5
        )
      )
    )
  );

  // index of the token for this account
  const c = concatTypedArrays(
    new CLKeyBytesParser().toBytes(account_address).unwrap(),
    new CLKeyBytesParser().toBytes(spender_address).unwrap()
  );

  const blaked = byteHash(c);

  const dict_item_key = encodeBase16(blaked);
  console.log("allowance_item_key", dict_item_key);
};

main();
