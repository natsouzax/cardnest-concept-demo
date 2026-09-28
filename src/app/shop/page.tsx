import { products } from "@/lib/repository";
import { Catalogue } from "@/components/catalogue";
export const metadata = { title: "The collection" };
export default async function Shop() {
  return (
    <section className="section">
      <p className="eyebrow">FIND YOUR NEXT FAVOURITE</p>
      <h1>The collection.</h1>
      <p className="intro">
        Three Pokémon TCG products to explore. Indicative prices; availability
        to be confirmed.
      </p>
      <Catalogue products={await products.list()} />
    </section>
  );
}
