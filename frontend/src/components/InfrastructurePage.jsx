import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  Zap, 
  TrendingUp, 
  DollarSign,
  Activity,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { resourceCategories, cloudProviders, costData } from '../mock/data';

const InfrastructurePage = ({ selectedProvider }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const getCurrentProviderData = () => {
    if (selectedProvider === 'all') {
      return {
        totalResources: Object.values(resourceCategories).reduce((acc, provider) => 
          acc + provider.reduce((sum, category) => sum + category.count, 0), 0),
        totalCost: Object.values(costData.currentMonth.breakdown).reduce((acc, cost) => acc + cost, 0),
        categories: Object.entries(resourceCategories).flatMap(([provider, categories]) => 
          categories.map(cat => ({ ...cat, provider }))
        )
      };
    }
    
    const providerData = resourceCategories[selectedProvider] || [];
    return {
      totalResources: providerData.reduce((sum, category) => sum + category.count, 0),
      totalCost: costData.currentMonth.breakdown[selectedProvider] || 0,
      categories: providerData.map(cat => ({ ...cat, provider: selectedProvider }))
    };
  };

  const data = getCurrentProviderData();

  const getResourceIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('instance') || lowerName.includes('vm')) return Cpu;
    if (lowerName.includes('storage') || lowerName.includes('bucket')) return HardDrive;
    if (lowerName.includes('database') || lowerName.includes('sql')) return Database;
    if (lowerName.includes('function') || lowerName.includes('lambda')) return Zap;
    if (lowerName.includes('cluster')) return Server;
    return Server;
  };

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'aws': return 'bg-orange-100 text-orange-800';
      case 'azure': return 'bg-blue-100 text-blue-800';
      case 'gcp': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (running) => {
    return running ? 'bg-green-500' : 'bg-gray-400';
  };

  const filteredCategories = activeCategory === 'all' 
    ? data.categories 
    : data.categories.filter(cat => cat.provider === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Infrastructure</h1>
          <p className="text-gray-600">
            Manage cloud resources and services across providers
          </p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Settings className="w-4 h-4 mr-2" />
          Manage Resources
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold">{data.totalResources}</p>
            </div>
            <Server className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Running</p>
              <p className="text-2xl font-bold">{Math.floor(data.totalResources * 0.85)}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2">
            <Progress value={85} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">85% operational</p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold">${data.totalCost.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-red-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8% from last month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Forecast</p>
              <p className="text-2xl font-bold">${costData.forecast.nextMonth.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              {costData.forecast.confidence}% confidence
            </Badge>
          </div>
        </Card>
      </div>

      {/* Provider Filter */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by Provider:</span>
          <div className="flex space-x-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory('all')}
            >
              All Providers
            </Button>
            {cloudProviders.map(provider => (
              <Button
                key={provider.id}
                variant={activeCategory === provider.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(provider.id)}
              >
                {provider.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category, index) => {
          const Icon = getResourceIcon(category.name);
          const isRunning = Math.random() > 0.2; // Simulate running status
          
          return (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <Badge variant="outline" className={getProviderColor(category.provider)}>
                      {category.provider?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Count</span>
                  <span className="font-medium">{category.count}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(isRunning)}`}></div>
                    <span className="text-sm">{isRunning ? 'Running' : 'Stopped'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Cost</span>
                  <span className="font-medium">${category.cost.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. per Resource</span>
                  <span className="font-medium">${(category.cost / category.count).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Configure
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Cost Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Cost Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(costData.currentMonth.breakdown).map(([provider, cost]) => (
            <div key={provider} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {cloudProviders.find(p => p.id === provider)?.name}
                </span>
                <span className="text-sm font-bold">${cost.toLocaleString()}</span>
              </div>
              <Progress 
                value={(cost / data.totalCost) * 100} 
                className="h-2"
              />
              <div className="text-xs text-gray-500">
                {((cost / data.totalCost) * 100).toFixed(1)}% of total spend
              </div>
            </div>
          ))}
        </div>
      </Card>

      {filteredCategories.length === 0 && (
        <Card className="p-12 text-center">
          <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">
            No infrastructure resources match the current provider filter.
          </p>
        </Card>
      )}
    </div>
  );
};

export default InfrastructurePage;