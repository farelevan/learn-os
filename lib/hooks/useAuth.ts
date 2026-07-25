"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../api/auth.service";
import { UserRole } from "../types/auth.types";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    clearMessages();

    try {
      const data = await authService.login({ email, password });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Login berhasil! Mengalihkan...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Gagal masuk. Silakan periksa kembali kredensial Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    role: UserRole = "STUDENT"
  ) => {
    setIsLoading(true);
    clearMessages();

    try {
      const data = await authService.register({ name, email, password, role });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Registrasi berhasil! Mengalihkan...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    clearMessages();

    try {
      const mockPayload = {
        googleId: "google-user-1029384756",
        email: "user.google@learnos.com",
        name: "Pengguna Google Demo",
        avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      };

      const data = await authService.googleLogin(mockPayload);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Otentikasi Google berhasil! Mengalihkan...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Gagal otentikasi menggunakan Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    setIsGithubLoading(true);
    clearMessages();

    try {
      const mockPayload = {
        googleId: "github-user-99887766",
        email: "user.github@learnos.com",
        name: "Pengguna GitHub Demo",
        avatar: "https://avatars.githubusercontent.com/u/1000?v=4",
      };

      const data = await authService.googleLogin(mockPayload);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess("Otentikasi GitHub berhasil! Mengalihkan...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Gagal otentikasi menggunakan GitHub.");
    } finally {
      setIsGithubLoading(false);
    }
  };

  return {
    isLoading,
    isGoogleLoading,
    isGithubLoading,
    error,
    success,
    handleLogin,
    handleRegister,
    handleGoogleAuth,
    handleGithubAuth,
  };
}
