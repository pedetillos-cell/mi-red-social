"use client";

import { useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "@/lib/context/NotificationContext";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, markAllAsRead } = useNotifications();

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen && unreadCount > 0) {
            markAllAsRead();
          }
        }}
        className="relative p-2 text-gray-600 hover:text-sky-600 transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <NotificationDropdown 
          onClose={() => setIsOpen(false)}
          onMarkAllRead={markAllAsRead}
        />
      )}
    </div>
  );
}