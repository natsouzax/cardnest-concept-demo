import { test } from "node:test";
import assert from "node:assert/strict";
import seed from "../data/products.seed.json";
import { createSupabaseRepository } from "../src/lib/supabase-repository";
test("Supabase adapter requests only published seed slugs with a public key and no cache", async () => {
  let calls = 0;
  const repository = createSupabaseRepository({
    url: "https://catalogue.invalid",
    key: "sb_publishable_test_only",
    slugs: seed.map((p) => p.slug),
    fetcher: async (input, init) => {
      calls++;
      const url = new URL(String(input));
      assert.equal(url.searchParams.get("status"), "eq.published");
      assert.ok(url.searchParams.get("slug")?.includes(seed[0].slug));
      assert.equal(
        new Headers(init?.headers).get("apikey"),
        "sb_publishable_test_only",
      );
      assert.equal(init?.cache, "no-store");
      return new Response(
        JSON.stringify([{ ...seed[0], status: "published" }]),
        { headers: { "Content-Type": "application/json" } },
      );
    },
  });
  assert.equal((await repository.list()).length, 1);
  assert.equal(await repository.find("unknown"), undefined);
  assert.equal(calls, 1);
});
test("Supabase mode refuses missing or secret keys and never silently falls back on failure", async () => {
  for (const key of [undefined, "", "sb_secret_test"])
    assert.throws(
      () =>
        createSupabaseRepository({
          url: "https://catalogue.invalid",
          key,
          slugs: [],
        }),
      /publishable/,
    );
  const repository = createSupabaseRepository({
    url: "https://catalogue.invalid",
    key: "sb_publishable_test_only",
    slugs: [],
    fetcher: async () => new Response('{"message":"denied"}', { status: 403 }),
  });
  await assert.rejects(repository.list(), /could not be loaded/);
});
