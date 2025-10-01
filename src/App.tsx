import { useState } from 'react';
import { Shield, Users, Brain, Monitor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { EmailInbox } from './components/EmailInbox';
import { BrowserPopup } from './components/BrowserPopup';
import { SMSInbox } from './components/SMSInbox';
import { WhatsAppChat } from './components/WhatsAppChat';
import { ExplainabilityPanel } from './components/ExplainabilityPanel';
import { AdminDashboard } from './components/AdminDashboard';
import { SecureMailInbox } from './components/SecureMailInbox';
import { SecureLinkPopup } from './components/SecureLinkPopup';
import { SecureChatInbox } from './components/SecureChatInbox';
import { SecureChatConversation } from './components/SecureChatConversation';
import { StandaloneSMS } from './components/StandaloneSMS';
import { StandaloneWhatsApp } from './components/StandaloneWhatsApp';
import { StandaloneMail } from './components/StandaloneMail';
import { HomePage } from './components/HomePage';
import { InteractiveStandaloneMail } from './components/InteractiveStandaloneMail';
import { InteractiveStandaloneSMS } from './components/InteractiveStandaloneSMS';
import { InteractiveStandaloneWhatsApp } from './components/InteractiveStandaloneWhatsApp';
import { InteractiveSecureLink } from './components/InteractiveSecureLink';

export default function App() {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'home' | 'whatsapp' | 'email' | 'sms' | 'browser'>('home');

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Toaster />
      
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Quorix</h1>
                <p className="text-sm text-muted-foreground">Real-time Phishing Protection</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">AI Active</span>
              </div>
              <div className="text-muted-foreground">96.8% Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {currentView === 'home' ? (
          <Tabs defaultValue="user" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Protection
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Admin Dashboard
              </TabsTrigger>
            </TabsList>

            {/* User Interface */}
            <TabsContent value="user" className="space-y-6">
              <HomePage onNavigate={setCurrentView} />

              {/* Additional Components Section */}
              <div className="pt-8 border-t border-border">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Additional Components</h3>
                  <p className="text-muted-foreground">Additional UI components and prototypes</p>
                </div>

                {/* Row 1: Email Protection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Email Protection System
                  </h3>
                  <StandaloneMail />
                </div>

              {/* Row 2: SMS Protection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  SMS Protection System
                </h3>
                <div className="flex justify-center">
                  <StandaloneSMS />
                </div>
              </div>

              {/* Row 3: WhatsApp Protection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  WhatsApp Protection System
                </h3>
                <div className="flex justify-center">
                  <StandaloneWhatsApp />
                </div>
              </div>

              {/* Enhanced Security Interfaces Section */}
              <div className="pt-8 border-t border-border">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Enhanced Interface Components</h3>
                  <p className="text-muted-foreground">Sophisticated UI components for demo purposes</p>
                </div>

                {/* Row 1: Email and Browser Security */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      SecureMail - AI Email Protection
                    </h4>
                    <SecureMailInbox />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      SecureLink - Browser Protection
                    </h4>
                    <div className="flex justify-center">
                      <SecureLinkPopup />
                    </div>
                  </div>
                </div>

                {/* Row 2: Chat Security Interfaces */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      SecureChat - Message Inbox
                    </h4>
                    <SecureChatInbox />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium flex items-center gap-2 text-muted-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      SecureChat - Live Conversation
                    </h4>
                    <SecureChatConversation />
                  </div>
                </div>
              </div>

              {/* Original Components Section (for comparison) */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Original Prototype Components</h3>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Email Inbox */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                          <Brain className="h-4 w-4 text-primary" />
                          Email Protection
                        </h4>
                        <EmailInbox onEmailSelect={setSelectedEmail} />
                      </div>

                      {/* Browser Protection */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                          <Brain className="h-4 w-4 text-primary" />
                          Browser Extension
                        </h4>
                        <BrowserPopup />
                      </div>

                      {/* SMS Protection */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                          <Brain className="h-4 w-4 text-primary" />
                          SMS Protection
                        </h4>
                        <SMSInbox />
                      </div>

                      {/* WhatsApp Protection */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                          <Brain className="h-4 w-4 text-primary" />
                          WhatsApp Protection
                        </h4>
                        <WhatsAppChat />
                      </div>
                    </div>
                  </div>

                  {/* AI Explainability Panel */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <Brain className="h-4 w-4 text-primary" />
                      AI Analysis
                    </h4>
                    <ExplainabilityPanel selectedEmail={selectedEmail} />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

            {/* Admin Dashboard */}
            <TabsContent value="admin" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Security Operations Center
                </h2>
                <AdminDashboard />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          /* Individual Protection System Views */
          <div className="space-y-6">
            {currentView === 'email' && <InteractiveStandaloneMail onBack={() => setCurrentView('home')} />}
            {currentView === 'sms' && <InteractiveStandaloneSMS onBack={() => setCurrentView('home')} />}
            {currentView === 'whatsapp' && <InteractiveStandaloneWhatsApp onBack={() => setCurrentView('home')} />}
            {currentView === 'browser' && <InteractiveSecureLink onBack={() => setCurrentView('home')} />}
          </div>
        )}
      </div>
    </div>
  );
}