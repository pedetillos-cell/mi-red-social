import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-clave-secreta-temporal';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: Omit<User, 'password'>): string {
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

export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Base de datos temporal en memoria
export const users: User[] = [{
  id: '1',
  email: 'test@vryno.com',
  username: 'testuser',
  password: '$2a$12$K3VOVH5hSQqU.2bQ7ZQnKuY6VY6V6Y6V6Y6V6Y6V6Y6V6Y6V6Y6V6', // 123456
  createdAt: new Date()
}];