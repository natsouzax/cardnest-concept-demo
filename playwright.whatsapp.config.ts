import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "whatsapp.spec.ts",
  use: { baseURL: "http://127.0.0.1:3001" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "node scripts/start-whatsapp-test.mjs",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
