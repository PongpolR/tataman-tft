import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white text-slate-800 pt-12">
      <div className="container mx-auto max-w-[896px] flex justify-between items-center p-4">
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

        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/about"
                className="hover:underline  text-[24px]"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto max-w-[896px]  items-center p-4  text-[20px] text-justify font-light">
        สวัสดีทุกคน ผมตาต้านะครับ เล่นเกม TFT (Teamfight Tactic) เป็นหลัก ต้องการที่จะแบ่งปันข่าวสาร และเทคนิคต่างๆ เกี่ยวกับเกมเท่าที่ทราบ สามารถอ่านได้ทั้งผู้เล่นใหม่ และผู้เล่นเก่า โดย blog นี้จะเน้นข้อมูลในเชิง <b>competitive</b> เป็นหลักครับ
      </div>
    </header>
  );
};

export default Header;
