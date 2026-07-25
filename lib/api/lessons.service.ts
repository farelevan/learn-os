import { apiClient } from "./client";

export interface LessonDetailData {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  duration: string;
  orderIndex: number;
  completed: boolean;
  inLessonQuiz: {
    id: string;
    title: string;
    questions: string; // JSON string
    passingScore: number;
  } | null;
  module: {
    id: string;
    title: string;
    courseId: string;
    course: {
      id: string;
      title: string;
      slug: string;
    };
  };
}

export const lessonsService = {
  async getById(id: string, userId?: string): Promise<LessonDetailData> {
    const params = userId ? `?userId=${userId}` : '';
    return apiClient<LessonDetailData>(`/lessons/${id}${params}`);
  },

  async markComplete(id: string, userId?: string): Promise<{ success: boolean }> {
    const params = userId ? `?userId=${userId}` : '';
    return apiClient<{ success: boolean }>(`/lessons/${id}/complete${params}`, {
      method: "POST",
    });
  },
};
