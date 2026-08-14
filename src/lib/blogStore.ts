import { BlogPost } from '../types';
import { INITIAL_POSTS } from '../data/mockData';

export const BLOG_POSTS_KEY = 'dr_blog_posts_store_v1';

export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_POSTS_KEY);
    if (!raw) {
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading blog posts:', e);
    return INITIAL_POSTS;
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug || p.id === slug);
}

export function createPost(data: Omit<BlogPost, 'id'> & { id?: string }): BlogPost {
  const posts = getAllPosts();
  
  const id = data.id || `post-${Date.now()}`;
  const slug = data.slug || generateSlug(data.title_fa || data.title_en || 'post');

  const newPost: BlogPost = {
    ...data,
    id,
    slug,
    published_date: data.published_date || new Date().toISOString().split('T')[0],
    author_fa: data.author_fa || 'دکتر فاطمه مومنی',
    author_en: data.author_en || 'Dr. Fatemeh Momeni',
    read_minutes: data.read_minutes || 5
  };

  const updated = [newPost, ...posts];
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(updated));
  
  // Trigger custom storage event for live sync across components
  window.dispatchEvent(new Event('blog_posts_updated'));
  return newPost;
}

export function updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getAllPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...updates
  };

  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event('blog_posts_updated'));
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length !== posts.length) {
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('blog_posts_updated'));
    return true;
  }
  return false;
}

export function resetBlogToDefaults(): BlogPost[] {
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(INITIAL_POSTS));
  window.dispatchEvent(new Event('blog_posts_updated'));
  return INITIAL_POSTS;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
}
