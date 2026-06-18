import Image from "next/image";

const peakRank = [
  { set: "SET 8", rank: "Platinum III" },
  { set: "SET 8.5", rank: "Diamond I" },
  { set: "SET 9", rank: "Grandmaster" },
  { set: "SET 9.5", rank: "Master" },
  { set: "SET 10", rank: "Master" },
  { set: "SET 11", rank: "Master" },
  { set: "SET 12", rank: "Master" },
  { set: "SET 13", rank: "Master" },
];

const tournaments = [
  {
    set: "SET 9",
    events: [{ name: "Chibi Tournament", result: "Top 128" }],
  },
  {
    set: "SET 10",
    events: [
      { name: "Chalieo Cup", result: "Top 128" },
      { name: "SV Tournament", result: "1st place 🏆" },
      {
        name: "กิจกรรม discord's ได้โปรดมาเล่นเถอะครับพี่",
        result: "Top 128",
      },
      { name: "TFT Battle Arena [GAMIQO]", result: "TOP 16" },
      {
        name: "TFT Community Tournament Comp ครั้งที่ 2 [OvertimeCo]",
        result: "Top 128",
      },
    ],
  },
  {
    set: "SET 11",
    events: [
      { name: "TFT Lunar Tournament [SPU]", result: "Top 64" },
      { name: "TFT Battle Arena SS2 [GAMIQO]", result: "TOP 64" },
      {
        name: "TFT Draw Your Destiny Open Tournament",
        result: "Qualifier Round - Top 512",
      },
    ],
  },
  {
    set: "SET 12",
    events: [
      {
        name: "TFT Master Of Magic Open Tournament",
        result: "Qualifier Round - Top 1024",
      },
      {
        name: "Tacticians Trials II",
        result: "Qualifier Round - Top 168",
      },
      {
        name: "Tacticians Trials III",
        result: "Qualifier Round - Top 144",
      },
    ],
  },
  {
    set: "SET 13",
    events: [
      {
        name: "TFT Hexpert Tactician Open Tournament",
        result: "Qualifier Round - Top 512",
      },
      {
        name: "TFT The Convergence Open Tournament",
        result: "Qualifier Round - Top 256 (Latest 01/2025)",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">About Me</h1>

      <div className="card-surface-static mb-8 space-y-4 p-5 text-pretty leading-relaxed text-muted sm:p-6">
        <p>
          เริ่มเล่น TFT ตั้งแต่ SET 1 ลองเล่นเพราะเบื่อๆ จาก LoL
          เลยมีมาเล่นสลับกับโหมด rank/aram
        </p>
        <p>
          ผ่านไปช่วงเวลาหนึ่งที่เกม LoR เข้า (การ์ดเกมจักรวาล Runeterra ของ Riot)
          ก็มาจริงจังกับเกม LoR ทั้งพยายามไต่ rank หาทัวร์แข่ง
          (peak rank LoR ไปได้ไกลสุดที่ Diamond)
        </p>
        <p>
          จนถึงจุดที่เกม LoR เริ่มพัฒนา PvE มากกว่า PvP/competitive
          ตอนนั้นผมเริ่มเบื่อหรือเครียดจากเกมนั้น บวกกับดูสตรีมเมอร์ต่างๆ ที่เล่น TFT
          ทำให้อยากลองมาเล่น TFT ดูบ้าง
        </p>
        <p>
          SET 8 เป็น Set แรกที่เริ่มเล่นจริงจัง แต่ยังคงไต่ไปไม่ถึง Diamond
          หลังจากนั้นก็พยายามพัฒนา skill ในการเล่นอยู่เรื่อยๆ
          จนสามารถไต่ rank ไปได้ไกลถึง Grandmaster ใน SET 9
          รวมถึงได้แชมป์ tournament community ในช่วงต้น SET 10 อีกด้วย
        </p>
        <p>
          นอกจากนี้ยังพยายามดันตัวเองให้เก่งขึ้นไปอีก โดยได้ลองหาคนโค้ชชิ่งดู
          และมีประสบการณ์ผ่านการเรียนกับผู้เล่น Challenger มาสองคน
          หลังจากเรียนได้อะไรจากเขาเยอะมากๆ (โดยเฉพาะ logic/วิธีการคิด)
        </p>
        <p>
          ถึงแม้ว่าจะได้เรียนมา/ได้รับการโค้ชมาแล้ว จะไม่ได้ทำให้เก่งขึ้นทันทีจนขึ้น top server ได้
          ซึ่งต้องนำสิ่งที่ได้เรียนรู้มาหาทางต่อยอดเอง
          การได้เห็นผู้เล่นที่เก่งกว่าแต่ละคนทำให้ผมมีแรงผลักดันที่จะเรียนรู้เรื่องต่างๆ
          เกี่ยวกับเกม TFT และไม่หยุดที่จะพัฒนาตัวเอง
        </p>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold">Peak Rank</h2>
        <div className="card-surface-static overflow-hidden">
          <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-start md:flex-row md:p-6">
            <Image
              src="/rank.jpg"
              alt="Peak rank"
              width={200}
              height={200}
              className="mx-auto rounded-xl sm:mx-0"
            />
            <ul className="flex-1 space-y-2">
              {peakRank.map((item) => (
                <li
                  key={item.set}
                  className="flex justify-between border-b border-border/50 py-2 text-sm last:border-0"
                >
                  <span className="font-medium text-foreground">{item.set}</span>
                  <span className="text-accent">{item.rank}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Tournament Achievements</h2>
        <div className="space-y-4">
          {tournaments.map((tournament) => (
            <div key={tournament.set} className="card-surface-static p-5">
              <h3 className="mb-3 font-bold text-accent">{tournament.set}</h3>
              <ul className="space-y-2">
                {tournament.events.map((event, index) => (
                  <li key={index} className="text-sm text-muted">
                    <span className="text-foreground">{event.name}</span>
                    {": "}
                    <span className="text-accent">{event.result}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
