import { useState } from 'react';
import { MessageCircle, Phone, Video, MoreVertical, AlertTriangle, Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'contact';
  senderName?: string;
  message: string;
  time: string;
  isPhishing?: boolean;
  confidence?: number;
  initials: string;
  status?: 'active' | 'blocked' | 'reported';
}

interface InteractiveStandaloneWhatsAppProps {
  onBack: () => void;
}

export function InteractiveStandaloneWhatsApp({ onBack }: InteractiveStandaloneWhatsAppProps) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: '1',
      sender: 'contact',
      senderName: 'Unknown Contact',
      message: 'Hello! You have won €50,000 in our lottery! Click this link to claim your prize now: http://fake-lottery.scam/claim',
      time: '14:32',
      isPhishing: true,
      confidence: 92,
      initials: 'U',
      status: 'active'
    },
    {
      id: '2',
      sender: 'user',
      message: 'I don\'t remember entering any lottery.',
      time: '14:33',
      initials: 'ME',
      status: 'active'
    },
    {
      id: '3',
      sender: 'contact',
      senderName: 'Unknown Contact',
      message: 'This is a limited time offer! You must claim within 24 hours or lose your prize forever!',
      time: '14:34',
      isPhishing: true,
      confidence: 88,
      initials: 'U',
      status: 'active'
    },
    {
      id: '4',
      sender: 'user',
      message: 'This seems suspicious. I\'m not clicking any links.',
      time: '14:35',
      initials: 'ME',
      status: 'active'
    }
  ]);

  const [contactStatus, setContactStatus] = useState<'active' | 'blocked'>('active');

  const handleBlockContact = () => {
    setContactStatus('blocked');
    setMessages(prev => prev.map(msg => 
      msg.sender === 'contact' ? { ...msg, status: 'blocked' } : msg
    ));
    toast.success('Contact blocked successfully', {
      description: 'Unknown Contact has been blocked and all their messages hidden.'
    });
  };

  const handleReportSpam = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: 'reported' } : msg
    ));
    toast.success('Message reported as spam', {
      description: 'Thank you! This helps improve our spam detection system.'
    });
  };

  const activeThreats = messages.filter(m => m.isPhishing && m.status === 'active').length;

  return (
    <div className="max-w-md mx-auto h-[600px] bg-card rounded-lg border border-border shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
            U
          </div>
          <div>
            <h1 className="font-medium">Unknown Contact</h1>
            <p className="text-xs opacity-90">
              {contactStatus === 'blocked' ? 'Blocked' : 'Online'}
            </p>
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
      {activeThreats > 0 && contactStatus === 'active' && (
        <div className="bg-destructive/10 border-b border-destructive/20 p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">
              Security Alert: {activeThreats} suspicious message{activeThreats > 1 ? 's' : ''} detected
            </span>
          </div>
        </div>
      )}

      {/* Contact Blocked Banner */}
      {contactStatus === 'blocked' && (
        <div className="bg-muted border-b border-border p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground font-medium">
              Contact blocked - Future messages will be filtered
            </span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#e5ddd5] bg-opacity-30">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
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
                      : message.isPhishing && message.status === 'active'
                        ? 'bg-destructive/10 border border-destructive/30 text-foreground rounded-bl-none'
                        : message.status === 'blocked'
                          ? 'bg-muted/50 text-muted-foreground rounded-bl-none opacity-60'
                          : 'bg-white text-gray-800 rounded-bl-none'
                  } ${message.status === 'blocked' ? 'opacity-60' : ''}`}
                >
                  {message.status === 'blocked' && (
                    <div className="text-xs text-muted-foreground mb-1 italic">Message blocked</div>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">{message.time}</span>
                    {message.sender === 'user' && (
                      <div className="text-xs text-blue-600">✓✓</div>
                    )}
                    {message.status === 'reported' && (
                      <span className="text-xs bg-primary/20 text-primary px-1 rounded">Reported</span>
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
              {message.isPhishing && message.status === 'active' && (
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
                  {contactStatus === 'active' && (
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        className="text-xs h-7 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        onClick={handleBlockContact}
                      >
                        Block Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => handleReportSpam(message.id)}
                      >
                        Report Spam
                      </Button>
                    </div>
                  )}
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
            placeholder={contactStatus === 'blocked' ? 'Contact blocked' : 'Type a message...'}
            className="flex-1 bg-muted border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={contactStatus === 'blocked'}
          />
          <Button 
            size="sm" 
            className="bg-[#075e54] hover:bg-[#075e54]/90 text-white rounded-full h-10 w-10 p-0"
            disabled={contactStatus === 'blocked'}
          >
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