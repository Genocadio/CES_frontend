const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  ANNOUNCEMENTS: {
    GET_ALL: (page: number = 0, size: number = 20, sortBy: string = 'createdAt', sortDir: string = 'desc') =>
      `${API_BASE_URL}/announcements?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/announcements/${id}`,
    CREATE: `${API_BASE_URL}/announcements`,
    UPDATE: (id: string) => `${API_BASE_URL}/announcements/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/announcements/${id}`,
    VIEW: (id: string) => `${API_BASE_URL}/announcements/${id}/view`,
  },
  COMMENTS: {
    GET_BY_POST: (postId: number, postType: string, page: number = 0, size: number = 20, sortBy: string = 'createdAt', sortDir: string = 'desc') =>
      `${API_BASE_URL}/comments?postId=${postId}&postType=${postType}&page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
    CREATE: `${API_BASE_URL}/comments`,
    UPVOTE: (commentId: string) => `${API_BASE_URL}/comments/${commentId}/upvote`,
    DOWNVOTE: (commentId: string) => `${API_BASE_URL}/comments/${commentId}/downvote`,
  },
} as const;
