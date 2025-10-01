import { MessageCircle, Phone, Video, MoreVertical, AlertTriangle, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'contact';
  senderName?: string;
  message: string;
  time: string;
  isPhishing?: boolean;
  confidence?: number;
  initials: string;
}

const mockMessages: WhatsAppMessage[] = [
  {
    id: '1',
    sender: 'contact',
    senderName: 'Unknown Contact',
    message: 'Hello! You have won €50,000 in our lottery! Click this link to claim your prize now: http://fake-lottery.scam/claim',
    time: '14:32',
    isPhishing: true,
    confidence: 92,
    initials: 'U'
  },
  {
    id: '2',
    sender: 'user',
    message: 'I don\'t remember entering any lottery.',
    time: '14:33',
    initials: 'ME'
  },
  {
    id: '3',
    sender: 'contact',
    senderName: 'Unknown Contact',
    message: 'This is a limited time offer! You must claim within 24 hours or lose your prize forever!',
    time: '14:34',
    isPhishing: true,
    confidence: 88,
    initials: 'U'
  },
  {
    id: '4',
    sender: 'user',
    message: 'This seems suspicious. I\'m not clicking any links.',
    time: '14:35',
    initials: 'ME'
  }
];

export function StandaloneWhatsApp() {
  return (
    <div className="max-w-md mx-auto h-[600px] bg-card rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
            U
          </div>
          <div>
            <h1 className="font-medium">Unknown Contact</h1>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-white/20">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Security Alert Banner */}
      <div className="bg-destructive/10 border-b border-destructive/20 p-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-destructive" />
          <span className="text-sm text-destructive font-medium">Security Alert: Suspicious activity detected</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#e5ddd5] bg-opacity-30">
        <div className="p-4 space-y-4">
          {mockMessages.map((message) => (
            <div key={message.id} className="group">
              <div className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'contact' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {message.initials}
                  </div>
                )}
                
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg relative ${
                    message.sender === 'user'
                      ? 'bg-[#dcf8c6] text-gray-800 rounded-br-none'
                      : message.isPhishing
                        ? 'bg-destructive/10 border border-destructive/30 text-foreground rounded-bl-none'
                        : 'bg-white text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">{message.time}</span>
                    {message.sender === 'user' && (
                      <div className="text-xs text-blue-600">✓✓</div>
                    )}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                    {message.initials}
                  </div>
                )}
              </div>

              {/* AI Warning for phishing messages */}
              {message.isPhishing && (
                <div className="mt-3 mx-10 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="flex items-center gap-2 text-destructive mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">AI Security Warning</span>
                  </div>
                  <div className="text-xs text-destructive/80 space-y-1">
                    <div>• Suspicious lottery/prize scam detected</div>
                    <div>• Contains malicious external link</div>
                    <div>• Uses urgent pressure tactics</div>
                    <div>• AI Confidence: {message.confidence}%</div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="text-xs h-7 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      Block Contact
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 text-destructive border-destructive/30">
                      Report Spam
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-muted border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled
          />
          <Button size="sm" className="bg-[#075e54] hover:bg-[#075e54]/90 text-white rounded-full h-10 w-10 p-0">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-center text-muted-foreground">
          🛡️ Protected by Quorix AI
        </div>
      </div>
    </div>
  );
}