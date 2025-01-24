import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import "./dashboard.css";
import type { Metadata } from "next";
import MainLayout from "./MainLayout";

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
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
