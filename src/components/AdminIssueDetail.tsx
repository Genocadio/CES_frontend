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
  Plus,
  Reply
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
  const [newReplyType, setNewReplyType] = useState<'followup' | 'progress' | 'resolve' | 'escalation'>('progress');
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
  const [showIssueComments, setShowIssueComments] = useState(false);
  const [showAddMoreResponses, setShowAddMoreResponses] = useState(false);
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
  
  // Check if the last reply allows further responses (only progress and followup allow further replies)
  const lastReply = issueReplies[issueReplies.length - 1];
  const canAddMoreResponses = lastReply && (lastReply.replyType === 'progress' || lastReply.replyType === 'followup');

  const escalationTargets = currentLeader ? getEscalationTargets(currentLeader) : [];

  // Helper function to check if a reply type allows comments
  const canReplyHaveComments = (replyType: string) => {
    return replyType === 'progress' || replyType === 'resolve';
  };

  // Helper function to check if a reply type allows further replies
  const canReplyHaveFurtherReplies = (replyType: string) => {
    return replyType === 'followup';
  };

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

    // Validate escalation type requires reason
    if (newReplyType === 'escalation' && !escalationReason.trim()) {
      alert('Escalation replies require a reason');
      return;
    }

    setIsSubmittingReply(true);
    try {
      // In a real app, this would make an API call
      console.log('Submitting reply:', {
        content: newReply,
        type: newReplyType,
        escalationReason: newReplyType === 'escalation' ? escalationReason : undefined
      });
      
      // Reset form
      setNewReply('');
      if (newReplyType === 'escalation') {
        setEscalationReason('');
      }
      // Reset the add more responses form if it was open
      setShowAddMoreResponses(false);
      
      // If the reply type is resolve or escalation, no further responses are allowed
      if (newReplyType === 'resolve' || newReplyType === 'escalation') {
        // The form will automatically hide since canAddMoreResponses will be false
      }
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

  const handleReplyToComment = async (commentId: string, content: string) => {
    if (!content.trim() || !currentLeader) return;

    try {
      // In a real app, this would make an API call
      console.log('Submitting reply to comment:', commentId, content);
    } catch (error) {
      console.error('Error submitting reply to comment:', error);
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

              {/* Issue Comments Section - Integrated into issue card */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Comments ({issue.comments.length})
                  </h4>
                  <button
                    onClick={() => setShowIssueComments(!showIssueComments)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{showIssueComments ? 'Hide' : 'Show'} Comments</span>
                  </button>
                </div>

                {showIssueComments && (
                  <div className="space-y-4">
                    {/* Add Comment Form */}
                    <div className="mb-6">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add an official comment"
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
                          {isSubmittingComment ? 'Submitting...' : 'Post Comment'}
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
                          
                          {/* Comment Actions */}
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
                            <button
                              onClick={() => setShowCommentForm(prev => ({ ...prev, [`reply_${comment.id}`]: !prev[`reply_${comment.id}`] }))}
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                            >
                              <Reply className="w-3 h-3" />
                              <span>Reply</span>
                            </button>
                          </div>

                          {/* Reply Form */}
                          {showCommentForm[`reply_${comment.id}`] && (
                            <div className="mt-3 ml-4 space-y-2">
                              <textarea
                                value={newReplyComment[`reply_${comment.id}`] || ''}
                                onChange={(e) => setNewReplyComment(prev => ({ ...prev, [`reply_${comment.id}`]: e.target.value }))}
                                placeholder="Add an official comment"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={2}
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setShowCommentForm(prev => ({ ...prev, [`reply_${comment.id}`]: false }))}
                                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleReplyToComment(comment.id, newReplyComment[`reply_${comment.id}`] || '')}
                                  disabled={!newReplyComment[`reply_${comment.id}`]?.trim()}
                                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          )}

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
                                  <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                                  
                                  {/* Reply Actions */}
                                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                                    <button
                                      onClick={() => setShowCommentForm(prev => ({ ...prev, [`reply_comment_reply_${reply.id}`]: !prev[`reply_comment_reply_${reply.id}`] }))}
                                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                                    >
                                      <Reply className="w-3 h-3" />
                                      <span>Reply</span>
                                    </button>
                                  </div>

                                  {/* Reply to Comment Reply Form */}
                                  {showCommentForm[`reply_comment_reply_${reply.id}`] && (
                                    <div className="mt-3 ml-4 space-y-2">
                                      <textarea
                                        value={newReplyComment[`reply_comment_reply_${reply.id}`] || ''}
                                        onChange={(e) => setNewReplyComment(prev => ({ ...prev, [`reply_comment_reply_${reply.id}`]: e.target.value }))}
                                        placeholder="Add an official comment"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                      />
                                      <div className="flex justify-end space-x-2">
                                        <button
                                          onClick={() => setShowCommentForm(prev => ({ ...prev, [`reply_comment_reply_${reply.id}`]: false }))}
                                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleReplyToComment(reply.id, newReplyComment[`reply_comment_reply_${reply.id}`] || '')}
                                          disabled={!newReplyComment[`reply_comment_reply_${reply.id}`]?.trim()}
                                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                          Post Comment
                                        </button>
                                      </div>
                                    </div>
                                  )}
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
                )}
              </div>
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
                          {/* Reply Type Badge */}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            reply.replyType === 'followup' ? 'bg-orange-100 text-orange-800' :
                            reply.replyType === 'progress' ? 'bg-blue-100 text-blue-800' :
                            reply.replyType === 'resolve' ? 'bg-green-100 text-green-800' :
                            reply.replyType === 'escalation' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {reply.replyType?.replace('_', ' ')}
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

                      {/* Reply Comments - Only show for progress and resolve types */}
                      {canReplyHaveComments(reply.replyType) && reply.comments && reply.comments.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <h6 className="text-sm font-medium text-gray-700">Comments on this reply</h6>
                            <button
                              onClick={() => setShowCommentForm(prev => ({ ...prev, [`comments_${reply.id}`]: !prev[`comments_${reply.id}`] }))}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                            >
                              <MessageSquare className="w-3 h-3 inline mr-1" />
                              {showCommentForm[`comments_${reply.id}`] ? 'Hide' : 'Show'} Comments
                            </button>
                          </div>
                          {showCommentForm[`comments_${reply.id}`] && (
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
                                    <button
                                      onClick={() => setShowCommentForm(prev => ({ ...prev, [`reply_reply_${comment.id}`]: !prev[`reply_reply_${comment.id}`] }))}
                                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                                    >
                                      <Reply className="w-3 h-3" />
                                      <span>Reply</span>
                                    </button>
                                  </div>

                                  {/* Reply to Reply Form */}
                                  {showCommentForm[`reply_reply_${comment.id}`] && (
                                    <div className="mt-3 ml-4 space-y-2">
                                      <textarea
                                        value={newReplyComment[`reply_reply_${comment.id}`] || ''}
                                        onChange={(e) => setNewReplyComment(prev => ({ ...prev, [`reply_reply_${comment.id}`]: e.target.value }))}
                                        placeholder="Add an official comment"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                      />
                                      <div className="flex justify-end space-x-2">
                                        <button
                                          onClick={() => setShowCommentForm(prev => ({ ...prev, [`reply_reply_${comment.id}`]: false }))}
                                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handleReplyToComment(comment.id, newReplyComment[`reply_reply_${comment.id}`] || '')}
                                          disabled={!newReplyComment[`reply_reply_${comment.id}`]?.trim()}
                                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                          Post Comment
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Reply Type Rules Info */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-md border-l-4 border-gray-300">
                        <div className="text-xs text-gray-600">
                          <strong>Reply Type:</strong> {reply.replyType?.replace('_', ' ')}
                          {reply.replyType === 'progress' && ' - Comments allowed, further replies allowed'}
                          {reply.replyType === 'followup' && ' - No comments, citizen responses allowed'}
                          {reply.replyType === 'resolve' && ' - Comments allowed, no further replies'}
                          {reply.replyType === 'escalation' && ' - No comments, no further replies'}
                        </div>
                      </div>

                      {/* Add comment to reply - Only show for progress and resolve types */}
                      {canReplyHaveComments(reply.replyType) && (
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
                                placeholder="Add an official comment"
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
                                  {isSubmittingReplyComment[reply.id] ? 'Submitting...' : 'Post Comment'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

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
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Reply Type Rules:</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li><strong>Progress:</strong> Can be commented on, allows further replies</li>
                      <li><strong>Follow-up:</strong> Cannot be commented on, allows citizen responses</li>
                      <li><strong>Resolve:</strong> Can be commented on, no further replies</li>
                      <li><strong>Escalation:</strong> Requires reason, no further replies</li>
                    </ul>
                  </div>
                  <form onSubmit={handleReplySubmit}>
                    {/* Reply Type Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reply Type *
                      </label>
                      <select
                        value={newReplyType}
                        onChange={(e) => setNewReplyType(e.target.value as typeof newReplyType)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="progress">Progress Update</option>
                        <option value="followup">Follow-up Request</option>
                        <option value="resolve">Resolution</option>
                        <option value="escalation">Escalation</option>
                      </select>
                      <div className="mt-1 text-xs text-gray-500">
                        {newReplyType === 'progress' && 'Progress updates can be commented on and allow further replies'}
                        {newReplyType === 'followup' && 'Follow-up requests cannot be commented on but allow citizen responses'}
                        {newReplyType === 'resolve' && 'Resolutions can be commented on but no further replies allowed'}
                        {newReplyType === 'escalation' && 'Escalations require a reason and no further replies allowed'}
                      </div>
                    </div>

                    {/* Escalation Reason Field */}
                    {newReplyType === 'escalation' && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Escalation Reason *
                        </label>
                        <textarea
                          value={escalationReason}
                          onChange={(e) => setEscalationReason(e.target.value)}
                          placeholder="Explain why this issue needs to be escalated..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          required
                        />
                      </div>
                    )}

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
                        disabled={!newReply.trim() || (newReplyType === 'escalation' && !escalationReason.trim()) || isSubmittingReply}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmittingReply ? 'Submitting...' : 'Reply to Issue'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // Show add more responses button if already replied and previous response allows it
                <div>
                  {canAddMoreResponses ? (
                    <>
                      {!showAddMoreResponses ? (
                        <div className="text-center">
                          <button
                            onClick={() => setShowAddMoreResponses(true)}
                            className="flex items-center mx-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Add More Responses
                          </button>
                          <p className="text-sm text-gray-600 mt-2">
                            Previous response was a {lastReply.replyType === 'progress' ? 'Progress Update' : 'Follow-up Request'} - you can add more responses
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Add More Responses</h3>
                            <button
                              onClick={() => setShowAddMoreResponses(false)}
                              className="text-gray-500 hover:text-gray-700 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="mb-4 p-4 bg-green-50 rounded-lg">
                            <h4 className="text-sm font-medium text-green-900 mb-2">Reply Type Rules:</h4>
                            <ul className="text-xs text-green-800 space-y-1">
                              <li><strong>Progress:</strong> Can be commented on, allows further replies</li>
                              <li><strong>Follow-up:</strong> Cannot be commented on, allows citizen responses</li>
                              <li><strong>Resolve:</strong> Can be commented on, no further replies</li>
                              <li><strong>Escalation:</strong> Requires reason, no further replies</li>
                            </ul>
                          </div>
                          <form onSubmit={handleReplySubmit}>
                            {/* Reply Type Selection */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reply Type *
                              </label>
                              <select
                                value={newReplyType}
                                onChange={(e) => setNewReplyType(e.target.value as typeof newReplyType)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                              >
                                <option value="progress">Progress Update</option>
                                <option value="followup">Follow-up Request</option>
                                <option value="resolve">Resolution</option>
                                <option value="escalation">Escalation</option>
                              </select>
                              <div className="mt-1 text-xs text-gray-500">
                                {newReplyType === 'progress' && 'Progress updates can be commented on and allow further replies'}
                                {newReplyType === 'followup' && 'Follow-up requests cannot be commented on but allow citizen responses'}
                                {newReplyType === 'resolve' && 'Resolutions can be commented on but no further replies allowed'}
                                {newReplyType === 'escalation' && 'Escalations require a reason and no further replies allowed'}
                              </div>
                            </div>

                            {/* Escalation Reason Field */}
                            {newReplyType === 'escalation' && (
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Escalation Reason *
                                </label>
                                <textarea
                                  value={escalationReason}
                                  onChange={(e) => setEscalationReason(e.target.value)}
                                  placeholder="Explain why this issue needs to be escalated..."
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  rows={3}
                                  required
                                />
                              </div>
                            )}

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
                                disabled={!newReply.trim() || (newReplyType === 'escalation' && !escalationReason.trim()) || isSubmittingReply}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                {isSubmittingReply ? 'Submitting...' : 'Add Response'}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-gray-500">
                        <p className="text-sm">
                          {lastReply ? 
                            `Previous response was a ${lastReply.replyType === 'resolve' ? 'Resolution' : 'Escalation'} - no further responses allowed` :
                            'No further responses allowed'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Comments Section - Remove this section since comments are now in the issue card */}
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
