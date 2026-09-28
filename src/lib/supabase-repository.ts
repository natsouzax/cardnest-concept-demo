import { createClient } from "@supabase/supabase-js";
import type { Product, ProductRepository } from "./products";

export function createSupabaseRepository({
  url,
  key,
  slugs,
  fetcher = fetch,
}: {
  url?: string;
  key?: string;
  slugs: string[];
  fetcher?: typeof fetch;
}): ProductRepository {
  if (!url || !key?.startsWith("sb_publishable_"))
    throw new Error(
      "Supabase mode requires a URL and a publishable key (sb_publishable_).",
    );
  const endpoint = new URL(url);
  if (
    endpoint.protocol !== "https:" &&
    !(
      endpoint.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(endpoint.hostname)
    )
  )
    throw new Error("Supabase requires HTTPS except on localhost.");
  const client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (input, init) =>
        fetcher(input, {
          ...init,
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        }),
    },
  });
  async function list(): Promise<Product[]> {
    const { data, error } = await client
      .from("products")
      .select(
        "slug,name,category,set_name,pack_count,price_pence,compare_at_pence,summary,source_url,image_path,status",
      )
      .eq("status", "published")
      .in("slug", slugs)
      .order("name");
    if (error) throw new Error("The published catalogue could not be loaded.");
    return (data ?? []) as Product[];
  }
  return {
    list,
    async find(slug) {
      if (!slugs.includes(slug)) return undefined;
      return (await list()).find((product) => product.slug === slug);
    },
  };
}
