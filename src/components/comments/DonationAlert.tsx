// src/components/DonationAlert.tsx
'use client';

import { useEffect, useState } from 'react';

interface Donation {
  id: string;
  username: string;
  amount: number;
  message: string;
  currency: string;
}

interface DonationAlertProps {
  donation: Donation;
  onComplete: () => void;
}

export default function DonationAlert({ donation, onComplete }: DonationAlertProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed top-4 right-4 transform transition-transform duration-500 ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    } z-50`}>
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-xl max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">💰</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">¡Nueva donación!</h3>
            <p className="font-semibold text-xl">${donation.amount} {donation.currency}</p>
            <p className="text-sm">De: {donation.username}</p>
            {donation.message && (
              <p className="text-sm italic mt-1">"{donation.message}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}