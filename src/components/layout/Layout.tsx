import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCareBar } from './FloatingCareBar';
import { DoctorAdminActionBar } from './DoctorAdminActionBar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <DoctorAdminActionBar />
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <FloatingCareBar />
    </div>
  );
};
