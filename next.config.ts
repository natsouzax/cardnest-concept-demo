import type { NextConfig } from "next";
const config: NextConfig = {
  agentRules: false,
  devIndicators: false,
  distDir: process.env.DEMO_TEST_BUILD_DIR || ".next",
};
export default config;
