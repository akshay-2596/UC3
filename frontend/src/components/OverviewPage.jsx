import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Server,
  DollarSign,
  Users,
  Activity,
  Calendar,
  FileText,
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';
import { 
  cloudProviders, 
  mockRequests, 
  costData, 
  dashboardStats, 
  resourceCategories
} from '../mock/data';

const OverviewPage = ({ currentUser, selectedProvider }) => {
  const [activeAction, setActiveAction] = useState(null);

  const getFilteredData = () => {
    if (selectedProvider === 'all') {
      return {
        totalResources: dashboardStats.totalResources,
        totalCost: costData.currentMonth.total,
        providers: cloudProviders,
        requests: mockRequests
      };
    }
    
    const provider = cloudProviders.find(p => p.id === selectedProvider);
    const providerRequests = mockRequests.filter(r => r.provider === selectedProvider);
    
    return {
      totalResources: provider?.resources || 0,
      totalCost: provider?.cost || 0,
      providers: [provider].filter(Boolean),
      requests: providerRequests
    };
  };

  const data = getFilteredData();

  const getQuickActions = () => {
    const baseActions = [
      {
        id: 'new-request',
        title: 'Request New Service',
        description: 'Create a new resource request',
        icon: FileText,
        color: 'bg-blue-500',
        permission: 'create_requests'
      }
    ];

    if (currentUser?.id === 'manager') {
      return [
        ...baseActions,
        {
          id: 'approve-requests',
          title: 'Pending Approvals',
          description: 'Review team requests',
          icon: CheckCircle,
          color: 'bg-green-500',
          permission: 'approve_requests',
          badge: data.requests.filter(r => r.status === 'pending').length
        },
        {
          id: 'team-management',
          title: 'Team Management',
          description: 'Manage team access',
          icon: Users,
          color: 'bg-purple-500',
          permission: 'manage_team'
        }
      ];
    }

    if (currentUser?.id === 'admin') {
      return [
        ...baseActions,
        {
          id: 'user-management',
          title: 'User Management',
          description: 'Manage all users',
          icon: Shield,
          color: 'bg-red-500',
          permission: 'manage_users'
        },
        {
          id: 'cost-optimization',
          title: 'Cost Optimization',
          description: 'Optimize cloud spend',
          icon: DollarSign,
          color: 'bg-yellow-500',
          permission: 'full_access'
        }
      ];
    }

    return [
      ...baseActions,
      {
        id: 'view-infrastructure',
        title: 'View Infrastructure',
        description: 'Browse cloud resources',
        icon: Server,
        color: 'bg-gray-500',
        permission: 'view_resources'
      },
      {
        id: 'approved-services',
        title: 'Approved Services',
        description: 'Access your resources',
        icon: CheckCircle,
        color: 'bg-green-500',
        permission: 'view_resources'
      }
    ];
  };

  const quickActions = getQuickActions();
  const recentRequests = data.requests.slice(0, 5);
  const pendingRequests = data.requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {selectedProvider === 'all' ? 'Dashboard Overview' : `${cloudProviders.find(p => p.id === selectedProvider)?.name} Overview`}
        </h1>
        <p className="text-gray-600">
          Multi-cloud management dashboard for {currentUser?.name?.toLowerCase()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold">{dashboardStats.activeUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+5% this month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold">{pendingRequests.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Avg. 2 days</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold">${data.totalCost.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-red-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold">{data.totalResources}</p>
            </div>
            <Server className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-green-600">
              <Activity className="w-4 h-4 mr-1" />
              <span>99.9% uptime</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const hasPermission = currentUser?.permissions?.includes(action.permission);
            
            if (!hasPermission) return null;
            
            return (
              <div
                key={action.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  activeAction === action.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveAction(action.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      {action.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cloud Providers */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Cloud Providers</h2>
          <div className="space-y-4">
            {data.providers.map((provider) => (
              <div key={provider.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      provider.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <h3 className="font-medium">{provider.name}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {provider.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Resources:</span>
                    <span className="font-medium ml-2">{provider.resources}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium ml-2">${provider.cost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Requests</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-sm">{request.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      request.status === 'approved' ? 'text-green-600 border-green-200' :
                      request.status === 'pending' ? 'text-yellow-600 border-yellow-200' :
                      'text-red-600 border-red-200'
                    }`}
                  >
                    {request.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{request.requester}</span>
                  <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

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
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">Provider: {alert.provider.toUpperCase()}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Budget Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Monthly Budget</span>
              <span className="text-sm font-bold">
                ${costData.currentMonth.total.toLocaleString()} / ${dashboardStats.monthlyBudget.toLocaleString()}
              </span>
            </div>
            <Progress value={(costData.currentMonth.total / dashboardStats.monthlyBudget) * 100} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">
              {((costData.currentMonth.total / dashboardStats.monthlyBudget) * 100).toFixed(1)}% of budget used
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">${dashboardStats.costSavings.toLocaleString()}</div>
              <div className="text-gray-600">Savings</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">${costData.forecast.nextMonth.toLocaleString()}</div>
              <div className="text-gray-600">Forecast</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{costData.forecast.confidence}%</div>
              <div className="text-gray-600">Confidence</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewPage;