"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // 🟢 thêm Link
import { motion, AnimatePresence } from "framer-motion";
import api from "@/app/api/axios";

interface Category {
  id: number;
  name: string;
  image_url: string;
}

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [index, setIndex] = useState(0);

  // Gọi API categories
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.error("Lỗi load categories", err);
      }
    })();
  }, []);

  // Auto slide 3s
  useEffect(() => {
    const interval = setInterval(() => {
      if (categories.length > 0) {
        setIndex((prev) => (prev + 1) % categories.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [categories]);

  // Lấy 4 phần tử liên tiếp
  const getCurrentSlide = () => {
    if (categories.length === 0) return [];
    const result: Category[] = [];
    for (let i = 0; i < 4; i++) {
      result.push(categories[(index + i) % categories.length]);
    }
    return result;
  };

  return (
    <section className="w-full py-20 bg-white text-center">
      <h2 className="text-3xl font-serif tracking-widest mb-10 text-black">
        DANH MỤC SẢN PHẨM
      </h2>

      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8"
          >
            {getCurrentSlide().map((cat) => (
              <Link
                href={`/customer/category/${cat.id}`} // 🟢 khi click sẽ qua trang category
                key={cat.id}
                className="group rounded-lg shadow-md overflow-hidden block"
              >
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  width={400}
                  height={500}
                  className="object-cover w-full h-[300px] group-hover:scale-105 transition-transform duration-500"
                />
                <p className="mt-4 text-black font-medium group-hover:text-blue-600 transition ">
                  {cat.name}
                </p>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Nút điều khiển */}
        <button
          onClick={() =>
            setIndex((prev) =>
              prev === 0 ? categories.length - 1 : prev - 1
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() =>
            setIndex((prev) => (prev + 1) % categories.length)
          }
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
        >
          ›
        </button>
      </div>
    </section>
  );
}
