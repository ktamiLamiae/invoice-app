"use client";

import { useLoader } from "@/app/contexts/LoaderContext";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <PulseLoader color="#4f46e5" size={20} />
        </div>
    );
};

export default Loading;
