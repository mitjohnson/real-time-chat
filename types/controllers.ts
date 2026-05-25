import type { Request, Response } from '../server/node_modules/@types/express/index.d.ts';

export interface AuthController {
  register: (req: Request, res: Response) => Promise<void>;
  login: (req: Request, res: Response) => Promise<void>;
}
