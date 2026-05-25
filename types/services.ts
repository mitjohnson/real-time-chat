import type { RegisterDto, LoginDto } from '../server/lib/schemas/auth.schema.ts';

export interface AuthService {
  register: ({ name, email, password }: RegisterDto) => Promise<string>;
  login: ({ email, password }: LoginDto) => Promise<string>;
}

export interface Services {
  authService: AuthService;
}
