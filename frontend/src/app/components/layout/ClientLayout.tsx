"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Khi mount lần đầu: load user từ localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Lắng nghe thay đổi localStorage (login/logout)
    const syncUser = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // Scroll để show logo
  useEffect(() => {
    const onScroll = () => {
      setShowHeaderLogo(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header
        onOpenSidebar={() => setSidebarOpen(true)}
        showLogo={showHeaderLogo}
        user={user}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      {children}

      <Footer />
    </>
  );
}
