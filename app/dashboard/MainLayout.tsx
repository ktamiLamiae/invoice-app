"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from '../contexts/LoadingContext';
import LoadingOverlay from '@/components/LoadingOverlay';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <SessionProvider>
            <LanguageProvider>
                <LoadingProvider>
                    <div className="bg-gray-200 h-screen overflow-x-hidden">
                        <div className="flex w-full">
                            <Sidebar />
                            <div className="w-full bg-lightgray">
                                <Header />
                                <section className="mx-10 lg:ml-72 lg:mr-10 py-10">
                                    <LoadingOverlay />
                                    {children}
                                </section>
                            </div>
                        </div>
                    </div>
                </LoadingProvider>
            </LanguageProvider>
        </SessionProvider>
    );
};

export default MainLayout;
