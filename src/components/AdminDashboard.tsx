import { TrendingUp, Users, Shield, AlertTriangle, Activity, Home, Bell, BarChart3, Settings, HelpCircle, Monitor, Eye, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const mockAlerts = [
  {
    id: 1,
    timestamp: '2024-01-26 14:30',
    user: 'alice.smith@example.com',
    type: 'Phishing Attempt',
    confidence: 95,
    status: 'Flagged'
  },
  {
    id: 2,
    timestamp: '2024-01-26 13:45',
    user: 'bob.johnson@example.com',
    type: 'Suspicious URL',
    confidence: 88,
    status: 'Under Review'
  },
  {
    id: 3,
    timestamp: '2024-01-26 12:15',
    user: 'charlie.davis@example.com',
    type: 'Malware Detection',
    confidence: 92,
    status: 'Blocked'
  },
  {
    id: 4,
    timestamp: '2024-01-26 11:00',
    user: 'diana.evans@example.com',
    type: 'Data Leakage',
    confidence: 75,
    status: 'Investigating'
  },
  {
    id: 5,
    timestamp: '2024-01-26 10:30',
    user: 'edward.wilson@example.com',
    type: 'Account Breach',
    confidence: 98,
    status: 'Resolved'
  }
];

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@securityai.com', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'Alice Smith', email: 'alice.smith@example.com', role: 'Analyst', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Viewer', status: 'Active' },
  { id: 4, name: 'Charlie Davis', email: 'charlie.davis@example.com', role: 'Analyst', status: 'Suspended' },
  { id: 5, name: 'Diana Evans', email: 'diana.evans@example.com', role: 'Viewer', status: 'Active' }
];

const clusterData = [
  { id: 'Cluster 1', domains: 'example.com, example2.net, example3.org', similarity: '0.95' },
  { id: 'Cluster 2', domains: 'malicious-site.com, bad-url.net', similarity: '0.92' },
  { id: 'Cluster 3', domains: 'phishing-link.org, fake-login.com', similarity: '0.88' },
  { id: 'Cluster 4', domains: 'spam-email.net, junk-mail.com', similarity: '0.85' },
  { id: 'Cluster 5', domains: 'suspicious-activity.org, unknown-source.com', similarity: '0.82' }
];

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
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-card p-4 flex flex-col justify-between border-r border-border">
          <div>
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <h1 className="text-xl font-bold text-foreground">Security AI</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                <Home className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="font-medium">Alerts</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Reports</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
                <HelpCircle className="h-5 w-5" />
                <span className="font-medium">Help</span>
              </div>
            </nav>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
              <Monitor className="h-5 w-5" />
              <span className="font-medium">Demo Mode</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full max-w-lg grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="explainability">AI Analysis</TabsTrigger>
                <TabsTrigger value="clustering">Clustering</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-muted-foreground mt-1">Overview of AI-powered security alerts and trends.</p>
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
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="explainability" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="clustering" className="space-y-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Campaign Clustering</h1>
                  <p className="mt-1 text-muted-foreground">Visualize and analyze clusters of malicious domains or URLs based on AI-simulated similarity.</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Cluster Visualization</h2>
                  <div className="w-full aspect-video rounded-xl bg-muted border border-border flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive cluster visualization would appear here</p>
                    </div>
                  </div>
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}