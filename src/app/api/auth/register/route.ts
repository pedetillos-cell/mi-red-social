import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-temporal';

// Base de datos temporal en memoria
const users: any[] = [{
  id: '1',
  email: 'test@vryno.com',
  username: 'testuser',
  password: '$2a$12$K3VOVH5hSQqU.2bQ7ZQnKuY6VY6V6Y6V6Y6V6Y6V6Y6V6Y6V6Y6V6', // 123456
  createdAt: new Date()
}];

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

function generateToken(user: any): string {
  return sign(
    { 
      userId: user.id, 
      email: user.email,
      username: user.username 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json();

    // Validaciones básicas
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    if (users.find(user => user.email === email)) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    // Crear usuario
    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);

    // Generar token
    const token = generateToken(newUser);

    // Response con cookie
    const response = NextResponse.json(
      { 
        message: 'Usuario creado exitosamente', 
        user: { id: newUser.id, email: newUser.email, username: newUser.username } 
      },
      { status: 201 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 días
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}