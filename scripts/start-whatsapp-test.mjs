import { spawn } from "node:child_process";
// Isolated test server only. This synthetic destination is never a demo default.
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "dev",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3001",
  ],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PRODUCT_SOURCE: "local",
      NEXT_PUBLIC_SALES_WHATSAPP: "447700900000",
      DEMO_TEST_BUILD_DIR: ".next-whatsapp",
    },
  },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill());
child.on("exit", (code) => process.exit(code ?? 0));
