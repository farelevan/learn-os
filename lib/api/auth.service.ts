import { apiClient } from "./client";
import { AuthResponse, LoginDto, RegisterDto, GoogleLoginDto, User } from "../types/auth.types";

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async googleLogin(payload: GoogleLoginDto): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/auth/google", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getProfile(): Promise<{ user: User }> {
    return apiClient<{ user: User }>("/auth/me", {
      method: "GET",
    });
  },
};
