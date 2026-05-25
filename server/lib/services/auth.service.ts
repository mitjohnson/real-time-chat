import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { Models } from '../../../types/index.ts';
import type { RegisterDto, LoginDto } from '../schemas/auth.schema.ts';

export function AuthService(Models: Models) {
  const { userModel } = Models;
  
  function grantToken(user: { id: number, name: string, email: string }): string {
    return jwt.sign(
      { id: user.id, name: user.name, email: user.email }, 
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  };

  return {
    async register({ name, email, password }: RegisterDto): Promise<string> {
      const existingEmail = userModel.findByEmail(email);
      if (existingEmail) throw new Error('Email already exists');
      
      const hash = await bcrypt.hash(password, 10);

      const user = userModel.create({ name, email, password: hash });
      if (!user) throw new Error('Failed to create user');

      return grantToken({ id: user.id!, name: user.name!, email: user.email! });
    },
    async login({ email, password }: LoginDto): Promise<string> {
      const user = userModel.findByEmail(email);
      if (!user) throw new Error('Invalid email or password');
      
      const isValid = await bcrypt.compare(password, user.password!);
      if (!isValid) throw new Error('Invalid email or password');

      return grantToken({ id: user.id!, name: user.name!, email: user.email! });
    }
  }
};
