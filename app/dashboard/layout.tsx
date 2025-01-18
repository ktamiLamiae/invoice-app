// "use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import "./dashboard.css";
import type { Metadata } from "next";
import { LanguageProvider } from '../contexts/LanguageContext';


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
    <div className="bg-gray-200 h-screen overflow-x-hidden">
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full bg-lightgray">
            <Header />
          <section id="content" className="lg:ml-72 p-6 transition-all duration-300 ease-in-out">
            <div className="lg:ml-72">
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
    </LanguageProvider>
  );
}
