"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SessionProvider } from "next-auth/react"; 

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <SessionProvider> 
            <LanguageProvider>
                <div className="bg-gray-200 h-screen overflow-x-hidden">
                    <div className="flex w-full">
                        <Sidebar />
                        <div className="w-full bg-lightgray">
                            <Header />
                            <section className="mx-10 lg:ml-72 lg:mr-10 py-10">
                                {children}
                            </section>
                        </div>
                    </div>
                </div>
            </LanguageProvider>
        </SessionProvider>
    );
};

export default MainLayout;
