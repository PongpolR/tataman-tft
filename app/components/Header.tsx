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
              <div className="ml-[11px] -mt-2 text-[20px] text-slate-500">
                TFT Player
              </div>
            </div>
          </div>
        </div>

        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <a
                href="/resource"
                className="text-[24px] text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800 hover:underline"
              >
                Resource
              </a>
            </li>
            <li>
              <span className="text-gray-600">|</span>
            </li>
            <li>
              <a
                href="/about"
                className="text-[24px] text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800 hover:underline"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className="mt-4  bg-gray-100 container mx-auto max-w-[848px]  items-center p-4  text-[20px] text-justify font-light">
        สวัสดีทุกคน ผมตาต้านะครับ เล่นเกม TFT (Teamfight Tactic) เป็นหลัก ต้องการที่จะแบ่งปันข่าวสาร และเทคนิคต่างๆ เกี่ยวกับเกมเท่าที่ทราบ สามารถอ่านได้ทั้งผู้เล่นใหม่ และผู้เล่นเก่า โดย blog นี้จะเน้นข้อมูลในเชิง <b>competitive</b> เป็นหลักครับ
      </div> */}
      <div className="container mx-auto max-w-[848px] p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          ถึงเวลาอัปเกรดความรู้ TFT ของคุณแล้ว – มาเริ่มกันเลย!
        </h1>
        <p className="text-lg leading-relaxed text-gray-800 font-light text-justify">
          ผมตาต้านะครับ เล่นเกม TFT (Teamfight Tactic) เป็นหลัก
          ต้องการที่จะแบ่งปันข่าวสาร และเทคนิคต่างๆ เกี่ยวกับเกมเท่าที่ทราบ
          สามารถอ่านได้ทั้งผู้เล่นใหม่ และผู้เล่นเก่า โดย blog
          นี้จะเน้นข้อมูลในเชิง{" "}
          <b className="font-medium text-blue-600">competitive </b>
          เป็นหลักครับ
        </p>
      </div>
    </header>
  );
};

export default Header;
