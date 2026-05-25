import { Router } from "express";
import type { AuthService } from "../../../types/index.ts";

import { AuthController } from "../controllers/auth.controller.ts";

export default function AuthRoutes(AuthService: AuthService) {
  const router = Router();
  const { register, login } = AuthController(AuthService);

  router.post('/register', register);
  router.post('/login', login);

  return router;
}
