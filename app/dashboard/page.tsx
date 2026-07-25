"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useDashboard } from "../../lib/hooks/useDashboard";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { Header } from "../../components/dashboard/Header";
import { StatCard } from "../../components/dashboard/StatCard";
import { ContinueLearning } from "../../components/dashboard/ContinueLearning";
import { LearningStreak } from "../../components/dashboard/LearningStreak";
import { UpcomingLessons } from "../../components/dashboard/UpcomingLessons";
import { CourseGrid } from "../../components/dashboard/CourseGrid";
import { StatMetric } from "../../lib/types/dashboard.types";

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

export default function UserDashboard() {
  const {
    userName,
    activeTab,
    setActiveTab,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    profileDropdownOpen,
    setProfileDropdownOpen,
    handleLogout,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <Header
          userName={userName}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          profileDropdownOpen={profileDropdownOpen}
          setProfileDropdownOpen={setProfileDropdownOpen}
          onLogout={handleLogout}
        />

        {/* Dashboard Main Grid */}
        <main className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
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
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-300 hover:scale-110 active:scale-95 transition-all z-40">
        <Sparkles className="h-5 w-5" />
      </button>
    </div>
  );
}
