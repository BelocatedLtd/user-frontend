"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TaskSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Safely extract the 'platform' parameter
  const platform = searchParams?.get("platform") || "unknown";

  useEffect(() => {
    if (platform !== "unknown") {
      // Redirect after 3 seconds
      const timer = setTimeout(() => {
        router.replace(`/dashboard/taskearn/${platform}`);
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    } else {
      console.error("Platform parameter is missing!");
    }
  }, [platform, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {platform !== "unknown" ? (
        <h1 className="text-3xl font-bold text-green-600">
          Task Created Successfully on {platform}!
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
