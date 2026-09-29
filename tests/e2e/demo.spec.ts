import { test, expect } from "@playwright/test";
import seed from "../../data/products.seed.json";
test("complete local discovery and cart journey", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByText(
      "Independent concept demo — not the official Cardnest TCG store",
    ),
  ).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Explore the collection ↗", exact: true })
    .first()
    .click();
  await page.getByLabel("Search by name").fill("booster bundle");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Category").selectOption("Booster Bundles");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Search by name").fill("black bolt");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Search by name").fill("does not exist");
  await expect(
    page.getByRole("heading", { name: "No matching products" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  const images = page.locator(".product-card img");
  await expect(images).toHaveCount(3);
  const sources: string[] = [];
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    sources.push((await image.getAttribute("src")) ?? "");
  }
  expect(new Set(sources).size).toBe(3);
  for (const product of seed) {
    expect(
      sources.some((source) =>
        decodeURIComponent(source).includes(product.image_path),
      ),
    ).toBe(true);
  }
  for (const product of seed) {
    await page.goto(`/product/${product.slug}`);
    await expect(
      page.getByRole("heading", { name: product.name, exact: true }),
    ).toBeVisible();
    await expect(page).toHaveTitle(
      new RegExp(product.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
    await expect(page.getByText("Not independently verified")).toBeVisible();
  }
  await page.goto(`/product/${seed[0].slug}`);
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByRole("status")).toHaveText("Added to your demo cart.");
  await page.getByRole("link", { name: "Review your cart" }).click();
  await page
    .getByRole("button", {
      name: `Increase quantity of ${seed[0].name}`,
      exact: true,
    })
    .click();
  await expect(page.locator(".total strong")).toHaveText("£90.00");
  await page.reload();
  await expect(page.getByRole("spinbutton")).toHaveValue("2");
  await expect(
    page.getByRole("button", { name: "Enquire on WhatsApp" }),
  ).toBeVisible();
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await page.screenshot({
    path: `test-results/cart-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", {
      name: `Decrease quantity of ${seed[0].name}`,
      exact: true,
    })
    .click();
  await expect(page.locator(".total strong")).toHaveText("£45.00");
  await page
    .getByRole("button", { name: `Remove ${seed[0].name}`, exact: true })
    .click();
  await expect(
    page.getByText("Your demo cart is empty.", { exact: false }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("Your demo cart is empty.", { exact: false }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("corrupt storage and missing product recover safely", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("cardnest-demo-cart-v1", "{broken"),
  );
  await page.goto("/cart");
  await expect(
    page.getByText("Your demo cart is empty.", { exact: false }),
  ).toBeVisible();
  const response = await page.goto("/product/not-a-product");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Nothing here just yet." }),
  ).toBeVisible();
});

test("header compacts smoothly and mobile navigation keeps the routes accessible", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await expect(header).not.toHaveClass(/is-compact/);
  const cartLabel = header.locator(".cart-label");
  await expect
    .poll(() =>
      cartLabel.evaluate((element) => element.getBoundingClientRect().width),
    )
    .toBeGreaterThan(1);
  await expect(page.locator(".demo-banner")).toBeVisible();
  const bannerWidth = await page
    .locator(".demo-banner")
    .evaluate((element) => element.getBoundingClientRect().width);
  expect(bannerWidth).toBeGreaterThan(page.viewportSize()!.width - 30);
  await expect(
    page.getByRole("link", { name: "The collection" }).first(),
  ).toHaveAttribute("href", "/shop");
  await page.evaluate(() => window.scrollTo(0, 50));
  await expect(header).toHaveClass(/is-compact/);
  await expect
    .poll(() =>
      cartLabel.evaluate((element) => element.getBoundingClientRect().width),
    )
    .toBeLessThan(1);
  if (testInfo.project.name === "desktop") {
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "About the demo", includeHidden: true }),
    ).toBeHidden();
  }
  await page.evaluate(() => window.scrollTo(0, 20));
  await expect(header).toHaveClass(/is-compact/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).not.toHaveClass(/is-compact/);
  await expect
    .poll(() =>
      cartLabel.evaluate((element) => element.getBoundingClientRect().width),
    )
    .toBeGreaterThan(1);

  await page.getByRole("button", { name: "Account information" }).click();
  await expect(
    page.getByText("Accounts are not available in this independent demo."),
  ).toBeVisible();

  if (testInfo.project.name === "mobile") {
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(
      page.getByText("Accounts are not available in this independent demo."),
    ).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Close menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link"),
    ).toHaveCount(4);
    await page.waitForTimeout(550);
    await page.screenshot({ path: "test-results/header-menu-mobile.png" });
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: /The collection/ })
      .click();
    await expect(page).toHaveURL(/\/shop$/);
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
    await page.setViewportSize({ width: 320, height: 720 });
    await expect(page.getByRole("link", { name: /^Cart/ })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  } else {
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "About the demo" }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "Home" }),
    ).toHaveAttribute("aria-current", "page");
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "The collection" })
      .click();
    await expect(page).toHaveURL(/\/shop$/);
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: "The collection" }),
    ).toHaveAttribute("aria-current", "page");
  }
});

test("descriptive pages and footer navigation explain the demo", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "From first look to first question." }),
  ).toBeVisible();
  const footer = page.getByRole("navigation", { name: "Footer navigation" });
  await expect(footer.getByRole("link")).toHaveCount(8);
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(550);
  await page.screenshot({
    path: `test-results/footer-${testInfo.project.name}.png`,
  });
  for (const [href, heading] of [
    ["/about", "Made to explore. Clear about its limits."],
    ["/how-it-works", "Three steps. No checkout."],
    ["/faq", "Questions & answers."],
    ["/contact", "Contact, without a checkout."],
    ["/data-and-privacy", "What this demo stores."],
  ]) {
    await page.goto(href);
    await expect(
      page.getByRole("heading", { name: heading, level: 1 }),
    ).toBeVisible();
    if (href === "/about")
      await page.screenshot({
        path: `test-results/about-${testInfo.project.name}.png`,
      });
    await expect(
      page.getByText("Independent concept demo", { exact: false }).first(),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/faq");
  await page.getByText("Can I buy or reserve a product here?").click();
  await expect(
    page.getByText("The cart is a local shortlist only", { exact: false }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
