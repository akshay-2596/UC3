import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  CheckCircle, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  DollarSign,
  Filter,
  ExternalLink,
  Shield,
  Settings
} from 'lucide-react';
import { mockRequests, cloudProviders } from '../mock/data';

const ApprovedServicesPage = ({ selectedProvider }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter only approved requests
  const approvedRequests = mockRequests.filter(request => request.status === 'approved');

  const filteredServices = approvedRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = providerFilter === 'all' || request.provider === providerFilter;
    const matchesSelectedProvider = selectedProvider === 'all' || request.provider === selectedProvider;
    
    return matchesSearch && matchesProvider && matchesSelectedProvider;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'cost-high': return b.estimatedCost - a.estimatedCost;
      case 'cost-low': return a.estimatedCost - b.estimatedCost;
      default: return 0;
    }
  });

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'aws': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'azure': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'gcp': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderIcon = (provider) => {
    const providerData = cloudProviders.find(p => p.id === provider);
    return providerData?.icon || '☁️';
  };

  const totalApprovedCost = sortedServices.reduce((sum, service) => sum + service.estimatedCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approved Services</h1>
          <p className="text-gray-600">
            Access and manage your approved cloud resources and services
          </p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Settings className="w-4 h-4 mr-2" />
          Manage Access
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold">{sortedServices.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Access</p>
              <p className="text-2xl font-bold">{Math.floor(sortedServices.length * 0.9)}</p>
            </div>
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold">${totalApprovedCost.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold">{sortedServices.filter(s => 
                new Date(s.createdAt).getMonth() === new Date().getMonth()
              ).length}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search approved services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {cloudProviders.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="cost-high">Cost: High to Low</SelectItem>
                <SelectItem value="cost-low">Cost: Low to High</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedServices.map((service) => (
          <Card key={service.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.id}</p>
                </div>
              </div>
              <Badge variant="outline" className={getProviderColor(service.provider)}>
                {service.provider.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Approved Date</span>
                <span className="font-medium">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Approver</span>
                <span className="font-medium">{service.approver}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly Cost</span>
                <span className="font-medium">${service.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Access
                </Button>
                <Button size="sm" variant="ghost">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Provider Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Services by Provider</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cloudProviders.map(provider => {
            const providerServices = sortedServices.filter(s => s.provider === provider.id);
            const providerCost = providerServices.reduce((sum, s) => sum + s.estimatedCost, 0);
            
            return (
              <div key={provider.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getProviderIcon(provider.id)}</span>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                  <Badge variant="outline" className={getProviderColor(provider.id)}>
                    {providerServices.length}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Total Cost: ${providerCost.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {sortedServices.length === 0 && (
        <Card className="p-12 text-center">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No approved services found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? 'Try adjusting your search criteria.' 
              : 'No services have been approved yet or match the current filters.'
            }
          </p>
        </Card>
      )}
    </div>
  );
};

export default ApprovedServicesPage;