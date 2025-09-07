'use client';

import { useState } from 'react';

interface LiveChatProps {
  isLive: boolean;
  viewers: number;
  channelName: string;
  isOpen: boolean;
  onToggle: () => void;
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
}

export default function LiveChat({ isLive, viewers, channelName, isOpen, onToggle }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: 'Streamer', message: '¡Bienvenidos al chat!', timestamp: new Date() },
    { id: 2, user: 'Usuario1', message: '¡Hola a todos!', timestamp: new Date() },
    { id: 3, user: 'Usuario2', message: 'Excelente stream 👍', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: ChatMessage = {
      id: messages.length + 1,
      user: 'Tú',
      message: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatViewers = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
        <div>
          <h3 className="font-semibold">💬 Chat en Vivo</h3>
          <p className="text-sm opacity-90">{formatViewers(viewers)} espectadores</p>
        </div>
        <button 
          onClick={onToggle}
          className="text-white hover:bg-white/20 p-1 rounded"
        >
          {isOpen ? '▼' : '▲'}
        </button>
      </div>

      {isOpen && (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white p-3 rounded-lg shadow-xs border border-gray-100">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-blue-600">{msg.user}:</span>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-gray-800 mt-1">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!isLive}
              />
              <button
                onClick={handleSendMessage}
                disabled={!isLive}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 rounded-lg font-semibold transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}