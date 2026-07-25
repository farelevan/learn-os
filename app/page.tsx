"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Code2,
  Cloud,
  Bot,
  BarChart3,
  Terminal,
  CheckCircle2,
  Star,
  ChevronDown,
  BookOpen,
  Users,
  Award,
  Zap,
  Menu,
  X,
  Shield,
  Layers,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-purple-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-200">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Learn<span className="text-violet-600">OS</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#overview" className="hover:text-violet-600 transition-colors">
              Overview
            </a>
            <a href="#programs" className="hover:text-violet-600 transition-colors">
              Programs
            </a>
            <a href="#features" className="hover:text-violet-600 transition-colors">
              Features
            </a>
            <a href="#process" className="hover:text-violet-600 transition-colors">
              Methodology
            </a>
            <a href="#faq" className="hover:text-violet-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-violet-600 px-4 py-2 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 px-5 py-2.5 rounded-full shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-all transform active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top-4">
            <nav className="flex flex-col space-y-3 font-medium text-slate-700">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-violet-50 hover:text-violet-600"
              >
                Overview
              </a>
              <a
                href="#programs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-violet-50 hover:text-violet-600"
              >
                Programs
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-violet-50 hover:text-violet-600"
              >
                Features
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-violet-50 hover:text-violet-600"
              >
                Methodology
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-violet-50 hover:text-violet-600"
              >
                FAQ
              </a>
            </nav>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center font-medium text-slate-700 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 rounded-lg shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="overview" className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Decorative Lighting/Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-400/20 via-indigo-300/20 to-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/70 border border-violet-200/80 text-violet-700 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                <span>Next-Gen LMS Platform</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Learn Smarter with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Master software engineering, cloud architecture, and artificial intelligence with
                our premium, interactive learning environment.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#programs"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-xl shadow-violet-200 hover:shadow-violet-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#programs"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 font-medium shadow-sm transition-all"
                >
                  <span>Explore Courses</span>
                </a>
              </div>
            </div>

            {/* Hero Right Graphic Preview */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                {/* Dashboard Mockup Image Card */}
                <div className="relative rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-2xl p-2 sm:p-3 overflow-hidden">
                  <Image
                    src="/hero-preview.png"
                    alt="LearnOS Dashboard Preview"
                    width={1200}
                    height={900}
                    className="rounded-xl w-full h-auto object-cover shadow-inner"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="py-12 border-y border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
            Trusted by Teams at Leading Companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-600 font-semibold opacity-70">
            <div className="flex items-center gap-2 text-base hover:opacity-100 transition-opacity">
              <Shield className="h-5 w-5 text-violet-500" />
              <span>Acme-Corp</span>
            </div>
            <div className="flex items-center gap-2 text-base hover:opacity-100 transition-opacity">
              <Layers className="h-5 w-5 text-indigo-500" />
              <span>Globex</span>
            </div>
            <div className="flex items-center gap-2 text-base hover:opacity-100 transition-opacity">
              <Zap className="h-5 w-5 text-purple-500" />
              <span>Soylent</span>
            </div>
            <div className="flex items-center gap-2 text-base hover:opacity-100 transition-opacity">
              <Code2 className="h-5 w-5 text-blue-500" />
              <span>Initech</span>
            </div>
            <div className="flex items-center gap-2 text-base hover:opacity-100 transition-opacity">
              <Cloud className="h-5 w-5 text-sky-500" />
              <span>Umbrella</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section id="programs" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Featured Programs
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg">
              Level up your career with industry-leading, hands-on courses.
            </p>
          </div>
          <a
            href="#programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
          >
            <span>View all courses</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* 3 Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white transition-all">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-violet-700 uppercase tracking-wider">
                  Artificial Intelligence
                </span>
                <span className="text-slate-600">12 wks</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors mb-3">
                Applied Generative AI
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Master LLMs, prompt engineering, fine-tuning, and building autonomous AI agents from
                scratch.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-violet-200 flex items-center justify-center text-xs font-bold text-violet-800">
                JD
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Dr. Jane Doe</p>
                <p className="text-[11px] text-slate-600">AI Researcher</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Code2 className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-indigo-700 uppercase tracking-wider">
                  Software Engineering
                </span>
                <span className="text-slate-600">10 wks</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3">
                Advanced System Design
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Learn to architect scalable, fault-tolerant, microservices and high-availability
                systems.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-800">
                AS
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Alex Smith</p>
                <p className="text-[11px] text-slate-600">Principal Architect</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Cloud className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold mb-3">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-purple-700 uppercase tracking-wider">
                  Cloud Infrastructure
                </span>
                <span className="text-slate-600">8 wks</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-3">
                Cloud Native DevOps
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Master Docker, Kubernetes, CI/CD pipelines, and Infrastructure as Code with Terraform.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold text-purple-800">
                AL
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Alan Lee</p>
                <p className="text-[11px] text-slate-600">DevOps Lead</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Deep Learning Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-slate-100/70 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Designed for Deep Learning
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Our platform is engineered for maximum retention and practical application,
              powered by intelligent features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all text-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto">
                <Bot className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Tutor</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                24/7 AI-powered assistance for code reviews, instant debugging, and personalized
                concept breakdowns tailored to your pace.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all text-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Progress Tracking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visualized learning progress and skill matrix with detailed analytics and tailored
                learning path recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all text-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
                <Terminal className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Interactive Quizzes</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Test your knowledge with real-time coding challenges, interactive quizzes, and instant
                automated evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Path to Mastery Section */}
      <section id="process" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Your Path to Mastery
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A proven 4-step methodology to go from beginner to industry expert
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-violet-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-violet-200">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enroll</h3>
            <p className="text-slate-600 text-sm">Pick your path & curriculum</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-indigo-200">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Practice</h3>
            <p className="text-slate-600 text-sm">Build real-world projects</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-purple-200">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Test</h3>
            <p className="text-slate-600 text-sm">Pass skills assessments</p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-full bg-violet-700 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-violet-300">
              4
            </div>
            <h3 className="text-lg font-bold text-slate-900">Certificate</h3>
            <p className="text-slate-600 text-sm">Get industry certification</p>
          </div>
        </div>
      </section>

      {/* What Our Learners Say (Testimonials) */}
      <section className="py-24 bg-slate-100/60 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              What Our Learners Say
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Stories from engineers who accelerated their tech careers on LearnOS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;The AI tutor completely changed how I learn. If I get stuck on a complex
                  concept or code block, I get immediate step-by-step explanations.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm">
                  SJ
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Sarah Jenkins</h4>
                  <p className="text-xs text-slate-600">Frontend Developer</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;The System Design course is a masterpiece. Highly relevant for senior roles. The
                  hands-on architecture projects were incredible.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  PC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Paul Chen</h4>
                  <p className="text-xs text-slate-600">Fullstack Engineer</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;I was able to transition to a DevOps role within 3 months. The platform is
                  super smooth, engaging, and practical.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  MR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Marcus Rodriguez</h4>
                  <p className="text-xs text-slate-600">DevOps Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section id="faq" className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => toggleFaq(0)}
              className="w-full px-6 py-5 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <span>Do I need prior coding experience?</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                  openFaq === 0 ? "rotate-180 text-violet-600" : ""
                }`}
              />
            </button>
            {openFaq === 0 && (
              <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                While some advanced courses require basic programming knowledge, we offer beginner-friendly
                foundation tracks designed to take you from step zero.
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full px-6 py-5 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <span>How does the AI Tutor work?</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                  openFaq === 1 ? "rotate-180 text-violet-600" : ""
                }`}
              />
            </button>
            {openFaq === 1 && (
              <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                Our AI Tutor analyzes your code in real-time, explains complex algorithms, suggests
                optimizations, and provides tailored hints without giving away complete solutions directly.
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => toggleFaq(2)}
              className="w-full px-6 py-5 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
            >
              <span>Can I get certified after completion?</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                  openFaq === 2 ? "rotate-180 text-violet-600" : ""
                }`}
              />
            </button>
            {openFaq === 2 && (
              <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                Yes! Every completed program awards a shareable, verifiable digital certificate that
                you can showcase on LinkedIn and your resume.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-6 py-16 sm:px-12 sm:py-20 text-center text-white overflow-hidden shadow-2xl shadow-indigo-300">
          {/* Subtle Graphic Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to level up your career?
            </h2>
            <p className="text-violet-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Join thousands of engineers upgrading their skills with the most advanced learning
              platform.
            </p>
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 font-bold px-8 py-4 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base">
                <span>Start Learning Today</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-slate-900">LearnOS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="hover:text-violet-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-violet-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-violet-600 transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-violet-600 transition-colors">
              Sitemap
            </a>
          </div>

          <p className="text-xs text-slate-600">
            &copy; 2026 LearnOS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
