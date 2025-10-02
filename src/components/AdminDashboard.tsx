import { useState } from 'react';
import { TrendingUp, Users, Shield, AlertTriangle, Activity, Home, Bell, BarChart3, Settings, HelpCircle, Monitor, Eye, Plus, Menu, X } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const mockAlerts = [
  {
    id: 1,
    timestamp: '2025-10-02 14:30',
    user: 'priya.sharma@example.com',
    type: 'Phishing Attempt',
    confidence: 95,
    status: 'Flagged'
  },
  {
    id: 2,
    timestamp: '2025-10-02 13:45',
    user: 'rajesh.kumar@example.com',
    type: 'Suspicious URL',
    confidence: 88,
    status: 'Under Review'
  },
  {
    id: 3,
    timestamp: '2025-10-02 12:15',
    user: 'anjali.patel@example.com',
    type: 'Malware Detection',
    confidence: 92,
    status: 'Blocked'
  },
  {
    id: 4,
    timestamp: '2025-10-02 11:00',
    user: 'vikram.singh@example.com',
    type: 'Data Leakage',
    confidence: 75,
    status: 'Investigating'
  },
  {
    id: 5,
    timestamp: '2025-10-02 10:30',
    user: 'sneha.reddy@example.com',
    type: 'Account Breach',
    confidence: 98,
    status: 'Resolved'
  }
];

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@securityai.com', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', role: 'Viewer', status: 'Active' },
  { id: 4, name: 'Anjali Patel', email: 'anjali.patel@example.com', role: 'Analyst', status: 'Suspended' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@example.com', role: 'Viewer', status: 'Active' }
];

const clusterData = [
  { id: 'Cluster 1', domains: 'example.com, example2.net, example3.org', similarity: '0.95' },
  { id: 'Cluster 2', domains: 'malicious-site.com, bad-url.net', similarity: '0.92' },
  { id: 'Cluster 3', domains: 'phishing-link.org, fake-login.com', similarity: '0.88' },
  { id: 'Cluster 4', domains: 'spam-email.net, junk-mail.com', similarity: '0.85' },
  { id: 'Cluster 5', domains: 'suspicious-activity.org, unknown-source.com', similarity: '0.82' }
];

// Cluster visualization data for scatter plot
const clusterVisualizationData = [
  // Cluster 1 - High similarity phishing domains
  { x: 25, y: 95, cluster: 1, size: 120, name: 'example.com', threat: 'high', fill: '#00ffcc' },
  { x: 30, y: 94, cluster: 1, size: 100, name: 'example2.net', threat: 'high', fill: '#00ffcc' },
  { x: 28, y: 96, cluster: 1, size: 110, name: 'example3.org', threat: 'high', fill: '#00ffcc' },
  
  // Cluster 2 - Malicious sites
  { x: 65, y: 92, cluster: 2, size: 90, name: 'malicious-site.com', threat: 'critical', fill: '#1f6feb' },
  { x: 70, y: 91, cluster: 2, size: 95, name: 'bad-url.net', threat: 'critical', fill: '#1f6feb' },
  
  // Cluster 3 - Phishing/Login pages
  { x: 45, y: 88, cluster: 3, size: 80, name: 'phishing-link.org', threat: 'high', fill: '#ff4c4c' },
  { x: 50, y: 87, cluster: 3, size: 85, name: 'fake-login.com', threat: 'high', fill: '#ff4c4c' },
  
  // Cluster 4 - Spam domains
  { x: 15, y: 85, cluster: 4, size: 75, name: 'spam-email.net', threat: 'medium', fill: '#4caf50' },
  { x: 20, y: 84, cluster: 4, size: 70, name: 'junk-mail.com', threat: 'medium', fill: '#4caf50' },
  
  // Cluster 5 - Suspicious activity
  { x: 80, y: 82, cluster: 5, size: 65, name: 'suspicious-activity.org', threat: 'medium', fill: '#ffd700' },
  { x: 85, y: 83, cluster: 5, size: 68, name: 'unknown-source.com', threat: 'medium', fill: '#ffd700' }
];

const getClusterColor = (cluster: number) => {
  const colors = ['#00ffcc', '#1f6feb', '#ff4c4c', '#4caf50', '#ffd700'];
  return colors[cluster - 1] || '#00ffcc';
};

const getThreatLevel = (threat: string) => {
  const levels = {
    'critical': { color: '#ff4c4c', label: 'Critical' },
    'high': { color: '#ff8c00', label: 'High' },
    'medium': { color: '#ffd700', label: 'Medium' },
    'low': { color: '#4caf50', label: 'Low' }
  };
  return levels[threat as keyof typeof levels] || levels.medium;
};

// Pre-computed cluster data for better performance
const cluster1Data = clusterVisualizationData.filter(d => d.cluster === 1);
const cluster2Data = clusterVisualizationData.filter(d => d.cluster === 2);
const cluster3Data = clusterVisualizationData.filter(d => d.cluster === 3);
const cluster4Data = clusterVisualizationData.filter(d => d.cluster === 4);
const cluster5Data = clusterVisualizationData.filter(d => d.cluster === 5);

const getStatusBadge = (status: string) => {
  const styles = {
    'Flagged': 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    'Under Review': 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
    'Blocked': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    'Investigating': 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300',
    'Resolved': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    'Active': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    'Suspended': 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    'Administrator': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    'Analyst': 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300',
    'Viewer': 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
  };
  return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
};

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'alerts' | 'users' | 'analysis' | 'clustering' | 'settings'>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col">
        {/* Header with Hamburger Menu */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {menuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <h1 className="text-xl font-bold text-foreground">Quorix Admin</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">System Active</span>
              </div>
              <div className="p-2 hover:bg-muted rounded-lg cursor-pointer">
                <Monitor className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="border-t border-border bg-card">
              <nav className="px-6 py-4 space-y-1">
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeView === 'dashboard'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </button>

                <div className="pt-4">
                  <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Security AI
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveView('alerts');
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeView === 'alerts'
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Bell className="h-5 w-5" />
                      <span className="font-medium">Alerts</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('users');
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeView === 'users'
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Users</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('analysis');
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeView === 'analysis'
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Eye className="h-5 w-5" />
                      <span className="font-medium">AI Analysis</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveView('clustering');
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeView === 'clustering'
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-medium">Clustering</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      setActiveView('settings');
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      activeView === 'settings'
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard View */}
            {activeView === 'dashboard' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground">Dashboard Overview</h1>
                  <p className="text-muted-foreground mt-1">Real-time security monitoring and system status.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Alerts</CardTitle>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">247</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">+12%</span> from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">1,284</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">+8%</span> from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Threats Blocked</CardTitle>
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">3,492</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-red-500">+23%</span> from last week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Detection Rate</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">96.8%</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">+2.1%</span> accuracy
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Alerts Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Security Alerts</CardTitle>
                    <CardDescription>Latest 5 security incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAlerts.slice(0, 5).map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${
                              alert.status === 'Flagged' ? 'bg-red-500' :
                              alert.status === 'Blocked' ? 'bg-blue-500' :
                              alert.status === 'Resolved' ? 'bg-green-500' :
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <p className="font-medium text-foreground">{alert.type}</p>
                              <p className="text-sm text-muted-foreground">{alert.user}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{alert.confidence}%</p>
                            <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => setActiveView('alerts')}
                      variant="outline" 
                      className="w-full mt-4"
                    >
                      View All Alerts
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Alerts View */}
            {activeView === 'alerts' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground">Security Alerts</h1>
                  <p className="text-muted-foreground mt-1">Real-time monitoring of AI-powered security threats and alerts.</p>
                </div>

                {/* Live Alerts Table */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Live Alerts Panel</h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-muted-foreground">
                          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                            <tr>
                              <th className="px-6 py-3">Timestamp</th>
                              <th className="px-6 py-3">User</th>
                              <th className="px-6 py-3">Alert Type</th>
                              <th className="px-6 py-3 text-center">Confidence</th>
                              <th className="px-6 py-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockAlerts.map((alert) => (
                              <tr key={alert.id} className="border-b border-border">
                                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{alert.timestamp}</td>
                                <td className="px-6 py-4">{alert.user}</td>
                                <td className="px-6 py-4">{alert.type}</td>
                                <td className="px-6 py-4 text-center">{alert.confidence}%</td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(alert.status)}`}>
                                    {alert.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Section */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Charts & Graphs</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Phishing Attempts Per Day</CardTitle>
                        <div className="text-3xl font-bold text-foreground mt-2">15</div>
                        <div className="flex items-center text-sm mt-1">
                          <p className="text-muted-foreground">Last 7 Days</p>
                          <span className="ml-2 text-green-500 flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            +10%
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48 flex items-end justify-between space-x-2">
                          <div className="w-full h-[90%] bg-primary/20 rounded-t-lg"></div>
                          <div className="w-full h-[70%] bg-primary/20 rounded-t-lg"></div>
                          <div className="w-full h-full bg-primary/20 rounded-t-lg"></div>
                          <div className="w-full h-full bg-primary/20 rounded-t-lg"></div>
                          <div className="w-full h-[10%] bg-primary/20 rounded-t-lg"></div>
                          <div className="w-full h-[80%] bg-primary/20 rounded-t-lg"></div>
                          <div className="w-full h-full bg-primary/20 rounded-t-lg"></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Phishing vs. Safe Traffic</CardTitle>
                        <div className="text-3xl font-bold text-foreground mt-2">85% Safe</div>
                        <div className="flex items-center text-sm mt-1">
                          <p className="text-muted-foreground">Current Month</p>
                          <span className="ml-2 text-red-500 flex items-center gap-1">
                            <Activity className="h-4 w-4" />
                            -5%
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48 flex justify-center items-center">
                          <div className="w-40 h-40 rounded-full relative">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <path className="text-muted" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8"></path>
                              <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3.8"></path>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                              <span className="text-2xl font-bold text-foreground">85%</span>
                              <span className="text-xs text-muted-foreground">Safe</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Users View */}
            {activeView === 'users' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground">User Management</h1>
                  <p className="text-muted-foreground mt-1">Manage user accounts, roles, and permissions.</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-foreground">All Users</h2>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-muted-foreground">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                          <tr>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3 text-center">Role</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockUsers.map((user) => (
                            <tr key={user.id} className="border-b border-border">
                              <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{user.name}</td>
                              <td className="px-6 py-4">{user.email}</td>
                              <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.role)}`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 mr-2">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI Analysis View */}
            {activeView === 'analysis' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Explainability View</h2>
                  <p className="mt-2 text-muted-foreground">Detailed analysis of why a communication was flagged as suspicious.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Flagged Communication</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="space-y-2 text-sm text-foreground">
                            <div><strong>Subject:</strong> Urgent: Verify Your Account Information</div>
                            <div><strong>From:</strong> support@example.com</div>
                            <div><strong>To:</strong> user@email.com</div>
                            <div><strong>Date:</strong> October 26, 2024, 10:30 AM</div>
                            <div className="mt-4">
                              <p>Dear User,</p>
                              <p>We have detected suspicious activity on your account. For your security, please verify your account information immediately by clicking the link below:</p>
                              <p className="text-destructive">[Suspicious Link]</p>
                              <p>If you did not request this verification, please ignore this email.</p>
                              <p>Sincerely,<br/>The Support Team</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Reasons for Flagging</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                              <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">Suspicious Words: Urgent, Verify</p>
                              <p className="text-sm text-muted-foreground">The email contains words commonly used in phishing attempts to create a sense of urgency.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                              <Shield className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">Domain Recently Registered</p>
                              <p className="text-sm text-muted-foreground">The sender's domain was registered recently, which is often associated with malicious sites.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-1 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Communication Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <div className="flex justify-between border-t border-border pt-4">
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-medium text-foreground">Email</p>
                          </div>
                          <div className="flex justify-between border-t border-border pt-4">
                            <p className="text-muted-foreground">Confidence Score</p>
                            <p className="font-medium text-destructive">95%</p>
                          </div>
                          <div className="flex justify-between border-t border-border pt-4">
                            <p className="text-muted-foreground">Flagged By</p>
                            <p className="font-medium text-foreground">AI Security Engine</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Clustering View */}
            {activeView === 'clustering' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Campaign Clustering</h1>
                  <p className="mt-1 text-muted-foreground">Visualize and analyze clusters of malicious domains or URLs based on AI-simulated similarity.</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Cluster Visualization</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Domain Similarity Clusters
                      </CardTitle>
                      <CardDescription>
                        Interactive scatter plot showing domain clusters based on AI similarity analysis.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                          <p className="text-muted-foreground">Cluster visualization loading...</p>
                          <p className="text-sm text-muted-foreground mt-2">Chart will display domain relationships</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Cluster Details</h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-muted-foreground">
                          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                            <tr>
                              <th className="px-6 py-3">Cluster ID</th>
                              <th className="px-6 py-3">Domains/URLs</th>
                              <th className="px-6 py-3">Similarity Score</th>
                              <th className="px-6 py-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clusterData.map((cluster, index) => (
                              <tr key={index} className="border-b border-border">
                                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{cluster.id}</td>
                                <td className="px-6 py-4">{cluster.domains}</td>
                                <td className="px-6 py-4">{cluster.similarity}</td>
                                <td className="px-6 py-4">
                                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Settings View */}
            {activeView === 'settings' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground">Settings</h1>
                  <p className="text-muted-foreground mt-1">Configure system preferences and security options.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage how you receive security alerts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Email Alerts</p>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="font-medium text-foreground">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Get critical alerts via SMS</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Disabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="font-medium text-foreground">Real-time Dashboard</p>
                          <p className="text-sm text-muted-foreground">Live updates on dashboard</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Detection Settings</CardTitle>
                      <CardDescription>Configure AI security parameters</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Sensitivity Level</p>
                          <p className="text-sm text-muted-foreground">Current: High</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Adjust
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="font-medium text-foreground">Auto-Block Threats</p>
                          <p className="text-sm text-muted-foreground">Automatically block detected threats</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="font-medium text-foreground">Learning Mode</p>
                          <p className="text-sm text-muted-foreground">AI continuously learns from patterns</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Active
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Information</CardTitle>
                      <CardDescription>Current system status and version</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version</span>
                        <span className="font-medium text-foreground">Quorix v2.5.0</span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-border">
                        <span className="text-muted-foreground">Last Update</span>
                        <span className="font-medium text-foreground">Oct 2, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-border">
                        <span className="text-muted-foreground">System Status</span>
                        <span className="font-medium text-green-500 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Operational
                        </span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-border">
                        <span className="text-muted-foreground">AI Model</span>
                        <span className="font-medium text-foreground">GPT-4 Enhanced</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account & Security</CardTitle>
                      <CardDescription>Manage account settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Team Access
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Export Security Logs
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}