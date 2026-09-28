import { readFileSync, writeFileSync } from "node:fs";
import type { Product } from "../src/lib/products";
const seed: Product[] = JSON.parse(
  readFileSync(new URL("../data/products.seed.json", import.meta.url), "utf8"),
);
const columns = [
  "slug",
  "name",
  "category",
  "set_name",
  "pack_count",
  "price_pence",
  "compare_at_pence",
  "summary",
  "source_url",
  "image_path",
  "status",
] as const;
const sqlValue = (value: unknown) =>
  value === null
    ? "null"
    : typeof value === "number"
      ? String(value)
      : `'${String(value).replaceAll("'", "''")}'`;
const sql = `-- Generated from data/products.seed.json. Products remain draft; no automatic publication.\ninsert into public.products (${columns.join(", ")}) values\n${seed.map((product) => `(${columns.map((column) => sqlValue(product[column])).join(", ")})`).join(",\n")}\non conflict (slug) do nothing;\n`;
writeFileSync(new URL("../supabase/seed.sql", import.meta.url), sql);
