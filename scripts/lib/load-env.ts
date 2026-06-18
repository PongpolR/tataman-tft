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

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env.local or .env`);
    process.exit(1);
  }
  return value;
}
