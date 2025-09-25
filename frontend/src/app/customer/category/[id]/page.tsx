"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/api/axios";

export default function CategoryPage() {
  const params = useParams();
  const { id } = params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        setCategory(res.data.data);
      } catch (err) {
        console.error("Lỗi load category", err);
      }
    })();
  }, [id]);

  if (!category) return <p>Đang tải...</p>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p className="text-gray-600 mb-6">{category.description}</p>
      <img
        src={category.image_url}
        alt={category.name}
        className="w-[400px] rounded-lg shadow"
      />
    </main>
  );
}
