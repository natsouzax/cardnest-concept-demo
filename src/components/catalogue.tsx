"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";
export function Catalogue({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (category === "All products" || p.category === category),
  );
  return (
    <>
      <div className="filters">
        <div className="filters-heading">
          <div>
            <p className="filters-kicker">THE COLLECTOR&apos;S INDEX / 001</p>
            <h2>Find your next favourite.</h2>
          </div>
          <p className="filters-count" role="status">
            <span>{String(filtered.length).padStart(2, "0")}</span>
            {filtered.length === 1 ? " product" : " products"} in this selection
          </p>
        </div>
        <div className="filters-controls">
          <label className="filter-field filter-search">
            <span className="filter-label">Search by name</span>
            <span className="filter-input-wrap">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="10.8"
                  cy="10.8"
                  r="6.3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m15.5 15.5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                placeholder="Search Pokémon, sets or formats…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </span>
          </label>
          <label className="filter-field filter-category">
            <span className="filter-label">Category</span>
            <span className="filter-select-wrap">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {[
                  "All products",
                  ...new Set(products.map((p) => p.category)),
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <h2>No matching products</h2>
          <p>Try another name or explore all categories.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All products");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
