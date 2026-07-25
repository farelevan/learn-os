"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bookmark, ArrowRight, Star, ChevronDown, UserCheck, CheckCircle2, PlayCircle } from "lucide-react";
import { enrollmentsService, EnrollmentData } from "../../../lib/api/enrollments.service";

export function MyCoursesView() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | "progress" | "completed" | "bookmarked">("all");
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await enrollmentsService.getMyLearning();
        setEnrollments(data);
      } catch (err) {
        console.error("Gagal memuat daftar kursus saya:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredEnrollments = enrollments.filter((item) => {
    const isDone = item.isDone || item.progressPercentage >= 100 || item.status === "COMPLETED";
    if (activeFilter === "completed") return isDone;
    if (activeFilter === "progress") return !isDone;
    if (activeFilter === "bookmarked") return item.isBookmarked;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Courses
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Terhubung langsung dengan backend API NestJS & database PostgreSQL
          </p>
        </div>

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
          All Courses ({enrollments.length})
        </button>
        <button
          onClick={() => setActiveFilter("progress")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "progress"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          In Progress ({enrollments.filter((e) => !e.isDone && e.progressPercentage < 100).length})
        </button>
        <button
          onClick={() => setActiveFilter("completed")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "completed"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Completed / DONE ({enrollments.filter((e) => e.isDone || e.progressPercentage >= 100).length})
        </button>
        <button
          onClick={() => setActiveFilter("bookmarked")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeFilter === "bookmarked"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Bookmarked ({enrollments.filter((e) => e.isBookmarked).length})
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs font-semibold animate-pulse">
          Memuat data progress dari backend...
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-slate-200">
          <p className="text-sm font-semibold text-slate-600">Tidak ada kursus pada filter ini</p>
          <button
            onClick={() => setActiveFilter("all")}
            className="text-xs text-indigo-600 font-bold hover:underline"
          >
            Tampilkan Semua Kursus
          </button>
        </div>
      ) : (
        /* Enrolled Courses Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrollments.map((item) => {
            const course = item.course;
            const isDone = item.isDone || item.progressPercentage >= 100 || item.status === "COMPLETED";

            return (
              <div
                key={item.id}
                onClick={() => router.push(`/course/${course.slug}`)}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={course.coverImage || "/course-webdev.png"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-slate-800 uppercase tracking-wider shadow-sm">
                    {course.categoryName || "DEVELOPMENT"}
                  </span>

                  {/* STATUS DONE / IN PROGRESS BADGE */}
                  <span
                    className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        DONE
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-3 w-3" />
                        IN PROGRESS
                      </>
                    )}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                      item.isBookmarked
                        ? "bg-indigo-600 text-white"
                        : "bg-white/95 text-slate-600 hover:text-indigo-600"
                    }`}
                  >
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
                      <span>{course.instructorName}</span>
                    </p>
                  </div>

                  {/* Backend Calculated Progress Bar */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className={isDone ? "text-emerald-600 font-bold" : "text-slate-900"}>
                        {item.progressPercentage}% Complete
                      </span>
                      <span className="text-slate-400">
                        {item.completedLessons}/{item.totalLessons} Lessons
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone ? "bg-emerald-500" : "bg-indigo-600"
                        }`}
                        style={{ width: `${item.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/course/${course.slug}/learn`);
                      }}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs shadow-md transition-all ${
                        isDone
                          ? "bg-slate-900 hover:bg-slate-800 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                      }`}
                    >
                      <span>{isDone ? "Review Course" : "Continue Learning"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
          <div
            onClick={() => router.push("/course/elementary-web-programming")}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-all cursor-pointer"
          >
            <div className="relative h-20 w-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <Image src="/course-webdev.png" alt="Elementary Web Programming" fill className="object-cover" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                WEB DEVELOPMENT
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Elementary Web Programming
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="h-3 w-3 fill-amber-500" />
                  4.8
                </span>
                <span>6 hours</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => router.push("/course/mastering-generative-ai-for-enterprise")}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-indigo-300 transition-all cursor-pointer"
          >
            <div className="relative h-20 w-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <Image src="/course-generative-ai.png" alt="Mastering Generative AI" fill className="object-cover" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                ARTIFICIAL INTELLIGENCE
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Mastering Generative AI
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="h-3 w-3 fill-amber-500" />
                  4.9
                </span>
                <span>12 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
