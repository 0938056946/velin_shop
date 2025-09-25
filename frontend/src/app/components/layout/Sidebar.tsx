"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  XMarkIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import api from "@/app/api/axios";

interface Category {
  id: number;
  name: string;
}

interface Band {
  id: number;
  name: string;
  category_id: number;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  user?: { name: string } | null;
}

export default function Sidebar({ open, onClose, user }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<"categories" | "bands">("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    if (open) {
      setLoading(true);
      api
        .get("/categories")
        .then((res) => setCategories(res.data.data || []))
        .catch((err) => console.error("Lỗi load categories:", err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      api
        .get(`/categories/${selectedCategory.id}/bands`)
        .then((res) => setBands(res.data.data || []))
        .catch((err) => console.error("Lỗi load bands:", err))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-110 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } font-serif`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Avatar tròn */}
          <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-black text-xl font-bold shadow-sm">
            {user ? user.name.charAt(0) : "K"}
          </div>
          {/* Tên */}
          <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 tracking-widest uppercase">
            {user ? `Xin chào, ${user.name}` : "Xin chào, Khách"}
          </h2>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
        >
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Menu */}
      <nav className="p-6 overflow-y-auto h-[calc(100%-72px)] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <ul className="space-y-6 text-gray-900 text-lg font-medium tracking-wide">
          {/* Trang chủ */}
          {view === "categories" && (
            <li>
              <Link
                href="/"
                className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 hover:text-blue-600 hover:scale-[1.02] transition-all duration-200"
                onClick={onClose}
              >
                Trang chủ
              </Link>
            </li>
          )}

          {/* Categories view */}
          {view === "categories" &&
            (loading ? (
              <p className="text-sm text-gray-400">Đang tải...</p>
            ) : (
              categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setView("bands");
                    }}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-xl hover:bg-gray-100 hover:text-blue-600 hover:scale-[1.02] transition-all duration-200"
                  >
                    <span className="flex items-center gap-3">{cat.name}</span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </li>
              ))
            ))}

          {/* Bands view */}
          {view === "bands" && (
            <>
              <li>
                <button
                  onClick={() => {
                    setView("categories");
                    setSelectedCategory(null);
                  }}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 text-blue-600 text-base font-medium transition-all duration-200"
                >
                  ⬅ Quay lại
                </button>
              </li>
              <li>
                <h3 className="text-gray-900 font-bold px-3 text-xl tracking-widest uppercase drop-shadow">
                  {selectedCategory?.name}
                </h3>
              </li>
              {loading ? (
                <p className="text-sm text-gray-400">Đang tải...</p>
              ) : (
                bands.map((band) => (
                  <li key={band.id}>
                    <Link
                      href={`/category/${selectedCategory?.id}/band/${band.id}`}
                      className="block px-3 py-3 rounded-xl hover:bg-gray-100 hover:text-blue-600 hover:scale-[1.02] transition-all duration-200"
                      onClick={onClose}
                    >
                      {band.name}
                    </Link>
                  </li>
                ))
              )}
            </>
          )}

          {/* Giỏ hàng + Đơn hàng + Logout */}
          {view === "categories" && (
            <>
              <li>
                <Link
                  href="/cart"
                  className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 hover:text-blue-600 hover:scale-[1.02] transition-all duration-200"
                  onClick={onClose}
                >
                  Giỏ hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-gray-100 hover:text-blue-600 hover:scale-[1.02] transition-all duration-200"
                  onClick={onClose}
                >
                  Đơn hàng
                </Link>
              </li>
              
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
