/**
 * Blog store facade for backward compatibility.
 * Delegates to modular domain service in src/features/blog/services/blogService.ts
 */
import { BlogPost } from '../types';
import { blogService, BLOG_POSTS_KEY as POSTS_KEY } from '../features/blog/services/blogService';

export const BLOG_POSTS_KEY = POSTS_KEY;

export function getAllPosts(): BlogPost[] {
  return blogService.getAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogService.getPostBySlug(slug);
}

export function createPost(data: Omit<BlogPost, 'id'> & { id?: string }): BlogPost {
  return blogService.createPost(data);
}

export function updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  return blogService.updatePost(id, updates);
}

export function deletePost(id: string): boolean {
  return blogService.deletePost(id);
}

export function resetBlogToDefaults(): BlogPost[] {
  return blogService.resetBlogToDefaults();
}
