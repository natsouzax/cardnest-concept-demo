import Link from "next/link";
import { notFound } from "next/navigation";
import { money, summary } from "@/lib/products";
import { products } from "@/lib/repository";
import { ProductVisual } from "@/components/product-card";
import { AddToCart } from "@/components/cart-provider";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await products.find((await params).slug);
  return {
    title: p?.name ?? "Product not found",
    description: p ? summary(p) : undefined,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await products.find((await params).slug);
  if (!p) notFound();
  return (
    <section className="section">
      <Link className="back" href="/shop">
        ← Back to the collection
      </Link>
      <div className="product-detail">
        <ProductVisual product={p} large />
        <div>
          <p className="eyebrow">{p.category}</p>
          <h1>{p.name}</h1>
          <p className="intro">{summary(p)}</p>
          <p className="detail-price">
            {money(p.price_pence)} <small>Indicative price</small>
          </p>
          <dl>
            <div>
              <dt>Expansion</dt>
              <dd>{p.set_name ?? "Not confirmed"}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{p.category}</dd>
            </div>
            <div>
              <dt>Packs</dt>
              <dd>{p.pack_count ?? "Not confirmed"}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>Not independently verified</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>Please confirm with the seller</dd>
            </div>
          </dl>
          <AddToCart product={p} />
          <Link className="text-link" href="/cart">
            Review your cart →
          </Link>
          <p className="muted">
            Demo selection only. No order or stock reservation.
          </p>
          {p.source_url && (
            <a
              className="text-link"
              href={p.source_url}
              target="_blank"
              rel="noreferrer"
            >
              View public product source ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
