import { AdminAuthProvider, useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function AdminAppContent() {
  const { isAuthenticated } = useAdminAuth();

  const handleBackToMain = () => {
    // Navigate back to the main application
    window.location.href = '/';
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onSuccess={() => {}} 
        onBack={handleBackToMain}
      />
    );
  }

  return <AdminDashboard />;
}

const AdminApp = () => {
  return (
    <AdminAuthProvider>
      <AdminAppContent />
    </AdminAuthProvider>
  );
};

export default AdminApp;
