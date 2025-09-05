import { useState, useEffect, useCallback } from 'react';
import { AnnouncementResponseDto, PaginatedAnnouncementsResponse } from '../types/announcements';
import { API_ENDPOINTS } from '../config/api';
import { makeAuthenticatedRequest, handleAuthenticationError } from '@/lib/utils/authenticated-fetch';

interface UseAnnouncementsOptions {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  enabled?: boolean;
}

interface UseAnnouncementsReturn {
  announcements: AnnouncementResponseDto[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchAnnouncements: (page?: number) => Promise<void>;
  markAsRead: (announcementId: number) => Promise<void>;
  nextPage: () => void;
  previousPage: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  refetch: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
}

export const useAnnouncements = (options: UseAnnouncementsOptions = {}): UseAnnouncementsReturn => {
  const {
    page = 0,
    size = 20,
    sortBy = 'createdAt',
    sortDir = 'desc',
    enabled = true,
  } = options;

  const [announcements, setAnnouncements] = useState<AnnouncementResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);


  const fetchAnnouncements = useCallback(async (pageNum: number = currentPage) => {
    if (!enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const url = API_ENDPOINTS.ANNOUNCEMENTS.GET_ALL(pageNum, size, sortBy, sortDir);
      console.log('Fetching announcements from:', url);
      
      const response = await makeAuthenticatedRequest(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response received:', response);
      console.log('Response status:', response.status);

      if (response.ok) {
        const data: PaginatedAnnouncementsResponse = await response.json();
        console.log('Announcements data:', data);
        setAnnouncements(data.content);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
      } else {
        console.error('Response not ok:', response.status, response.statusText);
        
        let errorMessage = `Failed to fetch announcements: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.text();
          if (errorData) {
            errorMessage += ` - ${errorData}`;
          }
        } catch {
          console.log('Could not read error response body');
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      handleAuthenticationError(err as Error);
      console.error('Error fetching announcements:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch announcements');
    } finally {
      setIsLoading(false);
    }
  }, [enabled, currentPage, size, sortBy, sortDir]);

  const markAsRead = useCallback(async (announcementId: number) => {
    try {
      console.log('Marking announcement as read:', announcementId);
      
      const response = await makeAuthenticatedRequest(
        API_ENDPOINTS.ANNOUNCEMENTS.VIEW(announcementId.toString()),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Successfully marked announcement as read');
        // Update local state to mark as read
        setAnnouncements(prev => 
          prev.map(announcement => 
            announcement.id === announcementId 
              ? { ...announcement, hasViewed: true, viewCount: announcement.viewCount + 1 }
              : announcement
          )
        );
      } else {
        console.error('Failed to mark announcement as read:', response.status, response.statusText);
      }
    } catch (err) {
      handleAuthenticationError(err as Error);
      console.error('Error marking announcement as read:', err);
    }
  }, []);

  // Pagination functions
  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      fetchAnnouncements(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchAnnouncements]);

  const previousPage = useCallback(() => {
    if (currentPage > 0) {
      fetchAnnouncements(currentPage - 1);
    }
  }, [currentPage, fetchAnnouncements]);

  const hasNext = currentPage < totalPages - 1;
  const hasPrevious = currentPage > 0;

  const refetch = useCallback(() => fetchAnnouncements(currentPage), [fetchAnnouncements, currentPage]);
  
  const fetchNextPage = useCallback(async () => {
    if (hasNext) {
      await fetchAnnouncements(currentPage + 1);
    }
  }, [hasNext, currentPage, fetchAnnouncements]);
  
  const fetchPreviousPage = useCallback(async () => {
    if (hasPrevious) {
      await fetchAnnouncements(currentPage - 1);
    }
  }, [hasPrevious, currentPage, fetchAnnouncements]);
  
  const goToPage = useCallback(async (pageNum: number) => {
    if (pageNum >= 0 && pageNum < totalPages) {
      await fetchAnnouncements(pageNum);
    }
  }, [totalPages, fetchAnnouncements]);

  // Fetch announcements on mount
  useEffect(() => {
    if (enabled) {
      console.log('useAnnouncements hook mounted, fetching announcements...');
      fetchAnnouncements(page);
    }
  }, [enabled, page, fetchAnnouncements]);

  return {
    announcements,
    isLoading,
    error,
    totalPages,
    currentPage,
    fetchAnnouncements,
    markAsRead,
    nextPage,
    previousPage,
    hasNext,
    hasPrevious,
    refetch,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
  };
};
