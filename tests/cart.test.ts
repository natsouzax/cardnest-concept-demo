import { test } from "node:test";
import assert from "node:assert/strict";
import seed from "../data/products.seed.json";
import { cartTotal, readCart, setQuantity } from "../src/lib/cart";
test("adds, updates, removes and totals in integer pence without mutating input", () => {
  const first = setQuantity([], seed[0].slug, 2);
  const second = setQuantity(first, seed[1].slug, 3);
  assert.equal(cartTotal(second, seed), 24000);
  assert.equal(cartTotal(setQuantity(second, seed[0].slug, 1), seed), 19500);
  assert.deepEqual(setQuantity(first, seed[0].slug, 0), []);
  assert.equal(first[0].quantity, 2);
});
test("rejects negative, fractional, non-finite and excessive quantities", () => {
  const items = [{ slug: seed[0].slug, quantity: 1 }];
  for (const quantity of [-1, 1.5, NaN, Infinity, 100])
    assert.deepEqual(setQuantity(items, seed[0].slug, quantity), items);
});
test("restores only valid versioned cart items, never persisted prices", () => {
  const slug = seed[0].slug;
  assert.deepEqual(
    readCart(
      JSON.stringify({
        version: 1,
        items: [
          { slug, quantity: 2, price_pence: 1 },
          { slug, quantity: 3 },
          { slug: "unknown", quantity: 1 },
          null,
          { slug: seed[1].slug, quantity: -2 },
        ],
      }),
      seed,
    ),
    [{ slug, quantity: 2 }],
  );
  for (const raw of [
    null,
    "{",
    "{}",
    "null",
    '{"version":2,"items":[]}',
    '{"version":1,"items":{}}',
  ])
    assert.deepEqual(readCart(raw, seed), []);
});
