"use client";

import React from "react";
import { Search, Bell, HelpCircle, LogOut, Menu } from "lucide-react";

interface HeaderProps {
  userName: string;
  onOpenMobileSidebar: () => void;
  profileDropdownOpen: boolean;
  setProfileDropdownOpen: (open: boolean) => void;
  onLogout: () => void;
}

export function Header({
  userName,
  onOpenMobileSidebar,
  profileDropdownOpen,
  setProfileDropdownOpen,
  onLogout,
}: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search courses, certificates..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/70 border border-transparent rounded-full text-slate-800 text-xs sm:text-sm placeholder-slate-400 focus:bg-white focus:border-indigo-300 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <button className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-200 transition-all"
          >
            <div className="h-9 w-9 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              {userName.charAt(0)}
            </div>
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{userName}</p>
                <p className="text-[11px] text-slate-500">Student Account</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
