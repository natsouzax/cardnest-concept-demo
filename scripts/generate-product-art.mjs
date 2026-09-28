import { mkdirSync, writeFileSync } from "node:fs";

// Original, generic format illustrations. They do not reproduce product packaging.
const items = [
  {
    slug: "151-booster-bundle",
    title: ["SCARLET &", "VIOLET · 151"],
    kind: "bundle",
    label: "6 PACK BUNDLE",
    primary: "#bd1725",
    secondary: "#f4be78",
    backdrop: "#fff1ec",
  },
  {
    slug: "black-bolt-booster-bundle",
    title: ["BLACK", "BOLT"],
    kind: "bundle",
    label: "6 PACK BUNDLE",
    primary: "#23233c",
    secondary: "#e73940",
    backdrop: "#f0f0f8",
  },
  {
    slug: "30th-celebration-binder-collection",
    title: ["30TH", "CELEBRATION"],
    kind: "binder",
    label: "9-POCKET BINDER + 5 PACKS",
    primary: "#a51e3e",
    secondary: "#f2b867",
    backdrop: "#fff0eb",
  },
];

const seal = `<g opacity=".92"><circle cx="0" cy="0" r="43" fill="none" stroke="#ffffff" stroke-width="3"/><circle cx="0" cy="0" r="26" fill="none" stroke="#ffffff" stroke-width="2"/><path d="M-43 0H43M0-43V43" stroke="#ffffff" stroke-width="2"/><circle r="9" fill="#ffffff"/></g>`;
const xmlText = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const pack = (x, y, rotation, number, primary, secondary) =>
  `<g transform="translate(${x} ${y}) rotate(${rotation} 60 118)" filter="url(#shadow)"><rect x="4" y="5" width="120" height="236" rx="12" fill="#ffffff"/><rect x="10" y="12" width="108" height="221" rx="9" fill="${primary}"/><path d="M10 35H118M10 208H118" stroke="${secondary}" stroke-width="13"/><path d="M20 46Q65 12 108 55L108 170Q62 225 20 165Z" fill="${secondary}" opacity=".3"/><g transform="translate(64 116) scale(.54)">${seal}</g><text x="64" y="198" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">PACK ${number}</text></g>`;
function subject(item) {
  const { primary, secondary } = item;
  if (item.kind === "bundle")
    return `<g transform="translate(0 20)">${pack(128, 202, -18, "01", primary, secondary)}${pack(280, 166, -5, "02", primary, secondary)}${pack(430, 202, 16, "03", primary, secondary)}</g><g transform="translate(635 520)"><circle r="48" fill="${primary}"/><text text-anchor="middle" y="9" fill="#fff" font-size="31" font-weight="800" font-family="Arial,sans-serif">×6</text></g>`;
  if (item.kind === "binder")
    return `<g filter="url(#shadow)"><rect x="130" y="166" width="325" height="430" rx="24" fill="${primary}"/><rect x="154" y="186" width="276" height="390" rx="14" fill="${secondary}" opacity=".65"/><rect x="167" y="202" width="251" height="360" rx="9" fill="#fff9f4"/><path d="M174 328H410M174 444H410M252 209V555M332 209V555" stroke="${primary}" stroke-width="5" opacity=".45"/><circle cx="292" cy="386" r="52" fill="${primary}"/><g transform="translate(292 386)">${seal}</g><rect x="446" y="254" width="17" height="285" rx="7" fill="#f6d6ce"/></g>${pack(440, 250, 10, "01", primary, secondary)}${pack(502, 292, 17, "02", primary, secondary)}`;
  if (item.kind === "collection")
    return `<g filter="url(#shadow)"><rect x="118" y="186" width="524" height="362" rx="26" fill="${primary}"/><rect x="139" y="207" width="482" height="320" rx="18" fill="#fff"/><rect x="157" y="223" width="446" height="275" rx="8" fill="${secondary}" opacity=".32"/><g transform="translate(273 270)">${seal}</g><g transform="translate(477 270)">${seal}</g><rect x="187" y="260" width="173" height="205" rx="13" fill="${primary}"/><rect x="399" y="260" width="173" height="205" rx="13" fill="${primary}"/><g transform="translate(274 358)">${seal}</g><g transform="translate(485 358)">${seal}</g><rect x="118" y="512" width="524" height="36" rx="12" fill="${primary}"/></g>`;
  if (item.kind === "boosterBox")
    return `<g filter="url(#shadow)"><path d="M136 314L576 263L638 322L199 380Z" fill="${secondary}"/><path d="M199 380L638 322L630 528L193 571Z" fill="${primary}"/><path d="M136 314L199 380L193 571L129 509Z" fill="${primary}" opacity=".82"/><path d="M210 395L620 342L617 510L206 553Z" fill="${secondary}" opacity=".26"/></g>${pack(205, 133, -8, "01", primary, secondary)}${pack(325, 116, 0, "02", primary, secondary)}${pack(443, 135, 8, "03", primary, secondary)}<text x="400" y="508" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="34" font-weight="900" letter-spacing="5">36 PACKS</text>`;
  return `<g filter="url(#shadow)"><path d="M166 230L526 211L593 265L231 286Z" fill="${secondary}"/><path d="M231 286L593 265L591 549L226 572Z" fill="${primary}"/><path d="M166 230L231 286L226 572L161 518Z" fill="${primary}" opacity=".75"/><path d="M261 311L562 293L560 520L258 538Z" fill="none" stroke="${secondary}" stroke-width="5"/><g transform="translate(411 416) scale(1.45)">${seal}</g><text x="407" y="504" text-anchor="middle" fill="#fff" font-size="17" font-family="Arial,sans-serif" letter-spacing="4">TRAINER BOX</text></g>`;
}
function artwork(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of ${xmlText(item.label.toLowerCase())}" viewBox="0 0 760 720"><defs><filter id="shadow" x="-30%" y="-30%" width="170%" height="170%"><feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#32151b" flood-opacity=".2"/></filter><radialGradient id="glow"><stop stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="${item.backdrop}"/></radialGradient></defs><rect width="760" height="720" rx="30" fill="${item.backdrop}"/><circle cx="380" cy="350" r="286" fill="url(#glow)"/><circle cx="660" cy="102" r="116" fill="${item.secondary}" opacity=".17"/><circle cx="92" cy="552" r="88" fill="${item.primary}" opacity=".09"/><path d="M28 618C196 592 535 655 737 591" fill="none" stroke="${item.primary}" stroke-width="2" opacity=".15"/>${subject(item)}<rect x="38" y="35" width="6" height="69" rx="3" fill="${item.primary}"/><text x="62" y="58" font-family="Arial,sans-serif" font-weight="800" font-size="17" fill="${item.primary}" letter-spacing="3">${xmlText(item.title[0])}</text><text x="62" y="85" font-family="Arial,sans-serif" font-weight="800" font-size="17" fill="${item.primary}" letter-spacing="3">${xmlText(item.title[1])}</text><text x="48" y="671" font-family="Arial,sans-serif" font-weight="800" font-size="18" fill="${item.primary}" letter-spacing="3">${xmlText(item.label)}</text><text x="713" y="671" text-anchor="end" font-family="Arial,sans-serif" font-size="12" fill="${item.primary}" letter-spacing="1">CONCEPT ART</text></svg>`;
}
mkdirSync(new URL("../public/products/", import.meta.url), { recursive: true });
for (const item of items)
  writeFileSync(
    new URL(`../public/products/${item.slug}.svg`, import.meta.url),
    artwork(item),
  );
