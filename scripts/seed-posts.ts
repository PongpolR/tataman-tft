/**
 * One-time seed script for legacy posts.
 *
 * Setup:
 * 1. Run supabase/schema.sql in Supabase SQL Editor
 * 2. Create admin user in Supabase Auth dashboard
 * 3. Copy .env.local.example to .env.local and fill values
 * 4. Run: npx tsx scripts/seed-posts.ts
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (server-only, never commit).
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { legacyPosts } from "../lib/legacy-posts";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function seed() {
  console.log(`Seeding ${legacyPosts.length} posts...`);

  for (const post of legacyPosts) {
    const { error } = await supabase.from("posts").upsert(
      {
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
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`Failed to seed ${post.slug}:`, error.message);
      process.exit(1);
    }

    console.log(`  ✓ ${post.slug}`);
  }

  console.log("Done!");
}

seed();
