export default function MessagesPage() {
  const conversations = [
    {
      id: "1",
      user: {
        name: "María García",
        username: "maria_dev",
        online: true,
        avatar: "M"
      },
      lastMessage: "¡Hola! ¿Viste el último video de Next.js?",
      time: "Hace 2 min",
      unread: 3
    },
    {
      id: "2",
      user: {
        name: "Carlos Rodríguez",
        username: "carlos_tech", 
        online: false,
        avatar: "C"
      },
      lastMessage: "Gracias por la ayuda con el proyecto",
      time: "Ayer",
      unread: 0
    },
    {
      id: "3",
      user: {
        name: "Ana Martínez",
        username: "ana_coder",
        online: true,
        avatar: "A"
      },
      lastMessage: "¿Quedamos para grabar el tutorial?",
      time: "Hace 1 semana",
      unread: 1
    },
    {
      id: "4",
      user: {
        name: "Pedro López",
        username: "pedro_stream",
        online: true,
        avatar: "P"
      },
      lastMessage: "Los viewers amaron el directo de ayer",
      time: "Hace 3 días",
      unread: 0
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '6rem 2rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        height: '600px'
      }}>
        {/* Lista de conversaciones */}
        <div style={{
          width: '400px',
          borderRight: '1px solid #e5e7eb',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0
            }}>
              💬 Mensajes
            </h2>
          </div>

          {/* Lista de chats */}
          <div>
            {conversations.map(conversation => (
              <div key={conversation.id} style={{
                padding: '1.2rem',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                {/* Avatar */}
                <div style={{
                  position: 'relative',
                  flexShrink: 0
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(45deg, #0ea5e9, #3b82f6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}>
                    {conversation.user.avatar}
                  </div>
                  {conversation.user.online && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      background: '#10b981',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }} />
                  )}
                </div>

                {/* Información del chat */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.3rem'
                  }}>
                    <h3 style={{
                      fontWeight: 'bold',
                      color: '#1f2937',
                      margin: 0,
                      fontSize: '1rem'
                    }}>
                      {conversation.user.name}
                    </h3>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      {conversation.time}
                    </span>
                  </div>
                  
                  <p style={{
                    margin: 0,
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Notificaciones no leídas */}
                {conversation.unread > 0 && (
                  <div style={{
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Área de chat principal */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f9fafb'
        }}>
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Tus mensajes
            </h3>
            <p style={{ margin: 0 }}>
              Selecciona una conversación para empezar a chatear
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}