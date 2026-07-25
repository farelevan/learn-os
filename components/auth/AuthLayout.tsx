"use client";

import React from "react";
import { Bot, Award } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Column: Branding & Feature Showcase */}
        <div className="lg:col-span-6 bg-gradient-to-br from-purple-50/90 via-indigo-50/60 to-purple-100/40 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Glow Overlay */}
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-purple-300/30 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-md">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Master new skills with{" "}
              <span className="text-indigo-600 block sm:inline">LearnOS AI.</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Experience a distraction-free, intelligent learning environment designed for modern
              professionals.
            </p>
          </div>

          {/* Feature Showcase Cards */}
          <div className="relative z-10 my-8 space-y-4 max-w-md">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/70 shadow-sm flex items-center gap-3.5 transform transition-transform hover:scale-[1.02] w-4/5">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI Tutor Active</h4>
                <p className="text-[11px] text-slate-600">Analyzing learning patterns...</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/70 shadow-sm space-y-2 transform transition-transform hover:scale-[1.02] w-4/5 ml-auto">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900">Data Structures</span>
                <span className="text-indigo-600">78%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[78%]" />
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/70 shadow-sm flex items-center gap-3.5 transform transition-transform hover:scale-[1.02] w-4/5">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Certificate Earned</h4>
                <p className="text-[11px] text-slate-600">System Design Fundamentals</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs text-slate-600">
            &copy; 2026 LearnOS. Premium AI Learning Platform.
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center items-center bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
