import { BlogPost } from '../../../types';
import { INITIAL_POSTS } from '../../../data/mockData';
import { safeStorage } from '../../../services/storage/storageService';

export const BLOG_POSTS_KEY = 'dr_blog_posts_store_v1';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
}

export const blogService = {
  getAllPosts(): BlogPost[] {
    const list = safeStorage.get<BlogPost[]>(BLOG_POSTS_KEY, []);
    if (!Array.isArray(list) || list.length === 0) {
      safeStorage.set(BLOG_POSTS_KEY, INITIAL_POSTS);
      return INITIAL_POSTS;
    }
    return list;
  },

  getPostBySlug(slug: string): BlogPost | undefined {
    const posts = this.getAllPosts();
    return posts.find(p => p.slug === slug || p.id === slug);
  },

  createPost(data: Omit<BlogPost, 'id'> & { id?: string }): BlogPost {
    const posts = this.getAllPosts();
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
    safeStorage.set(BLOG_POSTS_KEY, updated, 'blog_posts_updated');
    return newPost;
  },

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getAllPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      ...updates
    };

    safeStorage.set(BLOG_POSTS_KEY, posts, 'blog_posts_updated');
    return posts[index];
  },

  deletePost(id: string): boolean {
    const posts = this.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length !== posts.length) {
      safeStorage.set(BLOG_POSTS_KEY, filtered, 'blog_posts_updated');
      return true;
    }
    return false;
  },

  resetBlogToDefaults(): BlogPost[] {
    safeStorage.set(BLOG_POSTS_KEY, INITIAL_POSTS, 'blog_posts_updated');
    return INITIAL_POSTS;
  }
};
