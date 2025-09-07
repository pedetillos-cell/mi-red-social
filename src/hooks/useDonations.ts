// src/hooks/useDonations.ts
'use client';

import { useState, useCallback } from 'react';

export interface Donation {
  id: string;
  username: string;
  amount: number;
  message: string;
  currency: string;
  timestamp: Date;
}

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentAlert, setCurrentAlert] = useState<Donation | null>(null);

  const addDonation = useCallback((donation: Omit<Donation, 'id' | 'timestamp'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    setDonations(prev => [newDonation, ...prev]);
    setCurrentAlert(newDonation);
  }, []);

  const completeAlert = useCallback(() => {
    setCurrentAlert(null);
  }, []);

  return {
    donations,
    currentAlert,
    addDonation,
    completeAlert
  };
};