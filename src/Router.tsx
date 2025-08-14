import { useState, useEffect } from 'react';
import App from './App';
import AdminApp from './components/AdminApp';

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route to admin if path starts with /admin
  if (currentPath.startsWith('/admin')) {
    return <AdminApp />;
  }

  // Default to main app
  return <App />;
};

export default Router;
