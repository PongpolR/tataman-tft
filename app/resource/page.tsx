"use client";
import Image from "next/image";
import Link from "next/link";

const About = () => {
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
