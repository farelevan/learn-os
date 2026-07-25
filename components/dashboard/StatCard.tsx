"use client";

import React from "react";
import { BookOpen, Clock, Award, RotateCw, LucideIcon } from "lucide-react";
import { StatMetric } from "../../lib/types/dashboard.types";

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  clock: Clock,
  award: Award,
  rotate: RotateCw,
};

const colorStyles = {
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
};

export function StatCard({ title, value, badge, iconName, colorScheme }: StatMetric) {
  const IconComponent = iconMap[iconName] || BookOpen;
  const style = colorStyles[colorScheme] || colorStyles.indigo;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div className={`h-10 w-10 rounded-xl ${style.bg} ${style.text} flex items-center justify-center`}>
          <IconComponent className="h-5 w-5" />
        </div>
        {badge && (
          <span className={`px-2.5 py-1 rounded-full ${style.badgeBg} ${style.badgeText} text-[11px] font-semibold`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-black text-slate-900">{value}</p>
        <p className="text-xs font-medium text-slate-500">{title}</p>
      </div>
    </div>
  );
}
