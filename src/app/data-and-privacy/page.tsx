import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browser data",
  description:
    "What this independent demo stores in your browser and how external links work.",
};

export default function BrowserDataPage() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <p className="eyebrow">YOUR BROWSER, YOUR SELECTION</p>
        <h1>What this demo stores.</h1>
        <p>
          The cart is kept locally in your browser. This page explains that
          behaviour; it is not a policy for the official retailer.
        </p>
      </section>
      <section className="info-section" aria-labelledby="stored-data">
        <div>
          <p className="eyebrow">LOCAL STORAGE</p>
          <h2 id="stored-data">A small shortlist.</h2>
        </div>
        <div className="info-prose">
          <p>
            The demo stores product identifiers and quantities under the browser
            key <code>cardnest-demo-cart-v1</code>. Prices come from the
            catalogue when the cart is displayed. Remove items in the cart or
            clear this site&apos;s browser storage to remove the saved
            selection.
          </p>
          <p>
            There is no account, checkout or contact form. The demo does not ask
            for your name, address or payment details.
          </p>
        </div>
      </section>
      <section className="info-section" aria-labelledby="external-links">
        <div>
          <p className="eyebrow">LEAVING THE DEMO</p>
          <h2 id="external-links">External destinations.</h2>
        </div>
        <div className="info-prose">
          <p>
            Product source links open public retailer pages. If a WhatsApp
            destination is configured, clicking the enquiry button opens an
            external WhatsApp draft with your selected items; no message is sent
            automatically. External services have their own data practices.
          </p>
          <Link href="/faq">More questions & answers ↗</Link>
        </div>
      </section>
    </div>
  );
}
