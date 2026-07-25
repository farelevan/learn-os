"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  PlayCircle,
  Lock,
  Award,
  Trophy,
  X,
  ChevronRight,
  RefreshCw,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { apiClient } from "../../../../lib/api/client";
import { CourseData } from "../../../../lib/api/courses.service";
import { modulesService, ModuleData, LessonData } from "../../../../lib/api/modules.service";
import { lessonsService } from "../../../../lib/api/lessons.service";
import { quizzesService, QuizQuestion, QuizSubmitResponse } from "../../../../lib/api/quizzes.service";

type ViewState = "video" | "in-lesson-quiz" | "module-quiz" | "completed";

export default function LearningPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [course, setCourse] = useState<CourseData | null>(null);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [expandedSidebarModule, setExpandedSidebarModule] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("video");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizId, setQuizId] = useState<string>("");
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizSubmitResponse | null>(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // Certificate state
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Load course and modules
  useEffect(() => {
    async function load() {
      try {
        const courses = await apiClient<CourseData[]>("/courses");
        const found = courses.find((c) => c.slug === slug);
        if (!found) return;
        setCourse(found);

        const mods = await modulesService.getByCourseId(found.id);
        setModules(mods);

        // Find first incomplete lesson
        let firstLesson: LessonData | null = null;
        let modIdx = 0;
        for (let i = 0; i < mods.length; i++) {
          const incomplete = mods[i].lessons.find((l) => !l.completed);
          if (incomplete) {
            firstLesson = incomplete;
            modIdx = i;
            break;
          }
        }
        if (!firstLesson && mods.length > 0 && mods[0].lessons.length > 0) {
          firstLesson = mods[0].lessons[0];
        }

        if (firstLesson) {
          setCurrentLesson(firstLesson);
          setCurrentModuleIndex(modIdx);
          setExpandedSidebarModule(mods[modIdx].id);
        }
      } catch (err) {
        console.error("Error loading player:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  const refreshModules = useCallback(async () => {
    if (!course) return;
    const mods = await modulesService.getByCourseId(course.id);
    setModules(mods);
    return mods;
  }, [course]);

  const handleSelectLesson = (lesson: LessonData, moduleIndex: number) => {
    setCurrentLesson(lesson);
    setCurrentModuleIndex(moduleIndex);
    setViewState("video");
    setQuizResult(null);
  };

  const handleMarkComplete = async () => {
    if (!currentLesson) return;

    try {
      await lessonsService.markComplete(currentLesson.id);
      const updatedMods = await refreshModules();

      if (!updatedMods) return;

      // Update current lesson's completed status locally
      const updatedLesson = { ...currentLesson, completed: true };
      setCurrentLesson(updatedLesson);

      // Check if lesson has an in-lesson quiz
      if (currentLesson.hasQuiz) {
        const quiz = await quizzesService.getByLesson(currentLesson.id);
        if (quiz) {
          const questions = JSON.parse(quiz.questions) as QuizQuestion[];
          setQuizQuestions(questions);
          setQuizId(quiz.id);
          setQuizTitle(quiz.title);
          setSelectedAnswers(new Array(questions.length).fill(-1));
          setCurrentQuestionIndex(0);
          setQuizResult(null);
          setViewState("in-lesson-quiz");
          return;
        }
      }

      // Check if all lessons in current module are done → show module quiz
      const currentMod = updatedMods[currentModuleIndex];
      if (currentMod && currentMod.isCompleted && currentMod.moduleQuiz) {
        const quiz = await quizzesService.getByModule(currentMod.id);
        if (quiz) {
          const questions = JSON.parse(quiz.questions) as QuizQuestion[];
          setQuizQuestions(questions);
          setQuizId(quiz.id);
          setQuizTitle(quiz.title);
          setSelectedAnswers(new Array(questions.length).fill(-1));
          setCurrentQuestionIndex(0);
          setQuizResult(null);
          setViewState("module-quiz");
          return;
        }
      }

      // Otherwise go to next lesson
      goToNextLesson(updatedMods);
    } catch (err) {
      console.error("Error completing lesson:", err);
    }
  };

  const goToNextLesson = (mods: ModuleData[]) => {
    const currentMod = mods[currentModuleIndex];
    if (!currentMod || !currentLesson) return;

    const currentIdx = currentMod.lessons.findIndex((l) => l.id === currentLesson.id);

    // Try next lesson in same module
    if (currentIdx < currentMod.lessons.length - 1) {
      setCurrentLesson(currentMod.lessons[currentIdx + 1]);
      setViewState("video");
      return;
    }

    // Try first lesson of next module
    if (currentModuleIndex < mods.length - 1) {
      const nextMod = mods[currentModuleIndex + 1];
      if (nextMod.lessons.length > 0) {
        setCurrentLesson(nextMod.lessons[0]);
        setCurrentModuleIndex(currentModuleIndex + 1);
        setExpandedSidebarModule(nextMod.id);
        setViewState("video");
        return;
      }
    }

    // All done!
    setViewState("completed");
  };

  const handleSubmitQuiz = async () => {
    setSubmittingQuiz(true);
    try {
      const result = await quizzesService.submit(quizId, selectedAnswers);
      setQuizResult(result);

      if (result.certificateGenerated) {
        setShowCertificateModal(true);
      }
    } catch (err) {
      console.error("Error submitting quiz:", err);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const handleQuizContinue = async () => {
    if (!quizResult) return;

    if (quizResult.passed) {
      const updatedMods = await refreshModules();
      if (!updatedMods) return;

      if (viewState === "in-lesson-quiz") {
        // After in-lesson quiz, check if module is complete
        const currentMod = updatedMods[currentModuleIndex];
        if (currentMod && currentMod.isCompleted && currentMod.moduleQuiz) {
          const quiz = await quizzesService.getByModule(currentMod.id);
          if (quiz) {
            const questions = JSON.parse(quiz.questions) as QuizQuestion[];
            setQuizQuestions(questions);
            setQuizId(quiz.id);
            setQuizTitle(quiz.title);
            setSelectedAnswers(new Array(questions.length).fill(-1));
            setCurrentQuestionIndex(0);
            setQuizResult(null);
            setViewState("module-quiz");
            return;
          }
        }
        goToNextLesson(updatedMods);
      } else {
        // After module quiz passed
        // Check if all modules completed
        const allDone = updatedMods.every((m) => m.isCompleted);
        if (allDone) {
          setViewState("completed");
        } else {
          goToNextLesson(updatedMods);
        }
      }
    } else {
      // Failed — retry
      setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
      setCurrentQuestionIndex(0);
      setQuizResult(null);
    }
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.totalLessons, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.completedLessons, 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm font-medium">Loading player...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all ${sidebarOpen ? "mr-0" : ""}`}>
        {/* Top Bar */}
        <div className="h-14 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/course/${slug}`)}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Course</span>
            </button>
            <div className="h-4 w-px bg-slate-700" />
            <p className="text-xs text-slate-300 font-semibold truncate max-w-[200px] sm:max-w-md">
              {course?.title}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5">
              <div className="w-16 bg-slate-700 rounded-full h-1.5">
                <div
                  className="bg-indigo-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-bold">{overallProgress}%</span>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-xs text-slate-400 hover:text-white font-medium transition-colors flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{sidebarOpen ? "Hide" : "Show"} Curriculum</span>
            </button>
          </div>
        </div>

        {/* Video / Quiz / Completed Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          {viewState === "video" && currentLesson && (
            <div className="w-full max-w-5xl space-y-6">
              {/* YouTube Embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800">
                <iframe
                  src={currentLesson.youtubeUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Lesson Info & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold">{currentLesson.title}</h2>
                  {currentLesson.description && (
                    <p className="text-xs text-slate-400 max-w-xl">{currentLesson.description}</p>
                  )}
                </div>

                {!currentLesson.completed ? (
                  <button
                    onClick={handleMarkComplete}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 shrink-0"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Complete
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quiz View */}
          {(viewState === "in-lesson-quiz" || viewState === "module-quiz") && (
            <div className="w-full max-w-2xl">
              {!quizResult ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
                  {/* Quiz Header */}
                  <div className="text-center space-y-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      viewState === "module-quiz"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      <Award className="h-3 w-3" />
                      {viewState === "module-quiz" ? "Module Quiz" : "Lesson Quiz"}
                    </div>
                    <h2 className="text-xl font-bold">{quizTitle}</h2>
                    <p className="text-xs text-slate-400">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center justify-center gap-1.5">
                    {quizQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentQuestionIndex
                            ? "w-6 bg-indigo-500"
                            : selectedAnswers[i] >= 0
                            ? "w-1.5 bg-indigo-400"
                            : "w-1.5 bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Question */}
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-center leading-relaxed">
                      {quizQuestions[currentQuestionIndex]?.question}
                    </h3>

                    <div className="space-y-2">
                      {quizQuestions[currentQuestionIndex]?.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const newAnswers = [...selectedAnswers];
                            newAnswers[currentQuestionIndex] = optIdx;
                            setSelectedAnswers(newAnswers);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            selectedAnswers[currentQuestionIndex] === optIdx
                              ? "bg-indigo-600 text-white border border-indigo-500 shadow-lg shadow-indigo-500/20"
                              : "bg-slate-800 text-slate-300 border border-slate-700 hover:border-indigo-500/50 hover:text-white"
                          }`}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              selectedAnswers[currentQuestionIndex] === optIdx
                                ? "border-white bg-white text-indigo-600"
                                : "border-slate-600 text-slate-500"
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      Previous
                    </button>

                    {currentQuestionIndex < quizQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                        disabled={selectedAnswers[currentQuestionIndex] < 0}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-30 transition-all flex items-center gap-1"
                      >
                        Next <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={selectedAnswers.some((a) => a < 0) || submittingQuiz}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs disabled:opacity-30 transition-all"
                      >
                        {submittingQuiz ? "Submitting..." : "Submit Quiz"}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Result */
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl text-center">
                  <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto ${
                    quizResult.passed
                      ? "bg-emerald-500/20 border-2 border-emerald-500/40"
                      : "bg-red-500/20 border-2 border-red-500/40"
                  }`}>
                    {quizResult.passed ? (
                      <Trophy className="h-10 w-10 text-emerald-400" />
                    ) : (
                      <X className="h-10 w-10 text-red-400" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-black">
                      {quizResult.passed ? "🎉 Excellent!" : "😔 Not Quite"}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {quizResult.passed
                        ? "You passed the quiz! Great work."
                        : `You need ${quizResult.passingScore}% to pass. Try again!`}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <p className={`text-4xl font-black ${quizResult.passed ? "text-emerald-400" : "text-red-400"}`}>
                        {quizResult.score}%
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Score</p>
                    </div>
                    <div className="h-12 w-px bg-slate-800" />
                    <div className="text-center">
                      <p className="text-4xl font-black text-slate-300">
                        {quizResult.correctCount}/{quizResult.totalQuestions}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Correct</p>
                    </div>
                  </div>

                  {/* Results Detail */}
                  <div className="space-y-2 text-left max-h-48 overflow-y-auto">
                    {quizResult.results.map((r, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 p-3 rounded-xl text-xs ${
                          r.isCorrect
                            ? "bg-emerald-500/10 border border-emerald-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {r.isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <span className={r.isCorrect ? "text-emerald-300" : "text-red-300"}>
                          {r.question}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleQuizContinue}
                    className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 mx-auto ${
                      quizResult.passed
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30"
                        : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/30"
                    }`}
                  >
                    {quizResult.passed ? (
                      <>
                        Continue <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4" /> Retry Quiz
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Course Completed View */}
          {viewState === "completed" && (
            <div className="w-full max-w-xl text-center space-y-8">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/40">
                  <Trophy className="h-14 w-14 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 left-0 right-0 flex justify-center">
                  <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-black">🎉 Congratulations!</h1>
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  You&apos;ve completed <strong className="text-white">{course?.title}</strong>! Your certificate
                  has been generated and is available in your Certificates page.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => router.push(`/course/${slug}`)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all"
                >
                  View Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar — Curriculum */}
      {sidebarOpen && (
        <div className="w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-800 shrink-0">
            <h3 className="text-sm font-bold">Course Content</h3>
            <p className="text-[10px] text-slate-500 mt-1">
              {completedLessons}/{totalLessons} lessons completed
            </p>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-indigo-500 h-1.5 rounded-full transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {modules.map((mod, modIdx) => {
              const isExpanded = expandedSidebarModule === mod.id;
              return (
                <div key={mod.id}>
                  <button
                    onClick={() => setExpandedSidebarModule(isExpanded ? null : mod.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors border-b border-slate-800/50"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        mod.isCompleted
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        {mod.isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : mod.orderIndex}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 leading-tight">{mod.title}</p>
                        <p className="text-[10px] text-slate-500">
                          {mod.completedLessons}/{mod.totalLessons}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-900/80">
                      {mod.lessons.map((lesson) => {
                        const isActive = currentLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson, modIdx)}
                            className={`w-full px-4 py-2.5 flex items-center gap-2.5 text-left transition-colors ${
                              isActive
                                ? "bg-indigo-600/20 border-l-2 border-indigo-500"
                                : "hover:bg-slate-800/50 border-l-2 border-transparent"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            ) : isActive ? (
                              <PlayCircle className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                            ) : (
                              <PlayCircle className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className={`text-[11px] font-medium truncate ${
                                isActive ? "text-indigo-300" : "text-slate-300"
                              }`}>
                                {lesson.title}
                              </p>
                              <p className="text-[9px] text-slate-500">{lesson.duration}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-2xl">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
              <Award className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black">🏆 Certificate Earned!</h2>
              <p className="text-indigo-200 text-sm">
                Congratulations! You&apos;ve earned a certificate for completing
              </p>
              <p className="text-lg font-bold text-white">{course?.title}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Certificate of Completion</p>
              <p className="text-xs text-slate-400">
                This certificate has been added to your Certificates page. You can download and share it anytime.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowCertificateModal(false);
                  setViewState("completed");
                }}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
