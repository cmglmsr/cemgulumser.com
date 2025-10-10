import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { BlogPost, BlogCategory } from "../types/blog";
import { getAllPosts, getFeaturedPosts, blogCategories } from "../utils/blogLoader";

interface BlogPageProps {
  onPostClick: (post: BlogPost) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onPostClick }) => {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryInfo = (categoryId: string): BlogCategory | undefined => {
    return blogCategories.find(cat => cat.id === categoryId);
  };

  return (
    <motion.div
      className="p-0 max-w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 py-20 bg-gradient-to-br from-stone-700 to-stone-900 text-amber-100">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold mb-6">Blog</h1>
          <p className="text-xl text-amber-200 mb-8">
            Thoughts on cybersecurity, software development, research, and career insights
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-stone-600 px-3 py-1 rounded-full">
              {allPosts.length} Articles
            </span>
            <span className="bg-stone-600 px-3 py-1 rounded-full">
              {featuredPosts.length} Featured
            </span>
            <span className="bg-stone-600 px-3 py-1 rounded-full">
              {blogCategories.length} Categories
            </span>
          </div>
        </motion.div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="px-6 py-16 bg-stone-800">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-amber-100">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post) => {
                const categoryInfo = getCategoryInfo(post.category);
                return (
                  <motion.article
                    key={post.id}
                    className="bg-stone-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => onPostClick(post)}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {categoryInfo && (
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white ${categoryInfo.color}`}>
                          {categoryInfo.icon} {categoryInfo.name}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-amber-100 group-hover:text-amber-200 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-amber-200 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>
      )}


      {/* All Posts Section */}
      <section className="px-6 py-16 bg-stone-800">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-amber-100">
              All Posts ({sortedPosts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => {
                const categoryInfo = getCategoryInfo(post.category);
                return (
                  <motion.article
                    key={post.id}
                    className="bg-stone-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => onPostClick(post)}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {categoryInfo && (
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white ${categoryInfo.color}`}>
                          {categoryInfo.icon} {categoryInfo.name}
                        </span>
                      )}
                      {post.featured && (
                        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-amber-600">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-amber-100 group-hover:text-amber-200 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-amber-200 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-stone-600 text-xs rounded-full text-amber-300"
                          >
                            <Tag size={10} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-stone-600 text-xs rounded-full text-amber-300">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime} min
                          </span>
                        </div>
                        {post.externalLinks && Object.keys(post.externalLinks).length > 0 && (
                          <ExternalLink size={14} className="opacity-50" />
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
            })}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default BlogPage;
