import { apiClient } from "./client";

export interface CourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryName: string;
  instructorName: string;
  instructorRole?: string;
  price: number;
  level: string;
  duration: string;
  totalLessons: number;
  isFeatured: boolean;
  isTrending: boolean;
  badge?: string | null;
  coverImage: string;
  rating: number;
  reviewsCount: string;
  studentsCount: number;
}

export const coursesService = {
  async getCourses(category?: string, search?: string): Promise<CourseData[]> {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiClient<CourseData[]>(`/courses${queryString}`);
  },

  async getFeaturedCourse(): Promise<CourseData> {
    return apiClient<CourseData>("/courses/featured");
  },
};
