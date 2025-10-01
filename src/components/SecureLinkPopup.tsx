import { Shield, X, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

export function SecureLinkPopup() {
  return (
    <div className="mx-auto flex h-[500px] max-w-sm flex-col bg-card text-card-foreground rounded-lg overflow-hidden border border-border shadow-lg">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Shield className="text-primary h-6 w-6" />
          <h1 className="text-lg font-semibold text-foreground">SecureLink</h1>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
        </div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">Suspicious URL Detected</h2>
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
          This URL has been flagged due to unusual activity patterns and potential phishing indicators.
        </p>
        
        {/* Confidence Score */}
        <div className="w-full rounded-lg bg-muted p-4 mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">AI Confidence Score</span>
            <span className="font-semibold text-primary">85%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
            <div className="h-full w-[85%] rounded-full bg-primary"></div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="w-full text-left space-y-3 mb-6">
          <div className="text-sm font-medium text-foreground">
            Detected Issues:
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Domain registered recently</li>
            <li>• SSL certificate anomalies</li>
            <li>• Suspicious redirect patterns</li>
            <li>• Known phishing indicators</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 space-y-2">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Proceed with Caution
        </Button>
        <Button variant="outline" className="w-full">
          Go Back to Safety
        </Button>
      </footer>
    </div>
  );
}