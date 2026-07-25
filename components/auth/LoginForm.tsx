"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../lib/hooks/useAuth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    isLoading,
    isGoogleLoading,
    isGithubLoading,
    error,
    success,
    handleLogin,
    handleGoogleAuth,
    handleGithubAuth,
  } = useAuth();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2 justify-center mb-1">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">LearnOS</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
        <p className="text-xs text-slate-600">Please enter your details to sign in.</p>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Forgot password?
          </a>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || isGoogleLoading || isGithubLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all disabled:opacity-50 active:scale-98"
          >
            {isLoading ? (
              <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase">
          <span className="bg-white px-3 text-slate-600 font-medium">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isGoogleLoading || isLoading}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all disabled:opacity-50 shadow-sm"
        >
          {isGoogleLoading ? (
            <span className="inline-block animate-spin h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full" />
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleGithubAuth}
          disabled={isGithubLoading || isLoading}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all disabled:opacity-50 shadow-sm"
        >
          {isGithubLoading ? (
            <span className="inline-block animate-spin h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full" />
          ) : (
            <>
              <svg className="h-4 w-4 fill-slate-900" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-600 pt-2">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
          Register here
        </Link>
      </div>
    </div>
  );
}
