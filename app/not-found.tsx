import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="gradient-border-wrap w-full max-w-md">
        <div className="card-surface-static relative rounded-2xl p-10 shadow-xl shadow-black/10">
          <h1 className="font-display mb-2 text-4xl font-bold text-accent">404</h1>
          <p className="mb-6 text-muted">ไม่พบหน้าที่คุณต้องการ</p>
          <Link href="/blog" className="btn-primary">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
