"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { CART_KEY, readCart, setQuantity, type CartItem } from "@/lib/cart";
import type { Product } from "@/lib/products";
const Context = createContext<{
  items: CartItem[];
  ready: boolean;
  warning: string;
  change: (slug: string, quantity: number) => void;
}>({ items: [], ready: false, warning: "", change: () => {} });
const emptySnapshot = { items: [] as CartItem[], ready: false, warning: "" };
function createCartStore(products: Product[]) {
  let snapshot = emptySnapshot;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());
  function restore() {
    try {
      snapshot = {
        items: readCart(localStorage.getItem(CART_KEY), products),
        ready: true,
        warning: "",
      };
    } catch {
      snapshot = {
        ...snapshot,
        ready: true,
        warning:
          "Browser storage is unavailable. Your selection will last for this visit only.",
      };
    }
    notify();
  }
  return {
    getSnapshot: () => snapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!snapshot.ready) restore();
      const onStorage = (event: StorageEvent) => {
        if (event.key === CART_KEY || event.key === null) restore();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    change(slug: string, quantity: number) {
      if (!snapshot.ready || !products.some((p) => p.slug === slug)) return;
      const items = setQuantity(snapshot.items, slug, quantity);
      let warning = snapshot.warning;
      try {
        localStorage.setItem(CART_KEY, JSON.stringify({ version: 1, items }));
        warning = "";
      } catch {
        warning = "Your selection could not be saved in this browser.";
      }
      snapshot = { items, ready: true, warning };
      notify();
    },
  };
}
export function CartProvider({
  children,
  products,
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  const store = useMemo(() => createCartStore(products), [products]);
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => emptySnapshot,
  );
  return (
    <Context.Provider value={{ ...snapshot, change: store.change }}>
      {children}
    </Context.Provider>
  );
}
export const useCart = () => useContext(Context);
export function CartCount() {
  const { items } = useCart();
  return (
    <span className="cart-count">
      {items.reduce((n, item) => n + item.quantity, 0)}
    </span>
  );
}
export function AddToCart({ product }: { product: Product }) {
  const { items, ready, change } = useCart();
  const [added, setAdded] = useState(false);
  const quantity =
    items.find((item) => item.slug === product.slug)?.quantity ?? 0;
  return (
    <>
      <button
        className="button"
        disabled={!ready || quantity >= 99}
        onClick={() => {
          change(product.slug, quantity + 1);
          setAdded(true);
        }}
      >
        Add to cart <span aria-hidden="true">+</span>
      </button>
      <span className="feedback" role="status">
        {added ? "Added to your demo cart." : ""}
      </span>
    </>
  );
}
