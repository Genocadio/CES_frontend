import React, { useState } from 'react';
import { MessageCircle, TrendingUp, Plus, Filter, Search } from 'lucide-react';
import { Topic, Leader } from '../types';
import { topics } from '../data/dummyData';
import AdminTopicDetail from './AdminTopicDetail';

interface AdminTopicsListProps {
  currentLeader: Leader;
}

type FilterType = 'all' | 'my_region' | 'my_topics' | 'trending';
type SortType = 'newest' | 'popular' | 'most_replies' | 'most_followers';

const AdminTopicsList: React.FC<AdminTopicsListProps> = ({ currentLeader }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Filter topics based on leader's level and location
  const getFilteredTopics = () => {
    let filtered = [...topics];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(topic =>
        topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply regional filter
    switch (filter) {
      case 'my_region':
        filtered = filtered.filter(topic => {
          if (!topic.regionalRestriction) return true;
          
          const { level, district, sector, cell } = topic.regionalRestriction;
          const leaderLocation = currentLeader.location;
          
          switch (level) {
            case 'district':
              return leaderLocation.district === district;
            case 'sector':
              return leaderLocation.district === district && leaderLocation.sector === sector;
            case 'cell':
              return leaderLocation.district === district && 
                     leaderLocation.sector === sector && 
                     leaderLocation.cell === cell;
            default:
              return true;
          }
        });
        break;
      case 'my_topics':
        filtered = filtered.filter(topic => topic.author.id === currentLeader.id);
        break;
      case 'trending':
        filtered = filtered.filter(topic => 
          topic.votes.length > 10 || topic.replies.length > 5
        );
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'popular':
          return (b.votes.length + b.replies.length) - (a.votes.length + a.replies.length);
        case 'most_replies':
          return b.replies.length - a.replies.length;
        case 'most_followers':
          return b.followers.length - a.followers.length;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTopics = getFilteredTopics();

  const handleCreateTopic = () => {
    setShowCreateForm(true);
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToList = () => {
    setSelectedTopic(null);
    setShowCreateForm(false);
  };

  const handleVote = (type: 'up' | 'down') => {
    // Implement voting logic for leaders
    console.log('Leader vote:', type);
  };

  const handleReply = (content: string, parentId?: string) => {
    // Implement reply logic for leaders
    console.log('Leader reply:', content, parentId);
  };

  const handleVoteReply = (replyId: string, type: 'up' | 'down') => {
    // Implement reply voting logic for leaders
    console.log('Leader vote reply:', replyId, type);
  };

  const handleFollow = () => {
    // Implement follow logic for leaders
    console.log('Leader follow topic');
  };

  // If a topic is selected, show the detail view
  if (selectedTopic) {
    return (
      <AdminTopicDetail
        topic={selectedTopic}
        currentLeader={currentLeader}
        onBack={handleBackToList}
        onVote={handleVote}
        onReply={handleReply}
        onVoteReply={handleVoteReply}
        onFollow={handleFollow}
        isFollowing={selectedTopic.followers.includes(currentLeader.id)}
      />
    );
  }

  // If create form is shown, show the create topic form
  if (showCreateForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={handleBackToList}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MessageCircle size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create New Topic</h1>
            <p className="text-gray-600">Start a discussion in your community</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic Content
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
                placeholder="Share your thoughts, questions, or start a discussion..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtags (optional)
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#Community #Development #Innovation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regional Scope
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="national">National</option>
                <option value="district">District Level</option>
                <option value="sector">Sector Level</option>
                <option value="cell">Cell Level</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleBackToList}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Topic
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Topics</h1>
          <p className="text-gray-600">
            Engage with your community through discussions and topics
          </p>
        </div>
        <button
          onClick={handleCreateTopic}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Create Topic
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search topics and hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Topics</option>
              <option value="my_region">My Region</option>
              <option value="my_topics">My Topics</option>
              <option value="trending">Trending</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="most_replies">Most Replies</option>
              <option value="most_followers">Most Followers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {filteredTopics.length} topic{filteredTopics.length !== 1 ? 's' : ''} found
            {filter !== 'all' && ` (${filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())})`}
          </p>
        </div>
        {filter !== 'all' && (
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Filtered by {filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        )}
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.length > 0 ? (
          filteredTopics.map(topic => (
            <div
              key={topic.id}
              className="bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              onClick={() => handleTopicClick(topic)}
            >
              <div className="p-6">
                <div className="flex space-x-3">
                  <img
                    src={topic.author.avatar}
                    alt={topic.author.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">
                        {currentLeader.id === topic.author.id ? 'You' : topic.author.name}
                      </span>
                      {topic.author.isGovernment && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Gov
                        </span>
                      )}
                      <span className="text-gray-500 text-sm">·</span>
                      <span className="text-gray-500 text-sm">
                        {new Date(topic.createdAt).toLocaleDateString()}
                      </span>
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
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {topic.regionalRestriction.level}: {topic.regionalRestriction.district}
                          {topic.regionalRestriction.sector && ` - ${topic.regionalRestriction.sector}`}
                          {topic.regionalRestriction.cell && ` - ${topic.regionalRestriction.cell}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <span className="text-sm">{topic.votes.length} votes</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle size={16} />
                      <span className="text-sm">{topic.replies.length}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <span className="text-sm">{topic.followers.length} followers</span>
                    </div>
                  </div>
                  {currentLeader.id !== topic.author.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollow();
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">
              {searchQuery.trim() 
                ? "No topics found matching your search." 
                : filter !== 'all'
                ? `No topics found for ${filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}.`
                : "No topics available."
              }
            </p>
          </div>
        )}
      </div>

      {/* Sidebar Stats */}
      <div className="lg:hidden mt-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={20} className="text-blue-600" />
            <h3 className="font-semibold text-gray-900">Quick Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{topics.length}</div>
              <div className="text-sm text-gray-500">Total Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {topics.filter(t => t.replies.length > 5).length}
              </div>
              <div className="text-sm text-gray-500">Active Discussions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopicsList;
