import { BlogPost } from '../types/blog';

/**
 * Utility functions for blog post management
 */

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const calculateReadTime = (content: string): number => {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const validateBlogPost = (post: Partial<BlogPost>): string[] => {
  const errors: string[] = [];

  if (!post.title || post.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!post.content || post.content.trim().length === 0) {
    errors.push('Content is required');
  }

  if (!post.excerpt || post.excerpt.trim().length === 0) {
    errors.push('Excerpt is required');
  }

  if (!post.coverImage || post.coverImage.trim().length === 0) {
    errors.push('Cover image is required');
  }

  if (!post.tags || post.tags.length === 0) {
    errors.push('At least one tag is required');
  }

  if (!post.category || post.category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (post.readTime && post.readTime < 1) {
    errors.push('Read time must be at least 1 minute');
  }

  return errors;
};

export const formatMarkdownContent = (content: string): string => {
  // Enhanced markdown formatting for blog content
  return content
    // Headers
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-6 text-amber-100">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mb-4 mt-8 text-amber-100">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mb-3 mt-6 text-amber-100">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-xl font-semibold mb-2 mt-4 text-amber-100">$1</h4>')
    .replace(/^##### (.*$)/gim, '<h5 class="text-lg font-semibold mb-2 mt-3 text-amber-100">$1</h5>')
    .replace(/^###### (.*$)/gim, '<h6 class="text-base font-semibold mb-2 mt-2 text-amber-100">$1</h6>')
    
    // Text formatting
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-amber-100">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-amber-200">$1</em>')
    .replace(/~~(.*?)~~/g, '<del class="line-through text-amber-300">$1</del>')
    
    // Inline code
    .replace(/`(.*?)`/g, '<code class="bg-stone-700 px-2 py-1 rounded text-amber-300 font-mono text-sm">$1</code>')
    
    // Code blocks - Note: This is a fallback function, BlogPostPage.tsx uses a custom CodeBlock component
    .replace(/^```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-black border border-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400 font-mono text-sm leading-relaxed">$2</code></pre>')
    .replace(/^```\n([\s\S]*?)```/gim, '<pre class="bg-black border border-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400 font-mono text-sm leading-relaxed">$1</code></pre>')
    
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 list-decimal">$1</li>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-amber-400 hover:text-amber-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-amber-600 pl-4 italic text-amber-200 my-4">$1</blockquote>')
    
    // Horizontal rules
    .replace(/^---$/gim, '<hr class="border-stone-600 my-8">')
    .replace(/^\*\*\*$/gim, '<hr class="border-stone-600 my-8">')
    
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4 text-amber-200 leading-relaxed">')
    .replace(/^(?!<[h|l|p|c|s|b|d|a|r])(.*$)/gim, '<p class="mb-4 text-amber-200 leading-relaxed">$1</p>');
};

export const extractExcerpt = (content: string, maxLength: number = 160): string => {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/[#*`_~\[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
};

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - in a real app, you'd want to use a proper sanitization library
  const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'blockquote', 'hr'];
  const allowedAttributes = ['href', 'target', 'rel', 'class'];
  
  // This is a simplified version - consider using DOMPurify or similar for production
  return html;
};

export const createBlogPostFromMarkdown = (markdownContent: string, metadata: Partial<BlogPost>): Partial<BlogPost> => {
  // Extract frontmatter if present
  const frontmatterMatch = markdownContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  let content = markdownContent;
  let frontmatter: any = {};
  
  if (frontmatterMatch) {
    try {
      frontmatter = JSON.parse(frontmatterMatch[1]);
      content = frontmatterMatch[2];
    } catch (e) {
      // If frontmatter is not valid JSON, treat the whole thing as content
      content = markdownContent;
    }
  }
  
  // Extract title from first heading if not provided
  const titleMatch = content.match(/^# (.*$)/m);
  const title = metadata.title || frontmatter.title || titleMatch?.[1] || 'Untitled';
  
  // Generate slug if not provided
  const slug = metadata.slug || frontmatter.slug || generateSlug(title);
  
  // Generate excerpt if not provided
  const excerpt = metadata.excerpt || frontmatter.excerpt || extractExcerpt(content);
  
  // Calculate read time
  const readTime = calculateReadTime(content);
  
  return {
    ...metadata,
    ...frontmatter,
    title,
    slug,
    excerpt,
    content,
    readTime,
    publishedAt: metadata.publishedAt || new Date().toISOString(),
    author: metadata.author || {
      name: "Mustafa Cem Gülümser",
      avatar: "/images/profile/profile.jpg"
    }
  };
};

export const exportBlogPostToMarkdown = (post: BlogPost): string => {
  const frontmatter = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    images: post.images,
    tags: post.tags,
    category: post.category,
    readTime: post.readTime,
    featured: post.featured,
    published: post.published,
    externalLinks: post.externalLinks,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt
  };
  
  return `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n\n${post.content}`;
};

