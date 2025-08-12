import React, { useState } from 'react';
import { MessageCircle, Users, Clock, Tag, ExternalLink, Paperclip } from 'lucide-react';
import { Issue } from '../types';
import { VoteButton } from './VoteButton';
import { getTranslation } from '../i18n/translations';

interface IssueCardProps {
  issue: Issue;
  language: string;
  onClick: () => void;
  currentUser?: any; // Add current user prop
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-orange-100 text-orange-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

export const IssueCard: React.FC<IssueCardProps> = ({ issue, language, onClick, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(issue.followers.includes('1'));

  const handleVote = (_type: 'up' | 'down') => {
    // Vote logic would be implemented here
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        return getTranslation('justNow', language);
      }
      return `${hours} ${getTranslation('hoursAgo', language)}`;
    }
    return `${days} ${getTranslation('daysAgo', language)}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group">
      <div onClick={onClick} className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {issue.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {issue.content}
            </p>
          </div>
          <div className="ml-4">
            <VoteButton 
              votes={issue.votes} 
              onVote={handleVote}
              currentUserId="1"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
            {issue.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {issue.level.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[issue.priority]}`}>
            {issue.priority.toUpperCase()}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Tag size={12} className="mr-1" />
            {issue.category.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={issue.author.avatar}
                alt={issue.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{currentUser && currentUser.id === issue.author.id ? 'You' : issue.author.name}</span>
              {issue.author.isGovernment && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Gov
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{formatDate(issue.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <MessageCircle size={14} />
              <span>{issue.comments.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{issue.followers.length}</span>
            </div>
            {issue.attachments && issue.attachments.length > 0 && (
              <div className="flex items-center space-x-1">
                <Paperclip size={14} />
                <span>{issue.attachments.length}</span>
              </div>
            )}
            {issue.linkedIssues.length > 0 && (
              <div className="flex items-center space-x-1">
                <ExternalLink size={14} />
                <span>{issue.linkedIssues.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {issue.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">
                #{tag}
              </span>
            ))}
          </div>
          {currentUser && currentUser.id !== issue.author.id && (
            <button
              onClick={handleFollow}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isFollowing
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isFollowing ? getTranslation('following', language) : getTranslation('follow', language)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};