"use client";

import { useEffect} from "react";
import { useRouter } from "next/navigation";
import { IoClose } from 'react-icons/io5'; 
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

  const handleClose = () => {
    router.push('/dashboard'); // Redirect to the dashboard on close
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Activate Your Wallet
          </h2>
          <p className="mt-4 text-gray-600">
            To start earning, kindly activate your wallet by making a deposit
            of <strong>₦200</strong> or more.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Note: This money remains yours and can be withdrawn at any time.
          </p>

          {/* Fund Wallet Button */}
          <button
            onClick={handleFundWalletClick}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Fund Wallet
          </button>
        </div>
      </div>
    </div>
  );
};



export default ActivateWalletPage;
