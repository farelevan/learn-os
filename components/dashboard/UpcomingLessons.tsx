"use client";

import React from "react";
import { Clock } from "lucide-react";
import { UpcomingLesson } from "../../lib/types/dashboard.types";

const mockLessons: UpcomingLesson[] = [
  {
    id: "1",
    dateBadge: "TODAY",
    dayNumber: "24",
    title: "React Hooks Deep Dive",
    timeRange: "2:00 PM - 3:30 PM",
    badgeColor: "indigo",
  },
  {
    id: "2",
    dateBadge: "TOM",
    dayNumber: "25",
    title: "UI Design Systems",
    timeRange: "10:00 AM - 11:30 AM",
    badgeColor: "purple",
  },
  {
    id: "3",
    dateBadge: "OCT",
    dayNumber: "28",
    title: "Data Viz Fundamentals",
    timeRange: "1:00 PM - 2:00 PM",
    badgeColor: "slate",
  },
];

const badgeStyles = {
  indigo: "bg-indigo-100 text-indigo-700 text-indigo-500",
  purple: "bg-purple-100 text-purple-700 text-purple-500",
  slate: "bg-slate-200 text-slate-700 text-slate-500",
};

export function UpcomingLessons() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900">Upcoming Lessons</h3>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
          View Calendar
        </button>
      </div>

      <div className="space-y-4">
        {mockLessons.map((lesson) => {
          const style = badgeStyles[lesson.badgeColor] || badgeStyles.indigo;
          const [bg, text, sub] = style.split(" ");
          return (
            <div
              key={lesson.id}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div
                className={`h-12 w-12 rounded-xl ${bg} ${text} flex flex-col items-center justify-center font-bold shrink-0`}
              >
                <span className={`text-[9px] uppercase tracking-wider ${sub}`}>
                  {lesson.dateBadge}
                </span>
                <span className="text-sm leading-none">{lesson.dayNumber}</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{lesson.title}</h4>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{lesson.timeRange}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
