import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Megaphone, Calendar, MapPin } from 'lucide-react';
import { Announcement, User } from '../types';
import { announcements } from '../data/dummyData';
import { users } from '../data/dummyData';
import AdminAnnouncementForm from './AdminAnnouncementForm';

interface AdminAnnouncementsListProps {
  currentLeader?: any;
}

const AdminAnnouncementsList: React.FC<AdminAnnouncementsListProps> = ({ currentLeader }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegionalFocus, setSelectedRegionalFocus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const priorities = ['all', 'normal', 'important', 'urgent'];
  const categories = ['all', 'government', 'healthcare', 'infrastructure', 'education'];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    const matchesRegionalFocus = selectedRegionalFocus === 'all' || 
      (selectedRegionalFocus === 'regional' && announcement.targetAudience?.some(audience => audience.startsWith('regional_'))) ||
      (selectedRegionalFocus === 'district_wide' && announcement.targetAudience?.some(audience => audience.includes('all_sectors') || (audience.includes('default') && audience.includes('district')))) ||
      (selectedRegionalFocus === 'sector_wide' && announcement.targetAudience?.some(audience => audience.includes('all_cells') || (audience.includes('default') && audience.includes('sector')))) ||
      (selectedRegionalFocus === 'cell_specific' && announcement.targetAudience?.some(audience => audience.includes('specific_cell') || (audience.includes('default') && audience.includes('cell')))) ||
      (selectedRegionalFocus === 'general' && !announcement.targetAudience?.some(audience => audience.startsWith('regional_')));
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPriority && matchesCategory && matchesRegionalFocus && matchesSearch;
  });

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleDelete = (announcementId: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      // In a real app, this would call an API to delete the announcement
      console.log('Deleting announcement:', announcementId);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAnnouncement(null);
  };

  const handleFormSubmit = (announcementData: Partial<Announcement>) => {
    if (editingAnnouncement) {
      // Update existing announcement
      console.log('Updating announcement:', { id: editingAnnouncement.id, ...announcementData });
    } else {
      // Create new announcement
      console.log('Creating new announcement:', announcementData);
    }
    handleFormClose();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'important': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'healthcare': return 'bg-green-100 text-green-800';
      case 'infrastructure': return 'bg-purple-100 text-purple-800';
      case 'education': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements Management</h1>
          <p className="text-gray-600">
            Create, edit, and manage government announcements and public notices.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Megaphone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <Megaphone className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">
                {announcements.filter(a => a.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Megaphone className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Important</p>
              <p className="text-2xl font-bold text-gray-900">
                {announcements.filter(a => a.priority === 'important').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">
                {announcements.filter(a => a.expiresAt && new Date(a.expiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search announcements..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Regional Focus Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Regional Focus</label>
            <select
              value={selectedRegionalFocus}
              onChange={(e) => setSelectedRegionalFocus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Announcements</option>
              <option value="regional">Regional Only</option>
              <option value="district_wide">District-wide Only</option>
              <option value="sector_wide">Sector-wide Only</option>
              <option value="cell_specific">Cell-specific Only</option>
              <option value="general">General Only</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <p>{filteredAnnouncements.length} of {announcements.length} announcements</p>
              <p className="text-xs text-blue-600">
                {announcements.filter(a => a.targetAudience?.some(audience => audience.includes('all_sectors') || (audience.includes('default') && audience.includes('district')))).length} district-wide, {' '}
                {announcements.filter(a => a.targetAudience?.some(audience => audience.includes('all_cells') || (audience.includes('default') && audience.includes('sector')))).length} sector-wide, {' '}
                {announcements.filter(a => a.targetAudience?.some(audience => audience.includes('specific_cell') || (audience.includes('default') && audience.includes('cell')))).length} cell-specific, {' '}
                {announcements.filter(a => !a.targetAudience?.some(audience => audience.startsWith('regional_'))).length} general
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Announcement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAnnouncements.map((announcement) => {
                const author = users.find(u => u.id === announcement.author.id);
                return (
                  <tr key={announcement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {announcement.title}
                          </h3>
                          {announcement.targetAudience?.some(audience => audience.startsWith('regional_')) && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <MapPin className="w-3 h-3 mr-1" />
                              {(() => {
                                const regional = announcement.targetAudience.find(audience => audience.startsWith('regional_'));
                                if (regional) {
                                  const parts = regional.split('_');
                                  if (parts[2] === 'default') {
                                    if (parts[1] === 'district') return 'District-wide (Default)';
                                    if (parts[1] === 'sector') return 'Sector-wide (Default)';
                                    if (parts[1] === 'cell') return 'Cell-specific (Default)';
                                  }
                                  if (parts[2] === 'all_sectors') return 'District-wide';
                                  if (parts[2] === 'all_cells') return 'Sector-wide';
                                  if (parts[2] === 'specific_cell') return 'Cell-specific';
                                }
                                return 'Regional';
                              })()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {announcement.content.substring(0, 100)}...
                        </p>
                        {announcement.targetAudience && announcement.targetAudience.length > 0 && (
                          <div className="flex items-center mt-1">
                            <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              {announcement.targetAudience
                                .filter(audience => !audience.startsWith('regional_'))
                                .join(', ')}
                              {announcement.targetAudience.some(audience => audience.startsWith('regional_')) && (
                                <span className="ml-1 text-blue-600">
                                  • Regional Focus
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={author?.avatar || announcement.author.avatar}
                          alt={author?.name || announcement.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {author?.name || announcement.author.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {author?.department || announcement.author.department || 'Citizen'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                        {announcement.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(announcement.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {announcement.expiresAt ? (
                        <span className={new Date(announcement.expiresAt) < new Date() ? 'text-red-600' : ''}>
                          {formatDate(announcement.expiresAt)}
                        </span>
                      ) : (
                        <span className="text-gray-400">No expiration</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(announcement.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No announcements</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedPriority !== 'all' || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Get started by creating a new announcement.'}
            </p>
            {!searchTerm && selectedPriority === 'all' && selectedCategory === 'all' && (
              <div className="mt-6">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Announcement
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Announcement Form Modal */}
      {isFormOpen && (
        <AdminAnnouncementForm
          announcement={editingAnnouncement}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          currentLeader={currentLeader}
        />
      )}
    </div>
  );
};

export default AdminAnnouncementsList;
