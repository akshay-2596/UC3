import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Globe, Eye, EyeOff } from 'lucide-react';
import { userRoles } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setUsername(role.credentials.username);
    setPassword(role.credentials.password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Store user role in localStorage for demo
      localStorage.setItem('userRole', selectedRole.id);
      localStorage.setItem('userName', username);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-8 h-8" />
            <span className="text-2xl font-bold">CloudUnify</span>
            <Badge variant="outline" className="text-xs">
              MVP Demo
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">Try the Demo</h1>
          <p className="text-gray-600">
            Select a role to explore different dashboard views with simulated data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Choose Your Role</h2>
            <p className="text-gray-600 mb-6">
              Each role provides different levels of access and dashboard features
            </p>
            
            <div className="space-y-4">
              {userRoles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedRole?.id === role.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{role.name}</h3>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedRole?.id === role.id
                        ? 'bg-black border-black'
                        : 'border-gray-300'
                    }`}>
                      {selectedRole?.id === role.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500">DASHBOARD FEATURES</div>
                    <div className="flex flex-wrap gap-1">
                      {role.dashboardFeatures.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {role.dashboardFeatures.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{role.dashboardFeatures.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Login Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Demo Login</h2>
            
            {selectedRole ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="text-sm font-medium text-blue-900 mb-2">
                    Selected Role: {selectedRole.name}
                  </div>
                  <div className="text-xs text-blue-700">
                    Demo credentials have been auto-filled. Click "Enter Demo" to continue.
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entering Demo...' : 'Enter Demo'}
                </Button>

                <div className="text-center pt-4">
                  <Button 
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    ← Back to Landing Page
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Globe className="w-12 h-12 mx-auto mb-2" />
                </div>
                <p className="text-gray-600">
                  Please select a role to continue with the demo
                </p>
              </div>
            )}

            {/* Demo Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-2">Demo Information</div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>• All data is simulated and not connected to real cloud services</div>
                <div>• Each role provides different dashboard views and permissions</div>
                <div>• Workflows and approvals are simulated for demonstration</div>
                <div>• No actual cloud resources will be created or modified</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;