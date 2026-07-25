"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function BadRequestPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8">
        {/* Error Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest shadow-lg">
            <AlertCircle className="h-4 w-4" />
            Error 400 • Bad Request
          </div>

          <div className="h-20 w-20 rounded-3xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto shadow-2xl">
            <AlertCircle className="h-10 w-10" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Permintaan Tidak Valid (400 Bad Request)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Sistem tidak dapat memproses permintaan karena format data atau parameter yang dikirimkan tidak sesuai.
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
      </div>
    </div>
  );
}
