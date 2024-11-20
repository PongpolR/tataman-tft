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
      <h1 className="text-[24px] font-black mt-4 mb-2">Resource</h1>
      <div className="mb-2 text-justify">TH Streammer Recommend</div>

      <div>
        <ul className="ml-8 list-disc mb-4">
          <li>Fuutime</li>
          <li>Cursedzxz</li>
          <li>FoemanDD</li>
          <li>Reverie</li>
          <li>Itzphawoak</li>
        </ul>
      </div>

      <div className="mb-2 text-justify">Meta Tierlist</div>
      <div>
        <ul className="ml-8 list-disc mb-4">
          <li>TFT Academy</li>
          <li>Sologesang</li>
        </ul>
      </div>

      <div className="mb-2 text-justify">Stat/Tools</div>
      <div>
        <ul className="ml-8 list-disc mb-4">
          <li>Tactic.tools</li>
          <li>MetaTFT</li>
          <li>lolchess</li>
        </ul>
      </div>

      <div className="flex mt-16">
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
