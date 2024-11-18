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
      title: "How to Get Started with React",
      description:
        "A comprehensive guide to understanding the basics of React and how to start building your first project.",
      date: "November 10, 2024",
    },
    // {
    //   id: 2,
    //   title: "Mastering Tailwind CSS",
    //   description:
    //     "Learn how to create stunning and responsive designs with Tailwind CSS effortlessly.",
    //   date: "November 12, 2024",
    // },
    // {
    //   id: 3,
    //   title: "Understanding JavaScript Closures",
    //   description:
    //     "Dive deep into the concept of closures in JavaScript and see how they power modern web development.",
    //   date: "November 15, 2024",
    // },
    // {
    //   id: 4,
    //   title: "Another Post Example",
    //   description:
    //     "This is an additional example of a blog post to demonstrate pagination.",
    //   date: "November 16, 2024",
    // },
    // {
    //   id: 5,
    //   title: "Using React Hooks",
    //   description:
    //     "A beginner-friendly guide to using React Hooks in functional components.",
    //   date: "November 17, 2024",
    // },
    // {
    //   id: 6,
    //   title: "Advanced Tailwind CSS Tips",
    //   description:
    //     "Learn advanced techniques to improve your Tailwind CSS workflow.",
    //   date: "November 18, 2024",
    // },
    // {
    //   id: 7,
    //   title: "JavaScript Promises Explained",
    //   description:
    //     "Understand JavaScript Promises and how to handle asynchronous operations effectively.",
    //   date: "November 19, 2024",
    // },
    // {
    //   id: 8,
    //   title: "CSS Grid vs Flexbox",
    //   description: "When to use CSS Grid and Flexbox for responsive layouts.",
    //   date: "November 20, 2024",
    // },
  ];

  const [post, setPost] = useState(blogPosts[Number(id) - 1]);
  
  useEffect(() => {
    setPost(blogPosts[Number(id) - 1])
  }, [])

  return (
    <div className="mt-12 min-h-screen mx-auto p-6 font-chatthai max-w-[896px]">
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
      <h1 className="mt-8 text-2xl font-bold">{post.title}</h1>
      <p className="text-lg">{post.description}</p>
      <span className="text-sm text-gray-500">{post.date}</span>
      <div className="mt-8">
        <Link href={"/"} className="text-[20px] hover:underline text-slate-500">กลับหน้าหลัก</Link>
      </div>
    </div>
  );
};

export default PostDetail;
