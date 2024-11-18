import Image from "next/image";

type DetailProps = {
  postId: number; // postId must be a number
  onBack: () => void; // onBack must be a function with no arguments
};

const Detail = ({ postId, onBack }: DetailProps) => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Get Started with React",
      content:
        "React is a JavaScript library for building user interfaces. It was developed by Facebook and is now widely used for creating web and mobile applications...",
      date: "November 10, 2024",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      content:
        "Tailwind CSS is a utility-first CSS framework that allows you to create custom designs directly in your HTML. It eliminates the need for writing custom CSS...",
      date: "November 12, 2024",
    },
    {
      id: 3,
      title: "Understanding JavaScript Closures",
      content:
        "Closures are an important concept in JavaScript. They allow a function to access variables from an enclosing scope or environment even after that scope is no longer active...",
      date: "November 15, 2024",
    },
  ];

  const post = blogPosts.find((post) => post.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Post not found!</h1>
        <button onClick={onBack} className="text-blue-500 underline ml-4">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.date}</p>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
        <button
          onClick={onBack}
          className="text-blue-500 hover:underline mt-6 inline-block"
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
};

export default Detail;
