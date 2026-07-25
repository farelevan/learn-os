"use client";

import React from "react";
import { StatCard } from "../StatCard";
import { ContinueLearning } from "../ContinueLearning";
import { LearningStreak } from "../LearningStreak";
import { UpcomingLessons } from "../UpcomingLessons";
import { CourseGrid } from "../CourseGrid";
import { StatMetric } from "../../../lib/types/dashboard.types";

const statMetrics: StatMetric[] = [
  {
    id: "s1",
    title: "Active Courses",
    value: 4,
    badge: "📈 +2 this week",
    iconName: "book",
    colorScheme: "purple",
  },
  {
    id: "s2",
    title: "Total Learning Hours",
    value: 128,
    iconName: "clock",
    colorScheme: "indigo",
  },
  {
    id: "s3",
    title: "Certificates Earned",
    value: 7,
    badge: "+ 1 new",
    iconName: "award",
    colorScheme: "amber",
  },
  {
    id: "s4",
    title: "Completion Rate",
    value: "84%",
    badge: "📈 +5%",
    iconName: "rotate",
    colorScheme: "emerald",
  },
];

interface DashboardViewProps {
  userName: string;
}

export function DashboardView({ userName }: DashboardViewProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back, {userName}
        </h1>
        <p className="text-slate-500 text-sm">Let&apos;s pick up where you left off.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statMetrics.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ContinueLearning />
        </div>
        <div className="lg:col-span-4">
          <LearningStreak />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <UpcomingLessons />
        </div>
        <div className="lg:col-span-7">
          <CourseGrid />
        </div>
      </div>
    </div>
  );
}
