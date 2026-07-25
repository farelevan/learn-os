"use client";

import React from "react";
import { Download, Share2, Award, CheckCircle2, Star } from "lucide-react";

export function CertificatesView() {
  const proCertifications = [
    {
      id: "pro-1",
      title: "Full-Stack Developer Professional",
      type: "CERTIFICATE OF COMPLETION",
      issuedDate: "October 15, 2023",
      certId: "FS-2023-884",
      badgeColor: "amber",
    },
    {
      id: "pro-2",
      title: "AI Engineering Specialist",
      type: "CERTIFICATE OF SPECIALIZATION",
      issuedDate: "January 22, 2024",
      certId: "AI-2024-112",
      badgeColor: "indigo",
    },
  ];

  const courseCertificates = [
    {
      id: "c-1",
      title: "Advanced React Patterns",
      date: "Sept 10, 2023",
    },
    {
      id: "c-2",
      title: "UI/UX Design Systems",
      date: "Aug 05, 2023",
    },
    {
      id: "c-3",
      title: "Data Structures & Algos",
      date: "Jun 12, 2023",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Achievements Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200/50 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your Achievements</h1>
        <p className="text-indigo-100 text-sm sm:text-base max-w-xl leading-relaxed">
          Showcase your verified skills and professional growth. Download, share, and celebrate your milestones.
        </p>
      </div>

      {/* Professional Certifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">Professional Certifications</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
            2 Earned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proCertifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              {/* Mock Certificate Preview Card */}
              <div className="bg-amber-50/40 border border-amber-200/60 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white">OS</span>
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                </div>
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-slate-400 block">
                  {cert.type}
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-snug">{cert.title}</h3>
                <span className="text-[10px] font-mono text-slate-400 block pt-2">
                  ID: {cert.certId}
                </span>
              </div>

              {/* Details & Actions */}
              <div className="space-y-4">
                <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
                  <span>Issued: {cert.issuedDate}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-sm">
                    <Download className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Certificates Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <h2 className="text-xl font-bold text-slate-900">Course Certificates</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {courseCertificates.map((courseCert) => (
            <div
              key={courseCert.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
            >
              {/* Mini Cert Box */}
              <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-5 text-center space-y-2 relative">
                <Star className="h-4 w-4 text-purple-400 absolute top-2 right-2" />
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block">
                  LEARNOS COURSE COMPLETION
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {courseCert.title}
                </h4>
              </div>

              <div className="space-y-3">
                <div className="text-[11px] text-slate-500">
                  <span className="font-bold text-slate-900 block">{courseCert.title}</span>
                  <span>{courseCert.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs border border-purple-200/60 transition-all">
                    <Download className="h-3 w-3" />
                    <span>PDF</span>
                  </button>
                  <button className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
