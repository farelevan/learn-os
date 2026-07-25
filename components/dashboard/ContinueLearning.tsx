"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Play, CheckCircle2 } from "lucide-react";
import { dashboardService, DashboardSummaryData } from "../../lib/api/dashboard.service";

export function ContinueLearning() {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummaryData | null>(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await dashboardService.getSummary();
        setSummary(data);
      } catch (err) {
        console.error("Gagal memuat ringkasan dashboard:", err);
      }
    }
    loadSummary();
  }, []);

  const course = summary?.continueLearning;
  const progress = (course as any)?.progressPercentage ?? 92;
  const completedLessons = (course as any)?.completedLessons ?? 11;
  const totalLessons = (course as any)?.totalLessons ?? 12;
  const isDone = progress >= 100 || (course as any)?.statusText === "DONE";
  const slug = course?.slug || "elementary-web-programming";

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-indigo-950/80 pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-lg">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-indigo-600/80 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-white">
            Continue Learning
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isDone ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
            }`}
          >
            {isDone ? "DONE" : "IN PROGRESS"}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
          {course?.title || "Elementary Web Programming"}
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          {course?.description || "Belajar dasar-dasar pemrograman web dari nol dengan HTML, CSS, dan JS."}
        </p>
      </div>

      <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
        <div className="space-y-1.5 flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Progress Backend</span>
            <span className={isDone ? "text-emerald-400 font-bold" : "text-indigo-400 font-bold"}>
              {progress}% ({completedLessons}/{totalLessons} Lessons)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isDone ? "bg-emerald-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => router.push(`/course/${slug}/learn`)}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs shadow-lg transition-all self-start sm:self-auto ${
            isDone
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30"
          }`}
        >
          {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
          <span>{isDone ? "Review Course" : "Resume Lesson"}</span>
        </button>
      </div>
    </div>
  );
}
