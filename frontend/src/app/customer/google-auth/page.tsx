"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function GoogleAuthRedirect() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Lấy token, name, role từ URL sau khi redirect từ backend
    const token = params.get("token");
    const name = params.get("name");
    const role = params.get("role");

    if (token && name) {
      // Lưu chung thành 1 object user
      const user = { name, role, token };
      localStorage.setItem("user", JSON.stringify(user));
    
      // Phát event để Header/Sidebar biết đã login
      window.dispatchEvent(new Event("user-logged-in"));
    
      router.push("/");
    }
     else {
      // Trường hợp lỗi: không nhận được token
      router.push("/sign-in?error=Không nhận được token từ Google");
    }
  }, [params, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold text-gray-700">Đang xử lý đăng nhập bằng Google...</p>
    </div>
  );
}
