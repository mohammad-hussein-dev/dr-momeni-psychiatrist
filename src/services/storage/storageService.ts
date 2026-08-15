/**
 * Safe local storage service with error boundaries and typed storage keys.
 * Handles storage availability checks, JSON parsing safety, and cross-tab/in-app synchronization.
 */

export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch (error) {
      console.warn(`[safeStorage] Failed to read or parse key "${key}":`, error);
      return fallback;
    }
  },

  getString(key: string, fallback = ''): string {
    if (typeof window === 'undefined') return fallback;
    try {
      const value = window.localStorage.getItem(key);
      return value !== null ? value : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T, eventName?: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
      if (eventName) {
        window.dispatchEvent(new CustomEvent(eventName, { detail: value }));
      }
      return true;
    } catch (error) {
      console.error(`[safeStorage] Failed to save key "${key}":`, error);
      return false;
    }
  },

  remove(key: string, eventName?: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.removeItem(key);
      if (eventName) {
        window.dispatchEvent(new CustomEvent(eventName));
      }
      return true;
    } catch {
      return false;
    }
  }
};
