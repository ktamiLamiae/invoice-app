"use client";
import React, { useEffect } from "react";
import { useLoading } from "../app/contexts/LoadingContext";

const Dashboard = () => {
    const { setLoading } = useLoading();
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [setLoading]);

    return (
        <div className="flex items-center justify-center h-[70vh] bg-indigo-100 text-gray-700">
            <div className="text-center p-6 bg-white shadow-xl rounded-lg w-96 max-w-full">
                <h1 className="text-3xl font-semibold text-indigo-700">Bienvenue dans votre gestion des factures !</h1>
                <p className="mt-4 text-lg">Gérez vos factures facilement et rapidement. Suivez l'évolution de vos paiements et restez organisé.</p>
                <div className="mt-6">
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                        Commencer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
