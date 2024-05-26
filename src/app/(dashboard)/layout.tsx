import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import React from "react";
import Sidebar from "./DashboardComponents/Sidebar/Sidebar";

const NotoBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "700"],
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "Dentist",
  description: "created by shadipto",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`py-14 bg-[#183D3D]`}>
        <section className="container mx-auto">
            <div className="flex gap-6">
            <Sidebar></Sidebar>
            <div className="w-full bg-[#040D12] rounded-lg border-2 border-gray-200 p-6">{children}</div>
            </div>
        </section>
    </main>
  );
}
