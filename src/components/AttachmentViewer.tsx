import React, { useState } from 'react';
import { Download, Eye, Play, FileText, Image, Music } from 'lucide-react';
import { Attachment } from '../types';

interface AttachmentViewerProps {
  attachments: Attachment[];
  compact?: boolean;
}

const AttachmentViewer: React.FC<AttachmentViewerProps> = ({ attachments, compact = false }) => {
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={16} />;
      case 'video':
        return <Play size={16} />;
      case 'audio':
        return <Music size={16} />;
      case 'pdf':
      case 'document':
        return <FileText size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isViewable = (type: string) => {
    return ['image', 'video'].includes(type);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            {getIcon(attachment.type)}
            <span className="text-sm font-medium text-gray-700 truncate max-w-32">
              {attachment.name}
            </span>
            <div className="flex items-center space-x-1">
              {isViewable(attachment.type) && (
                <button
                  onClick={() => setSelectedAttachment(attachment)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="View"
                >
                  <Eye size={14} />
                </button>
              )}
              <button
                onClick={() => window.open(attachment.url, '_blank')}
                className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                title="Download"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
        <FileText size={18} />
        <span>Attachments ({attachments.length})</span>
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-gray-100 relative">
              {attachment.thumbnail && (
                <img
                  src={attachment.thumbnail}
                  alt={attachment.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2">
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  attachment.type === 'image' ? 'bg-green-100 text-green-800' :
                  attachment.type === 'video' ? 'bg-blue-100 text-blue-800' :
                  attachment.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getIcon(attachment.type)}
                  <span className="uppercase">{attachment.type}</span>
                </div>
              </div>
              {isViewable(attachment.type) && (
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-all cursor-pointer">
                  <button
                    onClick={() => setSelectedAttachment(attachment)}
                    className="bg-white bg-opacity-90 text-gray-800 p-3 rounded-full hover:bg-opacity-100 transition-all"
                  >
                    {attachment.type === 'video' ? <Play size={24} /> : <Eye size={24} />}
                  </button>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-4">
              <h5 className="font-medium text-gray-900 truncate mb-2">{attachment.name}</h5>
              <p className="text-sm text-gray-500 mb-3">
                {formatFileSize(attachment.size)} • {attachment.mimeType}
              </p>
              
              <div className="flex items-center space-x-2">
                {isViewable(attachment.type) && (
                  <button
                    onClick={() => setSelectedAttachment(attachment)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                )}
                <button
                  onClick={() => window.open(attachment.url, '_blank')}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium ${
                    isViewable(attachment.type) ? 'flex-none' : 'flex-1'
                  }`}
                >
                  <Download size={16} />
                  {!isViewable(attachment.type) && <span>Download</span>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing attachments */}
      {selectedAttachment && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedAttachment.name}</h3>
              <button
                onClick={() => setSelectedAttachment(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {selectedAttachment.type === 'image' && (
                <img
                  src={selectedAttachment.url}
                  alt={selectedAttachment.name}
                  className="max-w-full h-auto"
                />
              )}
              {selectedAttachment.type === 'video' && (
                <video
                  src={selectedAttachment.url}
                  controls
                  className="max-w-full h-auto"
                  style={{ maxHeight: '70vh' }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => window.open(selectedAttachment.url, '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentViewer;
