import {
  CLAccountHash,
  CLU256,
  CLU256BytesParser,
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

function concatTypedArrays(a, b) {
  // a, b TypedArray of same type
  var c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}
const main = async () => {
  // account address
  const account_address = CLValueBuilder.key(
    new CLAccountHash(
      decodeBase16(
        "account-hash-ce4c5b910411e5c854e9d1c5c3b4c978042516406b8a476299c8e98e16a41548".slice(
          13
        )
      )
    )
  );

  // index of the token for this account
  const index = new CLU256(0);
  const c = concatTypedArrays(
    new CLKeyBytesParser().toBytes(account_address).unwrap(),
    new CLU256BytesParser().toBytes(index).unwrap()
  );

  const blaked = byteHash(c);

  const dict_item_key = encodeBase16(blaked);
  console.log("dict_item_key", dict_item_key);
};

main();
