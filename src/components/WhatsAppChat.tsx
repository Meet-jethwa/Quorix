import { MessageCircle, AlertTriangle, Phone, Video, MoreVertical, Smile, Paperclip, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'contact';
  senderName?: string;
  message: string;
  isPhishing: boolean;
  confidence?: number;
  timestamp: string;
}

const mockMessages: WhatsAppMessage[] = [
  {
    id: '1',
    sender: 'contact',
    senderName: 'Sarah',
    message: 'Hey! How are you doing? Long time no see!',
    isPhishing: false,
    timestamp: '2:30'
  },
  {
    id: '2',
    sender: 'user',
    message: 'Good! Just working on some projects. How about you?',
    isPhishing: false,
    timestamp: '2:32'
  },
  {
    id: '3',
    sender: 'contact',
    senderName: 'David',
    message: 'Did you check that link I sent yesterday?',
    isPhishing: false,
    timestamp: '2:33'
  },
  {
    id: '4',
    sender: 'contact',
    senderName: 'Tony',
    message: 'Congratulations! You\'ve won $5000 in our WhatsApp lottery! Click this link to claim your prize: http://whatsapp-lottery-win.net/claim?id=123456 Limited time offer!',
    isPhishing: true,
    confidence: 89,
    timestamp: '2:35'
  },
  {
    id: '5',
    sender: 'user',
    message: 'That sounds like a scam to me...',
    isPhishing: false,
    timestamp: '2:37'
  }
];

export function WhatsAppChat() {
  const phishingMessage = mockMessages.find(m => m.isPhishing);

  return (
    <div className="h-[500px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
      {/* WhatsApp Header */}
      <div className="bg-green-600 p-3">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">SC</span>
            </div>
            <div>
              <h3 className="text-sm font-medium">SecureChat</h3>
              <p className="text-xs opacity-75">Group • 5 participants</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Background */}
      <div className="bg-gray-800 h-[380px] overflow-y-auto relative" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}>
        <div className="p-4 space-y-3">
          {mockMessages.map((message) => (
            <div key={message.id} className="relative">
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-1`}>
                <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg relative shadow-md ${
                  message.sender === 'user' 
                    ? 'bg-green-500 text-white rounded-br-sm'
                    : message.isPhishing
                      ? 'bg-red-900/40 border-2 border-red-500/50 rounded-bl-sm text-red-100'
                      : 'bg-gray-700 text-white rounded-bl-sm'
                }`}>
                  {message.sender === 'contact' && message.senderName && (
                    <div className={`text-xs font-medium mb-1 ${
                      message.isPhishing ? 'text-red-300' : 'text-green-400'
                    }`}>
                      {message.senderName}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.message}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs opacity-75 ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-300'
                    }`}>
                      {message.timestamp}
                    </span>
                    {message.sender === 'user' && (
                      <div className="text-green-100 text-xs">✓✓</div>
                    )}
                  </div>
                  
                  {message.isPhishing && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <Badge className="bg-red-600 text-white border-red-500 text-xs px-2 py-1 animate-pulse shadow-lg">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Scam {message.confidence}%
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {message.isPhishing && (
                <div className="mt-3 mx-2 p-3 bg-red-900/30 border border-red-500/30 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Security Warning</span>
                  </div>
                  <div className="text-xs text-red-300 space-y-1">
                    <div>• This message contains suspicious content</div>
                    <div>• Lottery/prize scam detected</div>
                    <div>• Unverified external link</div>
                    <div>• Report this message to protect others</div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1">
                      Block Contact
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs text-red-300 border-red-500/30 hover:bg-red-900/20 px-3 py-1">
                      Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-700 p-3 border-t border-gray-600">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
            <Paperclip className="h-5 w-5" />
          </Button>
          <input 
            className="flex-1 p-2 bg-gray-600 rounded-full text-white placeholder-gray-400 text-sm"
            placeholder="Type a message..."
          />
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}