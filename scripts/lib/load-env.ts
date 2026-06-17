import { config } from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

export function loadEnv() {
  const root = process.cwd();
  const envPath = resolve(root, ".env");
  const envLocalPath = resolve(root, ".env.local");

  if (existsSync(envPath)) {
    config({ path: envPath });
  }

  if (existsSync(envLocalPath)) {
    config({ path: envLocalPath, override: true });
  }
}
