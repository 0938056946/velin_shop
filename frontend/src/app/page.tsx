"use client";
import Image from "next/image";
import Category from "./components/Category";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* Hero section */}
      <section className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Ảnh trái */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-1/2 h-1/2 md:h-full"
        >
          <Image
            src="/images/home2.jpg"
            alt="Home Left"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Ảnh phải */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-1/2 h-1/2 md:h-full"
        >
          <Image
            src="/images/home1.png"
            alt="Home Right"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Overlay gradient + Logo chữ cực to */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center 
                     bg-gradient-to-t from-black/60 via-black/40 to-transparent text-white"
        >
          <h1 className="text-[12vw] md:text-[10vw] font-serif tracking-widest drop-shadow-[0_5px_10px_rgba(0,0,0,0.9)]">
            Velvet Linen
          </h1>

          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-6 px-8 py-3 border border-white text-white text-sm tracking-wide 
                       hover:bg-white hover:text-black transition"
          >
           KHÁM PHÁ TOÀN BỘ BỘ SƯU TẬP
          </motion.button>
        </motion.div>
      </section>

      {/* Section tiếp theo */}
      <section className="w-full py-20 bg-white text-center">
        <Category></Category>
      </section>
      {/* Section tiếp theo 3 */}
      {/* Section 3 - Services with video */}
      <section className="w-full py-20 bg-gray-50">
        <h2 className="text-3xl font-serif tracking-widest text-center mb-16 text-black">
          DỊCH VỤ CỦA CHÚNG TÔI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-20">
          {[
            {
              src: "/video/main-3.mp4",
              title: "BOOK AN APPOINTMENT",
              desc: `Khám phá hành trình thời trang nơi sự tinh tế và sáng tạo hòa quyện trong từng chi tiết. 
              Bộ sưu tập mang đến cảm hứng hiện đại nhưng vẫn giữ trọn nét sang trọng cổ điển. 
              Mỗi thiết kế là một câu chuyện, giúp bạn khẳng định cá tính và phong cách riêng biệt. 
              Trải nghiệm không chỉ là quần áo, mà là nghệ thuật sống cùng thời trang.`,
            },
            {
              src: "/video/main.mp4",
              title: "COLLECT IN STORE",
              desc: `Đặt hàng online dễ dàng và nhận sản phẩm trực tiếp tại cửa hàng gần bạn. 
              Trải nghiệm mua sắm thuận tiện, nhanh chóng và vẫn giữ được sự sang trọng. 
              Nhân viên tại cửa hàng sẽ hỗ trợ bạn để đảm bảo mọi chi tiết đều hoàn hảo.`,
            },
            {
              src: "/video/main-2.mp4",
              title: "PERSONALISATION",
              desc: `Dịch vụ cá nhân hoá mang đến trải nghiệm độc quyền cho bạn. 
              Khắc tên, in họa tiết hoặc thêm chi tiết thủ công tinh xảo trên túi, giày và phụ kiện. 
              Mỗi sản phẩm trở thành một phiên bản duy nhất, phản ánh cá tính và phong cách riêng biệt. 
              Đây là cách để biến thời trang thành dấu ấn cá nhân không thể trộn lẫn.`,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              {/* Video */}
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title + Description */}
              <h3 className="mt-6 text-xl font-semibold tracking-wide text-black">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
