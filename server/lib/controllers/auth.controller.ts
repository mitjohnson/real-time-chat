import { z } from "zod";
import type { Request, Response } from "express";
import type { AuthService, AuthController } from "../../../types/index.ts";

import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.ts";

function treeifyError(error: z.ZodError) {
  return { error: z.treeifyError(error) };
}

export function AuthController(authService: AuthService): AuthController {
  return {
    async register(req: Request, res: Response): Promise<string | any> {
      const validate = RegisterSchema.safeParse(req.body);

      if (!validate.success) {
        return res.status(400).json(treeifyError(validate.error));
      }
      
      const token = await authService.register(validate.data!)
        .catch((error: Error) => {
          return res.status(401).json({ error: error.message });
        });

      return res.status(201).json({ token });
    },
    async login(req: Request, res: Response): Promise<string | any>{
      const validate = LoginSchema.safeParse(req.body);
      
      if (!validate.success) {
        return res.status(400).json(treeifyError(validate.error));
      }

      const token = await authService.login(validate.data!)
        .catch((error: Error) => {
          return res.status(401).json({ error: error.message });
        });

      return res.status(200).json({ token });
    },
  }
};
