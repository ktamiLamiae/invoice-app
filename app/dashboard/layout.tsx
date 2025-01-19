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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <div className="bg-gray-200 h-screen overflow-x-hidden">
            <div className="flex w-full">
              <Sidebar />
              <div className="w-full bg-lightgray">
                <Header />
                <section className="mx-10 lg:ml-72 lg:mr-10 py-10">
                  <div>{children}</div>
                </section>
              </div>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
