import { MessageSquare, Mail, Smartphone, Globe, Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface HomePageProps {
  onNavigate: (system: 'whatsapp' | 'email' | 'sms' | 'browser') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const protectionSystems = [
    {
      id: 'whatsapp' as const,
      title: 'WhatsApp Protection',
      description: 'Real-time AI scanning for suspicious messages and malicious links in WhatsApp conversations.',
      icon: MessageSquare,
      stats: { blocked: 12, accuracy: 94 },
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      id: 'email' as const,
      title: 'Email Protection',
      description: 'Advanced threat detection for phishing emails, malicious attachments, and suspicious senders.',
      icon: Mail,
      stats: { blocked: 28, accuracy: 96 },
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'sms' as const,
      title: 'SMS Protection',
      description: 'Intelligent filtering of spam texts, phishing attempts, and fraudulent message content.',
      icon: Smartphone,
      stats: { blocked: 15, accuracy: 92 },
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 'browser' as const,
      title: 'SecureLink Browser',
      description: 'Real-time URL analysis and protection against malicious websites and phishing domains.',
      icon: Globe,
      stats: { blocked: 34, accuracy: 89 },
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quorix</h1>
            <p className="text-muted-foreground">AI-Powered Multi-Platform Security</p>
          </div>
        </div>
        
        {/* Global Stats */}
        <div className="flex items-center justify-center gap-8 p-6 bg-card/50 border border-border rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">89</div>
            <div className="text-sm text-muted-foreground">Threats Blocked Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">94.2%</div>
            <div className="text-sm text-muted-foreground">Overall Accuracy</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Protection Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {protectionSystems.map((system) => {
          const Icon = system.icon;
          return (
            <div
              key={system.id}
              className={`p-6 bg-card border ${system.borderColor} rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              onClick={() => onNavigate(system.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${system.bgColor} rounded-lg`}>
                  <Icon className={`h-6 w-6 ${system.color}`} />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">{system.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {system.description}
              </p>
              
              {/* System Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{system.stats.blocked}</div>
                    <div className="text-xs text-muted-foreground">Blocked Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{system.stats.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(system.id);
                  }}
                >
                  Open
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Alerts Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-semibold text-foreground">Recent Security Alerts</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <div className="text-sm font-medium text-destructive mb-1">High Priority</div>
            <div className="text-xs text-destructive/80">3 phishing emails detected in last hour</div>
          </div>
          <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
            <div className="text-sm font-medium text-orange-600 mb-1">Medium Priority</div>
            <div className="text-xs text-orange-600/80">5 suspicious SMS messages blocked</div>
          </div>
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="text-sm font-medium text-primary mb-1">Low Priority</div>
            <div className="text-xs text-primary/80">2 malicious URLs intercepted</div>
          </div>
        </div>
      </div>
    </div>
  );
}