import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-temporal';

// Base de datos temporal (debe coincidir con la de login)
const users = [
  {
    id: '1',
    email: 'test@vryno.com',
    username: 'testuser',
    channelName: 'CanalDePruebas',
    avatar: null,
    isVerified: true,
    subscribers: 1240,
    createdAt: new Date()
  }
];

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    try {
      const decoded = verify(token, JWT_SECRET) as any;
      
      // Buscar usuario en la base de datos
      const user = users.find(u => u.id === decoded.userId);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Usuario no encontrado' },
          { status: 404 }
        );
      }

      // Devolver datos del usuario sin información sensible
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        channelName: user.channelName,
        avatar: user.avatar,
        isVerified: user.isVerified,
        subscribers: user.subscribers,
        createdAt: user.createdAt
      };

      return NextResponse.json(userData);

    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}