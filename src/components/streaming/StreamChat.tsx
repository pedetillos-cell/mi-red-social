'use client';

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  isModerator: boolean;
  isSubscriber: boolean;
  badges: string[];
}

interface StreamChatProps {
  streamId: string;
}

export default function StreamChat({ streamId }: StreamChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Simulación de mensajes de chat (en producción usarías WebSockets)
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'GamerPro',
        message: '¡Increíble gameplay! 🎮',
        timestamp: new Date(Date.now() - 10000),
        isModerator: false,
        isSubscriber: true,
        badges: ['sub-3']
      },
      {
        id: '2',
        userId: 'user2',
        username: 'StreamMod',
        message: 'Bienvenidos a todos al stream!',
        timestamp: new Date(Date.now() - 8000),
        isModerator: true,
        isSubscriber: true,
        badges: ['mod', 'sub-12']
      },
      {
        id: '3',
        userId: 'user3',
        username: 'NewViewer',
        message: 'Primera vez aquí, ¡genial contenido!',
        timestamp: new Date(Date.now() - 5000),
        isModerator: false,
        isSubscriber: false,
        badges: []
      }
    ];

    setMessages(mockMessages);
    setIsConnected(true);

    // Simular nuevos mensajes
    const interval = setInterval(() => {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        userId: `user${Math.floor(Math.random() * 1000)}`,
        username: `User${Math.floor(Math.random() * 1000)}`,
        message: getRandomMessage(),
        timestamp: new Date(),
        isModerator: Math.random() > 0.9,
        isSubscriber: Math.random() > 0.7,
        badges: Math.random() > 0.8 ? ['sub-3'] : []
      };
      
      setMessages(prev => [...prev, newMsg]);
    }, 3000);

    return () => clearInterval(interval);
  }, [streamId]);

  // Auto-scroll al nuevo mensaje
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: 'Tú',
      message: newMessage,
      timestamp: new Date(),
      isModerator: false,
      isSubscriber: true,
      badges: ['sub-6']
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
  };

  const getRandomMessage = () => {
    const messages = [
      '¡Qué buena jugada!',
      'GG everyone 👏',
      '¿Alguien más está hypeado?',
      '¡Felicidades por los 10k!',
      'La calidad del stream es increíble',
      '¿Cuándo el próximo torneo?',
      '¡Eso fue épico!',
      'VRYNO tiene la mejor calidad de streaming'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="stream-chat">
      <div className="chat-header">
        <h3>Chat en Vivo</h3>
        <div className="chat-stats">
          <span className="viewer-count">
            <i className="fas fa-users"></i>
            12.5K
          </span>
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <i className={`fas fa-circle ${isConnected ? 'connected' : 'disconnected'}`}></i>
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>

      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map(message => (
          <div key={message.id} className="chat-message">
            <div className="message-header">
              <span className="username">
                {message.username}
                {message.isModerator && (
                  <span className="badge mod" title="Moderador">
                    <i className="fas fa-shield-alt"></i>
                  </span>
                )}
                {message.isSubscriber && (
                  <span className="badge sub" title="Suscriptor">
                    <i className="fas fa-heart"></i>
                  </span>
                )}
              </span>
              <span className="timestamp">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="message-content">{message.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          disabled={!isConnected}
        />
        <button type="submit" disabled={!isConnected || !newMessage.trim()}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}