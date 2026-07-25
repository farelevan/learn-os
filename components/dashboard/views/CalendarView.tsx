"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Clock, AlertTriangle } from "lucide-react";

export function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(9);

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Learning Calendar
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Calendar Card */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">October 2023</h2>
              <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-slate-50">
                <button className="p-1 rounded-lg text-slate-600 hover:bg-white transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                  Today
                </button>
                <button className="p-1 rounded-lg text-slate-600 hover:bg-white transition-all">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                <span>Live Sessions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span>Deadlines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span>Study Goals</span>
              </div>
            </div>
          </div>

          {/* Calendar Table Grid */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-7 bg-slate-50 text-center py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-200 text-xs">
              {/* Row 1 */}
              <div className="p-2 min-h-[85px] bg-slate-50/50 text-slate-400">1</div>
              <div className="p-2 min-h-[85px]">2</div>
              <div className="p-2 min-h-[85px]">3</div>
              <div className="p-2 min-h-[85px] relative">
                <span className="font-bold text-slate-900">4</span>
                <div className="mt-1 h-1.5 w-full bg-indigo-600 rounded-full" />
              </div>
              <div className="p-2 min-h-[85px]">5</div>
              <div className="p-2 min-h-[85px] relative">
                <span className="font-bold text-slate-900">6</span>
                <div className="mt-1 h-1.5 w-full bg-rose-500 rounded-full" />
              </div>
              <div className="p-2 min-h-[85px]">7</div>

              {/* Row 2 */}
              <div className="p-2 min-h-[85px]">8</div>
              <div
                onClick={() => setSelectedDay(9)}
                className={`p-2 min-h-[85px] cursor-pointer transition-all ${
                  selectedDay === 9 ? "bg-indigo-50/80 ring-2 ring-indigo-600" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    9
                  </span>
                </div>
                <div className="mt-1.5 space-y-1">
                  <span className="block text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold truncate">
                    10:00 AM Live
                  </span>
                  <span className="block text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold truncate">
                    Read Ch. 4
                  </span>
                </div>
              </div>
              <div className="p-2 min-h-[85px]">10</div>
              <div className="p-2 min-h-[85px]">
                <span className="font-bold text-slate-900">11</span>
                <span className="block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold truncate">
                  2:00 PM Live
                </span>
              </div>
              <div className="p-2 min-h-[85px]">12</div>
              <div className="p-2 min-h-[85px]">
                <span className="font-bold text-slate-900">13</span>
                <span className="block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold truncate">
                  Submit Draft
                </span>
              </div>
              <div className="p-2 min-h-[85px]">
                <span className="font-bold text-slate-900">14</span>
                <span className="block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold truncate">
                  Weekend Goal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Schedule Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Buttons */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-200 transition-all">
              <Plus className="h-4 w-4" />
              <span>Schedule Study Session</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-sm">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Sync to Google Calendar</span>
            </button>
          </div>

          {/* This Week Schedule Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">This Week</h3>

            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-center shrink-0 w-8">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">
                    MON
                  </span>
                  <span className="text-lg font-black text-slate-900">9</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Advanced UX Principles</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>10:00 AM - 11:30 AM</span>
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[9px] font-bold">
                    Live Session
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-center shrink-0 w-8">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">
                    WED
                  </span>
                  <span className="text-lg font-black text-slate-900">11</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Weekly Q&A</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>2:00 PM - 3:00 PM</span>
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-center shrink-0 w-8">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-rose-500 block">
                    FRI
                  </span>
                  <span className="text-lg font-black text-rose-600">13</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Essay Draft Submission</h4>
                  <p className="text-[11px] text-rose-600 flex items-center gap-1 font-semibold">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Due by 11:59 PM</span>
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[9px] font-bold">
                    Deadline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
