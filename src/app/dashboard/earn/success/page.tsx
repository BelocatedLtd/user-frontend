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
    <div className="container w-full min-h-screen pb-20 bg-gray-100">
      {platform !== "unknown" ? (
        <h1 className="text-sm font-bold text-green-600">
          Task Created Successfully on {platform}!
          <p className="mt-2 text-sm text-gray-600">While you await Approval from Admin you can perform other available Task</p>

<p className="mt-2 text-sm text-gray-600">
    Redirecting in <span className="font-bold">{countdown}</span> seconds...
  </p>
        </h1>
     
      ) : (
        <h1 className="text-3xl font-bold text-red-600">
          Platform parameter is missing!
        </h1>
      )}
    </div>
  );
};

export default TaskSuccess;
