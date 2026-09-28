import "server-only";
import { cache } from "react";
import seed from "../../data/products.seed.json";
import type { ProductRepository } from "./products";
import { createSupabaseRepository } from "./supabase-repository";

// The local demo deliberately includes the three draft reference products.
// No network requests or credentials are needed unless explicitly opted in.
const list = cache(async () => {
  const source = process.env.PRODUCT_SOURCE ?? "local";
  if (source === "local") return seed;
  if (source !== "supabase")
    throw new Error("PRODUCT_SOURCE must be local or supabase");
  return createSupabaseRepository({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    slugs: seed.map((product) => product.slug),
  }).list();
});
export const products: ProductRepository = {
  list,
  async find(slug) {
    return (await list()).find((product) => product.slug === slug);
  },
};
