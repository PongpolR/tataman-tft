import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  latestPostSlug?: string;
}

export default function HeroSection({ latestPostSlug }: HeroSectionProps) {
  return (
    <section className="relative mb-12" aria-label="แนะนำ">
      <div className="gradient-border-wrap">
        <div className="animate-fade-in-up relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-8 md:p-10">
          <div className="hero-grid-pattern pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-muted/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <Image
              src="/ttm.jpg"
              alt="Tataman"
              width={80}
              height={80}
              className="mx-auto shrink-0 rounded-full ring-2 ring-accent/40 sm:mx-0 sm:h-20 sm:w-20"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display mb-4 text-2xl font-bold leading-tight sm:text-3xl">
                ถึงเวลาอัปเกรดความรู้{" "}
                <span className="text-accent">TFT</span> ของคุณแล้ว – มาเริ่มกันเลย!
              </h1>

              <p className="mb-6 max-w-2xl text-pretty leading-relaxed text-muted sm:mx-0 mx-auto">
                ผมตาต้านะครับ เล่นเกม TFT (Teamfight Tactic) เป็นหลัก
                ต้องการที่จะแบ่งปันข่าวสาร และเทคนิคต่างๆ เกี่ยวกับเกมเท่าที่ทราบ
                สามารถอ่านได้ทั้งผู้เล่นใหม่ และผู้เล่นเก่า โดย blog
                นี้จะเน้นข้อมูลในเชิง{" "}
                <strong className="text-foreground">competitive</strong> เป็นหลักครับ
              </p>

              {latestPostSlug && (
                <Link href={`/post/${latestPostSlug}`} className="btn-primary">
                  อ่านบทความล่าสุด
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
