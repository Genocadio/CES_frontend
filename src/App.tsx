import { useState } from 'react';
import { MessageSquare, Megaphone, Users, Menu, X, Home, BarChart3 } from 'lucide-react';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { IssuesSection } from './components/IssuesSection';
import { TopicsSection } from './components/TopicsSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { SurveysSection } from './components/SurveysSection';
import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import UserForm from './components/UserForm';
import Login from './components/Login';
import UserMenu from './components/UserMenu';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPromptProvider, useLoginPrompt } from './contexts/LoginPromptContext';
import { issues, topics, announcements, surveys } from './data/dummyData';
import { getTranslation } from './i18n/translations';

type Section = 'issues' | 'topics' | 'announcements' | 'surveys' | 'dashboard' | 'profile' | 'edit-profile';

function AppContent() {
  const [currentSection, setCurrentSection] = useState<Section>('issues');
  const [language, setLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();
  const { showLoginPrompt } = useLoginPrompt();

  // Show login modal when requested
  if (showLogin) {
    return <Login onSuccess={() => setShowLogin(false)} />;
  }

  const navigation = [
    // Only show Dashboard for authenticated users
    ...(isAuthenticated ? [{ id: 'dashboard', name: 'Dashboard', icon: Home }] : []),
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
              setCurrentSection('profile');
            }}
            onCancel={() => setCurrentSection('profile')}
          />
        );
      case 'issues':
        return (
          <IssuesSection 
            issues={issues} 
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
            announcements={announcements} 
            language={language}
            currentUser={currentUser}
            onMarkAsRead={(announcementId) => {
              if (!isAuthenticated) {
                showLoginPrompt('Please log in to mark announcements as read');
                return;
              }
              // In a real app, this would update the backend
              console.log(`Marking announcement ${announcementId} as read for user ${currentUser?.id}`);
            }}
          />
        );
      case 'surveys':
        return (
          <SurveysSection
            surveys={surveys}
            language={language}
            currentUser={currentUser}
            isReadOnly={!isAuthenticated}
            onLoginRequired={() => showLoginPrompt('Please log in to participate in surveys')}
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

            {/* Desktop Navigation */}
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

            {/* Language Switcher, User Menu/Login & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
              {isAuthenticated ? (
                <UserMenu 
                  onProfileClick={() => setCurrentSection('profile')}
                  onEditProfileClick={() => setCurrentSection('edit-profile')}
                />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
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
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
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