export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // Computed property: firstName + lastName
  email: string;
  phoneNumber: string;
  avatar: string;
  location: {
    district: string;
    sector: string;
    cell: string;
    village: string;
  };
  isGovernment: boolean;
  department?: string;
  role: 'citizen' | 'government_official' | 'moderator' | 'admin';
  verified: boolean;
  joinedAt: Date;
  reportedIssues?: string[]; // Array of issue IDs
  createdTopics?: string[]; // Array of topic IDs
}

export interface Vote {
  id: string;
  userId: string;
  targetId: string; // ID of the item being voted on
  targetType: 'issue' | 'government_reply' | 'comment';
  type: 'up' | 'down';
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'document' | 'audio';
  mimeType?: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  thumbnail?: string; // For videos and documents
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  votes: Vote[];
  replies: Comment[];
  parentId?: string; // For nested comments
  targetId: string; // ID of issue or government reply this comment belongs to
  targetType: 'issue' | 'government_reply';
  isModerated: boolean;
  moderationReason?: string;
}

export interface GovernmentReply {
  id: string;
  content: string;
  author: User;
  issueId: string;
  createdAt: Date;
  updatedAt: Date;
  votes: Vote[];
  comments: Comment[];
  attachments?: Attachment[];
  isOfficial: boolean;
  status: 'draft' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  replyType: 'followup' | 'progress' | 'resolve' | 'escalation'; // New reply type system
  responseStatus: 'final' | 'followup'; // Internal status - not visible to public
  followUpResponse?: UserFollowUpResponse; // Response from issue creator if responseStatus is 'followup'
  escalationReason?: string; // For escalation type replies
  escalationTarget?: string; // ID of the leader/level this is escalated to
}

// New interface for user follow-up responses to government inquiries
export interface UserFollowUpResponse {
  id: string;
  content: string;
  author: User;
  governmentReplyId: string;
  createdAt: Date;
  attachments?: Attachment[];
  isPrivate: boolean; // Always true - only visible to issue creator and government
}

export interface Issue {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  status: 'open' | 'under_review' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  votes: Vote[];
  followers: string[];
  comments: Comment[];
  governmentReplies: GovernmentReply[];
  attachments?: Attachment[];
  linkedIssues: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  level: 'district' | 'sector' | 'cell' | 'village'; // Administrative level
  location?: {
    district: string;
    sector: string;
    coordinates?: { lat: number; lng: number };
  };
  isModerated: boolean;
  moderationReason?: string;
  viewCount: number;
}

export interface Topic {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  votes: Vote[];
  followers: string[];
  replies: TopicReply[];
  attachments?: Attachment[];
  hashtags: string[];
  regionalRestriction?: {
    level: 'district' | 'sector' | 'cell';
    district?: string;
    sector?: string;
    cell?: string;
  };
}

export interface TopicReply {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  votes: Vote[];
  replies: TopicReply[];
  attachments?: Attachment[];
  parentId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  category: string;
  priority: 'normal' | 'important' | 'urgent';
  attachments?: Attachment[];
  targetAudience: string[];
  expiresAt?: Date;
  readBy: string[]; // Array of user IDs who have read this announcement
}

export interface Notification {
  id: string;
  userId: string;
  type: 'vote' | 'comment' | 'reply' | 'follow' | 'government_response' | 'status_update';
  title: string;
  message: string;
  relatedId: string;
  relatedType: 'issue' | 'topic' | 'comment' | 'government_reply';
  isRead: boolean;
  createdAt: Date;
}

export type Language = 'en' | 'rw' | 'fr';

export interface Translation {
  en: string;
  rw: string;
  fr: string;
}

export interface ModerationAction {
  id: string;
  moderatorId: string;
  targetId: string;
  targetType: 'issue' | 'comment' | 'government_reply';
  action: 'approve' | 'reject' | 'flag' | 'remove';
  reason: string;
  createdAt: Date;
}

// Admin/Leader specific types
export interface Leader {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  level: 'cell' | 'sector' | 'district';
  location: {
    district: string;
    sector?: string;
    cell?: string;
  };
  department: string;
  verified: boolean;
  joinedAt: Date;
}

export interface IssueAssignment {
  id: string;
  issueId: string;
  assignedTo: string; // Leader ID
  assignedBy: string; // Who assigned it
  assignedAt: Date;
  status: 'pending' | 'in_progress' | 'resolved' | 'escalated' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  notes?: string;
}

export interface EscalationAction {
  id: string;
  issueId: string;
  fromLeader: string;
  toLeader?: string; // null if escalating up
  escalationType: 'up' | 'down' | 'lateral';
  reason: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface FileUploadConfig {
  maxSize: number; // in bytes
  allowedTypes: string[];
  maxFiles: number;
}

// Survey interfaces
export interface SurveyQuestion {
  id: string;
  type: 'multiple_choice' | 'short_text' | 'long_text' | 'checkbox' | 'radio' | 'rating' | 'yes_no';
  title: string;
  description?: string;
  required: boolean;
  options?: string[]; // For multiple choice, radio, checkbox
  maxRating?: number; // For rating questions (1-5, 1-10, etc.)
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId: string;
  answers: { [questionId: string]: string | string[] | number };
  submittedAt: Date;
  ipAddress?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'closed' | 'archived';
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  settings: {
    allowAnonymous: boolean;
    requireLogin: boolean;
    showResults: boolean;
    allowMultipleResponses: boolean;
    expiresAt?: Date;
  };
  attachments?: Attachment[];
  category: 'public_opinion' | 'community_feedback' | 'government_survey' | 'research' | 'poll';
  targetAudience: string[];
  isPublic: boolean;
  viewCount: number;
}