import React, { useState } from 'react';
import { MessageCircle, TrendingUp } from 'lucide-react';
import { Topic } from '../types';
import { TopicCard } from './TopicCard';
import { TopicDetail } from './TopicDetail';
import { getTranslation } from '../i18n/translations';
import FloatingActionButton from './FloatingActionButton';

interface TopicsSectionProps {
  topics: Topic[];
  language: string;
  currentUser?: any;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({ topics, language, currentUser }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [showMyTopicsOnly, setShowMyTopicsOnly] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [followingTopics, setFollowingTopics] = useState<Set<string>>(new Set(['1', '2']));

  const trendingHashtags = ['#KigaliBRT', '#DigitalRwanda', '#ClimateChange', '#Agriculture', '#Healthcare', '#Education'];

  const sortedTopics = [...topics]
    .filter(topic => {
      // Filter by user ownership if enabled
      if (showMyTopicsOnly && topic.author.id !== currentUser?.id) {
        return false;
      }
      
      // Filter by regional restrictions
      if (topic.regionalRestriction && currentUser) {
        const { level, district, sector, cell } = topic.regionalRestriction;
        const userLocation = currentUser.location;
        
        switch (level) {
          case 'district':
            return userLocation.district === district;
          case 'sector':
            return userLocation.district === district && userLocation.sector === sector;
          case 'cell':
            return userLocation.district === district && 
                   userLocation.sector === sector && 
                   userLocation.cell === cell;
          default:
            return true;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'popular':
          return (b.votes.length + b.replies.length) - (a.votes.length + a.replies.length);
        case 'mostReplies':
          return b.replies.length - a.replies.length;
        default:
          return 0;
      }
    });

  const handleCreateTopic = () => {
    // Create topic logic would be implemented here
    console.log('Create topic clicked');
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToList = () => {
    setSelectedTopic(null);
  };

  const handleVote = (type: 'up' | 'down') => {
    // Implement voting logic
    console.log('Vote:', type);
  };

  const handleFollow = () => {
    if (selectedTopic) {
      const newFollowing = new Set(followingTopics);
      if (newFollowing.has(selectedTopic.id)) {
        newFollowing.delete(selectedTopic.id);
      } else {
        newFollowing.add(selectedTopic.id);
      }
      setFollowingTopics(newFollowing);
    }
  };

  const handleReply = (content: string, parentId?: string) => {
    // Implement reply logic
    console.log('Reply:', content, parentId);
  };

  const handleVoteReply = (replyId: string, type: 'up' | 'down') => {
    // Implement reply voting logic
    console.log('Vote reply:', replyId, type);
  };

  // If a topic is selected, show the detail view
  if (selectedTopic) {
    return (
      <TopicDetail
        topic={selectedTopic}
        currentUser={currentUser}
        onBack={handleBackToList}
        onVote={handleVote}
        onReply={handleReply}
        onVoteReply={handleVoteReply}
        onFollow={handleFollow}
        isFollowing={followingTopics.has(selectedTopic.id)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getTranslation('topics', language)}
            </h1>
            <p className="text-gray-600">
              Join community discussions and share your thoughts on various topics.
            </p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Discussions</h2>
          <div className="flex items-center space-x-4">
            {/* My Topics Toggle */}
            <label className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={showMyTopicsOnly}
                onChange={(e) => setShowMyTopicsOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">My Topics Only</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="mostReplies">Most Replies</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              {sortedTopics.length} topic{sortedTopics.length !== 1 ? 's' : ''} found
              {showMyTopicsOnly && currentUser ? ` by ${currentUser.name}` : ''}
            </p>
          </div>
          {showMyTopicsOnly && (
            <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Showing only your topics
            </div>
          )}
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {sortedTopics.length > 0 ? (
            sortedTopics.map(topic => (
              <TopicCard
                key={topic.id}
                topic={topic}
                language={language}
                currentUser={currentUser}
                onClick={() => handleTopicClick(topic)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-lg">
                {showMyTopicsOnly 
                  ? "You haven't created any topics yet." 
                  : "No topics found matching your criteria."
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Trending Hashtags */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">Trending in Rwanda</h3>
          </div>
          <div className="space-y-3">
            {trendingHashtags.map(hashtag => (
              <div key={hashtag} className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                <div className="text-blue-600 font-medium">{hashtag}</div>
                <div className="text-sm text-gray-500">{Math.floor(Math.random() * 100)}k posts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Discussions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle size={20} className="text-green-600" />
            <h3 className="font-semibold text-gray-900">Active Discussions</h3>
          </div>
          <div className="space-y-3">
            {topics.slice(0, 3).map(topic => (
              <div key={topic.id} className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                  {topic.content.substring(0, 60)}...
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {topic.replies.length} replies
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button - only show for authenticated users */}
      {currentUser && (
        <FloatingActionButton
          type="topic"
          onClick={handleCreateTopic}
          isVisible={true}
        />
      )}
    </div>
  );
};