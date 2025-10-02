import { MessageSquare, Search, Bell, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isPhishing: boolean;
  confidence?: number;
  initials: string;
  isOnline: boolean;
}

const mockChats: ChatMessage[] = [
  {
    id: '1',
    sender: 'Mark Johnson',
    message: 'Hey, I\'m in trouble. Need help urgently. Can you send money to this account?',
    timestamp: '10:30 AM',
    isPhishing: true,
    confidence: 92,
    initials: 'MJ',
    isOnline: true
  },
  {
    id: '2',
    sender: 'Sarah Clark',
    message: 'Check out this link, it\'s hilarious! malicious.site',
    timestamp: '11:45 AM',
    isPhishing: true,
    confidence: 88,
    initials: 'SC',
    isOnline: false
  },
  {
    id: '3',
    sender: 'David Lee',
    message: 'I\'m at the airport, my flight got canceled. Can you book me a new one?',
    timestamp: '12:15 PM',
    isPhishing: false,
    confidence: 45,
    initials: 'DL',
    isOnline: true
  },
  {
    id: '4',
    sender: 'Emily White',
    message: 'I\'m in a meeting, will call you later.',
    timestamp: '1:30 PM',
    isPhishing: false,
    confidence: 5,
    initials: 'EW',
    isOnline: false
  },
  {
    id: '5',
    sender: 'Robert Green',
    message: 'Just finished the presentation, it went well!',
    timestamp: '2:45 PM',
    isPhishing: false,
    confidence: 8,
    initials: 'RG',
    isOnline: true
  }
];

export function SecureChatInbox() {
  const getWarningIcon = (isPhishing: boolean, confidence?: number) => {
    if (isPhishing) return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (confidence && confidence > 30) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return null;
  };

  const getBackgroundColor = (isPhishing: boolean, confidence?: number) => {
    if (isPhishing) return 'bg-destructive/10 border border-destructive/30';
    if (confidence && confidence > 30) return 'bg-yellow-500/10 border border-yellow-500/30';
    return '';
  };

  return (
    <div className="flex h-[500px] flex-col bg-card rounded-lg overflow-hidden border border-border shadow-lg">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">SecureChat</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
            ME
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-y-auto p-4">
        <div className="w-full space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">Messages</h2>
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50 ${getBackgroundColor(chat.isPhishing, chat.confidence)}`}
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                    {chat.initials}
                  </div>
                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="font-medium text-foreground truncate">{chat.sender}</p>
                    <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{chat.message}</p>
                  
                  {/* AI Warning for phishing */}
                  {chat.isPhishing && (
                    <div className="mt-2 p-2 bg-destructive/5 border border-destructive/20 rounded">
                      <div className="flex items-center gap-2 text-destructive text-xs">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="font-medium">AI Security Alert - Confidence: {chat.confidence}%</span>
                      </div>
                      <p className="text-xs text-destructive/80 mt-1">
                        Suspicious content detected that may be a scam.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {getWarningIcon(chat.isPhishing, chat.confidence)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}