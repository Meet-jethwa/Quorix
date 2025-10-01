import { MessageSquare, Phone, Search, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface SMSMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isPhishing: boolean;
  confidence?: number;
}

const mockMessages: SMSMessage[] = [
  {
    id: '1',
    sender: '+1 (555) 0123',
    message: 'URGENT: Your bank account has been compromised! Click here immediately to secure: bit.ly/secure-now',
    time: '2:30 PM',
    isPhishing: true,
    confidence: 94
  },
  {
    id: '2',
    sender: 'DELIVERY',
    message: 'Your package delivery failed. Please update your address here: fake-delivery.com/update',
    time: '1:45 PM',
    isPhishing: true,
    confidence: 89
  },
  {
    id: '3',
    sender: '+1 (555) 0456',
    message: 'Hey! Are we still on for dinner tonight? Let me know!',
    time: '12:15 PM',
    isPhishing: false
  },
  {
    id: '4',
    sender: 'AMAZON',
    message: 'Your order #123456 has been shipped and will arrive by 5 PM today.',
    time: '11:30 AM',
    isPhishing: false
  },
  {
    id: '5',
    sender: '+1 (555) 0789',
    message: 'Congratulations! You\'ve won $10,000! Claim now: lottery-winner.net/claim',
    time: '10:20 AM',
    isPhishing: true,
    confidence: 96
  }
];

export function StandaloneSMS() {
  return (
    <div className="max-w-md mx-auto h-[600px] bg-card rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6" />
          <div>
            <h1 className="font-semibold">SMS Protection</h1>
            <p className="text-xs opacity-90">AI Security Active</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="font-medium text-foreground mb-4">Recent Messages</h2>
          <div className="space-y-3">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg border transition-colors ${
                  message.isPhishing
                    ? 'bg-destructive/10 border-destructive/30'
                    : 'bg-muted/50 border-border hover:bg-muted'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{message.sender}</span>
                    {message.isPhishing && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                
                <p className="text-sm text-foreground mb-2 line-clamp-3">{message.message}</p>
                
                {message.isPhishing && (
                  <div className="mt-3 p-3 bg-destructive/5 border border-destructive/20 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                      <span className="text-xs font-medium text-destructive">
                        AI Phishing Detection - {message.confidence}% Confidence
                      </span>
                    </div>
                    <ul className="text-xs text-destructive/80 space-y-1">
                      <li>• Contains suspicious URL</li>
                      <li>• Uses urgent language</li>
                      <li>• Requests immediate action</li>
                    </ul>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-7 text-destructive border-destructive/30">
                        Block Sender
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        Report Spam
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-border bg-muted/30 p-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>3 threats blocked today</span>
          <span>AI Protection: ON</span>
        </div>
      </div>
    </div>
  );
}