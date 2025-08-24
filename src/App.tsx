import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Megaphone, Users, Menu, X, Home, BarChart3, Shield } from 'lucide-react';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { IssuesSection } from './components/IssuesSection';
import { TopicsSection } from './components/TopicsSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { SurveysSection } from './components/SurveysSection';
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import UserForm from './components/UserForm';
import Login from './components/Login';
import Register from './components/Register';
import UserMenu from './components/UserMenu';
import ProfileCompletionBanner from './components/ProfileCompletionBanner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPromptProvider, useLoginPrompt } from './contexts/LoginPromptContext';
import { topics, surveys } from './data/dummyData';
import { getTranslation } from './i18n/translations';

type Section = 'issues' | 'topics' | 'announcements' | 'surveys' | 'dashboard' | 'profile' | 'edit-profile';

function AppContent() {
  const [currentSection, setCurrentSection] = useState<Section>('issues');
  const [language, setLanguage] = useState('ENGLISH');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfileBanner, setShowProfileBanner] = useState(false);
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const { showLoginPrompt } = useLoginPrompt();

  // Show profile completion banner if user is authenticated but location is incomplete
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // Check if user has set location information up to cell level
      const hasCompleteLocation = currentUser.location && 
        currentUser.location.district && 
        currentUser.location.district.trim() !== '' &&
        currentUser.location.sector && 
        currentUser.location.sector.trim() !== '' &&
        currentUser.location.cell && 
        currentUser.location.cell.trim() !== '';
      
      setShowProfileBanner(!hasCompleteLocation);
    } else {
      setShowProfileBanner(false);
    }
  }, [isAuthenticated, currentUser]);

  // Track previous authentication state to detect 401 logouts
  const prevAuthRef = useRef(isAuthenticated);
  const [hasShownExpiredPrompt, setHasShownExpiredPrompt] = useState(false);
  
  // Show login modal when user becomes unauthenticated due to 401
  useEffect(() => {
    // If user was authenticated before but is now not authenticated (due to 401)
    if (prevAuthRef.current && !isAuthenticated && !isLoading && !hasShownExpiredPrompt) {
      showLoginPrompt('Your session has expired. Please log in again to continue.');
      setHasShownExpiredPrompt(true);
    }
    
    // Update the previous auth state
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, isLoading, showLoginPrompt, hasShownExpiredPrompt]);
  
  // Reset expired prompt flag when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setHasShownExpiredPrompt(false);
    }
  }, [isAuthenticated]);



  // Show loading state while authentication is being validated
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login modal when requested
  if (showLogin) {
    return <Login 
      language={language}
      onSuccess={() => setShowLogin(false)} 
      onCancel={() => setShowLogin(false)}
      onShowRegister={() => {
        setShowLogin(false);
        setShowRegister(true);
      }}
    />;
  }

  // Show register modal when requested
  if (showRegister) {
    return <Register 
      language={language}
      onSuccess={() => setShowRegister(false)} 
      onCancel={() => setShowRegister(false)}
      onShowLogin={() => {
        setShowRegister(false);
        setShowLogin(true);
      }}
    />;
  }

  // Show login modal for unauthenticated users instead of main content
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <Home size={24} />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CitizenConnect</h1>
                  <p className="text-xs text-gray-600">Republic of Rwanda</p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center space-x-4">
                <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Login Required */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield size={32} className="text-white" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Welcome to CitizenConnect
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please log in or register to access the citizen portal
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Create Account
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Access to community issues, topics, announcements, and surveys requires authentication
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600">© 2024 Republic of Rwanda - CitizenConnect Portal</p>
              <p className="text-sm text-gray-500">Empowering citizens through digital engagement</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const navigation = [
    { id: 'issues', name: getTranslation('issues', language), icon: MessageSquare },
    { id: 'topics', name: getTranslation('topics', language), icon: Users },
    { id: 'announcements', name: getTranslation('announcements', language), icon: Megaphone },
    { id: 'surveys', name: 'Surveys', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        // Dashboard only available for authenticated users
        if (!isAuthenticated || !currentUser) {
          setCurrentSection('issues');
          return null;
        }
        return <UserDashboard language={language} />;
      case 'profile':
        if (!isAuthenticated || !currentUser) {
          setCurrentSection('issues');
          return null;
        }
        return (
          <UserProfile 
            userId={currentUser.id} 
            currentUser={currentUser}
            language={language} 
          />
        );
      case 'edit-profile':
        if (!isAuthenticated || !currentUser) {
          setCurrentSection('issues');
          return null;
        }
        return (
          <UserForm 
            user={currentUser}
            isEditing={true}
            onSave={(userData) => {
              // Handle user update
              console.log('Updating user:', userData);
              // Update the user in AuthContext
              if (currentUser) {
                const updatedUser = {
                  ...currentUser,
                  ...userData,
                  profileComplete: true // Mark profile as complete when location is added
                };
                // You would typically call an API to update the user here
                // For now, we'll just update the local state
                setCurrentSection('profile');
              }
            }}
            onCancel={() => setCurrentSection('profile')}
          />
        );
      case 'issues':
        return (
          <IssuesSection 
            language={language} 
            currentUser={currentUser}
          />
        );
      case 'topics':
        return (
          <TopicsSection 
            topics={topics} 
            language={language} 
            currentUser={currentUser}
          />
        );
      case 'announcements':
        return (
          <AnnouncementsSection 
            language={language}
            currentUser={currentUser}
          />
        );
      case 'surveys':
        return (
          <SurveysSection
            surveys={surveys}
            language={language}
            currentUser={currentUser}
            onSubmitSurvey={(surveyId, answers) => {
              if (!isAuthenticated) {
                showLoginPrompt('Please log in to submit survey responses');
                return;
              }
              // In a real app, this would submit to the backend
              console.log(`Submitting survey ${surveyId} with answers:`, answers);
            }}
          />
        );
      default:
        return <UserDashboard language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Home size={24} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CitizenConnect</h1>
                <p className="text-xs text-gray-600">Republic of Rwanda</p>
              </div>
            </div>

            {/* Desktop Navigation - Only show when authenticated */}
            {isAuthenticated && (
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentSection(item.id as Section)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentSection === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Language Switcher, User Menu/Login & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />

              {/* User Menu - Only show when authenticated */}
              {isAuthenticated && (
                <UserMenu 
                  onEditProfileClick={() => setCurrentSection('edit-profile')}
                />
              )}
              {/* Mobile Menu Button - Only show when authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Only show when authenticated */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 py-2 px-3 rounded-md text-base font-medium transition-colors ${
                      currentSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Profile Completion Banner - Only show when authenticated */}
        {isAuthenticated && (
          <ProfileCompletionBanner
            language={language}
            isVisible={showProfileBanner}
            onDismiss={() => setShowProfileBanner(false)}
            onCompleteProfile={() => setCurrentSection('edit-profile')}
          />
        )}
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600">© 2024 Republic of Rwanda - CitizenConnect Portal</p>
              <p className="text-sm text-gray-500">Empowering citizens through digital engagement</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LoginPromptProvider>
        <AppContent />
      </LoginPromptProvider>
    </AuthProvider>
  );
}

export default App;