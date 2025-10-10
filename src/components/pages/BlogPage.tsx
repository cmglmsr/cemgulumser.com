import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import BlogPageComponent from "../BlogPage";
import BlogPostPageComponent from "./BlogPostPageComponent";

const BlogPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get('id');

  const handlePostClick = (post: any) => {
    navigate(`/blog?id=${post.blogId}`);
  };

  return (
    <div className="flex min-h-screen font-sans bg-stone-900 text-amber-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {blogId ? (
          <BlogPostPageComponent blogId={parseInt(blogId)} />
        ) : (
          <BlogPageComponent onPostClick={handlePostClick} />
        )}
      </main>
    </div>
  );
};

export default BlogPage;
