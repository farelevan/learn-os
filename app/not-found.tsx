"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search, Compass, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Dynamic Glassmorphic Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8">
        {/* 404 Badge & Visual Indicator */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-lg">
            <Compass className="h-4 w-4 animate-spin-slow" />
            Error 404 • Page Not Found
          </div>

          <h1 className="text-7xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 leading-none drop-shadow-2xl">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Maaf, halaman atau modul materi yang Anda cari mungkin telah dipindahkan, dihapus, atau alamat URL yang Anda masukkan kurang tepat.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Kembali ke Dashboard</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Halaman Sebelumnya</span>
          </button>
        </div>

        {/* Quick Links Help */}
        <div className="pt-8 border-t border-slate-800/80 flex items-center justify-center gap-6 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
            <Search className="h-3.5 w-3.5" />
            <span>Cari Kursus</span>
          </Link>
          <span className="text-slate-800">•</span>
          <a href="#" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Bantuan & Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
