#!/usr/bin/env node

/**
 * Blog Helper Script
 * 
 * This script provides utilities for managing blog posts
 * Usage: node scripts/blog-helper.js [command] [options]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blog-posts');
const IMAGES_PATH = path.join(__dirname, '../public/images/blog');

// Commands
const commands = {
  'create': createNewPost,
  'list': listPosts,
  'validate': validatePosts,
  'export': exportPost,
  'help': showHelp
};

function showHelp() {
  console.log(`
Blog Helper Script

Commands:
  create <title>     Create a new blog post template
  list              List all blog posts
  validate          Validate all blog posts
  export <slug>     Export a post to markdown
  help              Show this help message

Examples:
  node scripts/blog-helper.js create "My New Post"
  node scripts/blog-helper.js list
  node scripts/blog-helper.js validate
  node scripts/blog-helper.js export "my-new-post"
`);
}

function createNewPost(title) {
  if (!title) {
    console.error('Error: Post title is required');
    console.log('Usage: node scripts/blog-helper.js create "My New Post"');
    return;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const now = new Date().toISOString();
  const postId = slug.replace(/-/g, '');

  const filename = `${slug}.ts`;
  const filepath = path.join(BLOG_POSTS_PATH, filename);

  const template = `import { BlogPost } from '../../types/blog';

const post: BlogPost = {
  id: '${postId}',
  title: '${title}',
  slug: '${slug}',
  excerpt: 'Your post excerpt here...',
  content: \`# ${title}

Your blog post content goes here. You can use **markdown** formatting.

## Subheading

- Bullet points
- More content
- Code examples: \`console.log('Hello World')\`

\`\`\`javascript
// Code blocks
const example = "Hello World";
console.log(example);
\`\`\`

## Conclusion

Your conclusion here...\`,
  coverImage: '/images/blog/${slug}-cover.jpg',
  images: ['/images/blog/${slug}-1.jpg'],
  author: {
    name: 'Mustafa Cem Gülümser',
    avatar: '/images/profile/profile.jpg'
  },
  publishedAt: '${now}',
  tags: ['tag1', 'tag2'],
  category: 'cybersecurity',
  readTime: 5,
  featured: false,
  published: false,
  externalLinks: {
    github: 'https://github.com/cmglmsr',
    linkedin: 'https://www.linkedin.com/in/cem-g%C3%BCl%C3%BCmser-2b685a213/'
  },
  seo: {
    title: '${title} - Mustafa Cem Gülümser',
    description: 'Your post excerpt here...',
    keywords: ['tag1', 'tag2', 'cybersecurity']
  }
};

export default post;`;

  try {
    fs.writeFileSync(filepath, template);
    console.log(`\n✅ Blog post created successfully!`);
    console.log(`📁 File: ${filename}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`🆔 ID: ${postId}`);
    console.log('\nNext steps:');
    console.log('1. Edit the content in the file');
    console.log('2. Add your cover image to public/images/blog/');
    console.log('3. Customize tags, category, and metadata');
    console.log('4. Set published: true when ready to publish');
  } catch (error) {
    console.error('Error creating blog post file:', error.message);
  }
}

function listPosts() {
  try {
    const files = fs.readdirSync(BLOG_POSTS_PATH).filter(file => file.endsWith('.ts'));
    
    if (files.length === 0) {
      console.log('No blog posts found');
      return;
    }

    console.log('\nBlog Posts:');
    console.log('='.repeat(50));
    
    files.forEach((file, index) => {
      const filepath = path.join(BLOG_POSTS_PATH, file);
      const content = fs.readFileSync(filepath, 'utf8');
      
      // Extract basic info from the file
      const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
      const slugMatch = content.match(/slug:\s*['"`]([^'"`]+)['"`]/);
      const publishedMatch = content.match(/published:\s*(true|false)/);
      
      const title = titleMatch ? titleMatch[1] : 'Untitled';
      const slug = slugMatch ? slugMatch[1] : 'N/A';
      const published = publishedMatch ? publishedMatch[1] === 'true' : false;
      const status = published ? '✅ Published' : '📝 Draft';
      
      console.log(`${index + 1}. ${title}`);
      console.log(`   File: ${file}`);
      console.log(`   Slug: ${slug}`);
      console.log(`   Status: ${status}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error reading blog posts:', error.message);
  }
}

function validatePosts() {
  console.log('Validating blog posts...');
  
  try {
    const files = fs.readdirSync(BLOG_POSTS_PATH).filter(file => file.endsWith('.ts'));
    
    if (files.length === 0) {
      console.log('No blog posts found to validate');
      return;
    }

    let allValid = true;
    
    files.forEach((file, index) => {
      const filepath = path.join(BLOG_POSTS_PATH, file);
      const content = fs.readFileSync(filepath, 'utf8');
      
      console.log(`\n📄 Validating ${file}:`);
      
      // Basic validation checks
      const checks = [
        { name: 'Title field', regex: /title:\s*['"`][^'"`]+['"`]/ },
        { name: 'Slug field', regex: /slug:\s*['"`][^'"`]+['"`]/ },
        { name: 'Content field', regex: /content:\s*`/ },
        { name: 'Author field', regex: /author:\s*{/ },
        { name: 'Published date', regex: /publishedAt:\s*['"`]/ }
      ];
      
      let fileValid = true;
      
      checks.forEach(check => {
        if (!content.match(check.regex)) {
          console.error(`  ❌ Missing ${check.name}`);
          fileValid = false;
          allValid = false;
        } else {
          console.log(`  ✅ ${check.name}`);
        }
      });
      
      if (fileValid) {
        console.log(`  ✅ ${file} is valid`);
      }
    });
    
    if (allValid) {
      console.log('\n🎉 All blog posts are valid!');
    } else {
      console.log('\n⚠️  Some blog posts have issues. Please fix them.');
    }
    
  } catch (error) {
    console.error('Error validating blog posts:', error.message);
  }
}

function exportPost(slug) {
  if (!slug) {
    console.error('Error: Post slug is required');
    console.log('Usage: node scripts/blog-helper.js export "post-slug"');
    return;
  }

  console.log(`Exporting post with slug: ${slug}`);
  console.log('This feature will be implemented in a future version.');
  console.log('For now, you can manually copy the post content from src/data/blogPosts.ts');
}

// Main execution
const command = process.argv[2];
const arg = process.argv[3];

if (!command || !commands[command]) {
  console.error(`Unknown command: ${command}`);
  showHelp();
  process.exit(1);
}

commands[command](arg);
