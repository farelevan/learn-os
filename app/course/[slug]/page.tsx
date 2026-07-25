"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  PlayCircle,
  Award,
  BarChart3,
  Globe,
} from "lucide-react";
import { apiClient } from "../../../lib/api/client";
import { CourseData } from "../../../lib/api/courses.service";
import { modulesService, ModuleData } from "../../../lib/api/modules.service";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [course, setCourse] = useState<CourseData | null>(null);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        // Get all courses and find by slug
        const courses = await apiClient<CourseData[]>("/courses");
        const found = courses.find((c) => c.slug === slug);
        if (!found) return;
        setCourse(found);

        // Load modules
        const mods = await modulesService.getByCourseId(found.id);
        setModules(mods);
        if (mods.length > 0) {
          setExpandedModule(mods[0].id);
        }

        // Check enrollment
        try {
          const enrollments = await apiClient<any[]>("/enrollments/my-learning");
          const enrolled = enrollments.some((e: any) => e.courseId === found.id);
          setIsEnrolled(enrolled);
        } catch {
          // Not logged in or no enrollments
        }
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [slug]);

  const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    try {
      await apiClient(`/enrollments/${course.id}`, { method: "POST" });
      setIsEnrolled(true);
      // Navigate to learning player
      router.push(`/course/${slug}/learn`);
    } catch (err) {
      console.error("Enroll error:", err);
      // If already enrolled, just navigate
      router.push(`/course/${slug}/learn`);
    } finally {
      setEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    router.push(`/course/${slug}/learn`);
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.totalLessons, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.completedLessons, 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm font-medium">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-500 text-sm">Course not found</p>
          <button onClick={() => router.push("/dashboard")} className="text-indigo-600 text-sm font-semibold hover:underline">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={course.coverImage} alt="" fill className="object-cover blur-sm" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
          {/* Back Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-xs font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Course Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30">
                  {course.categoryName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
                  {course.level}
                </span>
                {course.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                  {course.instructorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h5 className="text-sm font-bold">{course.instructorName}</h5>
                  {course.instructorRole && (
                    <p className="text-[11px] text-slate-400">{course.instructorRole}</p>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-amber-400" />
                  {course.rating}
                  <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-400" />
                  {course.studentsCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  {totalLessons} lessons
                </span>
              </div>
            </div>

            {/* Right: CTA Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                {/* Cover Image */}
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <Image src={course.coverImage} alt={course.title} fill className="object-cover" />
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                  {course.price > 0 && (
                    <span className="text-xs text-slate-400 line-through">
                      ${Math.round(course.price * 1.5)}
                    </span>
                  )}
                </div>

                {/* Progress (if enrolled) */}
                {isEnrolled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Progress</span>
                      <span className="text-indigo-300 font-bold">{overallProgress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${overallProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {isEnrolled ? (
                  <button
                    onClick={handleStartLearning}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="h-5 w-5" />
                    Continue Learning
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </button>
                )}

                {/* Course Includes */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                    This course includes:
                  </p>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-3.5 w-3.5 text-indigo-400" />
                      <span>{totalLessons} video lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-3.5 w-3.5 text-indigo-400" />
                      <span>{modules.length} module quizzes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Lifetime access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Course Curriculum
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {modules.length} modules • {totalLessons} lessons
            </p>
          </div>

          {/* Module Accordion */}
          <div className="space-y-3">
            {modules.map((mod) => {
              const isExpanded = expandedModule === mod.id;
              return (
                <div
                  key={mod.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black shadow-sm ${
                          mod.isCompleted
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {mod.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          mod.orderIndex
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {mod.totalLessons} lessons • {mod.completedLessons}/{mod.totalLessons} completed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Mini progress */}
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              mod.isCompleted ? "bg-emerald-500" : "bg-indigo-500"
                            }`}
                            style={{
                              width: `${mod.totalLessons > 0 ? (mod.completedLessons / mod.totalLessons) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Lessons List (Expanded) */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 px-6 py-3 space-y-1">
                      {mod.lessons.map((lesson, idx) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            ) : isEnrolled ? (
                              <PlayCircle className="h-4 w-4 text-indigo-400 shrink-0" />
                            ) : (
                              <Lock className="h-4 w-4 text-slate-300 shrink-0" />
                            )}
                            <div>
                              <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                {lesson.title}
                              </p>
                              {lesson.description && (
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                                  {lesson.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium shrink-0">
                            {lesson.hasQuiz && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-bold">
                                Quiz
                              </span>
                            )}
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      ))}

                      {/* Module Quiz indicator */}
                      {mod.moduleQuiz && (
                        <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                          <div className="flex items-center gap-3">
                            <Award className="h-4 w-4 text-indigo-500 shrink-0" />
                            <p className="text-xs font-bold text-indigo-700">
                              {mod.moduleQuiz.title}
                            </p>
                          </div>
                          <span className="text-[10px] text-indigo-400 font-bold">
                            5 questions • 80% to pass
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
