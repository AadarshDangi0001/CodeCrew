import React from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import Cursor from './components/cursor/Cursor';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import PageLoader from './components/Loader/PageLoader';

const Layout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {/* Global Tech Background */}
      <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>

        {/* Floating Glowing Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] mix-blend-screen"></div>

        {/* Large Watermark Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.02] whitespace-nowrap select-none tracking-widest">
          CODE CREW
        </div>
      </div>

      {!hideNavAndFooter && <Navbar />}
      <Cursor />
      <AppRoutes />
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <PageLoader>
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  </PageLoader>
);

export default App;

