import React, { createContext, useContext, useState } from 'react';
import { X } from 'lucide-react';
import Login from '../components/Login';
import { useAuth } from './AuthContext';

interface LoginPromptContextType {
  showLoginPrompt: (message?: string, onSuccess?: () => void) => void;
  hideLoginPrompt: () => void;
}

const LoginPromptContext = createContext<LoginPromptContextType | undefined>(undefined);

export const useLoginPrompt = () => {
  const context = useContext(LoginPromptContext);
  if (!context) {
    throw new Error('useLoginPrompt must be used within a LoginPromptProvider');
  }
  return context;
};

interface LoginPromptProviderProps {
  children: React.ReactNode;
}

export const LoginPromptProvider: React.FC<LoginPromptProviderProps> = ({ children }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState<string>('');
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);
  const { isAuthenticated } = useAuth();

  const showLoginPrompt = (message = 'Please log in to continue', onSuccess?: () => void) => {
    if (isAuthenticated) {
      // If already authenticated, just call the success callback
      if (onSuccess) onSuccess();
      return;
    }
    
    setPromptMessage(message);
    setOnSuccessCallback(() => onSuccess || null);
    setShowPrompt(true);
  };

  const hideLoginPrompt = () => {
    setShowPrompt(false);
    setPromptMessage('');
    setOnSuccessCallback(null);
  };

  const handleLoginSuccess = () => {
    const callback = onSuccessCallback;
    hideLoginPrompt();
    
    // Execute the callback after a small delay to ensure state updates
    if (callback) {
      setTimeout(callback, 100);
    }
  };

  return (
    <LoginPromptContext.Provider value={{ showLoginPrompt, hideLoginPrompt }}>
      {children}
      
      {/* Login Modal */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Login Required</h2>
              <button
                onClick={hideLoginPrompt}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">{promptMessage}</p>
              <Login 
                onSuccess={handleLoginSuccess}
                onCancel={hideLoginPrompt}
                isModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </LoginPromptContext.Provider>
  );
};