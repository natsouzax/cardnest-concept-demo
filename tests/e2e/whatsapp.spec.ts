import { test, expect } from "@playwright/test";
import seed from "../../data/products.seed.json";
test("explicit click opens only an encoded draft with the current selection", async ({
  page,
}) => {
  // Capture window.open: do not contact WhatsApp, even in this configured test.
  await page.addInitScript(() => {
    const captured: string[] = [];
    Object.defineProperty(window, "__openedUrls", { value: captured });
    window.open = (url) => {
      captured.push(String(url));
      return null;
    };
  });
  await page.goto(`/product/${seed[0].slug}`);
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "Review your cart" }).click();
  await page
    .getByRole("button", {
      name: `Increase quantity of ${seed[0].name}`,
      exact: true,
    })
    .click();
  const cta = page.getByRole("button", { name: "Enquire on WhatsApp" });
  await expect(cta).toBeEnabled();
  expect(
    await page.evaluate(() => Reflect.get(window, "__openedUrls")),
  ).toEqual([]);
  await cta.click();
  const opened: string[] = await page.evaluate(() =>
    Reflect.get(window, "__openedUrls"),
  );
  expect(opened).toHaveLength(1);
  const url = new URL(opened[0]);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/447700900000");
  expect(url.searchParams.get("text")).toContain(
    "Demo enquiry — no order has been placed. Please confirm availability and final pricing.",
  );
  expect(url.searchParams.get("text")).toContain(
    `2 × ${seed[0].name} — £45.00 each; £90.00`,
  );
  expect(url.searchParams.get("text")).toContain("Indicative total: £90.00");
  expect(url.searchParams.get("text")).toContain(
    "I'm interested in buying the following products",
  );
  expect(url.searchParams.get("text")).toContain("how to proceed? Thank you!");
  expect(url.searchParams.get("text")).toContain("Demo: http://127.0.0.1:3001");
  await expect(page.locator(".total strong")).toHaveText("£90.00");
});
