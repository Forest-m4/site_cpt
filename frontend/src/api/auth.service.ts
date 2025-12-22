import { api } from "./axios";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  accessToken: string;
}

export const authService = {
  login(email: string, password: string) {
    return api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
  },

  register(email: string, password: string, role: string) {
    return api.post<AuthResponse>("/auth/register", {
      email,
      password,
      role,
    });
  },
};
