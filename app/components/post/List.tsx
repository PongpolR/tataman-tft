"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const List: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const itemsPerPage = 5;
  const router = useRouter();

  const blogPosts = [
    {
      id: 4,
      title: "[RECAP] Tournament The Convergence ผ่านมุมมองของตัวเอง",
      description: 'บอกเล่าเรื่องราวทั้งหมดเกี่ยวกับการแข่งขันที่ผ่านมาในมุมของตัวเอง',
      date: "31/01/2025",
    },
    {
      id: 3,
      title: "[TIP] แนะนำ Augment Tower Defense",
      description: 'หนึ่งใน Augment สารพัดประโยชน์ที่ได้ทั้ง dummie ตีไกล รวมถึงได้ emblem ติดมาอีกอันด้วยนะ',
      date: "2ุ6/11/2024",
    },
    {
      id: 2,
      title: "[TIP] Trait Scraps ยิ่งไอเทมเยอะยิ่งเก่ง!?",
      description:
        "Tip ของ comp ที่มี Scraps เป็น trait หลัก",
      date: "20/11/2024",
    },
    {
      id: 1,
      title: "[TIP] การตัดสินใจผสมไอเทม (Slamming Items)",
      description:
        "ผสมไอเทมยังไงให้คุ้มค่า ตรง gameplan ของเรา และไม่เสีย timing",
      date: "19/11/2024",
    },
  ];

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem("currentPage", page.toString());
  };

  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    } else {
      setCurrentPage(1);
    }
  }, []);

  const handlePostClick = async (id: number) => {
    setIsLoading(true); // Show loader
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    router.push(`/post/${id}`); // Redirect to the post detail page
  };

  return (
    <div className="bg-white min-h-screen mx-auto p-6 max-w-[896px]">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Posts</h1>

        {/* Loader */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-16 h-16 rounded-full border-4 border-solid border-gray-200 border-t-blue-500 animate-spin-fast"></div>
          </div>
        )}

        <div className="grid gap-6">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-slate-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-slate-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
