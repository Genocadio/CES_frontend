import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Vote } from '../types';

interface VoteButtonProps {
  votes: Vote[];
  onVote: (type: 'up' | 'down') => void;
  currentUserId: string;
  size?: 'sm' | 'md';
}

export const VoteButton: React.FC<VoteButtonProps> = ({ votes, onVote, currentUserId, size = 'md' }) => {
  const upVotes = votes.filter(v => v.type === 'up').length;
  const downVotes = votes.filter(v => v.type === 'down').length;
  const userVote = votes.find(v => v.userId === currentUserId);
  const score = upVotes - downVotes;

  const iconSize = size === 'sm' ? 14 : 18;
  const buttonClass = size === 'sm' ? 'p-0.5' : 'p-1';
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={`flex ${size === 'sm' ? 'flex-row items-center space-x-2' : 'flex-col items-center space-y-1'}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVote('up');
        }}
        className={`${buttonClass} rounded transition-colors ${
          userVote?.type === 'up'
            ? 'bg-green-100 text-green-600'
            : 'text-gray-500 hover:bg-gray-100 hover:text-green-600'
        }`}
      >
        <ThumbsUp size={iconSize} />
      </button>
      <span className={`${textClass} font-medium ${score > 0 ? 'text-green-600' : score < 0 ? 'text-red-600' : 'text-gray-600'}`}>
        {score}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onVote('down');
        }}
        className={`${buttonClass} rounded transition-colors ${
          userVote?.type === 'down'
            ? 'bg-red-100 text-red-600'
            : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'
        }`}
      >
        <ThumbsDown size={iconSize} />
      </button>
    </div>
  );
};