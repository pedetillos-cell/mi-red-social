"use client";

import { useState } from "react";

interface DonationButtonProps {
  channelId: string;
  channelName: string;
  isEligibleForMonetization?: boolean;
}

export default function DonationButton({ 
  channelId, 
  channelName, 
  isEligibleForMonetization = false 
}: DonationButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(5);

  const handleDonate = () => {
    console.log(`Donando $${amount} a ${channelName}`);
    setShowModal(false);
    setAmount(5);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600"
      >
        <span>💝</span>
        <span>Apoyar</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Apoyar a @{channelName}</h3>
            
            {!isEligibleForMonetization && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-yellow-700 text-sm">
                  Este creador aún no cumple con los requisitos de monetización de Vryno. 
                  Tu donación lo ayudará a seguir creciendo.
                </p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cantidad (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {[1, 5, 10, 20].map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`p-2 border rounded-md ${
                    amount === value
                      ? "bg-sky-500 text-white border-sky-500"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDonate}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Donar ${amount}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}