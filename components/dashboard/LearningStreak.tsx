"use client";

import React from "react";
import { Flame } from "lucide-react";

export function LearningStreak() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">Learning Streak</h3>
        <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
          <Flame className="h-4 w-4 fill-amber-500" />
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-slate-900">14</span>
          <span className="text-xs font-semibold text-slate-500">Days in a row!</span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          <div className="h-7 rounded-md bg-amber-200" />
          <div className="h-7 rounded-md bg-amber-400" />
          <div className="h-7 rounded-md bg-amber-600" />
          <div className="h-7 rounded-md bg-amber-700" />
          <div className="h-7 rounded-md bg-amber-500" />
          <div className="h-7 rounded-md bg-amber-600" />
          <div className="h-7 rounded-md bg-amber-700 ring-2 ring-amber-600" />
        </div>
      </div>
    </div>
  );
}
