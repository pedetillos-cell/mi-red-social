'use client';

import Link from 'next/link';

export default function AuthButtons() {
  return (
    <div className="auth-buttons">
      <Link href="/login" className="auth-button login-button">
        Iniciar Sesión
      </Link>
      <Link href="/register" className="auth-button register-button">
        Crear Cuenta
      </Link>
    </div>
  );
}