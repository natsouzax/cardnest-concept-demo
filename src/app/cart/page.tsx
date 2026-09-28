import { products } from "@/lib/repository";
import { CartView } from "@/components/cart-view";
export const metadata = { title: "Your demo cart" };
export default async function CartPage() {
  return (
    <section className="section">
      <p className="eyebrow">YOUR COLLECTING WISH LIST</p>
      <h1>Your demo cart.</h1>
      <CartView products={await products.list()} />
    </section>
  );
}
