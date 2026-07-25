import { apiClient } from "./client";

export interface CalendarEventData {
  id: string;
  userId: string;
  title: string;
  dateBadge: string;
  dayNumber: string;
  timeRange: string;
  eventType: "LIVE_SESSION" | "DEADLINE" | "GOAL";
  eventDate: string;
}

export const calendarService = {
  async getEvents(): Promise<CalendarEventData[]> {
    return apiClient<CalendarEventData[]>("/calendar/events");
  },

  async createEvent(
    title: string,
    dateBadge: string,
    dayNumber: string,
    timeRange: string
  ): Promise<CalendarEventData> {
    return apiClient<CalendarEventData>("/calendar/events", {
      method: "POST",
      body: JSON.stringify({ title, dateBadge, dayNumber, timeRange }),
    });
  },
};
