import type { Product } from "./products";
export type CartItem = { slug: string; quantity: number };
export const CART_KEY = "cardnest-demo-cart-v1";
export function readCart(raw: string | null, products: Product[]): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "null");
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("version" in parsed) ||
      parsed.version !== 1 ||
      !("items" in parsed) ||
      !Array.isArray(parsed.items)
    )
      return [];
    const seen = new Set<string>();
    return parsed.items
      .filter((item): item is CartItem => {
        if (
          !item ||
          typeof item.slug !== "string" ||
          !products.some((p) => p.slug === item.slug) ||
          !Number.isSafeInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 99 ||
          seen.has(item.slug)
        )
          return false;
        seen.add(item.slug);
        return true;
      })
      .map(({ slug, quantity }) => ({ slug, quantity }));
  } catch {
    return [];
  }
}
export function setQuantity(
  items: CartItem[],
  slug: string,
  quantity: number,
): CartItem[] {
  if (!Number.isSafeInteger(quantity) || quantity < 0 || quantity > 99)
    return items;
  if (quantity === 0) return items.filter((item) => item.slug !== slug);
  return items.some((item) => item.slug === slug)
    ? items.map((item) => (item.slug === slug ? { slug, quantity } : item))
    : [...items, { slug, quantity }];
}
export function cartTotal(items: CartItem[], products: Product[]) {
  return items.reduce(
    (total, item) =>
      total +
      (products.find((p) => p.slug === item.slug)?.price_pence ?? 0) *
        item.quantity,
    0,
  );
}
