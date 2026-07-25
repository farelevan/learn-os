"use client";

import React from "react";
import { Play } from "lucide-react";

export function ContinueLearning() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-indigo-950/80 pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-lg">
        <span className="px-3 py-1 rounded-md bg-indigo-600/80 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-white">
          Continue Learning
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
          Advanced Machine Learning Algorithms
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Module 4: Neural Network Architectures and Backpropagation deep dive.
        </p>
      </div>

      <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
        <div className="space-y-1.5 flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Progress</span>
            <span className="text-indigo-400">68%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[68%]" />
          </div>
        </div>

        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all self-start sm:self-auto">
          <Play className="h-3.5 w-3.5 fill-white" />
          <span>Resume Course</span>
        </button>
      </div>
    </div>
  );
}
