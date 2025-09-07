"use client";

import { useState, useEffect } from "react";

export default function ChatPage({ params }: { params: Promise<{ username: string }> }) {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "¡Hola! ¿Cómo estás?",
      sender: "maria_dev",
      time: "10:30 AM"
    },
    {
      id: "2", 
      text: "¡Muy bien! ¿Viste el último video de Next.js?",
      sender: "current", 
      time: "10:31 AM"
    },
    {
      id: "3",
      text: "Sí, estuvo excelente. Aprendí mucho sobre Server Components",
      sender: "maria_dev",
      time: "10:32 AM"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Extraer el username de los parámetros
  useEffect(() => {
    params.then((resolvedParams) => {
      setUsername(resolvedParams.username);
    });
  }, [params]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: newMessage,
        sender: "current",
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage("");
    }
  };

  if (!username) {
    return <div className="min-h-screen bg-gray-100 pt-20 p-4">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
        {/* Header del chat */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">M</span>
          </div>
          <div>
            <h2 className="font-semibold">@{username}</h2>
            <p className="text-sm text-gray-500">En línea</p>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "current" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "current"
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "current" ? "text-sky-100" : "text-gray-500"
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input de mensaje */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-sky-500 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span className="text-lg">↑</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}