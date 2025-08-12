import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Announcement } from '../types';
import { AnnouncementCard } from './AnnouncementCard';
import { getTranslation } from '../i18n/translations';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
  language: string;
  currentUser?: any;
  onMarkAsRead?: (announcementId: string) => void;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ 
  announcements, 
  language, 
  currentUser, 
  onMarkAsRead 
}) => {
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReadStatus, setSelectedReadStatus] = useState('all');

  const priorities = ['all', 'normal', 'important', 'urgent'];
  const categories = ['all', 'government', 'healthcare', 'infrastructure', 'education'];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    
    // Filter by read status
    let matchesReadStatus = true;
    if (currentUser && selectedReadStatus !== 'all') {
      const isRead = announcement.readBy.includes(currentUser.id);
      matchesReadStatus = selectedReadStatus === 'read' ? isRead : !isRead;
    }
    
    return matchesPriority && matchesCategory && matchesReadStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('announcements', language)}
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest government announcements and public notices.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <AlertCircle size={16} />
          <span>{announcements.length} total announcements</span>
          {currentUser && (
            <>
              <span>•</span>
              <span className="text-blue-600 font-medium">
                {announcements.filter(a => !a.readBy.includes(currentUser.id)).length} unread
              </span>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('priority', language)}
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority === 'urgent' ? 'Urgent' : priority === 'important' ? 'Important' : 'Normal'}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('category', language)}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category === 'healthcare' ? 'Healthcare' : category === 'infrastructure' ? 'Infrastructure' : category === 'education' ? 'Education' : 'Government'}
                </option>
              ))}
            </select>
          </div>

          {/* Read Status Filter */}
          {currentUser && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read Status
              </label>
              <select
                value={selectedReadStatus}
                onChange={(e) => setSelectedReadStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Announcements</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Urgent</p>
              <p className="text-2xl font-bold text-red-800">
                {announcements.filter(a => a.priority === 'urgent').length}
              </p>
            </div>
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Important</p>
              <p className="text-2xl font-bold text-orange-800">
                {announcements.filter(a => a.priority === 'important').length}
              </p>
            </div>
            <AlertCircle className="text-orange-600" size={24} />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Normal</p>
              <p className="text-2xl font-bold text-blue-800">
                {announcements.filter(a => a.priority === 'normal').length}
              </p>
            </div>
            <AlertCircle className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              language={language}
              currentUser={currentUser}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-500 text-lg">No announcements found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};