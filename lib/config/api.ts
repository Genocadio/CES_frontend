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
} as const;
