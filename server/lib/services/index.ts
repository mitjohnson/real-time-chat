import { AuthService } from "./auth.service.ts";
import type { Models, Services } from "../../../types/index.ts";

export default function ServicesFactory(models: Models): Services {
  
  return {
    authService: AuthService(models),
  };
};
