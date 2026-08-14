import { Testimonial } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/mockData';

export const TESTIMONIALS_KEY = 'dr_testimonials_store_v1';

export function getAllTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading testimonials:', e);
    return INITIAL_TESTIMONIALS;
  }
}

export function createTestimonial(data: Omit<Testimonial, 'id'> & { id?: string }): Testimonial {
  const items = getAllTestimonials();
  const id = data.id || `testi-${Date.now()}`;
  
  const newItem: Testimonial = {
    ...data,
    id,
    order: data.order ?? 0,
    verified: data.verified ?? true,
    rating: data.rating ?? 5,
    date_str: data.date_str || 'امروز'
  };

  const updated = [newItem, ...items];
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('testimonials_updated'));
  return newItem;
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const items = getAllTestimonials();
  const index = items.findIndex(t => t.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates
  };

  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('testimonials_updated'));
  return items[index];
}

export function deleteTestimonial(id: string): boolean {
  const items = getAllTestimonials();
  const filtered = items.filter(t => t.id !== id);
  if (filtered.length !== items.length) {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('testimonials_updated'));
    return true;
  }
  return false;
}

export function toggleTestimonialVerified(id: string): boolean {
  const items = getAllTestimonials();
  const index = items.findIndex(t => t.id === id);
  if (index !== -1) {
    items[index].verified = !items[index].verified;
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('testimonials_updated'));
    return items[index].verified;
  }
  return false;
}

export function resetTestimonialsToDefaults(): Testimonial[] {
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
  window.dispatchEvent(new Event('testimonials_updated'));
  return INITIAL_TESTIMONIALS;
}
