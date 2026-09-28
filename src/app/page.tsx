import Link from "next/link";
import { products } from "@/lib/repository";
import { ProductCard, ProductVisual } from "@/components/product-card";
export default async function Home() {
  const selection = await products.list();
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">FOR THE JOY OF COLLECTING</p>
          <h1>
            Your next
            <br />
            <em>great discovery.</em>
          </h1>
          <p className="hero-copy">
            Explore a small selection of Pokémon TCG favourites. Find your
            format, build a wish list, and start a conversation.
          </p>
          <Link className="button" href="/shop">
            Explore the collection <span>↗</span>
          </Link>
          <p className="hero-note">
            Three products. A fresh perspective. An independent demo.
          </p>
        </div>
        <div className="hero-art">
          {selection[0] && <ProductVisual product={selection[0]} large />}
          <span className="art-caption">THE COLLECTION / 001—003</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A CURATED STARTING POINT</p>
            <h2>Small selection. Big possibilities.</h2>
          </div>
          <Link href="/shop">Browse all three ↗</Link>
        </div>
        <div className="product-grid">
          {selection.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="note" id="about-demo">
          <strong>A concept, made for exploring.</strong>
          <p>
            Prices are indicative and availability is unconfirmed. Your cart is
            a local wish list. A WhatsApp enquiry never places an order.
          </p>
        </div>
      </section>
      <section
        className="section home-steps"
        aria-labelledby="home-steps-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">A SIMPLE WAY TO EXPLORE</p>
            <h2 id="home-steps-title">From first look to first question.</h2>
          </div>
          <Link href="/how-it-works">How the demo works ↗</Link>
        </div>
        <div className="story-grid">
          <article className="story-card">
            <span>01 / DISCOVER</span>
            <h3>Find your format.</h3>
            <p>
              Search the three-product collection and compare concise details.
            </p>
          </article>
          <article className="story-card">
            <span>02 / COLLECT</span>
            <h3>Make a shortlist.</h3>
            <p>Keep quantities in a demo cart saved in this browser.</p>
          </article>
          <article className="story-card">
            <span>03 / ENQUIRE</span>
            <h3>Start a conversation.</h3>
            <p>
              Open a WhatsApp draft when a destination is configured. You decide
              whether to send it.
            </p>
          </article>
        </div>
      </section>
      <section
        className="section home-editorial"
        aria-labelledby="home-about-title"
      >
        <div className="home-editorial-art">
          {selection[2] && <ProductVisual product={selection[2]} large />}
        </div>
        <div>
          <p className="eyebrow">BEHIND THE CONCEPT</p>
          <h2 id="home-about-title">A collector-first idea, clearly a demo.</h2>
          <p>
            This independent prototype explores how a small trading-card
            catalogue could feel: easy to browse, clear about what is known and
            simple to discuss. It does not represent the official Cardnest TCG
            store or accept real orders.
          </p>
          <Link className="text-pill" href="/about">
            About this demo <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section
        className="section home-final"
        aria-labelledby="home-final-title"
      >
        <div>
          <p className="eyebrow">GOOD TO KNOW</p>
          <h2 id="home-final-title">Questions before you explore?</h2>
          <p>
            Read what this demo can do, what it cannot do and how its local cart
            works.
          </p>
        </div>
        <Link className="button" href="/faq">
          Read the FAQs <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
