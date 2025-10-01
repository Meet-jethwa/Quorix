import { MessageSquare, AlertTriangle, Clock, Search, MoreVertical, Phone, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface SMSMessage {
  id: string;
  sender: string;
  message: string;
  isPhishing: boolean;
  confidence?: number;
  timestamp: string;
  avatar?: string;
}

const mockMessages: SMSMessage[] = [
  {
    id: '1',
    sender: 'Bank Johnson',
    message: 'Your account balance is $2,435.67. For more details, visit our secure portal. Thanks for banking with us.',
    isPhishing: false,
    timestamp: '2:30 PM',
    avatar: 'BJ'
  },
  {
    id: '2',
    sender: 'Sarah Dave',
    message: 'Hi there! Can you answer? I need to tell you this is URGENT.',
    isPhishing: false,
    timestamp: '3:15 PM',
    avatar: 'SD'
  },
  {
    id: '3',
    sender: 'SecureBank',
    message: 'URGENT: Your bank account has been compromised! Verify immediately at http://bank-login-secure.biz or account will be frozen within 24 hours.',
    isPhishing: true,
    confidence: 87,
    timestamp: '4:22 PM',
    avatar: 'SB'
  },
  {
    id: '4',
    sender: '+1 555-0123',
    message: 'Hey, are we still on for dinner tonight? Let me know!',
    isPhishing: false,
    timestamp: '5:45 PM',
    avatar: '+1'
  }
];

export function SMSInbox() {
  return (
    <div className="h-[500px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
      {/* SMS Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-400" />
            <span className="text-white font-medium">SecureChat</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-4">
          <div className="text-green-400 border-b-2 border-green-400 pb-1">Inbox</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Contacts</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Settings</div>
        </div>
      </div>

      {/* Messages List */}
      <div className="overflow-y-auto h-[400px]">
        {mockMessages.map((message, index) => (
          <div
            key={message.id}
            className={`p-4 border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-all duration-200 ${
              message.isPhishing ? 'bg-red-900/20 border-l-4 border-l-red-500' : ''
            } ${index === 2 ? 'bg-gray-800/30' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  message.isPhishing ? 'bg-red-600' : 'bg-blue-600'
                }`}>
                  {message.avatar}
                </div>
                {message.isPhishing && (
                  <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900 -mt-2 -mr-1 ml-auto"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium truncate">
                      {message.sender}
                    </span>
                    {message.isPhishing && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-2 py-0.5">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Risk {message.confidence}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">{message.timestamp}</span>
                    {!message.isPhishing && (
                      <Phone className="h-4 w-4 text-gray-600 hover:text-green-400 cursor-pointer" />
                    )}
                  </div>
                </div>
                
                <div className="text-gray-300 text-sm line-clamp-2 mb-2">
                  {message.message}
                </div>
                
                {message.isPhishing && (
                  <div className="mt-2 p-2 bg-red-900/30 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-red-400 text-xs mb-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Suspicious message detected</span>
                    </div>
                    <div className="text-red-300 text-xs space-y-0.5">
                      <div>• Urgency keywords detected</div>
                      <div>• Suspicious URL found</div>
                      <div>• Sender verification failed</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 p-3 flex items-center justify-between">
        <div className="text-gray-400 text-xs">
          4 conversations
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>AI Protection Active</span>
        </div>
      </div>
    </div>
  );
}