export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      type: "like",
      message: "A @devmaster le gustó tu video 'Tutorial de Next.js'",
      time: "Hace 5 min",
      read: false
    },
    {
      id: "2",
      type: "comment",
      message: "@javierlayos comentó en tu video: '¡Excelente contenido!'",
      time: "Hace 30 min",
      read: false
    },
    {
      id: "3",
      type: "subscribe",
      message: "@techlover se suscribió a tu canal",
      time: "Hace 2 horas",
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notificaciones</h1>
        
        <div className="bg-white rounded-lg shadow">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 last:border-b-0 ${
                !notification.read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">
                    {notification.type === 'like' && '❤️'}
                    {notification.type === 'comment' && '💬'}
                    {notification.type === 'subscribe' && '🔔'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 mb-1">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}