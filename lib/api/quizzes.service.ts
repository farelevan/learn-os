import { apiClient } from "./client";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizData {
  id: string;
  title: string;
  quizType: string;
  passingScore: number;
  questions: string; // JSON string of QuizQuestion[]
}

export interface QuizResult {
  question: string;
  userAnswer: number;
  correctIndex: number;
  isCorrect: boolean;
}

export interface QuizSubmitResponse {
  attemptId: string;
  score: number;
  passed: boolean;
  passingScore: number;
  totalQuestions: number;
  correctCount: number;
  results: QuizResult[];
  certificateGenerated: boolean;
}

export const quizzesService = {
  async getByLesson(lessonId: string): Promise<QuizData | null> {
    return apiClient<QuizData | null>(`/quizzes/lesson/${lessonId}`);
  },

  async getByModule(moduleId: string): Promise<QuizData | null> {
    return apiClient<QuizData | null>(`/quizzes/module/${moduleId}`);
  },

  async submit(quizId: string, answers: number[], userId?: string): Promise<QuizSubmitResponse> {
    const params = userId ? `?userId=${userId}` : '';
    return apiClient<QuizSubmitResponse>(`/quizzes/${quizId}/submit${params}`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    });
  },
};
