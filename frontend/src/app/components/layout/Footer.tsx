"use client";

import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-20 relative overflow-hidden">
      {/* Subscribe section */}
      <div className="border-b border-gray-800 py-14 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 uppercase tracking-widest">
          SUBSCRIBE
        </h2>
        <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Đăng ký để nhận thông tin ưu đãi độc quyền và cập nhật bộ sưu tập mới
          nhất từ Velin. Trải nghiệm thời trang sang trọng, hiện đại mỗi ngày.
        </p>
        <form className="max-w-xl mx-auto flex shadow-lg rounded-lg overflow-hidden">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="flex-grow px-5 py-4 bg-gray-800 text-gray-200 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-yellow-400 text-black font-semibold text-sm 
                       uppercase tracking-wide hover:bg-yellow-500 transition"
          >
            Đăng ký
          </button>
        </form>
      </div>

      {/* Footer main content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo + mô tả */}
        <div className="md:col-span-1">
          <img src="/images/logo.png" alt="Velin" className="h-14 mb-6" />
          <p className="text-base text-gray-400 leading-relaxed">
            Velin – thương hiệu thời trang cao cấp, mang đến thiết kế tinh tế và
            hiện đại. Trải nghiệm sự sang trọng trong từng chi tiết.
          </p>
          {/* Social icons */}
          <div className="flex gap-5 mt-8">
            {[
              { icon: <FaFacebookF />, href: "#", color: "hover:bg-blue-600" },
              { icon: <FaInstagram />, href: "#", color: "hover:bg-pink-600" },
              { icon: <FaYoutube />, href: "#", color: "hover:bg-red-600" },
              { icon: <FaTwitter />, href: "#", color: "hover:bg-sky-500" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`w-14 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white 
                           text-xl hover:scale-125 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] 
                           transition transform ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider border-b-2 border-yellow-400 inline-block pb-2">
            Product
          </h3>
          <ul className="space-y-4 text-base">
            <li>
              <Link href="/categories" className="hover:text-white">
                Quần áo Nam
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-white">
                Quần áo Nữ
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-white">
                Phụ kiện
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-white">
                Bộ sưu tập
              </Link>
            </li>
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider border-b-2 border-yellow-400 inline-block pb-2">
            Use Cases
          </h3>
          <ul className="space-y-4 text-base">
            <li>
              <a href="#" className="hover:text-white">
                Fashionista
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Doanh nghiệp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Phong cách cá nhân
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Thời trang sự kiện
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider border-b-2 border-yellow-400 inline-block pb-2">
            Company
          </h3>
          <ul className="space-y-4 text-base">
            <li>
              <Link href="/about" className="hover:text-white">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white">
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/teams" className="hover:text-white">
                Đội ngũ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-8 uppercase tracking-wider border-b-2 border-yellow-400 inline-block pb-2">
            Contact Us
          </h3>
          <ul className="space-y-2 text-base text-gray-400">
            {/* Address */}
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">📍</span>
              <div>
                <span className="block">123 Nguyễn Huệ, Quận 1</span>
                <span className="block">TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <span className="text-yellow-400 text-lg">✉️</span>
              <a
                href="mailto:support@velin.com"
                className="hover:text-white hover:underline transition"
              >
                support@velin.com
              </a>
            </li>

            {/* Hotline */}
            <li className="flex items-center gap-3">
              <span className="text-yellow-400 text-lg">📞</span>
              <a
                href="tel:+84123456789"
                className="hover:text-white hover:underline transition"
              >
                +84 123 456 789
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">Velin Fashion</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
