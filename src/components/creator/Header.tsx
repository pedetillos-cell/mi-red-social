'use client';

export default function Header() {
  return (
    <div className="header">
      <h1 className="welcome">Hola, Javier 👋</h1>
      <button className="notification-bell">
        <i className="far fa-bell"></i>
        <span className="notification-dot"></span>
      </button>
    </div>
  );
}