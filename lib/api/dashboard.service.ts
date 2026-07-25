import { apiClient } from "./client";
import { CourseData } from "./courses.service";

export interface DashboardSummaryData {
  user: {
    id?: string;
    name: string;
    email?: string;
  };
  stats: {
    activeCourses: number;
    totalLearningHours: number;
    certificatesEarned: number;
    completionRate: string;
    learningStreakDays: number;
  };
  continueLearning?: CourseData | null;
}

export const dashboardService = {
  async getSummary(): Promise<DashboardSummaryData> {
    return apiClient<DashboardSummaryData>("/dashboard/summary");
  },
};
