"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetail: React.FC = () => {
  const { id } = useParams(); // Access dynamic route parameters using useParams

  const blogPosts = [
    {
      id: 1,
      title: "[TIP] การตัดสินใจผสมไอเทม (Slamming Items)",
      header: "คำศัพท์ที่เกี่ยวข้อง",
      header_desc: [
        "Slam Item: การผสมชิ้นส่วนไอเทมสองชิ้นเพื่อทำไอเท็ม 1 ชิ้นให้กับ unit ที่ต้องการจะใส่",
        "BIS (Best In Slot): เซตของไอเท็มสามชิ้นที่ดีที่สุดของตัวละครนั้นๆ",
        "Tempo: การตัดสินใจบางอย่างที่ช่วยให้บอร์ดเก่งขึ้นอย่างมีนัยสำคัญ ณ ช่วงเวลานั้นๆ เช่น อัพเลเวลก่อนคนอื่น เพื่อ odd% หรือ strongest board, การ slam item เพื่อเซฟเลือด, การสุ่มหา unit เพื่อหนีตาย 9ล9",
        "Cut down component: การจัดการกับ item component ที่ไม่ค่อยจำเป็น โดยวิธีผสมไอเทมที่จะทำให้บอร์ดของเราได้ value มากขึ้นใน timing เดียวกันเมื่อเทียบกับคนอื่นๆ",
        "LW: Last Wrisper",
        "RB: Guinsoo Rageblade",
        "IE: Infinity Edge",
        "DB: Death Blade",
        "GS: Giant Slayer",
      ],
      body: [
        "ในโพสต์นี้จะยกตัวอย่าง unit ที่จะทำ BIS item เป็น tristana จาก Set13 PBE โดย BIS ของ tristana จะเป็น DB RB IE, RB IE GS, LW RB IE เป็นต้น",
      ],
      img: "/post1-1.png",
      img_desc: "รูปที่ 1: Stat ของ set item unit tristana",
      body2: [
        "จากรูปที่ 2 จะเป็นตัวอย่าง item component ที่ได้ตอนต้นเกม หากต้องการ commit comp tristana เราสามารถ slam bow กับ glove ได้เลย ซึ่งชิ้นส่วนที่เหลือจะเป็น tear",
        "โดยสิ่งที่เราต้องทำหลังจาก slam LW มาแล้ว ตัวเลือกแรกไม่ใช่พยายามทำไอเทมชิ้นต่อไปให้ tristana แต่ต้องพยายามกำจัด tear ออกไปให้ได้ด้วย ซึ่ง component ที่จะ cut down tear ได้ อาจจะเป็น belt/chain ซึ่งเป็น item ที่เราจะเอาไปใส่ให้ตัว tank เป็นต้น",
      ],
      img2: "/post1-2.png",
      img2_desc: "รูปที่ 2: ตัวอย่าง component item ที่ได้ตอนต้นเกม",
      date: "19/11/2024",
      summary: [
        "มองหา choice ก่อนที่จะ slam item โดยพิจารณาจาก component item ที่ตัวเองมี",
        "ต้องคิดเผื่อด้วยว่าถ้า slam item ชิ้นนั้นๆ ไปแล้ว component item ที่เหลืออยู่จะมีอะไรบ้าง แล้วจะทำยังไงกับมันต่อ",
        "BIS ของตัวแบกสำคัญเสมอถ้าเป็นไปได้อย่าผสมไอเทมมั่วๆ เพื่อ tempo บางสถานการณ์รอได้ แต่บางทีอาจต้อง slam item บางอย่างที่อาจจะไม่ใช่ไอเทมที่ดีที่สุดแต่เป็นทางเลือกที่ดีที่สุด ณ เวลานั้นๆ",
        "timing ของการ slam item ที่ต่างช่วงเวลากันมีผลต่อความเก่งของบอร์ดอย่างชัดเจน",
      ],
      ref: ["https://www.metatft.com/"],
    },
    {
      id: 2,
      title: "[TIP] Trait Scrap ยิ่งไอเทมเยอะยิ่งเก่ง!?",
      header: "คำศัพท์ที่เกี่ยวข้อง (Augment)",
      header_desc: [
        "Combat: augment ที่ช่วยเสริมความเก่งของบอร์ดหรือ unit",
        "Econ: augment ที่ช่วยด้านการเงินหรือเลเวล",
        "Item: augment ที่ให้ item",
      ],
      body: [
        "Trait Scraps มีคุณสมบัติหลักๆ คือเมื่อเริ่มการต่อสู้ unit scrap ตัวไหนที่ใส่ item component ไว้ จะถูกเปลี่ยนเป็น complete item เมื่อเริ่มการต่อสู้ และบอร์ดของเราจะได้รับโล่ตามจำนวนไอเทมที่ใส่ให้ unit",
      ],
      img: "/post2-1.png",
      img_desc: "รูปที่ 1: Description Trait Scrap",
      body2: [
        "วิเคราะห์ง่ายๆ ไม่ซับซ้อนคือ trait นี้ ไอเทมยิ่งเยอะยิ่งเก่งแน่นอน สมมติว่าถ้าเราต้องการเล่น corki 6 scraps first priority ของ item component ควรจะเป็นดาบ และ priority ของ augment จะเป็น emblem (ช่วยให้ cap ง่ายขึ้น) > item (item augment เป็นทั้ง item และ combat ในเวลาเดียวกันสำหรับบอร์ดนี้) > econ/combat",
      ],
      img2: "/post2-2.png",
      img2_desc: "รูปที่ 2: ตัวอย่าง board corki scraps fast8",
      date: "19/11/2024",
      summary: [
        "ถ้า encounter เป็นอันที่แจก item หรือเกมที่ได้ item เยอะๆ scraps เป็นอะไรที่น่าเล่นมาก",
        "ถึงแม้ว่า comp corki scrap อยากได้ item จำนวนมากก็จริง แต่ต้องอย่าลืมว่าการเลือก augment ควรพิจารณาจากบอร์ด สถานการณ์ปัจจุบันและอื่นๆ อีกด้วย",
      ],
      ref: [
        "https://tactics.tools/traits",
        "https://tftacademy.com/tierlist/comps/set-13-silver-scraps",
      ],
    },
    {
      id: 3,
      title: "[TIP] แนะนำ Augment Tower Defense",
      header: "",
      header_desc: [],
      body: [
        "Augment Tower Defense เมื่อเลือกมาจะได้ dummie ตีไกลที่จะอัพเกรดระดับของมันตามช่วงเวลาของเกม และได้ emblem แบบสุ่มติดมา 1 ชิ้น ส่วนตัวผมมองว่าเป็นหนึ่งใน Augment ที่น่าหยิบมากๆ ทำ capboard ได้ง่ายขึ้นหากเล่น comp fast8/9 เช่น ได้ emblem sentinel มา เราจะ drop sentinel ที่เวล 8 ตัวนึงแล้วเติม trait อื่นได้เพิ่ม เป็นต้น โดยรวมแล้วมันเป็น Augment ที่ค่อนข้างดีมากๆ ตอนนี้เลย",
      ],
      img: "/post3-1.png",
      img_desc: "รูปที่ 1: Description Tower Defense",
      body2: [
        "ตัวอย่างที่ยกมาจะเป็น Augment Tower Defense ให้ emblem sentinel มา ในกรณีนี้บอร์ดที่โหดที่สุด ณ ขณะนี้หนึ่งในนั้นคงไม่พ้น Heimer Sentinel ซึ่งบอร์ดจะเก่งที่สุดจริงๆ คือตอน lv.9 ที่ได้ trait มาเยอะมากๆ ตัว tank เยอะ ดาเมจไม่ขาด (ปกติจะ lv.8 จะเล่น 6sen 3academy 2vision) แต่พอได้ emblem มาทำให้เราสามารถลง corki ได้ที่ lv.8 เลย ซึ่งปกติเขาจะเติมกันตอน lv.9 เพื่อ cap board ทั้งหมดนี้ก็เป็นหนึ่งในตัวอย่างของ gameplan สำหรับ Augment นี้ เราสามารถปรับเปลี่ยน gameplan ตาม emblem ที่ได้ มีแนะนำเพิ่มเติมคือคิดว่าหยิบ 2-1 จะเล่นง่ายที่สุด 3-2 พอได้ 4-2 อาจจะต้อง 200IQ หน่อย ค่อนข้างปรับบอร์ดยากหากเลือก Augment นี้มาตอนท้ายเกม",
      ],
      img2: "/post3-2.png",
      img2_desc:
        "รูปที่ 2: ตัวอย่าง board Heimer ที่ drop 1 sentinel (add corki lv.8)",
      summary: [
        "ตอน 2-1 ถ้า spot ยังไม่รู้จะเล่น comp อะไรดี ถ้าเจอ Tower Defense ให้เลือกได้เลย คุ้ม!",
        "เหมาะกับคนที่ต้องการ win streak ต้นเกม เพราะแต่ละไฟท์มันก็ช่วยทำดาเมจไม่น้อยเลย",
        "มีความเสี่ยงจะได้ emblem ที่เล่นยาก ลองศึกษาเพิ่มเติมไว้ก่อนจะดีมาก เพื่อรับมือกับการต้องเล่น emblem หรือ comp ที่เราไม่อยากเล่น",
      ],
      ref: [
        "https://www.metatft.com/augments",
        "https://tactics.tools/team-builder/UGD8dA.BVSW9C.BjCIXQYpEDZva.DhMhGhHuG.DhAbN",
      ],
      date: "2ุ6/11/2024",
    },
    {
      id: 4,
      title: "[RECAP] Tournament The Convergence ผ่านมุมมองของตัวเอง",
      header: "",
      header_desc: [],
      body: [
        "เมื่อช่วงกลางเดือนที่ผ่านมา(มกรา 2568) ผมมีโอกาสได้ลงแข่งขัน TFT The Convergence Open Tournament รอบ Open Qualifier (ลุ้น bypass ด้วย Snapshot ไม่ไหว แต้มมันสูงเกินไปมาก) โดยภาพรวมเป็นหนึ่งใน tournament ที่ผมค่อนข้างจะ happy กับผลงานของตัวเอง ซึ่งใน tour นี้ผมจบเส้นทางที่รอบ 256 คน หรือจะเรียกว่า top256 ก็ว่าได้", "ผมคงไม่เขียนรายละเอียดในแต่ละ game แต่อยากจะพูดถึงภาพรวมในการลงแข่ง tournament ที่มี format ประมาณนี้",
      ],
      img: "/post4-1.png",
      img_desc: "รูปที่ 1: Description Tournament Schedule",
      body2: [
        "จากรูปจะเห็นว่าจำนวนเกมที่ต้องเล่นต่อวันค่อนข้างสูง เพราะเกม TFT เป็นเกมที่มี RNG หรือดวงเข้ามาเป็นปัจจัยในแต่ละเกมค่อนข้างมากเลยทีเดียว แม้ว่าคนที่มี skill play สูงมากๆ จะเอาชนะคนที่มี skill play และ knowledge เกี่ยวกับเกมที่ไม่มากพอได้สบายๆ ก็ตาม",
        "ในการแข่งขันครั้งที่ผ่านๆ มา ผมได้เจอกับปัญหาที่ส่งผลต่อการเล่นของผมแบบมากๆ เลยคือจำนวนระยะเวลาที่ต้องแข่งขันต่อวัน โดยปกติช่วงที่ผมเล่น TFT เฉลี่ยต่อวันแล้วผมเล่นแค่วันละไม่เกิน 3 เกมเท่านั้น ผมเชื่อเสมอว่า คุณภาพของเกมย่อมสำคัญกว่าจำนวนเกมที่เล่นไป จนถึงตอนนี้ก็ยังคิดเหมือนเดิม",
        "การที่ปกติผมเล่น TFT ในจำนวนเกมที่ค่อนข้างน้อยในแต่ละวันส่งผลให้ความอึดในการเล่นผมมีไม่มากพอ ยิ่งเกมท้ายๆ สมาธิกับอะไรหลายๆ อย่างแทบจะหมดหลอดแล้ว",
        "อีกสิ่งหนึ่งที่ผมไม่มีเมื่อเทียบกับคนที่มีฝีมือเท่ากันคือ consistency หรือความสม่ำเสมอในการเล่น บางเกมผมเล่นได้ดีมากๆ แต่บางเกมผมเล่นเหมือนคนที่อยู่ rank gold ซะอย่างงั้น!? (ไม่ได้เหยียด rank แต่อย่างใด เปรียบเทียบให้เห็นภาพว่า master player ในเกมที่เล่นไม่ดี ทรงมันจะกลายเป็น gold/plat player ได้เลย)",
        "ในทัวร์ล่าสุดผมรับมือกับความไม่สม่ำเสมอได้ดีขึ้น แต่ในรอบที่ตกรอบต้องยอมรับตามตรงว่าสมเหตุสมผลทุกอย่างแล้ว ผมพลาดได้ที่ 8 ในเกมแรก แม้ว่ามีเกมให้แก้ตัวอีก 2 เกม แต่มันก็ยากเกินกว่าที่ผมจะตีตื้นกลับมาได้ แต่ต้องขอบอกก่อนว่าหลังจากเกมที่ผมได้ที่ 8 สิ่งที่ผมทำคือยอมรับกับสิ่งที่เกิดขึ้นและ RESET ทุกอย่างออกไปให้หมดเพื่อพร้อมเล่นเกมใหม่ ผมคิดว่าผมควบคุมอารมณ์ได้ดีในแบบที่ควรจะทำแล้ว และเล่นได้เต็มที่ที่สุดแล้ว เรื่องรายละเอียดเล็กๆ น้อยๆ ในเกมก็คงเป็นสิ่งที่จะต้องไปปรับในภายหลัง",
        "หลังจากที่ผมตกรอบมา ผมรู้สึกเหมือนได้ทำในสิ่งที่ต้องทำไปหมดแล้ว ช่วงที่มีแข่งผมเล่น TFT เยอะมากๆ ทั้ง rank และเกมแข่ง ซึ่งผมได้ตัดสินใจในทันทีที่ตกรอบว่าจะขอพักการเล่น TFT สักประมาณ 1 อาทิตย์เพื่อที่จะได้กลับมาทบทวนตัวเอง ไปโฟกัสกับสิ่งอื่นในชีวิตบ้าง",
        "วันนี้ (31/1) เป็นวันเกิดผม ผมก็ขอให้ทุกคนที่อ่านได้เจอเรื่องดีๆ กับตัวเองนะครับ ตอนนี้ผมพร้อมที่จะกลับมาเล่น TFT ต่อแล้ว ช่วงต้นเดือนหน้าจะมีแข่งขัน tour tactician trial II ผมได้สมัครไปแล้วแต่คงต้องลุ้นว่าจะได้ลงแข่งไหม (คาดว่าจะเอาแค่ top168 คนจากจำนวนคนทั้งหมดที่สมัครมา) หลังจากนี้ที่ผมทำได้คือการไต่ rank ไปให้ไกลที่สุดเพื่อลุ้น snapshot อันดับที่ดีพอที่จะได้ไปแข่ง ถ้ามีโอกาสได้แข่งก็จะทำให้เต็มที่ครับ"
      ],
      summary: [
        "ได้ Top256 ในการแข่งขัน TFT The Convergence Open Qualifier",
        "เป็น tournament ที่พอใจในผลงานของตัวเอง",
        "การเล่นพลาดในแข่งโดนลงโทษหนักกว่า rank game หลายเท่า",
        "รอบหน้าเอาใหม่ แค่นั้น." 
      ],
      ref: [
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7Bj4wqWGUj0FaxoXzW8SdrRTAp3BYwk89cATZcCIK5HcSfGwkGZXdjRzAspCopXZvjWirmSJcfSpQ/pubhtml",
      ],
      date: "31/01/2025",
    },
  ];

  const [post, setPost] = useState(blogPosts[Number(id) - 1]);

  useEffect(() => {
    setPost(blogPosts[Number(id) - 1]);
  }, []);

  // Calculate reading time based on word count
  const calculateReadingTime = (text: string) => {
    const words = text.split(/\s+/).length; // Split by whitespace to count words
    const wordsPerMinute = 90; // Average words per minute
    const minutes = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
    return minutes;
  };

  // Combine body and body2 for total word count
  const totalText = [
    ...post.title,
    post.header,
    post.header_desc,
    ...post.body,
    ...post.body2,
    post.ref,
  ].join(" ");
  const readingTime = calculateReadingTime(totalText);

  return (
    <div className="mt-12 min-h-screen mx-auto p-6 max-w-[896px]">
      <div className="flex">
        <Link href="/">
          <Image
            src="/ttm.jpg"
            alt=""
            height={80}
            width={80}
            style={{ cursor: "pointer" }} // Optional: indicates the image is clickable
          />
        </Link>
        <div className="mt-2">
          <Link href="/" className="text-3xl font-extrabold ml-2">
            Tataman
          </Link>
          <div className="ml-[11px] -mt-2 -mb-1 text-[20px] text-slate-500">
            TFT Player
          </div>
        </div>
      </div>
      <h1 className="mt-8">
        <span className="font-bold text-xl">{post.title}</span>{" "}
        <span className=" font-sans font-extralight text-slate-600 mb-2">
          • {post.date} • {readingTime} min read
        </span>
      </h1>
      <p className="text-lg mt-2 font-bold">{post.header}</p>
      <div className="text-lg">
        {post.header_desc.map((d) => (
          <div key={d}>- {d}</div>
        ))}
      </div>
      <div className="text-lg mt-2">
        {post.body.map((d) => (
          <div key={d} className="mb-1 text-justify">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <img src={post.img} alt="" className="mx-auto" />
        <div className="text-center font-light text-sm mt-1">
          {post.img_desc}
        </div>
      </div>
      <div className="text-lg mt-2">
        {post.body2.map((d) => (
          <div key={d} className="mb-1 text-justify">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <img src={post.img2} alt="" className="mx-auto" />
        <div className="text-center font-light text-sm mt-1">
          {post.img2_desc}
        </div>
      </div>
      <div className="mt-2 font-bold text-[20px]">สรุป</div>
      <div className="text-lg">
        {post.summary.map((d) => (
          <div key={d} className="mb-1 text-justify">
            - {d}
          </div>
        ))}
      </div>
      <div className="mt-4 font-bold text-[20px]">Reference</div>
      <div>
        {post.ref.map((d, i) => (
          <div key={d} className="font-light">
            {i + 1}.{" "}
            <Link
              href={post.ref[i]}
              target="_blank"
              className="hover:underline"
            >
              {d}
            </Link>
          </div>
        ))}
        {/* <Link href={"https://www.metatft.com/"} target="_blank">
          - https://www.metatft.com/
        </Link> */}
      </div>
      <div className="mt-12 text-center">
        <Link href={"/"} className="text-[20px] font-light hover:underline ">
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
