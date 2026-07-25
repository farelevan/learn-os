import { apiClient } from "./client";
import { CourseData } from "./courses.service";

export interface EnrollmentData {
  id: string;
  userId: string;
  courseId: string;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  isBookmarked: boolean;
  status: string;
  statusText?: "DONE" | "IN_PROGRESS";
  isDone?: boolean;
  course: CourseData;
}

export const enrollmentsService = {
  async getMyLearning(): Promise<EnrollmentData[]> {
    return apiClient<EnrollmentData[]>("/enrollments/my-learning");
  },

  async enroll(courseId: string): Promise<EnrollmentData> {
    return apiClient<EnrollmentData>(`/enrollments/${courseId}`, {
      method: "POST",
    });
  },
};
