/**
 * Testimonials store facade for backward compatibility.
 * Delegates to modular domain service in src/features/testimonials/services/testimonialService.ts
 */
import { Testimonial } from '../types';
import { testimonialService, TESTIMONIALS_KEY as TESTI_KEY } from '../features/testimonials/services/testimonialService';

export const TESTIMONIALS_KEY = TESTI_KEY;

export function getAllTestimonials(): Testimonial[] {
  return testimonialService.getAllTestimonials();
}

export function createTestimonial(data: Omit<Testimonial, 'id'> & { id?: string }): Testimonial {
  return testimonialService.createTestimonial(data);
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  return testimonialService.updateTestimonial(id, updates);
}

export function deleteTestimonial(id: string): boolean {
  return testimonialService.deleteTestimonial(id);
}

export function toggleTestimonialVerified(id: string): boolean {
  return testimonialService.toggleTestimonialVerified(id);
}

export function resetTestimonialsToDefaults(): Testimonial[] {
  return testimonialService.resetTestimonialsToDefaults();
}
