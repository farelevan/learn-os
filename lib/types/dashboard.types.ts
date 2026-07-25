export interface StatMetric {
  id: string;
  title: string;
  value: string | number;
  badge?: string;
  iconName: "book" | "clock" | "award" | "rotate";
  colorScheme: "purple" | "indigo" | "amber" | "emerald";
}

export interface UpcomingLesson {
  id: string;
  dateBadge: string;
  dayNumber: string;
  title: string;
  timeRange: string;
  badgeColor: "indigo" | "purple" | "slate";
}

export interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  progressPercentage: number;
  coverImagePath: string;
}
