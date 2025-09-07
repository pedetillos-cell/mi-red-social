// components/profile/SubscribeButton.tsx
"use client";

import { useState } from 'react';

interface SubscribeButtonProps {
  channelId: string;
  isSubscribed: boolean;
  subscriberCount: number;
}

export default function SubscribeButton({ channelId, isSubscribed, subscriberCount }: SubscribeButtonProps) {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [count, setCount] = useState(subscriberCount);

  const handleSubscribe = async () => {
    try {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // En una aplicación real, aquí haríamos:
      /*
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelId, subscribe: !subscribed }),
      });

      if (response.ok) {
        setSubscribed(!subscribed);
        setCount(prev => subscribed ? prev - 1 : prev + 1);
      }
      */
      
      setSubscribed(!subscribed);
      setCount(prev => subscribed ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error al suscribirse:', error);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      style={{
        padding: '0.75rem 1.5rem',
        background: subscribed ? '#6b7280' : '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        minWidth: '120px',
        transition: 'background-color 0.2s ease'
      }}
    >
      {subscribed ? 'Suscrito' : 'Suscribirse'} • {count.toLocaleString()}
    </button>
  );
}