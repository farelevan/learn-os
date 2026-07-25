import { apiClient } from "./client";

export interface CommunityPostData {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  channel: string;
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export const communityService = {
  async getPosts(channel?: string): Promise<CommunityPostData[]> {
    const queryString = channel ? `?channel=${encodeURIComponent(channel)}` : '';
    return apiClient<CommunityPostData[]>(`/community/posts${queryString}`);
  },

  async createPost(title: string, content: string, channel?: string): Promise<CommunityPostData> {
    return apiClient<CommunityPostData>("/community/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, channel }),
    });
  },

  async likePost(id: string): Promise<CommunityPostData> {
    return apiClient<CommunityPostData>(`/community/posts/${id}/like`, {
      method: "POST",
    });
  },
};
