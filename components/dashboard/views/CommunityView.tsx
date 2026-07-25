"use client";

import React, { useState } from "react";
import {
  Hash,
  Users,
  Image as ImageIcon,
  Paperclip,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  TrendingUp,
} from "lucide-react";

export function CommunityView() {
  const [postText, setPostText] = useState("");
  const [activeChannel, setActiveChannel] = useState("General");

  const channels = [
    { name: "General", count: 142 },
    { name: "AI Chat", count: 89 },
    { name: "Career Advice", count: 56 },
    { name: "Study Groups", count: 34 },
  ];

  const studyGroups = [
    { name: "Advanced UI/UX", code: "UX", color: "bg-purple-600" },
    { name: "Python for Data", code: "PY", color: "bg-amber-600" },
  ];

  const posts = [
    {
      id: "p1",
      authorName: "Sarah Jenkins",
      authorRole: "Student",
      timeAgo: "2 hours ago",
      channel: "#CareerAdvice",
      title: "Preparing for UX Interviews",
      content:
        "Hey everyone! I have my first round interview for a Product Design role next week. What are some common whiteboard challenges they might throw at me? Any tips on structuring my thoughts during the exercise would be highly appreciated!",
      likesCount: 24,
      commentsCount: 8,
    },
    {
      id: "p2",
      authorName: "David Chen",
      authorRole: "Instructor",
      timeAgo: "5 hours ago",
      channel: "#General",
      title: "New Module Release: Advanced React Patterns",
      content:
        "Just uploaded the new module on Advanced React Patterns. We dive deep into Custom Hooks and Context API optimization. Check it out in your dashboard and let me know if you have any questions below!",
      likesCount: 52,
      commentsCount: 19,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Sub-sidebar: Channels & Groups */}
      <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Channels
          </h3>
          <div className="space-y-1">
            {channels.map((ch) => (
              <button
                key={ch.name}
                onClick={() => setActiveChannel(ch.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeChannel === ch.name
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 opacity-60" />
                  <span>{ch.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            My Study Groups
          </h3>
          <div className="space-y-2">
            {studyGroups.map((group) => (
              <div
                key={group.name}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                <div
                  className={`h-7 w-7 rounded-lg ${group.color} text-white font-bold text-[10px] flex items-center justify-center`}
                >
                  {group.code}
                </div>
                <span className="text-xs font-bold text-slate-800">{group.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Feed Column */}
      <div className="lg:col-span-6 space-y-6">
        {/* Create Post Box */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share something with the community..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none min-h-[90px]"
          />
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400">
              <button className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <ImageIcon className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-200 transition-all">
              Post
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:shadow-md transition-all"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{post.authorName}</h4>
                      {post.authorRole === "Instructor" && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[9px] font-bold">
                          Instructor
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {post.timeAgo} in <span className="text-indigo-600 font-semibold">{post.channel}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likesCount}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.commentsCount} Comments</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sub-sidebar: Trending Topics & Active Members */}
      <div className="lg:col-span-3 space-y-6">
        {/* Trending Topics */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-extrabold uppercase tracking-wider">
            <TrendingUp className="h-4 w-4 text-indigo-600" />
            <span>Trending Topics</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-slate-900 block hover:text-indigo-600 cursor-pointer">
                #MachineLearning2024
              </span>
              <span className="text-[10px] text-slate-400">245 posts this week</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block hover:text-indigo-600 cursor-pointer">
                #PortfolioReview
              </span>
              <span className="text-[10px] text-slate-400">120 posts this week</span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block hover:text-indigo-600 cursor-pointer">
                #ReactVsVue
              </span>
              <span className="text-[10px] text-slate-400">89 posts this week</span>
            </div>
          </div>
        </div>

        {/* Active Members */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-extrabold uppercase tracking-wider">
            <Users className="h-4 w-4 text-purple-600" />
            <span>Active Members</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                ER
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Elena Rodriguez</h5>
                <p className="text-[10px] text-slate-400">Data Science Cohort</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                MC
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Michael Chang</h5>
                <p className="text-[10px] text-slate-400">UI/UX Design</p>
              </div>
            </div>
          </div>

          <button className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all">
            View All Members
          </button>
        </div>
      </div>
    </div>
  );
}
