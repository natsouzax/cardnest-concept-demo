import type { Metadata } from "next";
import { products } from "@/lib/repository";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Cardnest · Independent concept demo",
    template: "%s · Cardnest concept demo",
  },
  description:
    "An independent Pokémon TCG catalogue concept. No real orders or payments.",
  robots: { index: false, follow: false },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>
        <CartProvider products={await products.list()}>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
