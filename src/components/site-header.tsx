"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartCount } from "@/components/cart-provider";

const navigation = [
  { label: "Home", href: "/", priority: true },
  { label: "The collection", href: "/shop", priority: true },
  { label: "About the demo", href: "/about", priority: false },
  { label: "FAQ", href: "/faq", priority: false },
] as const;

function AccountIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c.4-3.5 3-5.5 7-5.5s6.6 2 7 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M2.5 4h2.2l2.1 10.1a2 2 0 0 0 2 1.6h9.4a2 2 0 0 0 1.9-1.5L21.8 7H5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.4" cy="20" r="1.2" fill="currentColor" />
      <circle cx="18" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setCompact((previous) => (previous ? y >= 10 : y > 36));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && !accountOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, accountOpen]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;
  const closePanels = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  return (
    <>
      <header className={`site-header${compact ? " is-compact" : ""}`}>
        <div className="demo-banner">
          Independent concept demo — not the official Cardnest TCG store
          <span> · No real orders or payments</span>
        </div>
        <div className="header-inner">
          <div className="header-row">
            <Link
              className="wordmark header-wordmark"
              href="/"
              onClick={closePanels}
            >
              cardnest<span>TCG / CONCEPT</span>
            </Link>

            <nav className="desktop-nav" aria-label="Main navigation">
              <ul>
                {navigation.map((item, index) => (
                  <li
                    key={item.href}
                    className={item.priority ? "nav-priority" : "nav-secondary"}
                    style={{ animationDelay: `${index * 75}ms` }}
                    aria-hidden={!item.priority && compact ? true : undefined}
                  >
                    <Link
                      href={item.href}
                      aria-current={active(item.href) ? "page" : undefined}
                      tabIndex={!item.priority && compact ? -1 : undefined}
                      onClick={closePanels}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <div className="account-wrap">
                <button
                  className="account-button"
                  type="button"
                  aria-label="Account information"
                  aria-expanded={accountOpen}
                  onClick={() => {
                    setMenuOpen(false);
                    setAccountOpen((open) => !open);
                  }}
                >
                  <AccountIcon />
                  <span>Account</span>
                </button>
                {accountOpen && (
                  <p className="account-note" id="account-note" role="status">
                    Accounts are not available in this independent demo.
                  </p>
                )}
              </div>
              <Link
                className="header-cart"
                href="/cart"
                aria-current={pathname === "/cart" ? "page" : undefined}
                onClick={closePanels}
              >
                <CartIcon />
                <span className="cart-label">Cart</span>
                <CartCount />
              </Link>
              <Link className="header-cta" href="/shop" onClick={closePanels}>
                Explore <span aria-hidden="true">↗</span>
              </Link>
              <button
                className={`menu-toggle${menuOpen ? " is-open" : ""}`}
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-navigation"
                aria-expanded={menuOpen}
                onClick={() => {
                  setAccountOpen(false);
                  setMenuOpen((open) => !open);
                }}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
          <div
            className={`mobile-menu${menuOpen ? " is-open" : ""}`}
            id="mobile-navigation"
            inert={!menuOpen}
          >
            <div className="mobile-menu-content">
              <nav aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active(item.href) ? "page" : undefined}
                    onClick={closePanels}
                  >
                    {item.label} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </nav>
              <p>Browse locally. No account or real orders are required.</p>
            </div>
          </div>
        </div>
      </header>
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
}
