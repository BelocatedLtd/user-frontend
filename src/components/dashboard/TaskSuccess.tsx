"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TaskCreated: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get("platform");

  useEffect(() => {
    if (platform) {
      const timer = setTimeout(() => {
        router.replace(`/dashboard/taskearn/${platform}`);
        window.location.reload(); // Reload the page after navigation
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [platform, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">
        Task Created Successfully on {platform}!
      </h1>
    </div>
  );
};

export default TaskCreated;
