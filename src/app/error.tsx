"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section empty">
      <h1>The collection could not load.</h1>
      <p>Please try again in a moment.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
