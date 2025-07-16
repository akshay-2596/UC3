import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Cloud, Shield, Users, TrendingUp, Zap, Globe } from 'lucide-react';
import { cloudProviders, userRoles, dashboardStats, costData } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [activeProvider, setActiveProvider] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveProvider((prev) => (prev + 1) % cloudProviders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTryDemo = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8" />
              <span className="text-xl font-semibold">CloudUnify</span>
              <Badge variant="outline" className="text-xs border-white text-white">
                MVP
              </Badge>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-sm font-mono uppercase tracking-wider hover:opacity-80">
                Features
              </a>
              <a href="#roles" className="text-sm font-mono uppercase tracking-wider hover:opacity-80">
                Roles
              </a>
              <a href="#demo" className="text-sm font-mono uppercase tracking-wider hover:opacity-80">
                Demo
              </a>
            </nav>
            <Button 
              onClick={handleTryDemo}
              className="bg-white text-black hover:bg-gray-200 font-mono text-sm uppercase tracking-wider"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-black text-white min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  One Portal for
                  <br />
                  <span className="text-gray-400">All Clouds</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Unified multi-cloud management platform for enterprise IT teams. 
                  Control AWS, Azure, and GCP from a single interface.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleTryDemo}
                  className="bg-white text-black hover:bg-gray-200 font-mono text-sm uppercase tracking-wider px-8 py-4"
                >
                  Try Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black font-mono text-sm uppercase tracking-wider px-8 py-4"
                >
                  Watch Video
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">{dashboardStats.totalResources}</div>
                  <div className="text-sm text-gray-400 font-mono uppercase">Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{dashboardStats.activeUsers}</div>
                  <div className="text-sm text-gray-400 font-mono uppercase">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{dashboardStats.uptime}%</div>
                  <div className="text-sm text-gray-400 font-mono uppercase">Uptime</div>
                </div>
              </div>
            </div>

            {/* Animated Cloud Provider Selector */}
            <div className="relative">
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Cloud Providers</h3>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    All Connected
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {cloudProviders.map((provider, index) => (
                    <div 
                      key={provider.id}
                      className={`flex items-center justify-between p-4 rounded border transition-all duration-500 cursor-pointer ${
                        activeProvider === index 
                          ? 'border-gray-600 bg-gray-800' 
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setActiveProvider(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${provider.status === 'connected' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="font-medium">{provider.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono">{provider.resources} resources</div>
                        <div className="text-xs text-gray-400">${provider.cost.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise-Grade Multi-Cloud Control</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your cloud operations with role-based access, automated workflows, 
              and real-time cost visibility across all major cloud providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                <p className="text-gray-600">
                  Secure access controls with Employee, Manager, and Admin roles. 
                  Each role has specific permissions and dashboard views.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-gray-500">SUPPORTED ROLES</div>
                <div className="flex flex-wrap gap-2">
                  {userRoles.map(role => (
                    <Badge key={role.id} variant="secondary" className="text-xs">
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Automated Workflows</h3>
                <p className="text-gray-600">
                  Streamlined request and approval processes with automated provisioning 
                  and intelligent cost controls.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-gray-500">APPROVAL TIME</div>
                <div className="text-2xl font-bold">~15 mins</div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost Optimization</h3>
                <p className="text-gray-600">
                  Real-time cost tracking, budget alerts, and forecasting 
                  across all cloud providers with actionable insights.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-gray-500">MONTHLY SAVINGS</div>
                <div className="text-2xl font-bold text-green-600">
                  ${dashboardStats.costSavings.toLocaleString()}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-Based Dashboards Preview */}
      <section id="roles" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tailored Dashboards for Every Role</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different roles see different views. From resource requests to global oversight, 
              each dashboard is optimized for specific workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userRoles.map((role, index) => (
              <Card 
                key={role.id} 
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === index ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setSelectedRole(selectedRole === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8" />
                    <div>
                      <h3 className="text-lg font-semibold">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${selectedRole === index ? 'rotate-90' : ''}`} />
                </div>
                
                {selectedRole === index && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <div className="text-sm font-mono text-gray-500 mb-2">DASHBOARD FEATURES</div>
                      <div className="space-y-1">
                        {role.dashboardFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-mono text-gray-500 mb-2">DEMO CREDENTIALS</div>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                        <div>Username: {role.credentials.username}</div>
                        <div>Password: {role.credentials.password}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section id="demo" className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Experience Multi-Cloud Control
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try our interactive demo with dummy data that simulates real-world multi-cloud scenarios. 
              No setup required - just pick your role and explore.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleTryDemo}
                className="bg-white text-black hover:bg-gray-200 font-mono text-sm uppercase tracking-wider px-8 py-4"
              >
                Start Demo Experience
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-mono text-sm uppercase tracking-wider px-8 py-4"
              >
                Schedule Live Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="text-sm font-mono text-gray-400 mb-2">SIMULATED DATA</div>
                <div className="text-2xl font-bold mb-2">{costData.currentMonth.total.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Monthly cloud spend across all providers</div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="text-sm font-mono text-gray-400 mb-2">ACTIVE REQUESTS</div>
                <div className="text-2xl font-bold mb-2">{dashboardStats.pendingRequests}</div>
                <div className="text-sm text-gray-300">Pending approval workflows</div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="text-sm font-mono text-gray-400 mb-2">FORECAST ACCURACY</div>
                <div className="text-2xl font-bold mb-2">{costData.forecast.confidence}%</div>
                <div className="text-sm text-gray-300">Cost prediction confidence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6" />
                <span className="text-lg font-semibold">CloudUnify</span>
              </div>
              <p className="text-gray-400 text-sm">
                Unified multi-cloud management platform for enterprise IT teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>AWS Integration</div>
                <div>Azure Integration</div>
                <div>GCP Integration</div>
                <div>Multi-Cloud Control</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Role-Based Access</div>
                <div>Cost Management</div>
                <div>Workflow Automation</div>
                <div>Real-time Monitoring</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Documentation</div>
                <div>Live Demo</div>
                <div>Enterprise Trial</div>
                <div>Contact Sales</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 CloudUnify. All rights reserved. Built for enterprise IT teams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;