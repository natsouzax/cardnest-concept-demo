import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import seed from "../data/products.seed.json";

test("migration and seed enforce published-only reads and refuse all anonymous writes", async () => {
  const db = new PGlite();
  try {
    await db.exec(
      "create role anon nologin; create role authenticated nologin;",
    );
    for (const file of readdirSync("supabase/migrations")
      .filter((file) => file.endsWith(".sql"))
      .sort())
      await db.exec(readFileSync(`supabase/migrations/${file}`, "utf8"));
    await db.exec(readFileSync("supabase/seed.sql", "utf8"));
    const { rows } = await db.query(
      "select slug, name, price_pence, image_path, status from products order by slug",
    );
    assert.deepEqual(
      rows,
      seed
        .map(({ slug, name, price_pence, image_path, status }) => ({
          slug,
          name,
          price_pence,
          image_path,
          status,
        }))
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    );
    await db.exec("set role anon");
    assert.equal((await db.query("select * from products")).rows.length, 0);
    await db.exec("reset role");
    await db.query("update products set status = 'published' where slug = $1", [
      seed[0].slug,
    ]);
    await db.exec("set role anon");
    assert.deepEqual((await db.query("select slug from products")).rows, [
      { slug: seed[0].slug },
    ]);
    assert.equal(
      (await db.query("select * from products where status = 'draft'")).rows
        .length,
      0,
    );
    for (const sql of [
      "insert into products (slug, name, category, price_pence) values ('test', 'Test', 'Test', 1)",
      "update products set price_pence = 0",
      "delete from products",
      "truncate products",
    ]) {
      await assert.rejects(db.exec(sql), /permission denied/);
    }
    await db.exec("reset role; set role authenticated");
    await assert.rejects(
      db.query("select * from products"),
      /permission denied/,
    );
    await db.exec("reset role");
    await assert.rejects(
      db.exec("update products set price_pence = -1"),
      /check constraint/,
    );
    assert.equal((await db.query("select * from products")).rows.length, 3);
  } finally {
    await db.close();
  }
});
