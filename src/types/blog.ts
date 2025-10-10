export interface BlogPost {
  id: string;
  blogId: number; // Incremental ID for routing
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  images?: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readTime: number; // in minutes
  featured: boolean;
  published: boolean;
  externalLinks?: {
    medium?: string;
    linkedin?: string;
    github?: string;
    npm?: string;
    website?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface BlogFilters {
  category?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

