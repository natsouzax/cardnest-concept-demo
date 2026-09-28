import Image from "next/image";
import Link from "next/link";
import { money, type Product } from "@/lib/products";
import { productArt } from "@/lib/product-art";
export function ProductVisual({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const suppliedImage = Boolean(product.image_path);
  return (
    <div
      className={`product-visual ${large ? "large" : ""} ${suppliedImage ? "has-product-image" : ""}`}
    >
      <Image
        src={product.image_path ?? productArt(product.slug)}
        alt={
          suppliedImage
            ? `Product image of ${product.name}; packaging may differ`
            : `Original concept illustration of ${product.name}; packaging may differ`
        }
        width={760}
        height={720}
        loading={large ? "eager" : "lazy"}
        sizes={
          large
            ? "(max-width: 700px) 100vw, 50vw"
            : "(max-width: 700px) 100vw, 33vw"
        }
      />
      <span>
        {suppliedImage
          ? "Product image supplied for this demo · packaging may vary"
          : "Concept illustration · not a product photograph"}
      </span>
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={`/product/${product.slug}`}
        aria-label={`View ${product.name}`}
      >
        <ProductVisual product={product} />
      </Link>
      <div className="card-body">
        <p className="eyebrow">{product.category}</p>
        <h3>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="muted">
          {product.pack_count
            ? `${product.category === "Binder Collections" ? "9-pocket binder · " : ""}${product.pack_count} packs`
            : "Contents to be confirmed"}
        </p>
        <div className="price-row">
          <strong>{money(product.price_pence)}</strong>
          <Link
            href={`/product/${product.slug}`}
            aria-label={`Explore ${product.name}`}
          >
            Explore <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <small>Indicative price</small>
      </div>
    </article>
  );
}
