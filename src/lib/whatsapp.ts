import { cartTotal, type CartItem } from "./cart";
import { money, type Product } from "./products";
export function enquiryMessage(
  items: CartItem[],
  products: Product[],
  demoUrl: string,
) {
  return [
    "Demo enquiry — no order has been placed. Please confirm availability and final pricing.",
    "",
    "Hi! I'm interested in buying the following products:",
    "",
    ...items.flatMap((item) => {
      const p = products.find((p) => p.slug === item.slug);
      return p
        ? [
            `${item.quantity} × ${p.name} — ${money(p.price_pence)} each; ${money(p.price_pence * item.quantity)}`,
          ]
        : [];
    }),
    "",
    `Indicative total: ${money(cartTotal(items, products))}`,
    "Could you confirm availability, final pricing and how to proceed? Thank you!",
    "All prices are indicative. This is an independent concept demo.",
    `Demo: ${demoUrl}`,
  ].join("\n");
}
export function whatsappUrl(
  number: string | undefined,
  items: CartItem[],
  products: Product[],
  demoUrl: string,
) {
  if (!number || !/^[1-9]\d{6,14}$/.test(number) || !items.length) return null;
  return `https://wa.me/${number}?${new URLSearchParams({ text: enquiryMessage(items, products, demoUrl) })}`;
}
