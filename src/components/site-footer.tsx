import Link from "next/link";

const groups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "The collection", href: "/shop" },
      { label: "Demo cart", href: "/cart" },
    ],
  },
  {
    title: "The concept",
    links: [
      { label: "About this demo", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Questions & answers", href: "/faq" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Contact & enquiries", href: "/contact" },
      { label: "Browser data", href: "/data-and-privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-intro">
            <Link className="wordmark" href="/">
              cardnest<span>AN INDEPENDENT CONCEPT</span>
            </Link>
            <p>
              A small, collector-focused storefront demo. Explore three
              products, save a local selection and see how an enquiry could
              begin.
            </p>
            <Link className="footer-cta" href="/shop">
              Explore the collection <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {groups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            Independent concept demo. No affiliation, real orders or payments.
          </p>
          <p>Product prices and availability need confirmation.</p>
        </div>
      </div>
    </footer>
  );
}
