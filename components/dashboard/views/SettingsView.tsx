"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Key } from "lucide-react";

interface SettingsViewProps {
  userName: string;
}

export function SettingsView({ userName }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState("profile");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Account Settings
      </h1>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        {/* Settings Sub-Sidebar */}
        <div className="md:col-span-3 bg-slate-50/70 p-6 border-r border-slate-100 space-y-1">
          <button
            onClick={() => setActiveSubTab("profile")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === "profile"
                ? "bg-white text-indigo-600 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:bg-white/60"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile Info</span>
          </button>
          <button
            onClick={() => setActiveSubTab("notifications")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === "notifications"
                ? "bg-white text-indigo-600 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:bg-white/60"
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => setActiveSubTab("security")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === "security"
                ? "bg-white text-indigo-600 shadow-sm border border-slate-200/60"
                : "text-slate-600 hover:bg-white/60"
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Security & Password</span>
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-9 p-8 space-y-6">
          <div className="space-y-1 pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
            <p className="text-xs text-slate-500">Update your profile details and preferences.</p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-indigo-200">
                {userName.charAt(0)}
              </div>
              <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-all">
                Change Photo
              </button>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Display Name</label>
              <input
                type="text"
                defaultValue={userName}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">Bio</label>
              <textarea
                defaultValue="Enthusiastic learner exploring AI & Web Development."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none h-24"
              />
            </div>

            <div className="pt-2">
              <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-200 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
