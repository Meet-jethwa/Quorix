import { Mail, Search, Star, Archive, Send, FileText, Trash2, AlertTriangle, Shield, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  isPhishing: boolean;
  timestamp: string;
  initials: string;
  confidence?: number;
}

const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'security@bank-alerts.com',
    subject: 'URGENT: Suspicious Login Detected - Immediate Action Required',
    preview: 'We detected an unauthorized login attempt from Nigeria. Click here immediately to secure your account...',
    isPhishing: true,
    timestamp: '2 min ago',
    initials: 'SA',
    confidence: 96
  },
  {
    id: '2',
    sender: 'Team Slack',
    subject: 'Daily digest for #general',
    preview: 'Here\'s what you missed in #general today. 5 new messages from your team...',
    isPhishing: false,
    timestamp: '1 hour ago',
    initials: 'TS'
  },
  {
    id: '3',
    sender: 'no-reply@amazon-support.com',
    subject: 'Your Package Delivery Failed - Update Payment Method',
    preview: 'Your recent order could not be delivered due to payment issues. Update your payment information to avoid delays...',
    isPhishing: true,
    timestamp: '3 hours ago',
    initials: 'AS',
    confidence: 89
  },
  {
    id: '4',
    sender: 'LinkedIn Notifications',
    subject: 'You have 3 new profile views',
    preview: 'See who\'s been checking out your profile this week. Your profile is getting attention...',
    isPhishing: false,
    timestamp: '1 day ago',
    initials: 'LI'
  },
  {
    id: '5',
    sender: 'customer-service@paypal-secure.net',
    subject: 'Account Limitation Notice - Verify Your Identity Now',
    preview: 'Your PayPal account has been temporarily limited. Verify your identity within 24 hours to restore access...',
    isPhishing: true,
    timestamp: '2 days ago',
    initials: 'PP',
    confidence: 94
  }
];

export function StandaloneMail() {
  return (
    <div className="w-full max-w-6xl mx-auto h-[600px] bg-card rounded-lg border border-border shadow-lg overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-64 bg-muted/30 border-r border-border p-4 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="font-semibold text-foreground">SecureMail</h1>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Mail className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>
        
        <nav className="space-y-1 flex-1">
          <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium">
            <Mail className="h-4 w-4" />
            Inbox
            <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">3</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
            <Star className="h-4 w-4" />
            Starred
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
            <Clock className="h-4 w-4" />
            Snoozed
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
            <Send className="h-4 w-4" />
            Sent
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
            <FileText className="h-4 w-4" />
            Drafts
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
            <Archive className="h-4 w-4" />
            Archive
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
            <Trash2 className="h-4 w-4" />
            Trash
          </div>
        </nav>

        {/* Security Status */}
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Protection</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <div>3 threats blocked today</div>
            <div>96.8% accuracy rate</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Primary Inbox</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search emails..."
                  className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Threat Summary */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Security Alert</span>
            </div>
            <p className="text-xs text-destructive/80">3 suspicious emails detected. AI confidence levels above 85%.</p>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {mockEmails.map((email) => (
            <div
              key={email.id}
              className={`border-b border-border p-4 hover:bg-muted/30 cursor-pointer transition-colors ${
                email.isPhishing ? 'bg-destructive/5' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium flex-shrink-0">
                  {email.initials}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground truncate">{email.sender}</span>
                      {email.isPhishing && (
                        <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{email.timestamp}</span>
                  </div>
                  
                  <h3 className="font-medium text-foreground mb-1 truncate">{email.subject}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{email.preview}</p>
                  
                  {email.isPhishing && (
                    <div className="mt-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-3 w-3 text-destructive" />
                        <span className="text-xs font-medium text-destructive">
                          AI Phishing Detection - Confidence: {email.confidence}%
                        </span>
                      </div>
                      <div className="text-xs text-destructive/80 space-y-1">
                        <div>• Suspicious sender domain detected</div>
                        <div>• Contains urgent language patterns</div>
                        <div>• Requests sensitive information</div>
                        <div>• Mimics legitimate service</div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="text-xs h-7 text-destructive border-destructive/30">
                          Quarantine
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Report Phishing
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Block Sender
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}