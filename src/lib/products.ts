export type Product = {
  slug: string;
  name: string;
  category: string;
  set_name: string | null;
  pack_count: number | null;
  price_pence: number;
  compare_at_pence: number | null;
  summary: string | null;
  source_url: string | null;
  image_path: string | null;
  status: string;
};
export interface ProductRepository {
  list(): Promise<Product[]>;
  find(slug: string): Promise<Product | undefined>;
}
export const money = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    pence / 100,
  );
export function summary(product: Product) {
  if (product.summary) return product.summary;
  return `${product.set_name ?? "Pokémon TCG"} ${product.category.toLowerCase()}${product.pack_count ? ` with ${product.pack_count} packs` : ""}. Contents and condition require confirmation.`;
}
