"use client";
import { FaShoppingBag, FaUser, FaSearch, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import api from "@/app/api/axios";

interface HeaderProps {
  onOpenSidebar: () => void;
  showLogo: boolean;
  user?: { name: string } | null;
}

export default function Header({ onOpenSidebar, showLogo, user }: HeaderProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  // 🛑 Hàm logout
  const handleLogout = async () => {
    try {
      await api.post("/logout"); // gọi API backend
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user"); // xoá user localStorage
      setOpenMenu(false);
      router.push("/customer/sign_in"); // chuyển sang trang đăng nhập
    }
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        showLogo ? "bg-white shadow text-black" : "bg-transparent text-black"
      }`}
    >
      <div className="px-6 py-5 flex items-center justify-between font-bold">
        {/* Trái */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenSidebar}
            className="flex items-center gap-2 text-sm tracking-widest hover:opacity-70 transition"
          >
            <FaBars size={20} />
            <span>MENU</span>
          </button>
        </div>

        {/* Logo giữa */}
        <div className="flex-1 flex justify-center">
          {showLogo && (
            <h1 className="text-2xl font-serif tracking-widest">VELIN</h1>
          )}
        </div>

        {/* Phải */}
        <div className="flex items-center gap-6 relative">
          <button className="hover:opacity-70 transition">
            <FaShoppingBag size={20} />
          </button>
          <button className="hover:opacity-70 transition">
            <FaUser size={20} />
          </button>
          <button className="hover:opacity-70 transition">
            <FaSearch size={20} />
          </button>

          {/* Nếu chưa đăng nhập thì hiện SIGN IN */}
          {!user ? (
            <button
              onClick={() => router.push("/customer/sign_in")}
              className="text-sm tracking-widest border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
            >
              SIGN IN
            </button>
          ) : (
            <div className="relative">
              <div
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-2 px-4 py-1 rounded-full border border-black bg-transparent 
                           text-black transition-all duration-300 cursor-pointer
                           hover:bg-black hover:text-white"
              >
                {/* Avatar tròn */}
                <div
                  className="h-7 w-7 flex items-center justify-center rounded-full border border-black font-bold
                             transition-all duration-300
                             hover:bg-white hover:text-black"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {/* Tên */}
                <span className="text-sm font-medium tracking-wide">
                  {user.name}
                </span>
              </div>

              {/* Dropdown */}
              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
