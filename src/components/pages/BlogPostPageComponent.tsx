import React from "react";
import { useNavigate } from "react-router-dom";
import { getPostByBlogId } from "../../utils/blogLoader";
import BlogPostPage from "../BlogPostPage";

interface BlogPostPageComponentProps {
  blogId: number;
}

const BlogPostPageComponent: React.FC<BlogPostPageComponentProps> = ({ blogId }) => {
  const navigate = useNavigate();
  const post = getPostByBlogId(blogId);

  const handleBackToBlog = () => {
    navigate('/blog');
  };

  const handleRelatedPostClick = (post: any) => {
    navigate(`/blog?id=${post.blogId}`);
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-100 mb-4">Post Not Found</h1>
          <p className="text-amber-200 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={handleBackToBlog}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <BlogPostPage
      post={post}
      onBack={handleBackToBlog}
      onRelatedPostClick={handleRelatedPostClick}
    />
  );
};

export default BlogPostPageComponent;


