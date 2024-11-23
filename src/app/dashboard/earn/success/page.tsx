"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TaskSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const platform = searchParams?.get("platform") || "unknown";
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (platform !== "unknown") {

        const interval = setInterval(() => {
        setCountdown((prev) => prev - 1); 
      }, 1000);
      
      const timeout = setTimeout(() => {
        clearInterval(interval); 
      router.push(`/dashboard/taskearn/${platform}`);

      }, 10000);

      return () => {
        clearInterval(interval); 
        clearTimeout(timeout); 
      };
    } else {
      console.error("Platform parameter is missing!");
    }
  }, [platform, router]);

  return (
    <div className="container w-full min-h-screen pb-20 bg-gray-100">
      <div className="text-center bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-sm font-bold text-green-600 mb-4">
          Task Submitted Successfully!
        </h1>
        <p className="mt-2 text-sm text-gray-600">While you await Approval from Admin you can perform other available Task</p>
        <p className="text-sm text-gray-700 mb-6">
          Redirecting to <span className="font-semibold">Available task</span> page in:
        </p>
        <div
          className="text-sm font-extrabold text-white-800 bg-red-200 px-6 py-4 rounded-lg shadow-md animate-bounce"
        >
          {countdown}
        </div>
      </div>
    </div>
  );
};

export default TaskSuccess;
