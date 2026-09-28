import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Questions & answers",
  description:
    "Answers about prices, availability, the local cart and WhatsApp in this independent concept demo.",
};

const questions = [
  {
    question: "Is this the official Cardnest TCG store?",
    answer:
      "No. This is an independent concept demo. It is not affiliated with Cardnest TCG and does not accept real orders.",
  },
  {
    question: "Can I buy or reserve a product here?",
    answer:
      "No. The cart is a local shortlist only. There is no checkout, payment, stock reservation or order confirmation.",
  },
  {
    question: "Are prices and availability current?",
    answer:
      "Prices are indicative references in GBP. Availability and final pricing are unconfirmed and must be checked with the retailer.",
  },
  {
    question: "What does the WhatsApp button do?",
    answer:
      "When an authorised destination is configured, it opens WhatsApp with a draft containing your selected items and an explicit demo disclaimer. You decide whether to send it. Without a destination, the button stays disabled.",
  },
  {
    question: "Does the demo keep my cart or personal details?",
    answer:
      "It stores only product identifiers and quantities in this browser so the cart survives a reload. It has no account or contact form and does not collect your name, address or payment details.",
  },
  {
    question: "Are the product images final?",
    answer:
      "The three images were supplied for this private demo. Exact packaging and variants should be confirmed before a real purchase or public presentation.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <p className="eyebrow">GOOD TO KNOW</p>
        <h1>Questions & answers.</h1>
        <p>Clear answers about what this concept can and cannot do.</p>
      </section>
      <section className="faq-list" aria-label="Frequently asked questions">
        {questions.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
      <section className="info-callout">
        <div>
          <p className="eyebrow">MORE CONTEXT</p>
          <h2>Why this demo exists.</h2>
          <p>Read the idea behind the experience and its boundaries.</p>
        </div>
        <Link className="button" href="/about">
          About this demo <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
