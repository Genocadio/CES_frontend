import { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  User,
  LogOut
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { getIssuesForLeader } from '../data/adminData';
import { issues } from '../data/dummyData';
import AdminIssuesList from './AdminIssuesList';

type AdminSection = 'dashboard' | 'issues' | 'profile';

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const { currentLeader, logout } = useAdminAuth();

  if (!currentLeader) {
    return null;
  }

  const assignedIssues = getIssuesForLeader(currentLeader.id);
  const pendingIssues = assignedIssues.filter(a => a.status === 'pending');
  const inProgressIssues = assignedIssues.filter(a => a.status === 'in_progress');
  const resolvedIssues = assignedIssues.filter(a => a.status === 'resolved');

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
      title: 'In Progress',
      value: inProgressIssues.length,
      icon: AlertCircle,
      color: 'orange',
      change: '+1 this week'
    },
    {
      title: 'Resolved',
      value: resolvedIssues.length,
      icon: CheckCircle,
      color: 'green',
      change: '+3 this month'
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

                  const priorityColors = {
                    low: 'bg-gray-100 text-gray-800',
                    medium: 'bg-blue-100 text-blue-800',
                    high: 'bg-orange-100 text-orange-800',
                    urgent: 'bg-red-100 text-red-800'
                  };

                  const statusColors = {
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
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[assignment.status]}`}>
                              {assignment.status.replace('_', ' ')}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[assignment.priority]}`}>
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
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
              <p className="text-xs text-gray-600">Leader Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            <button
              onClick={() => setCurrentSection('dashboard')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                currentSection === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="mr-3 h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentSection('issues')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                currentSection === 'issues'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="mr-3 h-4 w-4" />
              Issues
              {assignedIssues.length > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                  {assignedIssues.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentSection('profile')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                currentSection === 'profile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </button>
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={currentLeader.avatar}
              alt={currentLeader.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentLeader.firstName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentLeader.level} Leader
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
