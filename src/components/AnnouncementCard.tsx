import React, { useState } from 'react';
import { Calendar, AlertCircle, Info, AlertTriangle, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Announcement } from '../types';
import AttachmentViewer from './AttachmentViewer';

interface AnnouncementCardProps {
  announcement: Announcement;
  language: string;
  currentUser?: any;
  onMarkAsRead?: (announcementId: string) => void;
}

const priorityConfig = {
  normal: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  important: { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  urgent: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
};

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
  language, 
  currentUser, 
  onMarkAsRead 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = priorityConfig[announcement.priority];
  const Icon = config.icon;
  
  // Check if current user has read this announcement
  const isRead = currentUser && announcement.readBy.includes(currentUser.id);
  
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // Mark as read when expanded
    if (!isExpanded && !isRead && currentUser && onMarkAsRead) {
      onMarkAsRead(announcement.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={`border rounded-lg transition-all duration-200 hover:shadow-md ${
      config.bg} ${config.border} ${isRead ? 'opacity-75' : 'border-l-4 border-l-blue-500'
    }`}>
      {/* Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer"
        onClick={handleExpand}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-full ${config.bg} flex-shrink-0`}>
            <Icon size={24} className={config.color} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  announcement.priority === 'important' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {announcement.priority}
                </span>
                {isRead && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Eye size={12} className="mr-1" />
                    Read
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {/* Preview text - always visible */}
            <p className="text-gray-700 line-clamp-2 leading-relaxed">
              {announcement.content}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={announcement.author.avatar}
                    alt={announcement.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{announcement.author.name}</span>
                  {announcement.author.isGovernment && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {announcement.author.department}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{formatDate(announcement.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200">
          <div className="pt-4">
            <p className="text-gray-700 mb-4 leading-relaxed">
              {announcement.content}
            </p>
            
            {/* Attachments */}
            {announcement.attachments && announcement.attachments.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                <AttachmentViewer attachments={announcement.attachments} compact={false} />
              </div>
            )}
            
            {/* Read Status */}
            <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
              <div className="flex items-center space-x-2">
                <Eye size={12} />
                <span>
                  Read by {announcement.readBy.length} {announcement.readBy.length === 1 ? 'person' : 'people'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};