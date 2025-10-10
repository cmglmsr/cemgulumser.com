import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowLeft, ExternalLink, Github, Linkedin, Globe } from "lucide-react";
import { BlogPost } from "../types/blog";
import { getRelatedPosts, blogCategories } from "../utils/blogLoader";
import CodeBlock from "./ui/code-block";

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  onRelatedPostClick: (post: BlogPost) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack, onRelatedPostClick }) => {
  const relatedPosts = getRelatedPosts(post, 3);
  const categoryInfo = blogCategories.find(cat => cat.id === post.category);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    if (!content) return null;
    
    // Split content into sections, handling code blocks specially
    const sections: React.ReactNode[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text content before code block
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index);
        sections.push(formatTextContent(textContent));
      }
      
      // Add code block
      const language = match[1] || '';
      const code = match[2].trim();
      sections.push(
        <CodeBlock 
          key={`code-${sections.length}`} 
          code={code} 
          language={language} 
        />
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text content
    if (lastIndex < content.length) {
      const remainingContent = content.slice(lastIndex);
      sections.push(formatTextContent(remainingContent));
    }
    
    return sections.length > 0 ? sections : null;
  };

  const formatTextContent = (text: string): React.ReactNode => {
    if (!text.trim()) return null;
    
    // Process inline code first
    let formatted = text.replace(/`([^`]+)`/g, '<code class="bg-stone-700 px-2 py-1 rounded text-amber-300 font-mono text-sm">$1</code>');
    
    // Process headings
    formatted = formatted.replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6 text-amber-100">$1</h1>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-4 mt-8 text-amber-100">$1</h2>');
    formatted = formatted.replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold mb-3 mt-6 text-amber-100">$1</h3>');
    formatted = formatted.replace(/^#### (.*$)/gm, '<h4 class="text-xl font-semibold mb-2 mt-4 text-amber-100">$1</h4>');
    
    // Process bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-amber-100">$1</strong>');
    
    // Process bullet points
    formatted = formatted.replace(/^- (.*$)/gm, '<div class="ml-4 mb-2 text-amber-200">• $1</div>');
    
    // Process numbered lists
    formatted = formatted.replace(/^(\d+)\. (.*$)/gm, '<div class="ml-4 mb-2 text-amber-200">$1. $2</div>');
    
    // Convert double newlines to paragraph breaks
    formatted = formatted.replace(/\n\n/g, '</p><p class="mb-4 text-amber-200 leading-relaxed">');
    
    // Wrap remaining lines in paragraphs
    const lines = formatted.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return trimmed;
      return `<p class="mb-4 text-amber-200 leading-relaxed">${trimmed}</p>`;
    });
    
    return (
      <div dangerouslySetInnerHTML={{ __html: processedLines.filter(line => line !== '').join('\n') }} />
    );
  };

  const getExternalLinkIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github size={16} />;
      case 'linkedin':
        return <Linkedin size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  return (
    <motion.div
      className="p-0 max-w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <div className="px-6 py-4 bg-stone-900">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors"
          whileHover={{ x: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowLeft size={20} />
          Back to Blog
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-stone-700 to-stone-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          {categoryInfo && (
            <motion.span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-6 ${categoryInfo.color}`}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {categoryInfo.icon} {categoryInfo.name}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-amber-100"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            className="text-xl text-amber-200 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {post.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 text-amber-300"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime} min read</span>
            </div>
          </motion.div>

          {/* External Links */}
          {post.externalLinks && Object.keys(post.externalLinks).length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-6"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {Object.entries(post.externalLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-stone-700 rounded-lg hover:bg-stone-600 transition-colors text-amber-200 hover:text-amber-100"
                >
                  {getExternalLinkIcon(platform)}
                  <span className="capitalize">{platform}</span>
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Cover Image */}
      <section className="px-6 py-8 bg-stone-800">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="px-6 py-16 bg-stone-900">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <article className="max-w-none prose prose-lg">
            {post.content ? (
              <div>
                {formatContent(post.content)}
              </div>
            ) : (
              <div className="text-amber-300">
                <p>No content available for this post.</p>
                <p>Content length: {post.content?.length || 0}</p>
              </div>
            )}
          </article>
        </motion.div>
      </section>

      {/* Additional Images */}
      {post.images && post.images.length > 0 && (
        <section className="px-6 py-16 bg-stone-800">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-amber-100">Additional Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${post.title} - Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Tags Section */}
      <section className="px-6 py-16 bg-stone-900">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-amber-100">Tags</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {post.tags.map((tag) => (
              <motion.span
                key={tag}
                className="flex items-center gap-2 px-4 py-2 bg-stone-700 rounded-full text-amber-300 hover:bg-stone-600 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Tag size={14} />
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 py-16 bg-stone-800">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-amber-100">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedCategoryInfo = blogCategories.find(cat => cat.id === relatedPost.category);
                return (
                  <motion.article
                    key={relatedPost.id}
                    className="bg-stone-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => onRelatedPostClick(relatedPost)}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedCategoryInfo && (
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white ${relatedCategoryInfo.color}`}>
                          {relatedCategoryInfo.icon} {relatedCategoryInfo.name}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold mb-3 text-amber-100 group-hover:text-amber-200 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-amber-200 text-sm mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-amber-300">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {relatedPost.readTime} min
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* Author Section */}
      <section className="px-6 py-16 bg-stone-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-stone-700 rounded-2xl p-4 md:p-8">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 border-4 border-stone-600"
            />
            <h4 className="text-xl md:text-2xl font-bold mb-2 text-amber-100">{post.author.name}</h4>
            <p className="text-sm md:text-base text-amber-200 mb-6">
              Computer Scientist specialized in Cybersecurity. MSc in Software and Systems Security from University of Oxford. 
              Senior Security Engineer at Garanti BBVA with 3+ years of experience in security software development.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a
                href="https://github.com/cmglmsr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-600 rounded-lg hover:bg-stone-500 transition-colors text-amber-200 hover:text-amber-100 text-sm md:text-base"
              >
                <Github size={16} />
                <span className="whitespace-nowrap">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/cem-g%C3%BCl%C3%BCmser-2b685a213/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-600 rounded-lg hover:bg-stone-500 transition-colors text-amber-200 hover:text-amber-100 text-sm md:text-base"
              >
                <Linkedin size={16} />
                <span className="whitespace-nowrap">LinkedIn</span>
              </a>
              <a
                href="https://www.npmjs.com/~cmglmsr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-600 rounded-lg hover:bg-stone-500 transition-colors text-amber-200 hover:text-amber-100 text-sm md:text-base"
              >
                <Globe size={16} />
                <span className="whitespace-nowrap">npm</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default BlogPostPage;
