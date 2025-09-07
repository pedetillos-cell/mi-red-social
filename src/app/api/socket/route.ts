import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-temporal';

// Simulación de base de datos
const users: any[] = [{
  id: '1',
  email: 'test@vryno.com',
  username: 'testuser',
  password: '$2a$12$K3VOVH5hSQqU.2bQ7ZQnKuY6VY6V6Y6V6Y6V6Y6V6Y6V6Y6V6Y6V6' // 123456
}];

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
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
    const { email, password, username, action } = await request.json();

    // LOGIN
    if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email y contraseña son requeridos' },
          { status: 400 }
        );
      }

      const user = users.find(u => u.email === email);
      if (!user || !(await verifyPassword(password, user.password))) {
        return NextResponse.json(
          { error: 'Credenciales inválidas' },
          { status: 401 }
        );
      }

      const token = generateToken(user);
      const response = NextResponse.json(
        { message: 'Login exitoso', user: { id: user.id, email: user.email, username: user.username } },
        { status: 200 }
      );

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
      });

      return response;
    }

    // REGISTER
    if (action === 'register') {
      if (!email || !password || !username) {
        return NextResponse.json(
          { error: 'Todos los campos son requeridos' },
          { status: 400 }
        );
      }

      if (users.find(user => user.email === email)) {
        return NextResponse.json(
          { error: 'El usuario ya existe' },
          { status: 409 }
        );
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        password: hashedPassword,
        createdAt: new Date()
      };

      users.push(newUser);

      const token = generateToken(newUser);
      const response = NextResponse.json(
        { message: 'Usuario creado exitosamente', user: { id: newUser.id, email: newUser.email, username: newUser.username } },
        { status: 201 }
      );

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Acción no válida' },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}