export interface AnnouncementRequestDto {
  title: string;
  description: string;
  language: Language;
  endTime: string; // ISO string
  attachments?: AttachmentRequestDto[];
}

export interface AnnouncementResponseDto {
  id: number;
  title: string;
  description: string;
  language: Language;
  priority?: string; // Added priority field
  category?: string; // Added category field
  viewCount: number;
  hasViewed: boolean;
  attachments: AttachmentResponseDto[];
  createdAt: string;
  updatedAt: string;
  endTime: string;
  active: boolean;
}

export interface AttachmentRequestDto {
  url: string;
  type: AttachmentType;
  description: string;
}

export interface AttachmentResponseDto {
  id: number;
  url: string;
  type: AttachmentType;
  description: string;
}

export interface PaginatedAnnouncementsResponse {
  content: AnnouncementResponseDto[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export enum Language {
  EN = 'EN',
  FR = 'FR',
  RW = 'RW'
}

export enum AttachmentType {
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE'
}
