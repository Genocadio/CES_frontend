import { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  ArrowUp, 
  MessageSquare, 
  Calendar,
  MapPin,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Issue, Comment, CommentRequestDto, PostType } from '../types';
import { API_ENDPOINTS } from '../config/api';
import { adminAuthenticatedFetch } from '../utils/adminApiInterceptor';
import AdminIssueCard from './AdminIssueCard';
import AdminIssueDetail from './AdminIssueDetail';

type FilterType = 'all' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
type PriorityFilter = 'all' | 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

const AdminIssuesList = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentLeader, forceLogout } = useAdminAuth();

  // Fetch issues from API
  useEffect(() => {
    if (currentLeader) {
      fetchIssues();
    }
  }, [currentLeader]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError('');
      

      
      const response = await adminAuthenticatedFetch(
        API_ENDPOINTS.ISSUES.GET_ALL,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        forceLogout
      );

      if (!response) {
        // 401 error occurred, user will be redirected to login
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('API Response data:', data);
        console.log('API Response content:', data.content);
        console.log('API Response full:', data);
        setIssues(data.content || data || []);
      } else {
        setError('Failed to fetch issues');
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      setError('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  if (!currentLeader) {
    return null;
  }

  // Filter issues based on current leader's location and level
  const getRelevantIssues = () => {
    return issues.filter(issue => {
      // Check if issue is in leader's jurisdiction
      if (issue.location) {
        if (currentLeader.level === 'district') {
          return issue.location.district === currentLeader.location.district;
        } else if (currentLeader.level === 'sector') {
          return issue.location.district === currentLeader.location.district &&
                 issue.location.sector === currentLeader.location.sector;
        } else if (currentLeader.level === 'cell') {
          return issue.location.district === currentLeader.location.district &&
                 issue.location.sector === currentLeader.location.sector &&
                 issue.location.cell === currentLeader.location.cell;
        }
      }
      return true; // Show all issues if no location restriction
    });
  };

  const relevantIssues = getRelevantIssues();

  // Apply filters
  const filteredIssues = relevantIssues.filter(issue => {
    if (filter !== 'all' && issue.status !== filter) return false;
    if (priorityFilter !== 'all' && issue.urgency !== priorityFilter) return false;
    if (searchTerm && !issue.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !issue.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return Clock;
      case 'IN_PROGRESS': return AlertCircle;
      case 'RESOLVED': return CheckCircle;
      case 'CLOSED': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'bg-gray-100 text-gray-800';
      case 'MEDIUM': return 'bg-blue-100 text-blue-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'URGENT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedIssue) {
    // Get access token for the detail view
    const tokens = localStorage.getItem('adminAuthTokens');
    const accessToken = tokens ? JSON.parse(tokens).accessToken : '';
    
    return (
      <AdminIssueDetail 
        issue={selectedIssue}
        currentLeader={currentLeader}
        onBack={() => setSelectedIssue(null)}
        accessToken={accessToken}
        onIssueUpdate={(updatedIssue) => {
          // Update the issue in the local state
          setIssues(prev => prev.map(issue => 
            issue.id === updatedIssue.id ? updatedIssue : issue
          ));
          // Update the selected issue
          setSelectedIssue(updatedIssue);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading issues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Issues</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchIssues}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issues Management</h1>
          <p className="text-gray-600">
            Manage issues in your {currentLeader.level} jurisdiction
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredIssues.length} of {relevantIssues.length} issues
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Issues</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Issues Found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' || priorityFilter !== 'all' 
                ? 'Try adjusting your filters or search terms.'
                : 'No issues are currently assigned to your jurisdiction.'}
            </p>
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <AdminIssueCard
              key={issue.id}
              issue={issue}
              currentLeader={currentLeader}
              onClick={() => setSelectedIssue(issue)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminIssuesList;
