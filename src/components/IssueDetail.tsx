import React, { useState } from 'react';
import { ArrowLeft, Eye, Users, Tag, MapPin, MessageCircle } from 'lucide-react';
import { Issue, User } from '../types';
import { VoteButton } from './VoteButton';
import { GovernmentReply } from './GovernmentReply';
import { CommentThread } from './CommentThread';
import { useLoginPrompt } from '../contexts/LoginPromptContext';

interface IssueDetailProps {
  issue: Issue;
  currentUser: User | null;
  onBack: () => void;
  onVote: (type: 'up' | 'down') => void;
  onFollow: () => void;
  onComment: (content: string) => void;
  onReplyToComment: (parentId: string, content: string) => void;
  onVoteComment: (commentId: string, type: 'up' | 'down') => void;
  onGovernmentReplyVote: (replyId: string, type: 'up' | 'down') => void;
  onGovernmentReplyComment: (replyId: string, content: string, attachments?: File[]) => void;
  isFollowing: boolean;
}

export const IssueDetail: React.FC<IssueDetailProps> = ({
  issue,
  currentUser,
  onBack,
  onVote,
  onFollow,
  onComment,
  onReplyToComment,
  onVoteComment,
  onGovernmentReplyVote,
  onGovernmentReplyComment,
  isFollowing,
}) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const statusColors = {
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    under_review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    in_progress: 'bg-orange-100 text-orange-800 border-orange-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    closed: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <nav className="text-sm text-gray-500">
            <span>Issues</span> / <span className="text-gray-900">{issue.title}</span>
          </nav>
        </div>
      </div>

      {/* Issue Content */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{issue.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColors[issue.status]}`}>
                  {issue.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {issue.level.toUpperCase()} LEVEL
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[issue.priority]}`}>
                  {issue.priority.toUpperCase()} PRIORITY
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <Tag size={12} className="mr-1" />
                  {issue.category}
                </span>
              </div>
            </div>
            <VoteButton
              votes={issue.votes}
              onVote={onVote}
              currentUserId={currentUser?.id || ''}
            />
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {issue.content}
            </p>
          </div>

          {issue.attachments && issue.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Attachments</h3>
              <div className="space-y-4">
                {/* Images and Videos - Display inline */}
                {issue.attachments
                  .filter(attachment => attachment.type === 'image' || attachment.type === 'video')
                  .map((attachment) => (
                    <div key={attachment.id} className="rounded-lg overflow-hidden">
                      {attachment.type === 'image' ? (
                        <div>
                          <img
                            src={attachment.url}
                            alt={attachment.name}
                            className="w-full max-w-2xl rounded-lg shadow-sm"
                          />
                          <p className="text-sm text-gray-600 mt-2">{attachment.name}</p>
                        </div>
                      ) : (
                        <div>
                          <video
                            src={attachment.url}
                            controls
                            className="w-full max-w-2xl rounded-lg shadow-sm"
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                          <p className="text-sm text-gray-600 mt-2">{attachment.name}</p>
                        </div>
                      )}
                    </div>
                  ))}
                
                {/* Other file types - Downloadable */}
                {issue.attachments
                  .filter(attachment => attachment.type !== 'image' && attachment.type !== 'video')
                  .length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-gray-800 mb-2">Downloads</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {issue.attachments
                          .filter(attachment => attachment.type !== 'image' && attachment.type !== 'video')
                          .map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border"
                            >
                              <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center">
                                <span className="text-blue-600 text-sm font-medium uppercase">
                                  {attachment.type === 'pdf' ? 'PDF' : 
                                   attachment.type === 'document' ? 'DOC' : 
                                   attachment.type === 'audio' ? 'AUD' : 'FILE'}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{attachment.name}</p>
                                <p className="text-sm text-gray-500">
                                  {(attachment.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Download
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {issue.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {issue.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <img
                    src={issue.author.avatar}
                    alt={issue.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{currentUser?.id === issue.author.id ? 'You' : issue.author.name}</p>
                    <p className="text-xs text-gray-500">Created {formatDate(issue.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{issue.viewCount} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{issue.followers.length} followers</span>
                  </div>
                  {issue.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{issue.location.district}, {issue.location.sector}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {currentUser?.id !== issue.author.id && (
                  <button
                    onClick={onFollow}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isFollowing
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  <span>{issue.comments.length} {issue.comments.length === 1 ? 'Comment' : 'Comments'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section - Integrated into issue card */}
          {showComments && (
            <div className="border-t border-gray-200 mt-6 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comments ({issue.comments.length})
              </h3>

              {/* Add Comment */}
              <div className="mb-6 space-y-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment about this issue..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Comments Thread */}
              {issue.comments.length > 0 ? (
                <CommentThread
                  comments={issue.comments}
                  currentUser={currentUser}
                  onReply={onReplyToComment}
                  onVote={onVoteComment}
                  maxDepth={3}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No comments yet. Be the first to comment on this issue!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Government Replies */}
      {issue.governmentReplies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Official Government Responses ({issue.governmentReplies.length})
          </h2>
          {issue.governmentReplies.map((reply) => (
            <GovernmentReply
              key={reply.id}
              reply={reply}
              currentUser={currentUser}
              isIssueCreator={currentUser?.id === issue.author.id}
              onVote={onGovernmentReplyVote}
              onComment={onGovernmentReplyComment}
              onReplyToComment={onReplyToComment}
              onVoteComment={onVoteComment}
              onFollowUpResponse={(replyId, content, attachments) => {
                // Handle follow-up response - in a real app this would update the backend
                console.log('Follow-up response:', { replyId, content, attachments });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};