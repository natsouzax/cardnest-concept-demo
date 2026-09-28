import { test } from "node:test";
import assert from "node:assert/strict";
import seed from "../data/products.seed.json";
import { enquiryMessage, whatsappUrl } from "../src/lib/whatsapp";
const items = [
  { slug: seed[0].slug, quantity: 2 },
  { slug: seed[1].slug, quantity: 1 },
];
test("enquiry includes exact disclaimer, names, quantities, prices, total and demo URL", () => {
  const message = enquiryMessage(items, seed, "http://localhost:3000");
  assert.ok(
    message.startsWith(
      "Demo enquiry — no order has been placed. Please confirm availability and final pricing.",
    ),
  );
  assert.ok(message.includes(`2 × ${seed[0].name} — £45.00 each; £90.00`));
  assert.ok(message.includes(`1 × ${seed[1].name} — £50.00 each; £50.00`));
  assert.ok(message.includes("Indicative total: £140.00"));
  assert.ok(
    message.includes("I'm interested in buying the following products"),
  );
  assert.ok(message.includes("how to proceed? Thank you!"));
  assert.ok(message.includes("Demo: http://localhost:3000"));
});
test("URL round-trips Unicode, ampersands and special characters", () => {
  // Synthetic destination used only in tests. Never a runtime default.
  const url = new URL(
    whatsappUrl("447700900000", items, seed, "https://demo.invalid/?a=1&b=2")!,
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(
    url.searchParams.get("text"),
    enquiryMessage(items, seed, "https://demo.invalid/?a=1&b=2"),
  );
});
test("no link without valid international digits or without items", () => {
  for (const number of [
    undefined,
    "",
    "+447700900000",
    "0",
    "abc",
    " 447700900000",
    "1234567890123456",
  ])
    assert.equal(
      whatsappUrl(number, items, seed, "http://localhost:3000"),
      null,
    );
  assert.equal(
    whatsappUrl("447700900000", [], seed, "http://localhost:3000"),
    null,
  );
});
