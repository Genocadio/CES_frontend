import { useState, useEffect } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Megaphone,
  User,
  LogOut,
  BarChart3,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { getIssuesForLeader, getAnnouncementsForLeader, getTopicStatsForLeader } from '../data/adminData';
import { issues, announcements, topics } from '../data/dummyData';
import AdminIssuesList from './AdminIssuesList';
import AdminAnnouncementsList from './AdminAnnouncementsList';
import AdminSurveysList from './AdminSurveysList';
import AdminTopicsList from './AdminTopicsList';

type AdminSection = 'dashboard' | 'issues' | 'announcements' | 'surveys' | 'topics' | 'profile';

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { currentLeader, logout } = useAdminAuth();

  // Keyboard shortcut for toggling sidebar (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        setSidebarCollapsed(!sidebarCollapsed);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed]);

  if (!currentLeader) {
    return null;
  }

  const assignedIssues = getIssuesForLeader(currentLeader.id);
  const pendingIssues = assignedIssues.filter(a => a.status === 'pending');
  const inProgressIssues = assignedIssues.filter(a => a.status === 'in_progress');
  const resolvedIssues = assignedIssues.filter(a => a.status === 'resolved');
  
  // Get announcements for current leader's region
  const leaderAnnouncements = getAnnouncementsForLeader(currentLeader, announcements);
  
  const urgentAnnouncements = leaderAnnouncements.filter(a => a.priority === 'urgent');
  const expiringAnnouncements = leaderAnnouncements.filter(a => 
    a.expiresAt && new Date(a.expiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  
  // Get topic statistics for current leader's region
  const topicStats = getTopicStatsForLeader(currentLeader, topics);

  const stats = [
    {
      title: 'Assigned Issues',
      value: assignedIssues.length,
      icon: FileText,
      color: 'blue',
      change: '+2 this week'
    },
    {
      title: 'Pending Action',
      value: pendingIssues.length,
      icon: Clock,
      color: 'yellow',
      change: '-1 from yesterday'
    },
    {
      title: 'Community Topics',
      value: topicStats.totalTopics,
      icon: MessageCircle,
      color: 'green',
      change: `${topicStats.activeDiscussions} active`
    },
    {
      title: 'Urgent Announcements',
      value: urgentAnnouncements.length,
      icon: Megaphone,
      color: 'red',
      change: `${urgentAnnouncements.length > 0 ? '!' : '0'} active`
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      green: 'bg-green-500 text-green-600 bg-green-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'issues':
        return <AdminIssuesList />;
      case 'announcements':
        return <AdminAnnouncementsList currentLeader={currentLeader} />;
      case 'surveys':
        return <AdminSurveysList currentLeader={currentLeader} />;
      case 'topics':
        return <AdminTopicsList currentLeader={currentLeader} />;
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{currentLeader.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{currentLeader.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Level</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{currentLeader.level}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="mt-1 text-sm text-gray-900">
                  {currentLeader.location.district}
                  {currentLeader.location.sector && ` - ${currentLeader.location.sector}`}
                  {currentLeader.location.cell && ` - ${currentLeader.location.cell}`}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="mt-1 text-sm text-gray-900">{currentLeader.department}</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {currentLeader.firstName}
                  </h1>
                  <p className="text-gray-600">
                    {currentLeader.level.charAt(0).toUpperCase() + currentLeader.level.slice(1)} Leader - {currentLeader.location.district}
                    {currentLeader.location.sector && ` - ${currentLeader.location.sector}`}
                    {currentLeader.location.cell && ` - ${currentLeader.location.cell}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Today</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const colorClasses = getColorClasses(stat.color).split(' ');
                const iconBg = colorClasses[0];
                
                return (
                  <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className={`${iconBg} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Issues */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Issues</h2>
                  <button
                    onClick={() => setCurrentSection('issues')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {assignedIssues.slice(0, 5).map((assignment) => {
                  const issue = issues.find(i => i.id === assignment.issueId);
                  if (!issue) return null;

                  const priorityColors: Record<string, string> = {
                    low: 'bg-gray-100 text-gray-800',
                    medium: 'bg-blue-100 text-blue-800',
                    high: 'bg-orange-100 text-orange-800',
                    urgent: 'bg-red-100 text-red-800'
                  };

                  const statusColors: Record<string, string> = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    in_progress: 'bg-blue-100 text-blue-800',
                    resolved: 'bg-green-100 text-green-800',
                    escalated: 'bg-purple-100 text-purple-800',
                    closed: 'bg-gray-100 text-gray-800'
                  };

                  return (
                    <div key={assignment.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {issue.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {issue.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[assignment.status] || 'bg-gray-100 text-gray-800'}`}>
                              {assignment.status.replace('_', ' ')}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[assignment.priority] || 'bg-gray-100 text-gray-800'}`}>
                              {assignment.priority}
                            </span>
                            {assignment.dueDate && (
                              <span className="text-xs text-gray-500">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(assignment.assignedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {assignedIssues.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    No issues assigned yet.
                  </div>
                )}
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
                  <button
                    onClick={() => setCurrentSection('announcements')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {leaderAnnouncements.slice(0, 3).map((announcement) => {
                  const priorityColors: Record<string, string> = {
                    normal: 'bg-blue-100 text-blue-800',
                    important: 'bg-orange-100 text-orange-800',
                    urgent: 'bg-red-100 text-red-800'
                  };

                  return (
                    <div key={announcement.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {announcement.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {announcement.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[announcement.priority] || 'bg-gray-100 text-gray-800'}`}>
                              {announcement.priority}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {announcement.category}
                            </span>
                            {announcement.expiresAt && (
                              <span className="text-xs text-gray-500">
                                Expires: {new Date(announcement.expiresAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(announcement.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {leaderAnnouncements.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    No announcements available.
                  </div>
                )}
              </div>
            </div>

            {/* Recent Topics */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Community Topics</h2>
                  <button
                    onClick={() => setCurrentSection('topics')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {topics.slice(0, 3).map((topic) => (
                  <div key={topic.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setCurrentSection('topics')}>
                    <div className="flex items-start space-x-3">
                      <img
                        src={topic.author.avatar}
                        alt={topic.author.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 line-clamp-2 mb-2">{topic.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>by {topic.author.name}</span>
                          <span>{topic.replies.length} replies</span>
                          <span>{topic.votes.length} votes</span>
                          {topic.regionalRestriction && (
                            <span className="text-blue-600">
                              {topic.regionalRestriction.level}: {topic.regionalRestriction.district}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {topics.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    No topics available yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out fixed h-full z-10`}>
        <div className={`${sidebarCollapsed ? 'p-3' : 'p-6'} relative`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="bg-blue-600 text-white p-2 rounded-lg flex-shrink-0 hover:bg-blue-700 transition-colors cursor-pointer"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            <div className={`${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-auto'} transition-all duration-300 ease-in-out`}>
              <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">Admin Portal</h1>
              <p className="text-xs text-gray-600 whitespace-nowrap">Leader Dashboard</p>
            </div>
          </div>
        </div>

        <nav className={`mt-6 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentSection('dashboard')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'} text-sm font-medium rounded-md ${
                currentSection === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={sidebarCollapsed ? 'Dashboard' : ''}
            >
              <TrendingUp className={`${sidebarCollapsed ? 'h-5 w-5' : 'mr-3 h-4 w-4'}`} />
              {!sidebarCollapsed && 'Dashboard'}
            </button>
            <button
              onClick={() => setCurrentSection('issues')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'} text-sm font-medium rounded-md ${
                currentSection === 'issues'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={sidebarCollapsed ? 'Issues' : ''}
            >
              <MessageSquare className={`${sidebarCollapsed ? 'h-5 w-5' : 'mr-3 h-4 w-4'}`} />
              {!sidebarCollapsed && 'Issues'}
              {!sidebarCollapsed && assignedIssues.length > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                  {assignedIssues.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentSection('announcements')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'} text-sm font-medium rounded-md ${
                currentSection === 'announcements'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={sidebarCollapsed ? 'Announcements' : ''}
            >
              <Megaphone className={`${sidebarCollapsed ? 'h-5 w-5' : 'mr-3 h-4 w-4'}`} />
              {!sidebarCollapsed && 'Announcements'}
            </button>
            <button
              onClick={() => setCurrentSection('surveys')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'} text-sm font-medium rounded-md ${
                currentSection === 'surveys'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={sidebarCollapsed ? 'Surveys' : ''}
            >
              <BarChart3 className={`${sidebarCollapsed ? 'h-5 w-5' : 'mr-3 h-4 w-4'}`} />
              {!sidebarCollapsed && 'Surveys'}
            </button>
            <button
              onClick={() => setCurrentSection('topics')}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2'} text-sm font-medium rounded-md ${
                currentSection === 'topics'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={sidebarCollapsed ? 'Topics' : ''}
            >
              <MessageCircle className={`${sidebarCollapsed ? 'h-5 w-5' : 'mr-3 h-4 w-4'}`} />
              {!sidebarCollapsed && 'Topics'}
              {!sidebarCollapsed && topicStats.totalTopics > 0 && (
                <span className="ml-auto bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                  {topicStats.totalTopics}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* User Info */}
        <div className={`absolute bottom-0 ${sidebarCollapsed ? 'w-16' : 'w-64'} ${sidebarCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 bg-white transition-all duration-300 ease-in-out`}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} mb-3 hover:bg-gray-50 rounded-lg transition-colors ${sidebarCollapsed ? 'p-1' : 'p-2'} h-auto`}
          >
            <img
              src={currentLeader.avatar}
              alt={currentLeader.name}
              className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
            />
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentLeader.firstName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentLeader.level} Leader
                </p>
              </div>
            )}
          </button>
          
          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border border-gray-200 rounded-lg shadow-lg absolute bottom-full mb-2 left-0 z-20`}>
              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentSection('profile');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-8">
          {renderContent()}
        </div>
      </div>



      {/* Click outside to close profile dropdown */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
