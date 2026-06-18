import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 py-8">
      <div className="site-container flex flex-col items-center gap-2 text-center text-sm text-muted">
        <p>Tataman TFT — Competitive tips & tournament recaps</p>
        <Link href="/blog" className="text-accent hover:underline">
          กลับหน้าหลัก
        </Link>
      </div>
    </footer>
  );
}
