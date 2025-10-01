import { useState } from 'react';
import { MessageSquare, Phone, Search, AlertTriangle, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface SMSMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isPhishing: boolean;
  confidence?: number;
  status?: 'active' | 'blocked' | 'reported';
}

interface InteractiveStandaloneSMSProps {
  onBack: () => void;
}

export function InteractiveStandaloneSMS({ onBack }: InteractiveStandaloneSMSProps) {
  const [messages, setMessages] = useState<SMSMessage[]>([
    {
      id: '1',
      sender: '+1 (555) 0123',
      message: 'URGENT: Your bank account has been compromised! Click here immediately to secure: bit.ly/secure-now',
      time: '2:30 PM',
      isPhishing: true,
      confidence: 94,
      status: 'active'
    },
    {
      id: '2',
      sender: 'DELIVERY',
      message: 'Your package delivery failed. Please update your address here: fake-delivery.com/update',
      time: '1:45 PM',
      isPhishing: true,
      confidence: 89,
      status: 'active'
    },
    {
      id: '3',
      sender: '+1 (555) 0456',
      message: 'Hey! Are we still on for dinner tonight? Let me know!',
      time: '12:15 PM',
      isPhishing: false,
      status: 'active'
    },
    {
      id: '4',
      sender: 'AMAZON',
      message: 'Your order #123456 has been shipped and will arrive by 5 PM today.',
      time: '11:30 AM',
      isPhishing: false,
      status: 'active'
    },
    {
      id: '5',
      sender: '+1 (555) 0789',
      message: 'Congratulations! You\'ve won $10,000! Claim now: lottery-winner.net/claim',
      time: '10:20 AM',
      isPhishing: true,
      confidence: 96,
      status: 'active'
    }
  ]);

  const handleBlockSender = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, status: 'blocked' } : m
    ));
    toast.success('Sender blocked successfully', {
      description: `Future messages from ${message?.sender} will be automatically blocked.`
    });
  };

  const handleReportSpam = (messageId: string) => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, status: 'reported' } : m
    ));
    toast.success('Message reported as spam', {
      description: 'Thank you! This helps improve our spam detection system.'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'blocked':
        return <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full">Sender Blocked</span>;
      case 'reported':
        return <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Reported</span>;
      default:
        return null;
    }
  };

  const activeThreats = messages.filter(m => m.isPhishing && m.status === 'active').length;
  const blockedToday = messages.filter(m => m.status === 'blocked' || m.status === 'reported').length;

  return (
    <div className="max-w-md mx-auto h-[600px] bg-card rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
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

      {/* Security Alert */}
      {activeThreats > 0 && (
        <div className="bg-destructive/10 border-b border-destructive/20 p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">
              {activeThreats} suspicious message{activeThreats > 1 ? 's' : ''} detected
            </span>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="font-medium text-foreground mb-4">Recent Messages</h2>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg border transition-colors ${
                  message.isPhishing && message.status === 'active'
                    ? 'bg-destructive/10 border-destructive/30'
                    : 'bg-muted/50 border-border hover:bg-muted'
                } ${message.status !== 'active' ? 'opacity-60' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{message.sender}</span>
                    {message.isPhishing && message.status === 'active' && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                    {message.status !== 'active' && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(message.status)}
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                </div>
                
                <p className="text-sm text-foreground mb-2 line-clamp-3">{message.message}</p>
                
                {message.isPhishing && message.status === 'active' && (
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => handleBlockSender(message.id)}
                      >
                        Block Sender
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-7 hover:bg-muted"
                        onClick={() => handleReportSpam(message.id)}
                      >
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
          <span>{blockedToday} threats blocked today</span>
          <span>AI Protection: ON</span>
        </div>
      </div>
    </div>
  );
}