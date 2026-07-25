import { apiClient } from "./client";

export interface LessonData {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  duration: string;
  orderIndex: number;
  completed: boolean;
  hasQuiz: boolean;
}

export interface ModuleQuizData {
  id: string;
  title: string;
  quizType: string;
  passingScore: number;
  questions: string; // JSON string
}

export interface ModuleData {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  lessons: LessonData[];
  moduleQuiz: ModuleQuizData | null;
  totalLessons: number;
  completedLessons: number;
  isCompleted: boolean;
}

export const modulesService = {
  async getByCourseId(courseId: string, userId?: string): Promise<ModuleData[]> {
    const params = userId ? `?userId=${userId}` : '';
    return apiClient<ModuleData[]>(`/modules/course/${courseId}${params}`);
  },
};
