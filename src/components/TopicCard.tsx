import React, { useState } from 'react';
import { MessageCircle, MoreHorizontal } from 'lucide-react';
import { Topic } from '../types';
import { VoteButton } from './VoteButton';
import { getTranslation } from '../i18n/translations';
import RegionalBadge from './RegionalBadge';

interface TopicCardProps {
  topic: Topic;
  language: string;
  onClick: () => void;
  currentUser?: any; // Add current user prop
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, language, onClick, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(topic.followers.includes('1'));

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Vote logic would be implemented here
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes < 1 ? getTranslation('justNow', language) : `${minutes}m`;
      }
      return `${hours}h`;
    }
    return `${days}d`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer">
      <div onClick={onClick} className="p-6">
        <div className="flex space-x-3">
          <img
            src={topic.author.avatar}
            alt={topic.author.name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">{currentUser && currentUser.id === topic.author.id ? 'You' : topic.author.name}</span>
              {topic.author.isGovernment && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Gov
                </span>
              )}
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{formatDate(topic.createdAt)}</span>
              <button className="ml-auto p-1 rounded-full hover:bg-gray-100 transition-colors">
                <MoreHorizontal size={16} className="text-gray-500" />
              </button>
            </div>
            <p className="text-gray-900 mb-3 leading-relaxed">
              {topic.content}
            </p>
            {topic.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {topic.hashtags.map(hashtag => (
                  <span key={hashtag} className="text-blue-600 hover:underline cursor-pointer">
                    #{hashtag}
                  </span>
                ))}
              </div>
            )}
            {topic.regionalRestriction && (
              <div className="mb-3">
                <RegionalBadge regionalRestriction={topic.regionalRestriction} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <VoteButton
                votes={topic.votes}
                onVote={() => handleVote({} as React.MouseEvent)}
                currentUserId="1"
                size="sm"
              />
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick(); // Navigate to topic detail to see/add replies
              }}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <MessageCircle size={16} />
              <span className="text-sm">{topic.replies.length}</span>
            </button>
          </div>
          {currentUser && currentUser.id !== topic.author.id && (
            <button
              onClick={handleFollow}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
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