"use client";

import React from "react";
import Image from "next/image";
import { EnrolledCourse } from "../../lib/types/dashboard.types";

const mockCourses: EnrolledCourse[] = [
  {
    id: "c1",
    title: "Full-Stack Web Development",
    description: "Building scalable applications with React and Node.js.",
    category: "Web Dev",
    progressPercentage: 45,
    coverImagePath: "/course-webdev.png",
  },
  {
    id: "c2",
    title: "Advanced UI/UX Patterns",
    description: "Mastering micro-interactions and accessibility in modern interfaces.",
    category: "Design",
    progressPercentage: 12,
    coverImagePath: "/course-uiux.png",
  },
];

export function CourseGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900">My Courses</h3>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all"
          >
            <div className="relative h-32 w-full overflow-hidden bg-slate-100">
              <Image
                src={course.coverImagePath}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800">
                {course.category}
              </span>
            </div>
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2">{course.description}</p>
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-indigo-600">{course.progressPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
