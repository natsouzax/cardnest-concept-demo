import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & enquiries",
  description:
    "How enquiries work in the Cardnest concept demo, without a contact form or real orders.",
};

export default function ContactPage() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <p className="eyebrow">START A CONVERSATION</p>
        <h1>Contact, without a checkout.</h1>
        <p>
          This demo has no contact form or customer service inbox. It can
          prepare an optional WhatsApp enquiry draft from the items in your
          cart.
        </p>
      </section>
      <section className="info-tile-grid" aria-label="Enquiry options">
        <article className="info-tile">
          <span>IN THIS DEMO</span>
          <h2>Review a shortlist.</h2>
          <p>
            Add products to your local cart. If an authorised destination is
            configured, you can open a pre-filled WhatsApp draft. Sending it is
            always your choice.
          </p>
          <Link href="/cart">View demo cart ↗</Link>
        </article>
        <article className="info-tile">
          <span>FOR REAL PURCHASES</span>
          <h2>Check with the retailer.</h2>
          <p>
            This concept cannot confirm stock, final prices, delivery or
            returns. Each product page links to its public source listing for
            reference.
          </p>
          <Link href="/shop">See product pages ↗</Link>
        </article>
      </section>
    </div>
  );
}
