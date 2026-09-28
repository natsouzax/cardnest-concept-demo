import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How the demo works",
  description:
    "Browse three products, save a local cart and optionally open a WhatsApp enquiry draft.",
};

const steps = [
  {
    number: "01",
    title: "Explore the collection",
    text: "Browse three products, search by name or filter by category. Open a product page for its short description and indicative GBP price.",
  },
  {
    number: "02",
    title: "Build a demo cart",
    text: "Add items, change quantities and review the total. The selection stays in this browser and does not reserve stock or place an order.",
  },
  {
    number: "03",
    title: "Open an enquiry draft",
    text: "If an authorised WhatsApp destination is configured, the button opens a pre-filled message. Nothing is sent until you choose to send it in WhatsApp.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <p className="eyebrow">THE DEMO JOURNEY</p>
        <h1>Three steps. No checkout.</h1>
        <p>
          This site is a way to explore products and prepare a question. It
          never completes a purchase.
        </p>
      </section>
      <section className="process-list" aria-label="How the demo works">
        {steps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="info-callout">
        <div>
          <p className="eyebrow">READY TO BROWSE?</p>
          <h2>Start with the collection.</h2>
          <p>Prices and availability still need confirmation.</p>
        </div>
        <Link className="button" href="/shop">
          View products <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
