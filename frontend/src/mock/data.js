// Mock data for Unified Multi-Cloud Management Platform

export const cloudProviders = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    icon: '🟠',
    color: '#FF9900',
    status: 'connected',
    resources: 247,
    cost: 12450.89,
    services: ['EC2', 'S3', 'RDS', 'Lambda', 'EKS']
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    icon: '🔵',
    color: '#0078D4',
    status: 'connected',
    resources: 189,
    cost: 8920.45,
    services: ['VMs', 'Storage', 'SQL Database', 'Functions', 'AKS']
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    icon: '🟡',
    color: '#4285F4',
    status: 'connected',
    resources: 156,
    cost: 6780.23,
    services: ['Compute Engine', 'Cloud Storage', 'Cloud SQL', 'Cloud Functions', 'GKE']
  }
];

export const userRoles = [
  {
    id: 'user',
    name: 'Employee',
    description: 'Standard user with limited access',
    permissions: ['view_resources', 'create_requests'],
    dashboardFeatures: ['Resource Viewer', 'Request Creator', 'Cost Tracker'],
    credentials: { username: 'john.doe', password: 'employee123' }
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Team lead with approval rights',
    permissions: ['view_resources', 'approve_requests', 'manage_team'],
    dashboardFeatures: ['Approval Queue', 'Team Overview', 'Budget Management', 'Resource Allocation'],
    credentials: { username: 'jane.smith', password: 'manager456' }
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full platform administrator',
    permissions: ['full_access', 'manage_users', 'configure_policies'],
    dashboardFeatures: ['Global Overview', 'User Management', 'Policy Configuration', 'Cost Optimization'],
    credentials: { username: 'admin', password: 'admin789' }
  }
];

export const mockRequests = [
  {
    id: 'REQ-001',
    type: 'resource_creation',
    title: 'New Development Environment',
    description: 'Request for AWS EC2 instance for development team',
    requester: 'john.doe',
    status: 'pending',
    priority: 'medium',
    estimatedCost: 450.00,
    provider: 'aws',
    createdAt: '2024-01-15T10:30:00Z',
    approver: 'jane.smith'
  },
  {
    id: 'REQ-002',
    type: 'scale_up',
    title: 'Production Database Scaling',
    description: 'Scale up Azure SQL Database for increased load',
    requester: 'mike.johnson',
    status: 'approved',
    priority: 'high',
    estimatedCost: 1200.00,
    provider: 'azure',
    createdAt: '2024-01-14T14:20:00Z',
    approver: 'jane.smith'
  },
  {
    id: 'REQ-003',
    type: 'storage_increase',
    title: 'Additional Storage',
    description: 'Increase GCP Cloud Storage for data analytics',
    requester: 'sarah.wilson',
    status: 'rejected',
    priority: 'low',
    estimatedCost: 300.00,
    provider: 'gcp',
    createdAt: '2024-01-13T09:15:00Z',
    approver: 'jane.smith'
  }
];

export const costData = {
  currentMonth: {
    total: 28151.57,
    breakdown: {
      aws: 12450.89,
      azure: 8920.45,
      gcp: 6780.23
    },
    trend: '+12.5%'
  },
  forecast: {
    nextMonth: 31200.00,
    confidence: 87,
    factors: ['Increased compute usage', 'New team onboarding', 'Production scaling']
  },
  alerts: [
    {
      type: 'budget_exceeded',
      message: 'AWS spend exceeded 80% of monthly budget',
      severity: 'high',
      provider: 'aws'
    },
    {
      type: 'unusual_activity',
      message: 'Unusual storage usage spike detected in GCP',
      severity: 'medium',
      provider: 'gcp'
    }
  ]
};

export const dashboardStats = {
  totalResources: 592,
  activeUsers: 45,
  pendingRequests: 12,
  monthlyBudget: 35000,
  costSavings: 4200,
  uptime: 99.9
};

export const resourceCategories = {
  aws: [
    { name: 'EC2 Instances', count: 89, cost: 4200.50 },
    { name: 'S3 Buckets', count: 34, cost: 1800.25 },
    { name: 'RDS Databases', count: 12, cost: 3200.75 },
    { name: 'Lambda Functions', count: 156, cost: 450.89 },
    { name: 'EKS Clusters', count: 6, cost: 2798.50 }
  ],
  azure: [
    { name: 'Virtual Machines', count: 67, cost: 3100.20 },
    { name: 'Storage Accounts', count: 23, cost: 1200.15 },
    { name: 'SQL Databases', count: 8, cost: 2400.60 },
    { name: 'Functions', count: 89, cost: 320.30 },
    { name: 'AKS Clusters', count: 4, cost: 1899.20 }
  ],
  gcp: [
    { name: 'Compute Instances', count: 45, cost: 2100.45 },
    { name: 'Cloud Storage', count: 18, cost: 890.25 },
    { name: 'Cloud SQL', count: 6, cost: 1800.75 },
    { name: 'Cloud Functions', count: 78, cost: 245.30 },
    { name: 'GKE Clusters', count: 3, cost: 1743.48 }
  ]
};

export const approvalWorkflow = {
  steps: [
    { id: 1, name: 'Request Submitted', status: 'completed' },
    { id: 2, name: 'Automated Checks', status: 'completed' },
    { id: 3, name: 'Manager Review', status: 'current' },
    { id: 4, name: 'Resource Provisioning', status: 'pending' },
    { id: 5, name: 'Deployment Complete', status: 'pending' }
  ],
  estimatedTime: '15 minutes',
  autoApprovalThreshold: 500
};