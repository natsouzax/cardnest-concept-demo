import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About this demo",
  description:
    "What the independent Cardnest TCG concept demonstrates, and what remains outside its scope.",
};

export default function AboutPage() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <p className="eyebrow">THE IDEA BEHIND THE SITE</p>
        <h1>Made to explore. Clear about its limits.</h1>
        <p>
          This is an independent concept for a small Pokémon TCG storefront. It
          uses three product references to show a clearer path from discovery to
          an enquiry. It is not the official Cardnest TCG store.
        </p>
      </section>
      <section className="info-section" aria-labelledby="about-purpose">
        <div>
          <p className="eyebrow">THE PURPOSE</p>
          <h2 id="about-purpose">A better first look.</h2>
        </div>
        <div className="info-prose">
          <p>
            The demo brings a focused catalogue, product images, short facts and
            prices in GBP into one responsive experience. Search and category
            filters help visitors find a format; the local cart keeps a
            shortlist without creating an order.
          </p>
          <p>
            Product details and prices are indicative. Availability, exact
            contents and packaging must be confirmed before any real purchase.
          </p>
        </div>
      </section>
      <section className="info-tile-grid" aria-label="Demo scope">
        <article className="info-tile">
          <span>IN THE DEMO</span>
          <h2>Explore and compare.</h2>
          <p>
            Three product pages, a searchable collection and a browser-based
            cart.
          </p>
        </article>
        <article className="info-tile">
          <span>OUTSIDE THE DEMO</span>
          <h2>No real transaction.</h2>
          <p>
            No account, payment, checkout, stock reservation or automatic
            message.
          </p>
        </article>
      </section>
      <section className="info-callout">
        <div>
          <p className="eyebrow">NEXT STEP</p>
          <h2>See how the journey works.</h2>
          <p>
            Follow the path from the catalogue to an optional WhatsApp draft.
          </p>
        </div>
        <Link className="button" href="/how-it-works">
          How it works <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
