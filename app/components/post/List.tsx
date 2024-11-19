"use client";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useEffect, useState } from "react";

const List: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter(); // Use the useRouter from next/navigation

  const blogPosts = [
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

  // Handle page change and save to sessionStorage
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem("currentPage", page.toString());
  };

  // Check for saved page in sessionStorage on initial load
  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    } else {
      setCurrentPage(1); // Default to page 1 if no saved page
    }
  }, []);

  // Navigate to the post detail page on click
  const handlePostClick = (id: number) => {
    router.push(`/post/${id}`); // Redirect to the post detail page
  };

  return (
    <div className="bg-white min-h-screen mx-auto p-6  max-w-[896px]">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Posts</h1>
        <div className="grid gap-6">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
              onClick={() => handlePostClick(post.id)} // Use the new click handler
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
