// ─── src/App.tsx ─────────────────────────────────────────────────────────────
/**
 * @fileoverview Root Application Component with Routing Configuration
 * @description Defines the main routing structure for the medical platform.
 *              Implements lazy loading for code-splitting and performance optimization.
 *              Uses React Router v6 with nested routes and layout wrapper.
 *
 * @architecture
 * - BrowserRouter: Client-side routing with HTML5 History API
 * - ThemeProvider: Global theme context (light/dark mode)
 * - LanguageProvider: i18n context (Persian/English)
 * - ScrollToTop: Resets scroll position on route change
 * - Layout: Shared layout wrapper (Header, Footer, Navigation)
 * - Lazy Loading: BookingPage loaded on-demand for performance
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 2.0.0
 * @since 2026-09-10
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageProvider';
import { ThemeProvider } from './lib/ThemeProvider';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Visits } from './pages/Visits';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { PatientPanel } from './pages/PatientPanel';
import { AdminPanel } from './pages/AdminPanel';
import { Developer } from './pages/Developer';
import { NotFound } from './pages/NotFound';

// ─── Lazy-Loaded Components (Code Splitting) ────────────────────────────────

/**
 * @constant BookingPage
 * @description Lazy-loaded booking page for performance optimization.
 *              Only loaded when user navigates to /booking or /reserve.
 * @note Reduces initial bundle size by ~50KB
 */
const BookingPage = lazy(() => import('./pages/BookingPage'));

// ─── Loading Fallback Component ─────────────────────────────────────────────

/**
 * @component LoadingFallback
 * @description Professional loading spinner shown during lazy component loading
 * @returns {React.FC} Rendered loading UI
 */
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
  <div className="flex flex-col items-center gap-4">
  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  <p className="text-sm text-muted-foreground font-medium">
  در حال بارگذاری...
  </p>
  </div>
  </div>
);

// ─── Main Application Component ─────────────────────────────────────────────

/**
 * @component App
 * @description Root application component with complete routing configuration.
 *              Wraps all routes with global providers (Theme, Language, Layout).
 *
 * @features
 * - Nested routing with Layout wrapper
 * - Lazy loading for BookingPage (code splitting)
 * - Suspense fallback for loading states
 * - Multiple route aliases (e.g., /developer, /about-developer, /creator)
 * - 404 fallback for undefined routes
 * - RTL-aware layout
 *
 * @returns {React.FC} Rendered application with routing
 *
 * @example
 * ```tsx
 * // In main.tsx
 * import App from './App';
 * ReactDOM.createRoot(document.getElementById('root')).render(<App />);
 * ```
 */
export default function App() {
  return (
    <BrowserRouter>
    {/* ─── Global Providers ─────────────────────────────────────────────── */}
    <ThemeProvider>
    <LanguageProvider>
    {/* ─── Scroll Management ─────────────────────────────────────────── */}
    <ScrollToTop />

    {/* ─── Route Definitions ─────────────────────────────────────────── */}
    <Routes>
    {/* ─── Main Layout Wrapper ─────────────────────────────────────── */}
    <Route path="/" element={<Layout />}>
    {/* ─── Public Pages ──────────────────────────────────────────── */}
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="services" element={<Services />} />
    <Route path="visits" element={<Visits />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:slug" element={<BlogPost />} />
    <Route path="testimonials" element={<Testimonials />} />
    <Route path="contact" element={<Contact />} />

    {/* ─── Booking System (Lazy-Loaded) ──────────────────────────── */}
    <Route
    path="booking"
    element={
      <Suspense fallback={<LoadingFallback />}>
      <BookingPage />
      </Suspense>
    }
    />
    <Route
    path="reserve"
    element={
      <Suspense fallback={<LoadingFallback />}>
      <BookingPage />
      </Suspense>
    }
    />

    {/* ─── Developer & Admin Pages ───────────────────────────────── */}
    <Route path="developer" element={<Developer />} />
    <Route path="about-developer" element={<Developer />} />
    <Route path="creator" element={<Developer />} />
    <Route path="panel" element={<PatientPanel />} />
    <Route path="admin" element={<AdminPanel />} />
    <Route path="doctor" element={<AdminPanel />} />

    {/* ─── 404 Fallback ──────────────────────────────────────────── */}
    <Route path="*" element={<NotFound />} />
    </Route>
    </Routes>
    </LanguageProvider>
    </ThemeProvider>
    </BrowserRouter>
  );
}

// ─── End of File ─────────────────────────────────────────────────────────────
