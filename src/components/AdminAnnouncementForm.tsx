import React, { useState, useEffect } from 'react';
import { X, Save, MapPin, Calendar } from 'lucide-react';
import { Announcement, Attachment, User } from '../types';
import { users } from '../data/dummyData';
// import { FileUpload } from './FileUpload';

interface AdminAnnouncementFormProps {
  announcement?: Announcement | null;
  onClose: () => void;
  onSubmit: (data: Partial<Announcement>) => void;
  currentLeader?: any;
}

const AdminAnnouncementForm: React.FC<AdminAnnouncementFormProps> = ({
  announcement,
  onClose,
  onSubmit,
  currentLeader
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'government',
    priority: 'normal' as 'normal' | 'important' | 'urgent',
    expiresAt: '',
    hasExpiration: false,
    regionalFocus: {
      enabled: false,
      level: currentLeader?.level || 'district',
      district: currentLeader?.location?.district || '',
      sector: currentLeader?.location?.sector || '',
      cell: currentLeader?.location?.cell || ''
    }
  });

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = ['government', 'healthcare', 'infrastructure', 'education', 'security', 'environment'];
  const priorities = ['normal', 'important', 'urgent'];

  // Get available regions based on current leader's level
  const getAvailableRegions = () => {
    if (!currentLeader) return { district: [], sector: [], cell: [] };

    const allDistricts = ['Gasabo', 'Nyarugenge', 'Kicukiro', 'Bugesera', 'Gicumbi', 'Rulindo'];
    const allSectors = {
      'Gasabo': ['Kacyiru', 'Kimihurura', 'Gisozi', 'Remera', 'Kicukiro', 'Gikondo'],
      'Nyarugenge': ['Nyamirambo', 'Gitega', 'Kanyinya', 'Kigali', 'Kimisagara', 'Mageragere'],
      'Kicukiro': ['Niboye', 'Gatenga', 'Kanombe', 'Kagarama', 'Bumbogo', 'Butare']
    };
    const allCells = {
      'Kacyiru': ['Kamatamu', 'Kigali', 'Kacyiru', 'Nyarutarama'],
      'Nyamirambo': ['Biryogo', 'Nyamirambo', 'Kigali', 'Kanyinya'],
      'Niboye': ['Kagugu', 'Niboye', 'Kicukiro', 'Gatenga']
    };

    // District level leader can target their district and all sectors/cells within it
    if (currentLeader.level === 'district') {
      return {
        district: [currentLeader.location.district], // Can only target their own district
        sector: allSectors[currentLeader.location.district] || [], // Can target all sectors in their district
        cell: allCells[currentLeader.location.sector] || [] // Can target cells in any sector
      };
    }
    
    // Sector level leader can target their sector and all cells within it
    if (currentLeader.level === 'sector') {
      return {
        district: [currentLeader.location.district], // Can only target their own district
        sector: [currentLeader.location.sector], // Can only target their own sector
        cell: allCells[currentLeader.location.sector] || [] // Can target all cells in their sector
      };
    }
    
    // Cell level leader can only target their own cell
    if (currentLeader.level === 'cell') {
      return {
        district: [currentLeader.location.district], // Can only target their own district
        sector: [currentLeader.location.sector], // Can only target their own sector
        cell: [currentLeader.location.cell] // Can only target their own cell
      };
    }

    return { district: [], sector: [], cell: [] };
  };

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        category: announcement.category,
        priority: announcement.priority,
        expiresAt: announcement.expiresAt ? new Date(announcement.expiresAt).toISOString().split('T')[0] : '',
        hasExpiration: !!announcement.expiresAt,
        regionalFocus: {
          enabled: false,
          level: 'district',
          district: '',
          sector: '',
          cell: ''
        }
      });
      setAttachments(announcement.attachments || []);
    } else {
      // Set default values based on current leader
      setFormData(prev => ({
        ...prev,
        regionalFocus: {
          ...prev.regionalFocus,
          level: currentLeader?.level || 'district', // Default to leader's highest level
          district: currentLeader?.location?.district || '',
          sector: currentLeader?.location?.sector || '',
          cell: currentLeader?.location?.cell || ''
        }
      }));
    }
  }, [announcement, currentLeader]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRegionalFocusChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      regionalFocus: {
        ...prev.regionalFocus,
        [field]: value
      }
    }));
  };



  const handleFileUpload = (files: File[]) => {
    // In a real app, this would upload files to a server
    const newAttachments: Attachment[] = files.map((file, index) => ({
      id: `temp_${Date.now()}_${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 
             file.type.startsWith('video/') ? 'video' : 
             file.type === 'application/pdf' ? 'pdf' : 'document',
      mimeType: file.type,
      size: file.size,
      uploadedBy: currentLeader?.id || 'unknown',
      uploadedAt: new Date(),
      thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(a => a.id !== attachmentId));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters long';
    }
    if (formData.hasExpiration && !formData.expiresAt) {
      newErrors.expiresAt = 'Please select an expiration date';
    }
    if (formData.hasExpiration && formData.expiresAt && new Date(formData.expiresAt) <= new Date()) {
      newErrors.expiresAt = 'Expiration date must be in the future';
    }
    if (formData.regionalFocus.enabled) {
      if (!formData.regionalFocus.district) {
        newErrors.district = 'District is required when regional focus is enabled';
      }
      
      // Validate based on leader's level and selected focus
      if (currentLeader?.level === 'cell') {
        // Cell leaders can only target their own cell
        if (formData.regionalFocus.district !== currentLeader.location.district) {
          newErrors.district = 'Cell leaders can only target their own district';
        }
        if (formData.regionalFocus.sector !== currentLeader.location.sector) {
          newErrors.sector = 'Cell leaders can only target their own sector';
        }
        if (formData.regionalFocus.cell !== currentLeader.location.cell) {
          newErrors.cell = 'Cell leaders can only target their own cell';
        }
      } else if (currentLeader?.level === 'sector') {
        // Sector leaders can target their sector (all cells) or specific cells
        if (formData.regionalFocus.district !== currentLeader.location.district) {
          newErrors.district = 'Sector leaders can only target their own district';
        }
        if (formData.regionalFocus.sector !== currentLeader.location.sector) {
          newErrors.sector = 'Sector leaders can only target their own sector';
        }
      } else if (currentLeader?.level === 'district') {
        // District leaders can target their district (all sectors) or specific sectors/cells
        if (formData.regionalFocus.district !== currentLeader.location.district) {
          newErrors.district = 'District leaders can only target their own district';
        }
      }
      
      // Validate required fields based on selected level
      if (formData.regionalFocus.level === 'sector' && !formData.regionalFocus.sector) {
        newErrors.sector = 'Sector is required for sector-level focus';
      }
      if (formData.regionalFocus.level === 'cell' && !formData.regionalFocus.cell) {
        newErrors.cell = 'Cell is required for cell-level focus';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const announcementData: Partial<Announcement> = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: formData.category,
      priority: formData.priority,
      attachments: attachments.length > 0 ? attachments : undefined,
      expiresAt: formData.hasExpiration && formData.expiresAt ? new Date(formData.expiresAt) : undefined
    };

    // Always apply default level targeting based on leader's level
    let defaultRegionalTarget = `regional_${currentLeader?.level}_default_${currentLeader?.location?.district}`;
    if (currentLeader?.level === 'sector') {
      defaultRegionalTarget += `_${currentLeader?.location?.sector}`;
    } else if (currentLeader?.level === 'cell') {
      defaultRegionalTarget += `_${currentLeader?.location?.sector}_${currentLeader?.location?.cell}`;
    }
    
    announcementData.targetAudience = [defaultRegionalTarget];

    // Add extra regional restrictions if enabled (targeting lower levels)
    if (formData.regionalFocus.enabled) {
      const regionalInfo = [];
      
      // Add district
      if (formData.regionalFocus.district) {
        regionalInfo.push(formData.regionalFocus.district);
      }
      
      // Add sector if targeting sector or cell level
      if (formData.regionalFocus.level !== 'district' && formData.regionalFocus.sector) {
        regionalInfo.push(formData.regionalFocus.sector);
      }
      
      // Add cell if targeting cell level
      if (formData.regionalFocus.level === 'cell' && formData.regionalFocus.cell) {
        regionalInfo.push(formData.regionalFocus.cell);
      }
      
      if (regionalInfo.length > 0) {
        // Create a special regional target audience with scope information
        const scope = formData.regionalFocus.level === 'district' ? 'all_sectors' : 
                     formData.regionalFocus.level === 'sector' ? 'all_cells' : 'specific_cell';
        
        announcementData.targetAudience.push(`regional_${formData.regionalFocus.level}_${scope}_${regionalInfo.join('_')}`);
      }
    }

    onSubmit(announcementData);
  };

  const availableRegions = getAvailableRegions();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {announcement ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter announcement title..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.content ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter announcement content..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.content.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Default Regional Targeting Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-sm font-medium text-green-800">Default Regional Targeting</h3>
            </div>
            <p className="text-sm text-green-700 mt-2">
              {currentLeader?.level === 'district' && `By default, your announcements will automatically target ${currentLeader?.location?.district} district-wide (all sectors).`}
              {currentLeader?.level === 'sector' && `By default, your announcements will automatically target ${currentLeader?.location?.sector} sector-wide (all cells).`}
              {currentLeader?.level === 'cell' && `By default, your announcements will automatically target ${currentLeader?.location?.cell} cell specifically.`}
            </p>
          </div>

          {/* Regional Focus */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="regionalFocus"
                checked={formData.regionalFocus.enabled}
                onChange={(e) => handleRegionalFocusChange('enabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="regionalFocus" className="ml-2 flex items-center text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4 mr-1" />
                Add Extra Regional Restrictions (Optional)
              </label>
            </div>

            {formData.regionalFocus.enabled && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Default Behavior:</strong> Announcements automatically target your full jurisdiction level.
                    {currentLeader?.level === 'district' && ` You will announce to ${currentLeader?.location?.district} district-wide (all sectors).`}
                    {currentLeader?.level === 'sector' && ` You will announce to ${currentLeader?.location?.sector} sector-wide (all cells).`}
                    {currentLeader?.level === 'cell' && ` You will announce to ${currentLeader?.location?.cell} cell specifically.`}
                  </p>
                  <p className="text-sm text-blue-800 mt-2">
                    <strong>Extra Restrictions:</strong> Use this section to reduce scope and target specific lower levels within your jurisdiction.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restrict To Level
                    </label>
                    <select
                      value={formData.regionalFocus.level}
                      onChange={(e) => handleRegionalFocusChange('level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {currentLeader?.level === 'district' && <option value="sector">Restrict to Specific Sector</option>}
                      {currentLeader?.level === 'district' && <option value="cell">Restrict to Specific Cell</option>}
                      {currentLeader?.level === 'sector' && <option value="cell">Restrict to Specific Cell</option>}
                      {currentLeader?.level === 'cell' && <option value="cell">No restrictions possible</option>}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      value={formData.regionalFocus.district}
                      onChange={(e) => handleRegionalFocusChange('district', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.district ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select District</option>
                      {availableRegions.district.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                    )}
                  </div>

                  {formData.regionalFocus.level !== 'district' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sector {formData.regionalFocus.level === 'sector' ? '*' : ''}
                      </label>
                      <select
                        value={formData.regionalFocus.sector}
                        onChange={(e) => handleRegionalFocusChange('sector', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.sector ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Sector</option>
                        {formData.regionalFocus.district && availableRegions.sector.map(sector => (
                          <option key={sector} value={sector}>{sector}</option>
                        ))}
                      </select>
                      {errors.sector && (
                        <p className="mt-1 text-sm text-red-600">{errors.sector}</p>
                      )}
                    </div>
                  )}

                  {formData.regionalFocus.level === 'cell' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cell *
                      </label>
                      <select
                        value={formData.regionalFocus.cell}
                        onChange={(e) => handleRegionalFocusChange('cell', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.cell ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Cell</option>
                        {formData.regionalFocus.sector && availableRegions.cell.map(cell => (
                          <option key={cell} value={cell}>{cell}</option>
                        ))}
                      </select>
                      {errors.cell && (
                        <p className="mt-1 text-sm text-red-600">{errors.cell}</p>
                    )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>



          {/* Expiration Date */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="hasExpiration"
                checked={formData.hasExpiration}
                onChange={(e) => handleInputChange('hasExpiration', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasExpiration" className="ml-2 flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-1" />
                Set Expiration Date
              </label>
            </div>

            {formData.hasExpiration && (
              <div>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => handleInputChange('expiresAt', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.expiresAt ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.expiresAt && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiresAt}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Announcement will automatically expire on this date
                </p>
              </div>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            {/* Temporarily disabled FileUpload for testing */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500">File upload temporarily disabled</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="mr-2 h-4 w-4" />
              {announcement ? 'Update Announcement' : 'Create Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAnnouncementForm;
