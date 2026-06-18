export default function HeroSection() {
  return (
    <section className="animate-fade-in-up relative mb-12 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-muted/10 blur-3xl" />

      <h1 className="relative mb-4 text-2xl font-bold leading-tight sm:text-3xl">
        ถึงเวลาอัปเกรดความรู้{" "}
        <span className="text-accent">TFT</span> ของคุณแล้ว – มาเริ่มกันเลย!
      </h1>

      <p className="relative max-w-2xl text-justify leading-relaxed text-muted">
        ผมตาต้านะครับ เล่นเกม TFT (Teamfight Tactic) เป็นหลัก
        ต้องการที่จะแบ่งปันข่าวสาร และเทคนิคต่างๆ เกี่ยวกับเกมเท่าที่ทราบ
        สามารถอ่านได้ทั้งผู้เล่นใหม่ และผู้เล่นเก่า โดย blog
        นี้จะเน้นข้อมูลในเชิง{" "}
        <strong className="text-foreground">competitive</strong> เป็นหลักครับ
      </p>
    </section>
  );
}
