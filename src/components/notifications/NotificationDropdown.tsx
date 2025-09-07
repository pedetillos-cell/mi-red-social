"use client";

import { useNotifications } from "@/lib/context/NotificationContext";

interface NotificationDropdownProps {
  onClose: () => void;
  onMarkAllRead: () => void;
}

export default function NotificationDropdown({ onClose, onMarkAllRead }: NotificationDropdownProps) {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notificaciones</h3>
          <button
            onClick={onMarkAllRead}
            className="text-sky-500 text-sm hover:text-sky-600"
          >
            Marcar todo como leído
          </button>
        </div>
      </div>

      {/* Lista de notificaciones */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No hay notificaciones
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleTimeString('es-ES')}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <a
          href="/notifications"
          className="block text-center text-sm text-sky-500 hover:text-sky-600"
        >
          Ver todas las notificaciones
        </a>
      </div>
    </div>
  );
}