import { useState, useEffect } from 'react';
import { Shield, X, AlertTriangle, ArrowLeft, CheckCircle, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface InteractiveSecureLinkProps {
  onBack: () => void;
}

export function InteractiveSecureLink({ onBack }: InteractiveSecureLinkProps) {
  const [currentUrl] = useState('https://fake-bank-security.com/urgent-login');
  const [status, setStatus] = useState<'scanning' | 'blocked' | 'proceeding' | 'safe'>('scanning');
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate scanning progress
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('blocked');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleProceedAnyway = () => {
    setStatus('proceeding');
    toast.warning('Proceeding with caution', {
      description: 'You chose to visit the potentially dangerous site. Stay alert!'
    });
  };

  const handleGoBack = () => {
    setStatus('safe');
    toast.success('Returned to safety', {
      description: 'You made the right choice! The dangerous site has been avoided.'
    });
  };

  const handleReportSite = () => {
    toast.success('Site reported successfully', {
      description: 'Thank you! This helps improve our threat detection database.'
    });
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'scanning':
        return {
          icon: AlertTriangle,
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
          title: 'Scanning URL...',
          description: 'Our AI is analyzing this website for potential threats.'
        };
      case 'blocked':
        return {
          icon: AlertTriangle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          title: 'Dangerous Website Blocked',
          description: 'This URL has been flagged as a potential phishing site attempting to steal your credentials.'
        };
      case 'proceeding':
        return {
          icon: AlertTriangle,
          color: 'text-orange-500',
          bgColor: 'bg-orange-500/10',
          title: 'Proceeding with Caution',
          description: 'You are visiting a potentially dangerous site. Be extremely careful with any information you share.'
        };
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          title: 'Safe Choice Made',
          description: 'You successfully avoided the dangerous website. Your security is protected.'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="mx-auto flex h-[500px] max-w-sm flex-col bg-card text-card-foreground rounded-lg overflow-hidden border border-border shadow-lg">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Shield className="text-primary h-6 w-6" />
          <h1 className="text-lg font-semibold text-foreground">SecureLink</h1>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onBack}>
          <X className="h-4 w-4" />
        </Button>
      </header>

      {/* URL Display */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Target URL:</span>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <code className="text-sm text-foreground break-all">{currentUrl}</code>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className={`mb-6 p-4 rounded-full ${statusInfo.bgColor}`}>
          <StatusIcon className={`h-16 w-16 mx-auto ${statusInfo.color}`} />
        </div>
        
        <h2 className="mb-4 text-xl font-semibold text-foreground">{statusInfo.title}</h2>
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
          {statusInfo.description}
        </p>
        
        {/* Scanning Progress */}
        {status === 'scanning' && (
          <div className="w-full rounded-lg bg-muted p-4 mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Scanning Progress</span>
              <span className="font-semibold text-primary">{scanProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-200"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Threat Analysis */}
        {status === 'blocked' && (
          <div className="w-full rounded-lg bg-muted p-4 mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">AI Confidence Score</span>
              <span className="font-semibold text-destructive">91%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
              <div className="h-full w-[91%] rounded-full bg-destructive"></div>
            </div>
            
            <div className="mt-4 text-left space-y-2">
              <div className="text-sm font-medium text-foreground">Detected Issues:</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Domain registered recently (3 days ago)</li>
                <li>• Mimics legitimate banking website</li>
                <li>• SSL certificate anomalies detected</li>
                <li>• Known phishing infrastructure</li>
                <li>• Suspicious redirect patterns</li>
              </ul>
            </div>
          </div>
        )}

        {/* Success Stats */}
        {status === 'safe' && (
          <div className="w-full rounded-lg bg-primary/5 border border-primary/20 p-4 mb-6">
            <div className="text-sm font-medium text-primary mb-2">Security Stats</div>
            <div className="text-xs text-primary/80 space-y-1">
              <div>• Threat successfully blocked</div>
              <div>• User credentials protected</div>
              <div>• No security breach detected</div>
              <div>• Safe browsing maintained</div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Actions */}
      <footer className="p-4 space-y-2">
        {status === 'blocked' && (
          <>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleGoBack}
            >
              Go Back to Safety
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={handleProceedAnyway}
              >
                Proceed Anyway
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleReportSite}
              >
                Report Site
              </Button>
            </div>
          </>
        )}

        {status === 'proceeding' && (
          <div className="space-y-2">
            <div className="text-xs text-center text-orange-600 font-medium">
              ⚠️ Browsing with extreme caution enabled
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoBack}>
              Return to Safety
            </Button>
          </div>
        )}

        {status === 'safe' && (
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onBack}>
            Continue Secure Browsing
          </Button>
        )}

        {status === 'scanning' && (
          <Button variant="outline" className="w-full" disabled>
            Please wait while scanning...
          </Button>
        )}
      </footer>
    </div>
  );
}