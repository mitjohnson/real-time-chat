import { z } from "zod";
import type { Request, Response } from "express";
import type { AuthService, AuthController } from "../../../types/index.ts";

import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.ts";

function treeifyError(error: z.ZodError) {
  return { error: z.treeifyError(error) };
}

export function AuthController(authService: AuthService): AuthController {
  return {
    async register(req: Request, res: Response): Promise<void> {
      const validate = RegisterSchema.safeParse(req.body);

      if (!validate.success) {
        res.status(400).json(treeifyError(validate.error));
        return
      }
      
      try {
        const token = await authService.register(validate.data!)
        res.status(201).json({ token });
        return;
      } catch (error) {
        error instanceof Error 
        ? res.status(401).json({ error: error.message })
        : res.status(500).json({ error: 'Internal server error' });
        return;
      }
    },
    async login(req: Request, res: Response): Promise<void>{
      const validate = LoginSchema.safeParse(req.body);
      
      if (!validate.success) {
        res.status(400).json(treeifyError(validate.error));
        return;
      }

      try {
        const token = await authService.login(validate.data!)
        res.status(201).json({ token });
        return;
      } catch (error) {
        error instanceof Error 
        ? res.status(401).json({ error: error.message })
        : res.status(500).json({ error: 'Internal server error' });
        return;
      }
    },
  }
};
