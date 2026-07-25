"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bookmark, ArrowRight, Star, ChevronDown, UserCheck } from "lucide-react";

export function MyCoursesView() {
  const [activeFilter, setActiveFilter] = useState("all");

  const enrolledCourses = [
    {
      id: "1",
      title: "Advanced React Patterns & State Management",
      instructor: "Sarah Jenkins",
      progress: 65,
      completedLessons: 12,
      totalLessons: 18,
      category: "Web Dev",
      coverImage: "/course-webdev.png",
      actionText: "Continue Learning",
      primaryAction: true,
    },
    {
      id: "2",
      title: "Machine Learning Foundations",
      instructor: "Dr. Alan Turing",
      progress: 32,
      completedLessons: 4,
      totalLessons: 12,
      category: "AI",
      coverImage: "/course-ml.png",
      actionText: "Resume Lesson",
      primaryAction: false,
    },
    {
      id: "3",
      title: "UI/UX Principles for Enterprise",
      instructor: "Elena Rodriguez",
      progress: 89,
      completedLessons: 24,
      totalLessons: 27,
      category: "Design",
      coverImage: "/course-uiux.png",
      actionText: "Resume Lesson",
      primaryAction: false,
    },
  ];

  const recommendedCourses = [
    {
      id: "r1",
      category: "AI & Robotics",
      title: "Introduction to Robotics AI",
      rating: 4.9,
      duration: "2.5 hours",
      coverImage: "/course-robotics.png",
    },
    {
      id: "r2",
      category: "Web Dev",
      title: "Cloud Architecture Basics",
      rating: 4.7,
      duration: "4 hours",
      coverImage: "/course-webdev.png",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Courses
        </h1>

        {/* Category Dropdown */}
        <div className="relative">
          <button className="flex items-center justify-between gap-3 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all min-w-[140px]">
            <span>All Categories</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "all"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          All Courses
        </button>
        <button
          onClick={() => setActiveFilter("progress")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "progress"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveFilter("completed")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "completed"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveFilter("bookmarked")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "bookmarked"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Bookmarked
        </button>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all"
          >
            {/* Image Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
              <Image
                src={course.coverImage}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm">
                {course.category}
              </span>
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-md text-slate-600 hover:text-indigo-600 shadow-sm transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                  <span>{course.instructor}</span>
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-900">{course.progress}% Complete</span>
                  <span className="text-slate-400">
                    {course.completedLessons}/{course.totalLessons} Lessons
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {course.primaryAction ? (
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-200 transition-all">
                    <span>{course.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all">
                    <span>{course.actionText}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="pt-8 border-t border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recommended for you</h2>
            <p className="text-xs text-slate-500">Based on your interest in AI and Web Development</p>
          </div>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedCourses.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-all"
            >
              <div className="relative h-20 w-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <Image src={rec.coverImage} alt={rec.title} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  {rec.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {rec.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="h-3 w-3 fill-amber-500" />
                    {rec.rating}
                  </span>
                  <span>{rec.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
