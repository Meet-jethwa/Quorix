import { Mail, Search, Star, Archive, Send, FileText, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  isPhishing: boolean;
  timestamp: string;
  initials: string;
}

const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'Security Alert',
    subject: 'Urgent: Suspicious activity on your account',
    preview: 'Your account has been compromised. Please click here to secure it immediately.',
    isPhishing: true,
    timestamp: '1d',
    initials: 'SA'
  },
  {
    id: '2',
    sender: 'Design Weekly',
    subject: 'Your weekly dose of design inspiration',
    preview: 'Discover the latest trends, tutorials, and free resources for designers and developers.',
    isPhishing: false,
    timestamp: '2d',
    initials: 'DW'
  },
  {
    id: '3',
    sender: 'Your Bank',
    subject: 'Action Required: Verify Your Account',
    preview: 'We have detected unusual login attempts. Please verify your login details immediately.',
    isPhishing: true,
    timestamp: '3d',
    initials: 'YB'
  },
  {
    id: '4',
    sender: 'Marketing Team',
    subject: 'Q3 Campaign Results',
    preview: 'Hi team, let\'s review the performance of our latest marketing campaigns. Report attached.',
    isPhishing: false,
    timestamp: '4d',
    initials: 'MT'
  },
  {
    id: '5',
    sender: 'Alex Johnson',
    subject: 'Meeting Follow-up',
    preview: 'Great meeting today! Here are the notes and action items we discussed. Let me know if I missed anything.',
    isPhishing: false,
    timestamp: '5d',
    initials: 'AJ'
  },
  {
    id: '6',
    sender: 'IT Support',
    subject: 'Password Reset Request',
    preview: 'You requested a password reset. If this wasn\'t you, please secure your account immediately.',
    isPhishing: true,
    timestamp: '6d',
    initials: 'IT'
  }
];

export function SecureMailInbox() {
  return (
    <div className="flex h-[500px] bg-card rounded-lg overflow-hidden border border-border shadow-lg">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-muted/30 border-r border-border p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-6 px-2">SecureMail</h1>
          <nav className="flex flex-col gap-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
              <Mail className="h-4 w-4" />
              <span>Inbox</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
              <Star className="h-4 w-4" />
              <span>Starred</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
              <Send className="h-4 w-4" />
              <span>Sent</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 cursor-pointer">
              <FileText className="h-4 w-4" />
              <span>Drafts</span>
            </div>
          </nav>
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Compose
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground" 
              placeholder="Search mail" 
              type="search"
            />
          </div>
        </header>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-lg font-semibold text-foreground p-4">Primary</h2>
          <div className="space-y-1">
            {mockEmails.map((email) => (
              <div key={email.id} className="border-b border-border hover:bg-muted/30 cursor-pointer p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                    {email.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="font-medium text-foreground truncate">{email.sender}</p>
                      <p className="text-xs text-muted-foreground">{email.timestamp}</p>
                    </div>
                    <p className="text-sm text-foreground font-medium truncate mb-1">{email.subject}</p>
                    <p className="text-sm text-muted-foreground truncate">{email.preview}</p>
                    
                    {email.isPhishing && (
                      <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <p className="text-sm font-medium text-destructive">AI Phishing Detected</p>
                        </div>
                        <p className="text-xs text-destructive/80 mt-1">
                          This email contains suspicious language and potentially malicious links.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}