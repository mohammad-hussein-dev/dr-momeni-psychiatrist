import { Testimonial } from '../../../types';
import { INITIAL_TESTIMONIALS } from '../../../data/mockData';
import { safeStorage } from '../../../services/storage/storageService';

export const TESTIMONIALS_KEY = 'dr_testimonials_store_v1';

export const testimonialService = {
  getAllTestimonials(): Testimonial[] {
    const list = safeStorage.get<Testimonial[]>(TESTIMONIALS_KEY, []);
    if (!Array.isArray(list) || list.length === 0) {
      safeStorage.set(TESTIMONIALS_KEY, INITIAL_TESTIMONIALS);
      return INITIAL_TESTIMONIALS;
    }
    return list;
  },

  createTestimonial(data: Omit<Testimonial, 'id'> & { id?: string }): Testimonial {
    const items = this.getAllTestimonials();
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
    safeStorage.set(TESTIMONIALS_KEY, updated, 'testimonials_updated');
    return newItem;
  },

  updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const items = this.getAllTestimonials();
    const index = items.findIndex(t => t.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates
    };

    safeStorage.set(TESTIMONIALS_KEY, items, 'testimonials_updated');
    return items[index];
  },

  deleteTestimonial(id: string): boolean {
    const items = this.getAllTestimonials();
    const filtered = items.filter(t => t.id !== id);
    if (filtered.length !== items.length) {
      safeStorage.set(TESTIMONIALS_KEY, filtered, 'testimonials_updated');
      return true;
    }
    return false;
  },

  toggleTestimonialVerified(id: string): boolean {
    const items = this.getAllTestimonials();
    const index = items.findIndex(t => t.id === id);
    if (index !== -1) {
      items[index].verified = !items[index].verified;
      safeStorage.set(TESTIMONIALS_KEY, items, 'testimonials_updated');
      return items[index].verified;
    }
    return false;
  },

  resetTestimonialsToDefaults(): Testimonial[] {
    safeStorage.set(TESTIMONIALS_KEY, INITIAL_TESTIMONIALS, 'testimonials_updated');
    return INITIAL_TESTIMONIALS;
  }
};
