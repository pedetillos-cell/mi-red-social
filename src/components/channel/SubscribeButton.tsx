"use client";

import { useState } from "react";

interface SubscribeButtonProps {
  channelId: string;
}

export default function SubscribeButton({ 
  channelId
}: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <button
      onClick={handleSubscribe}
      className={`px-6 py-2 rounded-full font-semibold transition-all ${
        isSubscribed
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-red-600 text-white hover:bg-red-700"
      }`}
    >
      {isSubscribed ? "Suscrito" : "Suscribirse"}
    </button>
  );
}