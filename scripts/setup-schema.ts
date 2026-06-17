/**
 * Apply supabase/schema.sql to the remote database.
 *
 * Requires DATABASE_URL in .env.local (or .env):
 * Supabase Dashboard → Project Settings → Database → Connection string (URI)
 *
 * Run: npm run setup-db
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";
import { loadEnv } from "./lib/load-env";

loadEnv();

function getDatabaseUrl(): string | undefined {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const password = process.env.SUPABASE_DB_PASSWORD;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!password || !supabaseUrl) return undefined;

  const ref = new URL(supabaseUrl).hostname.split(".")[0];
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres`;
}

const databaseUrl = getDatabaseUrl();
if (!databaseUrl) {
  console.error(
    "Missing DATABASE_URL (or SUPABASE_DB_PASSWORD + NEXT_PUBLIC_SUPABASE_URL).\n" +
      "Get the connection string from Supabase Dashboard → Settings → Database."
  );
  process.exit(1);
}

const schemaPath = resolve(process.cwd(), "supabase/schema.sql");
const sql = readFileSync(schemaPath, "utf8");

async function setup() {
  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  console.log("Applying schema from supabase/schema.sql ...");

  try {
    await client.connect();
    await client.query(sql);
    console.log("Schema applied successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to apply schema:", message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setup();
