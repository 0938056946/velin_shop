/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Bước 1: Nhập email và xác nhận
  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Gửi thử request với email thôi (backend sẽ validate unique)
      await api.post("/register", { email: form.email, name: "tmp", password: "Tmp@123456" });

      // Nếu không lỗi thì email hợp lệ (nhưng mình không lưu user này)
      Swal.fire({
        title: "Email hợp lệ 🎉",
        text: "Tiếp tục tạo tài khoản nhé",
        icon: "success",
      }).then(() => setStep(2));
    } catch (err: any) {
      if (err.response?.status === 422) {
        Swal.fire({
          title: "Email không hợp lệ",
          text: err.response.data.message?.email?.[0] || "Vui lòng dùng email khác",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Lỗi",
          text: "Có lỗi khi kiểm tra email",
          icon: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Bước 2: Đăng ký chính thức
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/register", form);

      if (res.data.status) {
        Swal.fire({
          title: "Đăng ký thành công 🎉",
          text: "Vui lòng kiểm tra email để xác nhận tài khoản",
          icon: "success",
        }).then(() => router.push("/customer/sign_in"));
      } else {
        Swal.fire({
          title: "Đăng ký thất bại",
          text: res.data.message || "Vui lòng thử lại",
          icon: "error",
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: "Lỗi đăng ký",
        text: err.response?.data?.message || "Đã xảy ra lỗi hệ thống",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-500 text-sm">Tạo tài khoản để mua sắm</p>
        </div>

        {/* Form */}
        {step === 1 ? (
          <form onSubmit={handleCheckEmail} className="space-y-4 text-black">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Đang kiểm tra..." : "Xác nhận email"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 text-black">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="bg-gray-100 px-3 text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
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
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>
          </form>
        )}

        {/* Chuyển qua Sign In */}
        <div className="text-center text-sm text-gray-700">
          Đã có tài khoản?{" "}
          <Link href="/customer/sign_in" className="text-blue-600 font-semibold">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
