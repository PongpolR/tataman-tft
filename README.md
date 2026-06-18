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

## Supabase setup (ครั้งแรก — ต้องทำก่อน `npm run dev`)

1. สร้าง project ที่ [supabase.com](https://supabase.com)
2. คัดลอก `.env.local.example` เป็น `.env.local` แล้วใส่ URL, anon key, service role key
3. ใส่ `DATABASE_URL` จาก Dashboard → Settings → Database → Connection string (URI)
4. สร้าง schema:
   ```bash
   npm run setup-db
   ```
   (หรือรัน SQL จาก [`supabase/schema.sql`](supabase/schema.sql) ใน SQL Editor แทน)
5. Seed โพสต์เดิม:
   ```bash
   npm run seed
   ```
6. สร้าง admin user: Authentication → Users → Add user

## Auth & URLs

- Login: `/login` (หน้า `/` redirect มาที่นี่)
- Register: `/register`
- Blog (guest หรือ login): `/blog`
- Dashboard (จัดการโพสต์): `/admin`
- สร้าง/แก้โพสต์ได้เฉพาะ user ที่ login แล้ว
- Guest สามารถอ่าน blog, about, resource ได้โดยไม่ต้องสมัคร

## Deploy (Netlify)

1. Push ไป GitHub `main`
2. ใน Netlify Dashboard → Site settings → Environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Trigger deploy

### Schema changes on production

Deploy บน Netlify **ไม่ได้รัน** `npm run setup-db` อัตโนมัติ — ถ้า feature ใหม่เพิ่มตารางใน DB ต้อง apply แยกบน production:

1. เปิด Supabase Dashboard → SQL Editor (production project)
2. รัน migration ที่เกี่ยวข้องจาก [`supabase/migrations/`](supabase/migrations/)  
   เช่น [`001_comments.sql`](supabase/migrations/001_comments.sql) สำหรับตาราง comments
3. ตรวจใน Table Editor ว่าตารางถูกสร้างแล้ว
4. ถ้ายังเห็น schema cache error → Settings → API → Reload schema

ทางเลือก: ตั้ง `DATABASE_URL` ของ prod แล้วรัน `npm run setup-db`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run setup-db` | Apply `supabase/schema.sql` to remote database |
| `npm run seed` | Seed legacy posts to Supabase |
