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
                {platform !== "unknown" ? (
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">
                        Task Created Successfully!

                        <p className="mt-2 text-sm text-gray-600">While you await Approval from Admin you can perform other available Task</p>

                        <p className="text-xl text-gray-700 mb-6">
                            Redirecting to <span className="font-semibold">{platform}</span> page in:
                        </p>
                        <div
                            className="text-5xl font-extrabold text-blue-800 bg-blue-200 px-6 py-4 rounded-lg shadow-md animate-bounce"
                        >
                            {countdown}
                        </div>
                    </h1>

                ) : (
                    <h1 className="text-3xl font-bold text-red-600">
                        Platform parameter is missing!
                    </h1>
                )}
            </div>
        </div>
    );
};

export default TaskSuccess;
