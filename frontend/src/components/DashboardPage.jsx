import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Globe, 
  LogOut, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Cloud,
  Server,
  Database,
  Settings
} from 'lucide-react';
import { 
  cloudProviders, 
  userRoles, 
  mockRequests, 
  costData, 
  dashboardStats, 
  resourceCategories,
  approvalWorkflow
} from '../mock/data';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('aws');
  const [activeTab, setActiveTab] = useState('overview');
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

  const handleRequestAction = (requestId, action) => {
    // Simulate request action
    console.log(`${action} request ${requestId}`);
  };

  if (!currentUser) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6" />
              <span className="text-lg font-semibold">CloudUnify</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {currentUser.name} Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {currentUser.username}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('overview')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Overview
              </Button>
              
              {currentUser.permissions.includes('view_resources') && (
                <Button
                  variant={activeTab === 'resources' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('resources')}
                >
                  <Server className="w-4 h-4 mr-2" />
                  Resources
                </Button>
              )}
              
              {currentUser.permissions.includes('approve_requests') && (
                <Button
                  variant={activeTab === 'requests' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('requests')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Requests
                </Button>
              )}
              
              {currentUser.permissions.includes('manage_users') && (
                <Button
                  variant={activeTab === 'users' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </Button>
              )}
              
              {currentUser.permissions.includes('configure_policies') && (
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              )}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">
                  Multi-cloud management dashboard for {currentUser.name.toLowerCase()}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Resources</p>
                      <p className="text-2xl font-bold">{dashboardStats.totalResources}</p>
                    </div>
                    <Server className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                      <p className="text-2xl font-bold">${costData.currentMonth.total.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                      <p className="text-2xl font-bold">{dashboardStats.pendingRequests}</p>
                    </div>
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Uptime</p>
                      <p className="text-2xl font-bold">{dashboardStats.uptime}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </Card>
              </div>

              {/* Cloud Providers */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cloud Providers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cloudProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedProvider === provider.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedProvider(provider.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{provider.name}</h3>
                        <div className={`w-3 h-3 rounded-full ${
                          provider.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {provider.resources} resources
                      </div>
                      <div className="text-lg font-bold">
                        ${provider.cost.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Cost Alerts */}
              {costData.alerts.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Cost Alerts</h2>
                  <div className="space-y-3">
                    {costData.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          alert.severity === 'high' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                        }`}
                      >
                        <AlertTriangle className={`w-5 h-5 mr-3 ${
                          alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-600">Provider: {alert.provider.toUpperCase()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Resource Management</h1>
                <p className="text-gray-600">
                  View and manage resources across all cloud providers
                </p>
              </div>

              {/* Provider Selector */}
              <div className="flex space-x-2">
                {cloudProviders.map((provider) => (
                  <Button
                    key={provider.id}
                    variant={selectedProvider === provider.id ? 'default' : 'outline'}
                    onClick={() => setSelectedProvider(provider.id)}
                    className="flex items-center space-x-2"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>{provider.name}</span>
                  </Button>
                ))}
              </div>

              {/* Resource Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resourceCategories[selectedProvider]?.map((category, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{category.name}</h3>
                      <Database className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Count:</span>
                        <span className="font-medium">{category.count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Monthly Cost:</span>
                        <span className="font-medium">${category.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && currentUser.permissions.includes('approve_requests') && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Request Management</h1>
                <p className="text-gray-600">
                  Review and approve resource requests from team members
                </p>
              </div>

              {/* Approval Workflow */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Approval Workflow</h2>
                <div className="flex items-center space-x-4">
                  {approvalWorkflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'current' ? 'bg-blue-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {step.id}
                      </div>
                      <div className="ml-2 text-sm">
                        <div className="font-medium">{step.name}</div>
                        <div className="text-gray-500">{step.status}</div>
                      </div>
                      {index < approvalWorkflow.steps.length - 1 && (
                        <div className="mx-4 w-8 h-0.5 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Request List */}
              <div className="space-y-4">
                {mockRequests.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(request.status)}`}></div>
                        <h3 className="font-medium">{request.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {request.id}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.toUpperCase()}
                        </span>
                        <Badge variant="secondary">
                          {request.provider.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Requested by: {request.requester}</span>
                        <span>Cost: ${request.estimatedCost.toLocaleString()}</span>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, 'reject')}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRequestAction(request.id, 'approve')}
                          >
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && currentUser.permissions.includes('manage_users') && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">User Management</h1>
                <p className="text-gray-600">
                  Manage user access and permissions across the platform
                </p>
              </div>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">User Roles</h2>
                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{role.name}</h3>
                        <Badge variant="outline">
                          {role.id === currentUser.id ? 'Current' : 'Available'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && currentUser.permissions.includes('configure_policies') && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Platform Settings</h1>
                <p className="text-gray-600">
                  Configure platform policies and global settings
                </p>
              </div>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cost Controls</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Budget</label>
                    <div className="flex items-center space-x-4">
                      <Progress value={80} className="flex-1" />
                      <span className="text-sm font-medium">
                        ${costData.currentMonth.total.toLocaleString()} / ${dashboardStats.monthlyBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Auto-Approval Threshold</label>
                    <p className="text-sm text-gray-600">
                      Requests under ${approvalWorkflow.autoApprovalThreshold} are automatically approved
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;