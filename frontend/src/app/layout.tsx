import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victory Store",
  description: "Website bán hàng Victory Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Bọc toàn bộ app trong GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId="954987065740-n72ej2a6k1pqf355r7d8g05i4epavupm.apps.googleusercontent.com">
          <ClientLayout>{children}</ClientLayout>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
