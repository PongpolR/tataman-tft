/**
 * One-time seed script for legacy posts.
 *
 * Setup:
 * 1. Run: npm run setup-db
 * 2. Create admin user in Supabase Auth dashboard
 * 3. Copy .env.local.example to .env.local and fill values
 * 4. Run: npm run seed
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (server-only, never commit).
 */

import { legacyPosts } from "../lib/legacy-posts";
import { loadEnv } from "./lib/load-env";

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local or .env"
  );
  process.exit(1);
}

async function upsertPost(post: (typeof legacyPosts)[number]) {
  const response = await fetch(`${url}/rest/v1/posts?on_conflict=slug`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      slug: post.slug,
      title: post.title,
      description: post.description,
      status: "published",
      published_at: post.published_at,
      header: post.header,
      header_desc: post.header_desc,
      body: post.body,
      img: post.img,
      img_desc: post.img_desc,
      body2: post.body2,
      img2: post.img2 ?? null,
      img2_desc: post.img2_desc ?? "",
      summary: post.summary,
      ref: post.ref,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || response.statusText);
  }
}

async function seed() {
  console.log(`Seeding ${legacyPosts.length} posts...`);

  for (const post of legacyPosts) {
    try {
      await upsertPost(post);
      console.log(`  ✓ ${post.slug}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed to seed ${post.slug}:`, message);
      process.exit(1);
    }
  }

  console.log("Done!");
}

seed();
