"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useDashboard } from "../../lib/hooks/useDashboard";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { Header } from "../../components/dashboard/Header";
import { DashboardView } from "../../components/dashboard/views/DashboardView";
import { CatalogView } from "../../components/dashboard/views/CatalogView";
import { MyCoursesView } from "../../components/dashboard/views/MyCoursesView";
import { CertificatesView } from "../../components/dashboard/views/CertificatesView";
import { CommunityView } from "../../components/dashboard/views/CommunityView";
import { CalendarView } from "../../components/dashboard/views/CalendarView";
import { SettingsView } from "../../components/dashboard/views/SettingsView";

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

        {/* Dynamic View Container */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {activeTab === "dashboard" && <DashboardView userName={userName} />}
          {activeTab === "catalog" && <CatalogView />}
          {activeTab === "courses" && <MyCoursesView />}
          {activeTab === "certificates" && <CertificatesView />}
          {activeTab === "community" && <CommunityView />}
          {activeTab === "calendar" && <CalendarView />}
          {activeTab === "settings" && <SettingsView userName={userName} />}
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-300 hover:scale-110 active:scale-95 transition-all z-40">
        <Sparkles className="h-5 w-5" />
      </button>
    </div>
  );
}
