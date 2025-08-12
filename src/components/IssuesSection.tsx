import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Issue } from '../types';
import { IssueCard } from './IssueCard';
import { IssueDetail } from './IssueDetail';
import { getTranslation } from '../i18n/translations';
import FloatingActionButton from './FloatingActionButton';

interface IssuesSectionProps {
  issues: Issue[];
  language: string;
  currentUser: any;
}

export const IssuesSection: React.FC<IssuesSectionProps> = ({ issues, language, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showMyIssuesOnly, setShowMyIssuesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [followingIssues, setFollowingIssues] = useState<Set<string>>(new Set(['1', '2']));

  const categories = ['all', 'infrastructure', 'healthcare', 'education', 'transport', 'environment', 'security'];
  const statuses = ['all', 'open', 'in_progress', 'resolved', 'closed'];

  const filteredIssues = issues
    .filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
      const matchesUser = !showMyIssuesOnly || issue.author.id === currentUser?.id;
      return matchesSearch && matchesCategory && matchesStatus && matchesUser;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'mostVoted':
          return (b.votes.length - a.votes.length);
        case 'mostFollowed':
          return (b.followers.length - a.followers.length);
        default:
          return 0;
      }
    });

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleBackToList = () => {
    setSelectedIssue(null);
  };

  const handleVote = (type: 'up' | 'down') => {
    // Implement voting logic
    console.log('Vote:', type);
  };

  const handleFollow = () => {
    if (selectedIssue) {
      const newFollowing = new Set(followingIssues);
      if (newFollowing.has(selectedIssue.id)) {
        newFollowing.delete(selectedIssue.id);
      } else {
        newFollowing.add(selectedIssue.id);
      }
      setFollowingIssues(newFollowing);
    }
  };

  const handleComment = (content: string) => {
    // Implement comment logic
    console.log('Comment:', content);
  };

  const handleReplyToComment = (parentId: string, content: string) => {
    // Implement reply logic
    console.log('Reply to comment:', parentId, content);
  };

  const handleVoteComment = (commentId: string, type: 'up' | 'down') => {
    // Implement comment voting logic
    console.log('Vote comment:', commentId, type);
  };

  const handleGovernmentReplyVote = (replyId: string, type: 'up' | 'down') => {
    // Implement government reply voting logic
    console.log('Vote government reply:', replyId, type);
  };

  const handleGovernmentReplyComment = (replyId: string, content: string, attachments?: File[]) => {
    // Implement government reply comment logic
    console.log('Comment on government reply:', replyId, content, attachments);
  };

  const handleCreateIssue = () => {
    // Implement create issue logic
    console.log('Create issue clicked');
  };

  if (selectedIssue) {
    return (
      <IssueDetail
        issue={selectedIssue}
        currentUser={currentUser}
        onBack={handleBackToList}
        onVote={handleVote}
        onFollow={handleFollow}
        onComment={handleComment}
        onReplyToComment={handleReplyToComment}
        onVoteComment={handleVoteComment}
        onGovernmentReplyVote={handleGovernmentReplyVote}
        onGovernmentReplyComment={handleGovernmentReplyComment}
        isFollowing={followingIssues.has(selectedIssue.id)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('issues', language)}
          </h1>
          <p className="text-gray-600">
            Report issues and collaborate with the community and government to find solutions.
          </p>
        </div>
        <button 
          onClick={handleCreateIssue}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          {getTranslation('createIssue', language)}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>

          {/* My Issues Toggle */}
          <label className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showMyIssuesOnly}
              onChange={(e) => setShowMyIssuesOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">My Issues Only</span>
          </label>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostVoted">Most Voted</option>
            <option value="mostFollowed">Most Followed</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {showMyIssuesOnly ? 'My Issues' : 'All Issues'}
          </h2>
          <p className="text-sm text-gray-600">
            {filteredIssues.length} issue{filteredIssues.length !== 1 ? 's' : ''} found
            {showMyIssuesOnly && currentUser ? ` by ${currentUser.name}` : ''}
          </p>
        </div>
        {showMyIssuesOnly && (
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Showing only your issues
          </div>
        )}
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              language={language}
              currentUser={currentUser}
              onClick={() => handleIssueClick(issue)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-500 text-lg">No issues found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        type="issue"
        onClick={handleCreateIssue}
        isVisible={true}
      />
    </div>
  );
};