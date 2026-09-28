"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { money, type Product } from "@/lib/products";
import { cartTotal } from "@/lib/cart";
import { whatsappUrl } from "@/lib/whatsapp";
export function CartView({ products }: { products: Product[] }) {
  const { items, ready, warning, change } = useCart();
  const number = process.env.NEXT_PUBLIC_SALES_WHATSAPP;
  const enabled = Boolean(number && /^[1-9]\d{6,14}$/.test(number));
  if (!ready) return <p role="status">Loading your saved selection…</p>;
  return (
    <>
      {warning && <p role="status">{warning}</p>}
      {!items.length ? (
        <div className="empty">
          <h2>A little room for discovery.</h2>
          <p>
            Your demo cart is empty. Explore the collection to start your wish
            list.
          </p>
          <Link className="button" href="/shop">
            Explore the collection ↗
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {items.map((item) => {
              const p = products.find((p) => p.slug === item.slug);
              if (!p) return null;
              return (
                <article className="cart-item" key={item.slug}>
                  <div>
                    <p className="eyebrow">{p.category}</p>
                    <h2>
                      <Link href={`/product/${p.slug}`}>{p.name}</Link>
                    </h2>
                    <p>{money(p.price_pence)} each · indicative</p>
                    <button
                      className="remove"
                      onClick={() => change(p.slug, 0)}
                      aria-label={`Remove ${p.name}`}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="quantity">
                    <button
                      aria-label={`Decrease quantity of ${p.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() => change(p.slug, item.quantity - 1)}
                    >
                      −
                    </button>
                    <label>
                      <span className="sr-only">Quantity of {p.name}</span>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e) => {
                          const q = Number(e.target.value);
                          if (q >= 1) change(p.slug, q);
                        }}
                      />
                    </label>
                    <button
                      aria-label={`Increase quantity of ${p.name}`}
                      disabled={item.quantity >= 99}
                      onClick={() => change(p.slug, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <strong>{money(p.price_pence * item.quantity)}</strong>
                </article>
              );
            })}
            <Link className="text-link" href="/shop">
              ← Continue exploring
            </Link>
          </div>
          <aside className="cart-summary">
            <p className="eyebrow">AT A GLANCE</p>
            <h2>Your selection</h2>
            <div className="total">
              <span>Indicative total</span>
              <strong>{money(cartTotal(items, products))}</strong>
            </div>
            <p>
              Availability and final pricing need confirmation. No order has
              been placed.
            </p>
            <button
              className="button"
              disabled={!enabled}
              onClick={() => {
                const url = whatsappUrl(
                  number,
                  items,
                  products,
                  window.location.origin,
                );
                if (url) window.open(url, "_blank", "noopener,noreferrer");
              }}
            >
              Enquire on WhatsApp ↗
            </button>
            <p className="muted">
              {enabled
                ? "Opens WhatsApp with a draft. You choose whether to send it."
                : "Demo enquiries are disabled: no valid authorised WhatsApp number is configured."}
            </p>
            <small>Independent concept demo. No real orders or payments.</small>
          </aside>
        </div>
      )}
    </>
  );
}
