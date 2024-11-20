"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TaskSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const platform = searchParams?.get("platform") || "unknown";
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (platform !== "unknown") {

        const interval = setInterval(() => {
        setCountdown((prev) => prev - 1); 
      }, 1000);
      
      const timeout = setTimeout(() => {
        clearInterval(interval); 
      router.push(`/dashboard/taskearn/${platform}`);

      }, 5000);

      return () => {
        clearInterval(interval); 
        clearTimeout(timeout); 
      };
    } else {
      console.error("Platform parameter is missing!");
    }
  }, [platform, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="text-center bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Task Created Successfully!
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Redirecting to <span className="font-semibold">{platform}</span> page in:
        </p>
        <div
          className="text-5xl font-extrabold text-blue-800 bg-blue-200 px-6 py-4 rounded-lg shadow-md animate-bounce"
        >
          {countdown}
        </div>
      </div>
    </div>
  );
};

export default TaskSuccess;
