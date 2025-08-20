import { useState } from 'react';
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
  ThumbsDown
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { getIssuesForLeader } from '../data/adminData';
import { issues } from '../data/dummyData';
import AdminIssueDetail from './AdminIssueDetail';

type FilterType = 'all' | 'pending' | 'in_progress' | 'resolved' | 'escalated';
type PriorityFilter = 'all' | 'low' | 'medium' | 'high' | 'urgent';

const AdminIssuesList = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);
  const { currentLeader } = useAdminAuth();

  if (!currentLeader) {
    return null;
  }

  const assignedIssues = getIssuesForLeader(currentLeader.id);

  // Filter issues
  const filteredIssues = assignedIssues.filter(assignment => {
    if (filter !== 'all' && assignment.status !== filter) return false;
    if (priorityFilter !== 'all' && assignment.priority !== priorityFilter) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in_progress': return AlertCircle;
      case 'resolved': return CheckCircle;
      case 'escalated': return ArrowUp;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to count votes
  const getVoteCounts = (votes: any[]) => {
    const upvotes = votes.filter(vote => vote.type === 'up').length;
    const downvotes = votes.filter(vote => vote.type === 'down').length;
    return { upvotes, downvotes };
  };

  const handleUpdateStatus = (assignmentId: string, newStatus: string) => {
    console.log(`Updating assignment ${assignmentId} to status: ${newStatus}`);
    // In a real app, this would update the backend
    setShowActions(null);
  };

  const handleUpdatePriority = (assignmentId: string, newPriority: string) => {
    console.log(`Updating assignment ${assignmentId} to priority: ${newPriority}`);
    // In a real app, this would update the backend
    setShowActions(null);
  };

  const handleEscalate = (assignmentId: string, toLeaderId: string | null) => {
    console.log(`Escalating assignment ${assignmentId} to leader: ${toLeaderId || 'higher level'}`);
    // In a real app, this would create an escalation action
    setShowActions(null);
  };

  if (selectedIssue) {
    const assignment = assignedIssues.find(a => a.id === selectedIssue);
    if (assignment) {
      return (
        <AdminIssueDetail 
          assignment={assignment}
          onBack={() => setSelectedIssue(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Issues Management</h1>
          <p className="text-gray-600">
            Manage issues assigned to your {currentLeader.level} level
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {filteredIssues.map((assignment) => {
            const issue = issues.find(i => i.id === assignment.issueId);
            if (!issue) return null;

            const StatusIcon = getStatusIcon(assignment.status);
            const { upvotes, downvotes } = getVoteCounts(issue.votes);

            return (
              <div 
                key={assignment.id} 
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedIssue(assignment.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {issue.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {assignment.status.replace('_', ' ')}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {issue.content}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}</span>
                      </div>
                      {assignment.dueDate && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{issue.location?.district} - {issue.location?.sector}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{issue.comments.length} comments</span>
                      </div>
                      {/* Vote counts */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-green-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{upvotes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-red-600">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{downvotes}</span>
                        </div>
                      </div>
                    </div>

                    {assignment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notes:</span> {assignment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions - only the more actions button, no eye icon */}
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click when clicking actions
                          setShowActions(showActions === assignment.id ? null : assignment.id);
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md"
                        title="More Actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {showActions === assignment.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Update Status
                            </div>
                            {['pending', 'in_progress', 'resolved'].map((status) => (
                              <button
                                key={status}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(assignment.id, status);
                                }}
                                className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {status.replace('_', ' ')}
                              </button>
                            ))}
                            
                            <div className="border-t border-gray-100 mt-1">
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Update Priority
                              </div>
                              {['low', 'medium', 'high', 'urgent'].map((priority) => (
                                <button
                                  key={priority}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdatePriority(assignment.id, priority);
                                  }}
                                  className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {priority}
                                </button>
                              ))}
                            </div>

                            <div className="border-t border-gray-100 mt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEscalate(assignment.id, null);
                                }}
                                className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                              >
                                Escalate to Higher Level
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredIssues.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
              <p>No issues match your current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminIssuesList;
