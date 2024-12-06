"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CountdownPage = () => {
  const [count, setCount] = useState(10); // Countdown duration in seconds
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
      router.push('/dashboard/wallet'); // Redirect after countdown
    }

    return () => clearInterval(interval);
  }, [count, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Redirecting to your wallet...</h1>
      <p className="text-lg">Please wait for {count} seconds</p>
    </div>
  );
};

export default CountdownPage;
