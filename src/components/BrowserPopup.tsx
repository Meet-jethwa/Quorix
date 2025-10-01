import { Shield, AlertTriangle, X, Lock, Home, Bookmark, Settings, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function BrowserPopup() {
  return (
    <div className="relative">
      {/* Browser Window */}
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl h-[500px]">
        {/* Browser Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-gray-700 rounded-md px-3 py-2 text-sm font-mono text-red-400 border border-red-500/30">
              🔒 http://secure-uk.com/verify-account
            </div>
          </div>
          
          {/* Browser Navigation */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Website Content */}
        <div className="p-8 bg-gradient-to-b from-blue-900/20 to-gray-900 h-full flex items-center justify-center">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-white text-xl mb-2">Secure Account Verification</h2>
              <p className="text-gray-400 text-sm">
                Your account security is important to us. Please verify your identity.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Email Address</label>
                <input 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400" 
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Password</label>
                <input 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400" 
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Verify Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Alert Popup */}
      <div className="absolute top-4 right-4 w-80 bg-red-900/95 backdrop-blur-sm border border-red-500 rounded-lg shadow-2xl shadow-red-500/20 animate-pulse">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-medium">SecureLink</span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-300 hover:text-white">
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-white font-medium">Suspicious URL Detected</span>
            </div>
            
            <div className="text-gray-300 text-sm">
              This URL has been flagged for suspicious activity and may be a phishing attempt.
            </div>

            <div className="bg-red-800/30 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">AI Confidence Score</span>
                <span className="text-red-400 font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full w-[94%]"></div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                <span>Domain mimics legitimate service</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                <span>Recently registered domain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                <span>Suspicious SSL certificate</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                Block & Leave
              </Button>
              <Button size="sm" variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-800">
                Ignore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}