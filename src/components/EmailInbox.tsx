import { Check, AlertTriangle, Mail, User, Star, Archive, Trash2, MoreVertical, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  isPhishing: boolean;
  confidence?: number;
  timestamp: string;
}

const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'Monthly SWIFT',
    subject: 'Thank You for signing up premium account',
    preview: 'We keep this in touch with your security status is as well...',
    isPhishing: false,
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    sender: 'Advertising Reward',
    subject: 'URGENT: Verify Your Account Now!',
    preview: 'Your account will be suspended in 24 hours. Click here to verify immediately and receive your reward.',
    isPhishing: true,
    confidence: 92,
    timestamp: '11:45 AM'
  },
  {
    id: '3',
    sender: 'Google Security',
    subject: 'Security Alert - New Sign In',
    preview: 'We detected a new sign-in to your Google Account.',
    isPhishing: false,
    timestamp: '12:15 PM'
  },
  {
    id: '4',
    sender: 'Your Bank',
    subject: 'Account Verification Required',
    preview: 'We detected unusual activity on your account. Please verify your password immediately or your account will be locked.',
    isPhishing: true,
    confidence: 89,
    timestamp: '1:20 PM'
  }
];

interface EmailInboxProps {
  onEmailSelect: (email: Email) => void;
}

export function EmailInbox({ onEmailSelect }: EmailInboxProps) {
  return (
    <div className="h-[500px] bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
      {/* Email Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">SecureMail</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-6">
          <div className="text-blue-400 border-b-2 border-blue-400 pb-1">Primary</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Social</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Promotions</div>
        </div>
      </div>

      {/* Email List */}
      <div className="overflow-y-auto h-[400px]">
        {mockEmails.map((email, index) => (
          <div
            key={email.id}
            className={`p-4 border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-all duration-200 ${
              email.isPhishing ? 'bg-red-900/20 border-l-4 border-l-red-500' : ''
            } ${index === 0 ? 'bg-gray-800/30' : ''}`}
            onClick={() => onEmailSelect(email)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {email.sender.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate max-w-[150px]">
                      {email.sender}
                    </span>
                    {email.isPhishing && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-2 py-0.5">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Risk {email.confidence}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">{email.timestamp}</span>
                    <Star className="h-4 w-4 text-gray-600 hover:text-yellow-400 cursor-pointer" />
                  </div>
                </div>
                
                <div className="mb-1">
                  <span className="text-white text-sm truncate block">
                    {email.subject}
                  </span>
                </div>
                
                <div className="text-gray-400 text-xs truncate">
                  {email.preview}
                </div>
                
                {email.isPhishing && (
                  <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Suspicious content detected by AI</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-gray-800 border-t border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-gray-400 text-xs">
          AI Protection: Active
        </div>
      </div>
    </div>
  );
}