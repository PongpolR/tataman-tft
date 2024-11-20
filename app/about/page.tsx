"use client";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const peakRank = [
    { set: "SET 8", rank: "Platinum III" },
    { set: "SET 8.5", rank: "Diamond I" },
    { set: "SET 9", rank: "Grandmaster" },
    { set: "SET 9.5", rank: "Master" },
    { set: "SET 10", rank: "Master" },
    { set: "SET 11", rank: "Master" },
    { set: "SET 12", rank: "Master" },
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
        { name: "SV Tournament", result: "1st place🏆" },
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
      ],
    },
    // {
    //   set: "SET 13",
    //   events: [
    //     {
    //       name: "Coming soon...",
    //       result: "",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="bg-white min-h-screen p-6  max-w-[896px] mx-auto mt-12">
      <div className="">
        <div className="flex">
          <Image src="/ttm.jpg" alt="" height={80} width={80} />
          <div className="mt-2">
            <Link href="/" className="text-3xl font-extrabold ml-2">
              Tataman
            </Link>
            <div className="ml-2 -mt-2 text-[20px] text-slate-500">
              TFT Player
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-[24px] font-black mt-4 mb-2">About Me</h1>
      <div className="mb-2 text-justify">เริ่มเล่น TFT ตั้งแต่ SET1 ลองเล่นเพราะเบื่อๆ จาก LoL เลยมีมาเล่นสลับกับโหมด rank/aram ผ่านไปช่วงเวลานึงที่เกม LoR เข้า (การ์ดเกมจักรวาล runterra ของ riot) ก็มาจริงจังกับเกม LoR ทั้งพยายามไต่ rank หาทัวร์แข่ง (peak rank lor ไปได้ไกลสุดที่ diamond) จนถึงจุดที่เกม LoR เริ่มพัฒนา pve มากกว่า pvp/competitve ตอนนั้นผมเริ่มเบื่อหรือเครียดจากเกมนั้นบวกกับดูสตรีมเมอร์ต่างๆ ที่เล่น TFT ทำให้อยากลองมาเล่น TFT ดูบ้าง</div>
      <div className="mb-8 text-justify">Set8 เป็น Set แรกที่เริ่มเล่นจริงจังแต่ยังคงไต่ไปไม่ถึง diamond หลังจากนั้นก็พยายามที่จะพัฒนา skill ในการเล่นอยู่เรื่อยๆ จนสามารถไต่ rank ไปได้ไกลถึง rank Grandmaster ใน Set9 รวมถึงได้แชมป์ tournament community ในช่วงต้น Set10 อีกด้วย นอกจากนี้ยังพยายามที่จะดันตัวเองให้เก่งขึ้นไปอีกโดยได้ลองหาคนโคชชิ่งดู ได้มีประสบการณ์ผ่านการเรียนกับผู้เล่น challenger มาสองคน หลังจากเรียนได้อะไรจากเขาเยอะมากๆ (โดยเฉพาะ logic/วิธีการคิด) ถึงแม้ว่าจะได้เรียนมา/ได้รับการโค้ชมาแล้วจะไม่ได้ทำให้เก่งขึ้นทันทีจนขึ้น top server ได้ ซึ่งต้องนำสิ่งที่ได้เรียนรู้มาหาทางต่อยอดเอาเอง การได้เห็นผู้เล่นที่เก่งกว่าแต่ละคนทำให้ผมมีแรงพลักดันที่จะเรียนรู้เรื่องต่างๆ เกี่ยวกับเกม TFT และไม่หยุดที่จะพัฒนาตัวเอง</div>
      {/* Peak Rank Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-1">Peak Rank</h2>

        <div className="flex text-left mb-3">
          <Image src="/rank.jpg" alt="" height={0} width={280} />
        </div>

        <ul>
          {peakRank.map((item) => (
            <li key={item.set} className="mb-2">
              <strong>{item.set}:</strong> {item.rank}
            </li>
          ))}
        </ul>
      </section>

      {/* Tournament Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Tournament Achievements</h2>
        {tournaments.map((tournament) => (
          <div key={tournament.set} className="mb-6">
            <h3 className="text-xl font-medium mb-2">{tournament.set}</h3>
            <ul>
              {tournament.events.map((event, index) => (
                <li key={index} className="mb-2">
                  <strong>{event.name}:</strong> {event.result}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="flex">
        <Link
          href={"/"}
          className="text-[20px] hover:underline text-center mx-auto font-light"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default About;
