import { Search, Smile, Paperclip, Send, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'contact';
  senderName?: string;
  message: string;
  timestamp: string;
  isPhishing?: boolean;
  confidence?: number;
  initials: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'contact',
    senderName: 'Sarah',
    message: 'Hey! How are you?',
    timestamp: '2:30',
    initials: 'S'
  },
  {
    id: '2',
    sender: 'user',
    message: 'I\'m doing great, thanks! What about you?',
    timestamp: '2:32',
    initials: 'ME'
  },
  {
    id: '3',
    sender: 'contact',
    senderName: 'Sarah',
    message: 'I\'m good too. Just wanted to share something with you. Check this out: deals-for-you.xyz',
    timestamp: '2:33',
    isPhishing: true,
    confidence: 87,
    initials: 'S'
  },
  {
    id: '4',
    sender: 'contact',
    senderName: 'Sarah',
    message: 'It\'s a new website with amazing deals!',
    timestamp: '2:34',
    initials: 'S'
  },
  {
    id: '5',
    sender: 'user',
    message: 'Thanks, I\'ll take a look!',
    timestamp: '2:35',
    initials: 'ME'
  },
  {
    id: '6',
    sender: 'contact',
    senderName: 'Sarah',
    message: 'Great! Let me know what you think.',
    timestamp: '2:36',
    initials: 'S'
  }
];

export function SecureChatConversation() {
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);

  return (
    <div className="flex h-[500px] bg-card rounded-lg overflow-hidden border border-border shadow-lg">
      {/* Sidebar */}
      <aside className="w-60 bg-muted/30 flex flex-col border-r border-border">
        <header className="p-4 border-b border-border flex items-center justify-between">
          <h1 className="font-semibold text-foreground">Chats</h1>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
            ME
          </div>
        </header>
        
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              className="w-full bg-muted border-0 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground text-sm" 
              placeholder="Search chats" 
              type="text"
            />
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-3 p-3 bg-primary/10 border-l-2 border-primary">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                S
              </div>
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">Sarah</p>
              <p className="text-xs text-muted-foreground truncate">Great! Let me know...</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 text-sm font-medium">
                D
              </div>
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">David</p>
              <p className="text-xs text-muted-foreground truncate">Let's catch up later</p>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="p-4 border-b border-border flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
            S
          </div>
          <div>
            <h2 className="font-medium text-foreground">Sarah</h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div key={message.id} className="group relative">
              <div className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'contact' && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
                    {message.initials}
                  </div>
                )}
                
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg relative ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : message.isPhishing
                        ? 'bg-destructive/10 border border-destructive/50 rounded-bl-none text-foreground'
                        : 'bg-muted rounded-bl-none text-foreground'
                  }`}
                  onMouseEnter={() => setHoveredMessage(message.id)}
                  onMouseLeave={() => setHoveredMessage(null)}
                >
                  <p className="text-sm">{message.message}</p>
                  
                  {/* Timestamp */}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs opacity-70`}>
                      {message.timestamp}
                    </span>
                  </div>

                  {/* AI Warning Tooltip */}
                  {message.isPhishing && hoveredMessage === message.id && (
                    <div className="absolute -top-16 left-0 w-56 bg-popover border border-border text-popover-foreground text-xs rounded-lg p-3 z-10 shadow-lg">
                      <h4 className="font-medium mb-1 text-destructive">AI Security Warning</h4>
                      <p className="font-medium text-destructive">Malicious Link Detected</p>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>• URL appears suspicious</li>
                        <li>• Contains urgent keywords</li>
                        <li>• Confidence: {message.confidence}%</li>
                      </ul>
                    </div>
                  )}
                </div>

                {message.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
                    {message.initials}
                  </div>
                )}
              </div>

              {/* AI Warning Alert */}
              {message.isPhishing && (
                <div className="mt-2 mx-8 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="flex items-center gap-2 text-destructive mb-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span className="text-xs font-medium">AI Security Warning</span>
                  </div>
                  <div className="text-xs text-destructive/80 space-y-0.5">
                    <div>• Suspicious content detected</div>
                    <div>• Potentially malicious link</div>
                    <div>• Confidence: {message.confidence}%</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <footer className="p-4 border-t border-border">
          <div className="relative">
            <input 
              className="w-full bg-muted border-0 rounded-lg pl-4 pr-28 py-2 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground" 
              placeholder="Type a message..." 
              type="text"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="sm" className="px-3">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}