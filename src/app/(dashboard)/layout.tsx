import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import React from "react";
import Sidebar from "./DashboardComponents/Sidebar/Sidebar";
import Header from "../components/Header/Header";

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
    <main className={` bg-[#183D3D]`}>
      <section className="bg-[#040D12] border-t-2 border-gray-200 md:px-5 overflow-auto">
        {/* <Header></Header> */}
        <div className="flex gap-6">
          <Sidebar></Sidebar>
          <div className="w-full overflow-auto lg:border-l-2 border-gray-200 p-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
