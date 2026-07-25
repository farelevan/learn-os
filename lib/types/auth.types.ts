export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface GoogleLoginDto {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}
