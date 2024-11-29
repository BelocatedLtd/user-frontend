"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const ActivateWalletPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Add a listener to close modal on Escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/dashboard'); // Redirect back to the earn page if Escape is pressed
      }
    };

    window.addEventListener('keydown', handleEscape);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [router]);

  const handleFundWalletClick = () => {
    router.push('/dashboard/wallet'); // Redirect to the deposit page when the user clicks "Fund Wallet"
  };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-4/5 sm:w-1/3 shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          To Start Earning
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Kindly activate your wallet by making a deposit of 200 Naira and above.
        </p>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleFundWalletClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Fund Wallet
          </button>
        </div>
        <p className="text-center text-sm text-gray-500">
          The money is yours once deposited. You can withdraw or use it as you like.
        </p>
      </div>
    </div>
  );
};

export default ActivateWalletPage;
