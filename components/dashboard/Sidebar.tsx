"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, LayoutDashboard, BookOpen, Award, Users, Calendar, Settings, Zap, LogOut, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  handleLogout?: () => void;
}

export function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen, handleLogout }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "community", label: "Community", icon: Users },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  const content = (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                LearnOS
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Premium Learning</span>
            </div>
          </Link>
          {setMobileOpen && (
            <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 text-slate-500">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 font-medium text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setMobileOpen) setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold border-l-4 border-indigo-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3 pt-6 border-t border-slate-100">
        <button
          onClick={() => {
            setActiveTab("settings");
            if (setMobileOpen) setMobileOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            activeTab === "settings"
              ? "bg-indigo-50 text-indigo-700 font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/60 text-xs font-semibold shadow-sm transition-all">
          <Zap className="h-3.5 w-3.5" />
          <span>Upgrade Pro</span>
        </button>

        {handleLogout && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-rose-600 text-xs font-semibold py-2 px-3.5 hover:bg-rose-50 rounded-xl transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Keluar (Logout)</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 bg-white border-r border-slate-200/80 p-6 shrink-0 sticky top-0 h-screen">
        {content}
      </aside>

      {/* Mobile Drawer Modal */}
      {mobileOpen && setMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-full bg-white h-full p-6 z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
