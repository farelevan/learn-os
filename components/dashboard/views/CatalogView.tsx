"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  Brain,
  Code2,
  Palette,
  TrendingUp,
  Megaphone,
  Grid,
  Star,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export function CatalogView() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ai", name: "AI & Data", icon: Brain },
    { id: "dev", name: "Development", icon: Code2 },
    { id: "design", name: "Design", icon: Palette },
    { id: "business", name: "Business", icon: TrendingUp },
    { id: "marketing", name: "Marketing", icon: Megaphone },
    { id: "all", name: "All Courses", icon: Grid },
  ];

  const exploreCourses = [
    {
      id: "exp-0",
      slug: "elementary-web-programming",
      category: "WEB DEVELOPMENT",
      title: "Elementary Web Programming",
      description:
        "Belajar dasar-dasar pemrograman web dari nol. HTML, CSS, dan JavaScript untuk pemula.",
      instructor: "Traversy Media",
      rating: 4.8,
      reviewsCount: "5.2k",
      duration: "6 hours",
      price: "Free",
      badge: "🆓 Free",
      coverImage: "/course-webdev.png",
    },
    {
      id: "exp-1",
      slug: "advanced-react-patterns",
      category: "SOFTWARE ENGINEERING",
      title: "Advanced React Patterns & Architecture",
      description:
        "Master scalable front-end architecture, performance optimization, and custom state management.",
      instructor: "Alex Mercer",
      rating: 4.8,
      reviewsCount: "1.2k",
      duration: "8 hours",
      price: "$149",
      badge: "Pro Included",
      coverImage: "/course-webdev.png",
    },
    {
      id: "exp-2",
      slug: "ui-ux-principles-enterprise",
      category: "DESIGN",
      title: "UX Research for Enterprise SaaS",
      description:
        "Learn practical methodologies for conducting impactful user research in complex product domains.",
      instructor: "Elena Rodriguez",
      rating: 4.7,
      reviewsCount: "850",
      duration: "5 hours",
      price: "$99",
      badge: "Pro Included",
      coverImage: "/course-uiux.png",
    },
    {
      id: "exp-3",
      slug: "intro-aws-serverless",
      category: "CLOUD COMPUTING",
      title: "Introduction to AWS Serverless",
      description:
        "Get started with Lambda, API Gateway, and DynamoDB to build scalable serverless applications.",
      instructor: "David Kim",
      rating: 4.9,
      reviewsCount: "3.1k",
      duration: "3 hours",
      price: "Free",
      badge: null,
      coverImage: "/course-aws.png",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Search & Category Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Unlock Your Potential with{" "}
          <span className="text-indigo-600">AI-Powered Learning</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Discover premium courses tailored to your goals. Let our intelligent platform guide you to
          mastery.
        </p>

        {/* Filter Bar */}
        <div className="bg-white p-2.5 rounded-2xl sm:rounded-full border border-slate-200 shadow-lg shadow-slate-100 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 flex-1 px-3 w-full">
            <Search className="h-4 w-4 text-indigo-600 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 pl-0 sm:pl-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl">
              <span>Category</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-xl">
              <span>Difficulty</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-100 transition-all">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Circular Icons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`h-14 w-14 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-[11px] font-bold ${
                    isSelected ? "text-indigo-600" : "text-slate-500 group-hover:text-slate-900"
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Path Section */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Featured Path
        </h2>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 hover:shadow-md transition-all">
          {/* Left Cover Image */}
          <div className="lg:col-span-5 relative min-h-[240px] rounded-2xl overflow-hidden bg-slate-950 flex flex-col justify-between p-4">
            <Image
              src="/course-generative-ai.png"
              alt="Mastering Generative AI for Enterprise"
              fill
              className="object-cover opacity-80"
            />
            <span className="relative z-10 self-start px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-900 shadow-sm">
              🔥 Trending
            </span>
            <div className="relative z-10 text-[10px] text-slate-300 font-medium bg-slate-900/60 backdrop-blur-md p-2 rounded-xl">
              Future of Learning: LLM, Fine-Tuning & Multi-Agent Architecture.
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                  ARTIFICIAL INTELLIGENCE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider">
                  ADVANCED
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                Mastering Generative AI for Enterprise
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Deep dive into deploying LLMs, fine-tuning models, and building scalable AI applications
                for modern business infrastructure. Learn from industry experts who built production systems.
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-9 w-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  SC
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Dr. Sarah Chen</h5>
                  <p className="text-[10px] text-slate-400">Lead AI Researcher, TechCorp</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  4.9 <span className="text-slate-400 font-normal">(2.4k reviews)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  15,230 students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  12 weeks
                </span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-2xl font-black text-slate-900">$299</span>
              </div>
              <button
                onClick={() => router.push('/course/mastering-generative-ai-for-enterprise')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Courses Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore Courses
          </h2>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exploreCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/course/${course.slug}`)}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[9px] font-extrabold tracking-wider text-slate-800 shadow-sm uppercase">
                  {course.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-semibold pt-1">
                    <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                    <span>{course.instructor}</span>
                  </p>
                </div>

                {/* Rating & Duration */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    {course.rating} <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                </div>

                {/* Price & Tag */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-slate-900">{course.price}</span>
                  {course.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
                      {course.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Personalized Curriculum Banner */}
      <div className="bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-purple-100/40 border-2 border-indigo-200/80 rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-4xl mx-auto shadow-sm">
        <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
          <Sparkles className="h-6 w-6" />
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Can&apos;t find what you&apos;re looking for?
        </h3>

        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Let our AI learning assistant analyze your goals and current skills to construct a personalized
          curriculum just for you.
        </p>

        <div className="pt-2">
          <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-200 transition-all inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Generate Learning Path</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-900">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-900">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-900">
            Cookie Policy
          </a>
          <a href="#" className="hover:text-slate-900">
            Support
          </a>
        </div>
        <div>&copy; 2026 LearnOS AI. All rights reserved.</div>
      </footer>
    </div>
  );
}
