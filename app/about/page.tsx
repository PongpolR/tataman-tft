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
  ];

  return (
    <div className="bg-white min-h-screen p-6 font-chatthai max-w-[896px] mx-auto mt-12">
      <div className="font-chatthai">
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
      <h1 className="text-[24px] font-black mb-8 mt-4">About Me</h1>

      {/* Peak Rank Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold  mb-4">Peak Rank</h2>
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

      <Link href={"/"} className="text-[20px] hover:underline">กลับหน้าหลัก</Link>
    </div>
  );
};

export default About;
