import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section empty">
      <h1>Nothing here just yet.</h1>
      <p>This product is not part of the demo collection.</p>
      <Link className="button" href="/shop">
        Explore the collection
      </Link>
    </section>
  );
}
