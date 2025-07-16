import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  User,
  Cloud,
  Plus
} from 'lucide-react';
import { cloudProviders } from '../mock/data';

const Header = ({ 
  currentUser, 
  selectedProvider, 
  onProviderChange, 
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen 
}) => {
  const [notifications] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-7 h-7 text-black" />
              <span className="text-xl font-bold text-black">CloudUnify</span>
            </div>
            <Badge variant="outline" className="text-xs font-mono uppercase tracking-wider">
              {currentUser?.name} Portal
            </Badge>
          </div>

          {/* Center - Cloud Provider Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Provider:</span>
            </div>
            <Select value={selectedProvider} onValueChange={onProviderChange}>
              <SelectTrigger className="w-48 h-8 text-sm">
                <SelectValue placeholder="Select Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {cloudProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        provider.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span>{provider.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="add-new">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{currentUser?.username}</div>
                  <div className="text-gray-500 text-xs">{currentUser?.name}</div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Provider Selector */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Cloud className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Cloud Provider:</span>
            </div>
            <Select value={selectedProvider} onValueChange={onProviderChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {cloudProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        provider.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span>{provider.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="add-new">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile User Info */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{currentUser?.username}</div>
                  <div className="text-gray-500 text-xs">{currentUser?.name}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;