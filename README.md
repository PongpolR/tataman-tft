# Tataman TFT

บล็อก TFT competitive จาก Tataman — tips, recaps และ tournament stories

**Live:** [tataman-tft.netlify.app](https://tataman-tft.netlify.app)

## Stack

- Next.js 15 (App Router)
- Tailwind CSS
- Supabase (Auth + PostgreSQL + Storage)
- Netlify

## Local development

```bash
npm install
cp .env.local.example .env.local
# ใส่ Supabase URL และ anon key ใน .env.local
npm run dev
```

## Supabase setup (ครั้งแรก)

1. สร้าง project ที่ [supabase.com](https://supabase.com)
2. รัน SQL จาก [`supabase/schema.sql`](supabase/schema.sql) ใน SQL Editor
3. สร้าง admin user: Authentication → Users → Add user
4. คัดลอก Project URL และ anon key ไปใส่ใน `.env.local`
5. Seed โพสต์เดิม:
   ```bash
   # ใส่ SUPABASE_SERVICE_ROLE_KEY ใน .env.local ด้วย
   npm run seed
   ```

## Admin

- Login: `/admin/login`
- Dashboard: `/admin`
- สร้าง/แก้โพสต์ได้เฉพาะ admin ที่ login แล้ว

## Deploy (Netlify)

1. Push ไป GitHub `main`
2. ใน Netlify Dashboard → Site settings → Environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Trigger deploy

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run seed` | Seed legacy posts to Supabase |
