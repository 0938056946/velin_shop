/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import {
  FaGoogle,
  FaFacebook,
  FaApple,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Đăng nhập bằng email + password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", form);

      if (res.data.status) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token ?? "");

        Swal.fire({
          title: "Đăng nhập thành công 🎉",
          text: `Chào mừng bạn trở lại, ${res.data.user.name}!`,
          icon: "success",
        }).then(() => router.push("/"));
      } else {
        Swal.fire({
          title: "Đăng nhập thất bại",
          text: res.data.message || "Vui lòng kiểm tra lại thông tin",
          icon: "error",
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: "Lỗi đăng nhập",
        text: err.response?.data?.message || "Đã xảy ra lỗi hệ thống",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login qua Socialite
  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <img
            src="/images/logo.png"
            alt="Victory Shop"
            className="mx-auto w-16 h-16"
          />
          <h1 className="text-2xl font-bold text-gray-800">Victory Shop</h1>
          <p className="text-gray-500 text-sm">Đăng nhập để tiếp tục mua sắm</p>
        </div>

        {/* Social login */}
        <div className="space-y-3 text-sm font-medium">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FaGoogle /> Đăng nhập bằng Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            <FaFacebook /> Đăng nhập với Facebook
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            <FaApple /> Đăng nhập bằng Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">hoặc đăng nhập bằng email</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email + Password */}
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="bg-gray-100 px-3 text-gray-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 w-full outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="bg-gray-100 px-3 text-gray-500">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              className="p-2 w-full outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Quên mật khẩu */}
        <div className="text-center">
          <Link
            href="/comp/forgot_password"
            className="text-blue-600 text-sm hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Chuyển qua Sign Up */}
        <div className="text-center text-sm text-gray-700">
          Chưa có tài khoản?{" "}
          <Link href="/customer/sign_up" className="text-blue-600 font-semibold">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
