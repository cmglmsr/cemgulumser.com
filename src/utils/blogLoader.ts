import { BlogPost, BlogCategory } from '../types/blog';

/**
 * File-based blog post loader
 * 
 * This utility loads blog posts from individual files in the src/data/blog-posts directory.
 * Each blog post should be a TypeScript file that exports a BlogPost object.
 */

// Import all blog post files
const blogPostModules = import.meta.glob('../data/blog-posts/*.ts', { eager: true });

export const blogCategories: BlogCategory[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Security research, vulnerabilities, and best practices',
    color: 'bg-red-600',
    icon: '🔒'
  },
  {
    id: 'software-development',
    name: 'Software Development',
    slug: 'software-development',
    description: 'Programming, tools, and development practices',
    color: 'bg-blue-600',
    icon: '💻'
  },
  {
    id: 'research',
    name: 'Research',
    slug: 'research',
    description: 'Academic research and publications',
    color: 'bg-purple-600',
    icon: '🔬'
  },
  {
    id: 'career',
    name: 'Career',
    slug: 'career',
    description: 'Professional development and career insights',
    color: 'bg-green-600',
    icon: '🚀'
  },
  {
    id: 'personal',
    name: 'Personal',
    slug: 'personal',
    description: 'Personal thoughts and experiences',
    color: 'bg-yellow-600',
    icon: '👤'
  }
];

/**
 * Load all blog posts from the blog-posts directory
 */
export const loadBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];

  // Iterate through all imported modules
  Object.values(blogPostModules).forEach((module: any) => {
    if (module.default && typeof module.default === 'object') {
      // Validate that the module exports a valid BlogPost
      const post = module.default as BlogPost;
      
      // Basic validation
      if (post.id && post.title && post.content) {
        posts.push(post);
      } else {
        console.warn('Invalid blog post found:', module);
      }
    }
  });

  // Sort by publication date (newest first)
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

/**
 * Get all published blog posts
 */
export const getAllPosts = (): BlogPost[] => {
  return loadBlogPosts().filter(post => post.published);
};

/**
 * Get featured blog posts
 */
export const getFeaturedPosts = (): BlogPost[] => {
  return loadBlogPosts().filter(post => post.featured && post.published);
};

/**
 * Get posts by category
 */
export const getPostsByCategory = (category: string): BlogPost[] => {
  return loadBlogPosts().filter(post => post.category === category && post.published);
};

/**
 * Get a single post by slug
 */
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return loadBlogPosts().find(post => post.slug === slug && post.published);
};

/**
 * Get a single post by blogId
 */
export const getPostByBlogId = (blogId: number): BlogPost | undefined => {
  return loadBlogPosts().find(post => post.blogId === blogId && post.published);
};

/**
 * Get related posts based on category and tags
 */
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const allPosts = loadBlogPosts();
  
  return allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.published &&
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};

/**
 * Search posts by title, excerpt, or tags
 */
export const searchPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();
  const allPosts = loadBlogPosts();
  
  return allPosts.filter(post => 
    post.published &&
    (post.title.toLowerCase().includes(searchTerm) ||
     post.excerpt.toLowerCase().includes(searchTerm) ||
     post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};

