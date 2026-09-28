"use client";
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en-GB">
      <body style={{ fontFamily: "sans-serif", padding: 32 }}>
        <p>
          Independent concept demo — not the official Cardnest TCG store. No
          real orders or payments.
        </p>
        <h1>The collection could not load.</h1>
        <p>Please check the catalogue configuration and try again.</p>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
