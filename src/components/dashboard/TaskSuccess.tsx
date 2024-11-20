import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TaskSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const platform = searchParams.get("platform"); // Extract 'platform'

  useEffect(() => {
    if (platform) {
      // If platform exists, redirect after 3 seconds
      const timer = setTimeout(() => {
        navigate(`/dashboard/taskearn/${platform}`, { replace: true });
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Handle missing platform gracefully
      console.error("Platform query parameter is missing!");
    }
  }, [platform, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {platform ? (
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
