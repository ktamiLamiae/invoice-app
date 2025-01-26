"use client";
import React from "react";
import { PropagateLoader } from "react-spinners"; 
import { useLoading } from "../app/contexts/LoadingContext";
const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    isLoading && (
      <div className="fixed inset-0 bg-gray-200 flex items-center justify-center z-50">
        <PropagateLoader color="#4c51bf" size={30} margin={2} />
      </div>
    )
  );
};

export default LoadingOverlay;
