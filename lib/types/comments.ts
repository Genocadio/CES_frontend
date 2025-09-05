export enum PostType {
  ISSUE = 'ISSUE',
  RESPONSE = 'RESPONSE',
  COMMENT = 'COMMENT',
}

export interface UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
}

export interface CommentResponseDto {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
  postType: PostType;
  user: UserResponseDto;
  children: CommentResponseDto[];
  hasvoted: boolean;
  upvotes: number;
  downvotes: number;
}

export interface CommentRequestDto {
  text: string;
  isPrivate: boolean;
  userId: number;
  postId: number;
  postType: PostType;
}

export interface CommentVoteRequestDto {
  commentId: number;
  voteType: 'up' | 'down';
}

export interface CommentVoteResponseDto {
  id: number;
  upvotes: number;
  downvotes: number;
  hasvoted: boolean;
}
