import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost } from "../types/blog";
import { getFeaturedPosts, blogCategories } from "../utils/blogLoader";

interface BlogSlideshowProps {
  onPostClick: (post: BlogPost) => void;
}

const BlogSlideshow: React.FC<BlogSlideshowProps> = ({ onPostClick }) => {
  const featuredPosts = getFeaturedPosts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Don't render if no featured posts
  if (featuredPosts.length === 0) {
    return null;
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredPosts.length, isAutoPlaying]);

  const getCategoryInfo = (categoryId: string) => {
    return blogCategories.find(cat => cat.id === categoryId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const currentPost = featuredPosts[currentIndex];
  const categoryInfo = getCategoryInfo(currentPost.category);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-stone-800 text-amber-100 w-full">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.h2 
          className="text-4xl font-bold mb-4 text-center"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          Latest Blog Posts
        </motion.h2>
        <motion.p 
          className="text-xl text-amber-200 mb-16 text-center max-w-3xl mx-auto"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Insights on cybersecurity, software development, research, and career growth
        </motion.p>

        {/* Slideshow Container */}
        <motion.div 
          className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={currentPost.coverImage}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/60 md:to-transparent" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 group"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6 text-white group-hover:text-amber-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 group"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6 text-white group-hover:text-amber-300" />
          </button>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex items-center"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              <div className="relative z-10 max-w-4xl px-4 md:px-12 py-8 md:py-16">
                {/* Category Badge */}
                {categoryInfo && (
                  <motion.span
                    className={`inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium text-white mb-3 md:mb-6 ${categoryInfo.color}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {categoryInfo.icon} {categoryInfo.name}
                  </motion.span>
                )}

                {/* Title */}
                <motion.h3
                  className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentPost.title}
                </motion.h3>

                {/* Excerpt */}
                <motion.p
                  className="text-sm md:text-xl text-gray-200 mb-4 md:mb-8 max-w-2xl leading-relaxed line-clamp-3 md:line-clamp-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentPost.excerpt}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  className="flex flex-wrap items-center gap-3 md:gap-6 text-gray-300 mb-4 md:mb-8 text-xs md:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <Calendar size={14} className="md:w-[18px] md:h-[18px]" />
                    <span>{formatDate(currentPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <Clock size={14} className="md:w-[18px] md:h-[18px]" />
                    <span>{currentPost.readTime} min read</span>
                  </div>
                </motion.div>

                {/* Read More Button */}
                <motion.button
                  onClick={() => onPostClick(currentPost)}
                  className="inline-flex items-center px-4 md:px-8 py-2 md:py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-300 font-medium text-sm md:text-lg group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Read Full Post
                  <ArrowRight size={16} className="md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-400 scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-black/50 px-3 md:px-4 py-1 md:py-2 rounded-full text-white text-xs md:text-sm">
            {currentIndex + 1} / {featuredPosts.length}
          </div>
        </motion.div>

        {/* View All Posts Button */}
        <motion.div 
          className="text-center mt-12"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => window.location.href = '/blog'}
            className="inline-flex items-center px-8 py-3 bg-stone-700 text-amber-100 rounded-xl hover:bg-stone-600 transition-colors font-medium border border-stone-600"
          >
            View All Posts
            <ArrowRight size={18} className="ml-2" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogSlideshow;


