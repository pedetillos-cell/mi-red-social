"use client";

import { useNotifications } from "@/lib/context/NotificationContext";

export default function TestNotificationButton() {
  const { socket } = useNotifications();

  const sendTestNotification = () => {
    if (socket) {
      // Simular diferentes tipos de notificaciones
      const types = ["follow", "like", "comment"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const testUsers = ["usuario123", "devmaster", "coderpro"];
      const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)];

      const messages = {
        follow: `@${randomUser} empezó a seguirte`,
        like: `A @${randomUser} le gustó tu video`,
        comment: `@${randomUser} comentó en tu video: "¡Excelente contenido!"`
      };

      socket.emit("notification", {
        type: randomType,
        message: messages[randomType as keyof typeof messages],
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <button
      onClick={sendTestNotification}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      🔔 Enviar notificación de prueba
    </button>
  );
}