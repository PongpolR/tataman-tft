import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-4xl font-bold text-accent">404</h1>
      <p className="mb-6 text-muted">ไม่พบหน้าที่คุณต้องการ</p>
      <Link href="/" className="btn-primary">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
