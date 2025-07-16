import React, { useState, useEffect } from 'react';
import { 
  cloudProviders, 
  userRoles
} from '../mock/data';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import RequestsPage from './RequestsPage';
import InfrastructurePage from './InfrastructurePage';
import ApprovedServicesPage from './ApprovedServicesPage';
import OverviewPage from './OverviewPage';

const DashboardPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    if (!userRole) {
      navigate('/login');
      return;
    }

    const role = userRoles.find(r => r.id === userRole);
    setCurrentUser({ ...role, username: userName });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    if (provider === 'add-new') {
      // Handle add new service
      console.log('Add new service functionality');
      setSelectedProvider('all');
    }
  };

  if (!currentUser) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage currentUser={currentUser} selectedProvider={selectedProvider} />;
      case 'requests':
        return <RequestsPage currentUser={currentUser} selectedProvider={selectedProvider} />;
      case 'infrastructure':
        return <InfrastructurePage selectedProvider={selectedProvider} />;
      case 'approved-services':
        return <ApprovedServicesPage selectedProvider={selectedProvider} />;
      case 'approvals':
        return <RequestsPage currentUser={currentUser} selectedProvider={selectedProvider} />;
      case 'team':
        return <div>Team Management - Coming Soon</div>;
      case 'users':
        return <div>User Management - Coming Soon</div>;
      case 'analytics':
        return <div>Analytics - Coming Soon</div>;
      case 'settings':
        return <div>Settings - Coming Soon</div>;
      default:
        return <OverviewPage currentUser={currentUser} selectedProvider={selectedProvider} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        selectedProvider={selectedProvider}
        onProviderChange={handleProviderChange}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <div className="flex-1 md:ml-64 p-6 mt-16">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;