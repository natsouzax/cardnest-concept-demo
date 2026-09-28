const illustrationSlugs = new Set([
  "151-booster-bundle",
  "black-bolt-booster-bundle",
  "30th-celebration-binder-collection",
]);

export function productArt(slug: string) {
  return illustrationSlugs.has(slug)
    ? `/products/${slug}.svg`
    : "/product-placeholder.svg";
}
