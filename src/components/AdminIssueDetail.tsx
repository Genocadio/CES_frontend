import { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowUp,
  Send,
  FileText,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Eye,
  Plus
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { issues } from '../data/dummyData';
import { getEscalationTargets } from '../data/adminData';
import { IssueAssignment } from '../types';

interface AdminIssueDetailProps {
  assignment: IssueAssignment;
  onBack: () => void;
}

const AdminIssueDetail = ({ assignment, onBack }: AdminIssueDetailProps) => {
  const [newReply, setNewReply] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newReplyComment, setNewReplyComment] = useState<{[key: string]: string}>({});
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingReplyComment, setIsSubmittingReplyComment] = useState<{[key: string]: boolean}>({});
  const [showCommentForm, setShowCommentForm] = useState<{[key: string]: boolean}>({});
  const [selectedStatus, setSelectedStatus] = useState(assignment.status);
  const [selectedPriority, setSelectedPriority] = useState(assignment.priority);
  const [escalationReason, setEscalationReason] = useState('');
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const { currentLeader } = useAdminAuth();

  const issue = issues.find(i => i.id === assignment.issueId);
  if (!issue) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Issue not found.</p>
        <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-800">
          Go Back
        </button>
      </div>
    );
  }

  // Get replies vs comments for the issue  
  const issueReplies = issue.governmentReplies || [];
  const issueComments = issue.comments || [];
  
  // Check if issue has been replied to
  const hasReplies = issueReplies.length > 0;

  const escalationTargets = currentLeader ? getEscalationTargets(currentLeader) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in_progress': return AlertTriangle;
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

    const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !currentLeader) return;

    setIsSubmittingReply(true);
    try {
      // In a real app, this would make an API call
      console.log('Submitting reply:', newReply);
      setNewReply('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentLeader) return;

    setIsSubmittingComment(true);
    try {
      // In a real app, this would make an API call
      console.log('Submitting comment:', newComment);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReplyCommentSubmit = async (replyId: string) => {
    const comment = newReplyComment[replyId];
    if (!comment?.trim() || !currentLeader) return;

    setIsSubmittingReplyComment(prev => ({ ...prev, [replyId]: true }));
    try {
      // In a real app, this would make an API call
      console.log('Submitting comment on reply:', replyId, comment);
      setNewReplyComment(prev => ({ ...prev, [replyId]: '' }));
      setShowCommentForm(prev => ({ ...prev, [replyId]: false }));
    } catch (error) {
      console.error('Error submitting comment on reply:', error);
    } finally {
      setIsSubmittingReplyComment(prev => ({ ...prev, [replyId]: false }));
    }
  };

  const handleUpdateStatus = () => {
    console.log(`Updating status to: ${selectedStatus}`);
  };

  const handleUpdatePriority = () => {
    console.log(`Updating priority to: ${selectedPriority}`);
  };

  const handleEscalate = (toLeaderId: string | null) => {
    if (!escalationReason.trim() || !currentLeader) return;
    
    console.log('Escalating issue:', {
      issueId: issue.id,
      assignmentId: assignment.id,
      fromLeader: currentLeader.id,
      toLeader: toLeaderId,
      reason: escalationReason
    });
    
    setShowEscalationForm(false);
    setEscalationReason('');
  };

  const StatusIcon = getStatusIcon(assignment.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Issues
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Details */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                    <StatusIcon className="w-4 h-4 mr-1" />
                    {assignment.status.replace('_', ' ')}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority}
                  </span>
                </div>
              </div>

              <div className="prose prose-gray max-w-none mb-4">
                <p>{issue.content}</p>
              </div>

              {/* Issue Attachments */}
              {issue.attachments && issue.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {issue.attachments.map((attachment) => (
                      <div key={attachment.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {attachment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(attachment.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issue Metadata */}
              <div className="pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Reported by: {issue.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location: {issue.location?.district} - {issue.location?.sector}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Level: {issue.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{issue.votes.filter(v => v.type === 'up').length} upvotes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{issue.viewCount} views</span>
                  </div>
                </div>
              </div>

              {assignment.notes && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Assignment Notes</h4>
                  <p className="text-blue-800 text-sm">{assignment.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Government Replies Section */}
          {issue.governmentReplies && issue.governmentReplies.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Government Replies ({issue.governmentReplies.length})
                </h3>
                
                <div className="space-y-6">
                  {issue.governmentReplies.map((reply) => (
                    <div key={reply.id} className="border-l-4 border-blue-200 pl-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{reply.author.name}</p>
                            <p className="text-sm text-gray-500">
                              {reply.author.department} • {new Date(reply.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(reply.priority)}`}>
                            {reply.priority}
                          </span>
                          {reply.responseStatus === 'followup' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Follow-up Required
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="prose prose-gray max-w-none mb-4">
                        <p>{reply.content}</p>
                      </div>

                      {/* Reply Attachments */}
                      {reply.attachments && reply.attachments.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Attachments</h5>
                          <div className="flex flex-wrap gap-2">
                            {reply.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{attachment.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reply Votes - Leaders can see but not vote */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{reply.votes.filter(v => v.type === 'up').length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{reply.votes.filter(v => v.type === 'down').length}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{reply.comments.length} comments</span>
                        </div>
                      </div>

                      {/* Reply Comments */}
                      {reply.comments && reply.comments.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-100">
                          <h6 className="text-sm font-medium text-gray-700 mb-3">Comments on this reply</h6>
                          <div className="space-y-3">
                            {reply.comments.map((comment) => (
                              <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                                <div className="flex items-center space-x-2 mb-1">
                                  <img
                                    src={comment.author.avatar}
                                    alt={comment.author.name}
                                    className="w-5 h-5 rounded-full"
                                  />
                                  <span className="text-sm font-medium">{comment.author.name}</span>
                                  {comment.author.isGovernment && (
                                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                      Official
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{comment.votes.filter(v => v.type === 'up').length}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <ThumbsDown className="w-3 h-3" />
                                    <span>{comment.votes.filter(v => v.type === 'down').length}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add comment to reply */}
                      <div className="mt-4">
                        {!showCommentForm[reply.id] ? (
                          <button
                            onClick={() => setShowCommentForm(prev => ({ ...prev, [reply.id]: true }))}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            <MessageSquare className="w-4 h-4 inline mr-1" />
                            Comment on this reply
                          </button>
                        ) : (
                          <div className="space-y-2">
                            <textarea
                              value={newReplyComment[reply.id] || ''}
                              onChange={(e) => setNewReplyComment(prev => ({ ...prev, [reply.id]: e.target.value }))}
                              placeholder="Add a comment to this reply..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              rows={2}
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setShowCommentForm(prev => ({ ...prev, [reply.id]: false }))}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleReplyCommentSubmit(reply.id)}
                                disabled={!newReplyComment[reply.id]?.trim() || isSubmittingReplyComment[reply.id]}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                              >
                                {isSubmittingReplyComment[reply.id] ? 'Submitting...' : 'Comment'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Follow-up Response */}
                      {reply.followUpResponse && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h6 className="text-sm font-medium text-yellow-800 mb-2">Citizen Follow-up Response</h6>
                          <div className="flex items-center space-x-2 mb-2">
                            <img
                              src={reply.followUpResponse.author.avatar}
                              alt={reply.followUpResponse.author.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm font-medium text-yellow-900">{reply.followUpResponse.author.name}</span>
                            <span className="text-xs text-yellow-700">
                              {new Date(reply.followUpResponse.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-yellow-800">{reply.followUpResponse.content}</p>
                          
                          {reply.followUpResponse.attachments && reply.followUpResponse.attachments.length > 0 && (
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-2">
                                {reply.followUpResponse.attachments.map((attachment) => (
                                  <div key={attachment.id} className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded text-xs">
                                    <FileText className="w-3 h-3" />
                                    <span>{attachment.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Leader Reply Section - Show based on issue status */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {!hasReplies ? (
                // Show reply button if issue is unresolved (no replies)
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Reply to Issue</h3>
                  <form onSubmit={handleReplySubmit}>
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Provide an official reply to this issue..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      required
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!newReply.trim() || isSubmittingReply}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmittingReply ? 'Submitting...' : 'Reply to Issue'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // Show add more responses if already replied
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add More Responses</h3>
                  <form onSubmit={handleReplySubmit}>
                    <textarea
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="Add an additional response to this issue..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!newReply.trim() || isSubmittingReply}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {isSubmittingReply ? 'Submitting...' : 'Add Response'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Comments ({issue.comments.length})
              </h3>
              
              {/* Add Comment Form */}
              <div className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add an official response or comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmittingComment ? 'Submitting...' : 'Post Official Response'}
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {issue.comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-gray-200 pl-4 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      {comment.author.isGovernment && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Official
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                    
                    {/* Comment Votes - Leaders can see but not vote */}
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.votes.filter(v => v.type === 'up').length}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsDown className="w-3 h-3" />
                        <span>{comment.votes.filter(v => v.type === 'down').length}</span>
                      </div>
                      {comment.replies.length > 0 && (
                        <span>{comment.replies.length} replies</span>
                      )}
                    </div>

                    {/* Comment Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-6 mt-3 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center space-x-2 mb-1">
                              <img
                                src={reply.author.avatar}
                                alt={reply.author.name}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-sm font-medium">{reply.author.name}</span>
                              {reply.author.isGovernment && (
                                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  Official
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {issue.comments.length === 0 && (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
            
            {/* Update Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Update Status
              </button>
            </div>

            {/* Update Priority */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as typeof selectedPriority)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <button
                onClick={handleUpdatePriority}
                className="mt-2 w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
              >
                Update Priority
              </button>
            </div>

            {/* Escalation */}
            {escalationTargets.length > 0 && (
              <div>
                <button
                  onClick={() => setShowEscalationForm(!showEscalationForm)}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                >
                  <ArrowUp className="w-4 h-4 inline mr-2" />
                  Escalate Issue
                </button>

                {showEscalationForm && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Escalation Reason
                    </label>
                    <textarea
                      value={escalationReason}
                      onChange={(e) => setEscalationReason(e.target.value)}
                      placeholder="Explain why this issue needs to be escalated..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEscalate(null)}
                        disabled={!escalationReason.trim()}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm disabled:opacity-50"
                      >
                        Escalate Up
                      </button>
                      <button
                        onClick={() => setShowEscalationForm(false)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Assignment Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Assigned:</span>
                <p className="text-gray-600">{new Date(assignment.assignedAt).toLocaleDateString()}</p>
              </div>
              {assignment.dueDate && (
                <div>
                  <span className="font-medium text-gray-700">Due Date:</span>
                  <p className="text-gray-600">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-700">Your Level:</span>
                <p className="text-gray-600 capitalize">{currentLeader.level}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Issue Level:</span>
                <p className="text-gray-600 capitalize">{issue.level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIssueDetail;
