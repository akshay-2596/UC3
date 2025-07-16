import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  Server, 
  CheckCircle, 
  Users, 
  Settings,
  TrendingUp,
  Shield,
  AlertCircle
} from 'lucide-react';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const getNavItems = () => {
    const baseItems = [
      {
        id: 'overview',
        label: 'Overview',
        icon: LayoutDashboard,
        badge: null,
        permissions: ['view_resources']
      }
    ];

    if (currentUser?.id === 'user') {
      // Employee navigation
      return [
        ...baseItems,
        {
          id: 'requests',
          label: 'Requests',
          icon: FileText,
          badge: 3,
          permissions: ['create_requests']
        },
        {
          id: 'infrastructure',
          label: 'Infrastructure',
          icon: Server,
          badge: null,
          permissions: ['view_resources']
        },
        {
          id: 'approved-services',
          label: 'Approved Services',
          icon: CheckCircle,
          badge: null,
          permissions: ['view_resources']
        }
      ];
    } else if (currentUser?.id === 'manager') {
      // Manager navigation
      return [
        ...baseItems,
        {
          id: 'requests',
          label: 'Service Requests',
          icon: FileText,
          badge: 5,
          permissions: ['approve_requests']
        },
        {
          id: 'infrastructure',
          label: 'Infrastructure',
          icon: Server,
          badge: null,
          permissions: ['view_resources']
        },
        {
          id: 'approvals',
          label: 'Pending Approvals',
          icon: AlertCircle,
          badge: 12,
          permissions: ['approve_requests']
        },
        {
          id: 'team',
          label: 'Team Management',
          icon: Users,
          badge: null,
          permissions: ['manage_team']
        }
      ];
    } else if (currentUser?.id === 'admin') {
      // Admin navigation
      return [
        ...baseItems,
        {
          id: 'requests',
          label: 'All Requests',
          icon: FileText,
          badge: 8,
          permissions: ['view_resources']
        },
        {
          id: 'infrastructure',
          label: 'Infrastructure',
          icon: Server,
          badge: null,
          permissions: ['view_resources']
        },
        {
          id: 'users',
          label: 'User Management',
          icon: Users,
          badge: null,
          permissions: ['manage_users']
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: TrendingUp,
          badge: null,
          permissions: ['full_access']
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings,
          badge: null,
          permissions: ['configure_policies']
        }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:top-16 md:bg-white md:border-r md:border-gray-200">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Role Access</span>
              </div>
              <Badge variant="secondary" className="text-xs font-mono">
                {currentUser?.name}
              </Badge>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const hasPermission = item.permissions.some(permission => 
                  currentUser?.permissions?.includes(permission)
                );

                if (!hasPermission) return null;

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start h-10 px-3 ${
                      isActive 
                        ? 'bg-black text-white shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? 'secondary' : 'outline'} 
                        className="text-xs ml-2"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-600 bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex-1 flex flex-col overflow-y-auto pt-20">
              <div className="p-4">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Role Access</span>
                  </div>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {currentUser?.name}
                  </Badge>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const hasPermission = item.permissions.some(permission => 
                      currentUser?.permissions?.includes(permission)
                    );

                    if (!hasPermission) return null;

                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? 'default' : 'ghost'}
                        className={`w-full justify-start h-10 px-3 ${
                          isActive 
                            ? 'bg-black text-white shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant={isActive ? 'secondary' : 'outline'} 
                            className="text-xs ml-2"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;