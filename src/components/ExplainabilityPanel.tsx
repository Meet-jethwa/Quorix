import { Brain, AlertTriangle, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ThreatAnalysis {
  emailSender?: string;
  emailSubject?: string;
  detectedWords: string[];
  domainAnalysis: {
    age: string;
    ssl: string;
    reputation: string;
  };
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  reasons: string[];
}

interface ExplainabilityPanelProps {
  selectedEmail?: {
    sender: string;
    subject: string;
    isPhishing: boolean;
    confidence?: number;
  };
}

export function ExplainabilityPanel({ selectedEmail }: ExplainabilityPanelProps) {
  const defaultAnalysis: ThreatAnalysis = {
    detectedWords: ['urgent', 'verify', 'account', 'suspended'],
    domainAnalysis: {
      age: '2 days old',
      ssl: 'Self-signed',
      reputation: 'Unknown'
    },
    confidence: 92,
    riskLevel: 'high',
    reasons: [
      'Domain registered very recently',
      'Suspicious keywords detected',
      'Mimics legitimate service',
      'Creates false sense of urgency'
    ]
  };

  const safeAnalysis: ThreatAnalysis = {
    detectedWords: ['statement', 'account', 'ready'],
    domainAnalysis: {
      age: '5+ years',
      ssl: 'Valid certificate',
      reputation: 'Excellent'
    },
    confidence: 5,
    riskLevel: 'low',
    reasons: [
      'Verified sender domain',
      'Normal business communication',
      'No suspicious patterns',
      'Established reputation'
    ]
  };

  const analysis = selectedEmail?.isPhishing ? 
    { ...defaultAnalysis, emailSender: selectedEmail.sender, emailSubject: selectedEmail.subject, confidence: selectedEmail.confidence || 92 } :
    selectedEmail ? 
    { ...safeAnalysis, emailSender: selectedEmail.sender, emailSubject: selectedEmail.subject, confidence: 5 } :
    defaultAnalysis;

  const isPhishing = analysis.confidence > 50;

  return (
    <Card className="h-full bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Explainability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Threat Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">Threat Assessment</h3>
            <Badge variant={isPhishing ? "destructive" : "secondary"} className={!isPhishing ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}>
              {isPhishing ? (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  High Risk
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Safe
                </>
              )}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Confidence</span>
              <span className={isPhishing ? "text-destructive" : "text-green-400"}>{analysis.confidence}%</span>
            </div>
            <Progress 
              value={analysis.confidence} 
              className={`h-2 ${isPhishing ? '[&>div]:bg-destructive' : '[&>div]:bg-green-500'}`}
            />
          </div>
        </div>

        {/* Email Details */}
        {selectedEmail && (
          <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
            <h3 className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Analyzing Email
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-muted-foreground">From: </span>
                <span className="font-mono">{analysis.emailSender}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Subject: </span>
                <span>"{analysis.emailSubject}"</span>
              </div>
            </div>
          </div>
        )}

        {/* Detected Keywords */}
        <div className="space-y-3">
          <h3 className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Detected Keywords
          </h3>
          <div className="flex flex-wrap gap-1">
            {analysis.detectedWords.map((word, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {word}
              </Badge>
            ))}
          </div>
        </div>

        {/* Domain Analysis */}
        <div className="space-y-3">
          <h3 className="text-sm">Domain Analysis</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age:</span>
              <span className={analysis.domainAnalysis.age.includes('days') ? 'text-destructive' : 'text-green-400'}>
                {analysis.domainAnalysis.age}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SSL:</span>
              <span className={analysis.domainAnalysis.ssl.includes('Self-signed') ? 'text-destructive' : 'text-green-400'}>
                {analysis.domainAnalysis.ssl}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reputation:</span>
              <span className={analysis.domainAnalysis.reputation === 'Unknown' ? 'text-destructive' : 'text-green-400'}>
                {analysis.domainAnalysis.reputation}
              </span>
            </div>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="space-y-3">
          <h3 className="text-sm">AI Reasoning</h3>
          <div className="space-y-2">
            {analysis.reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  isPhishing ? 'bg-destructive' : 'bg-green-400'
                }`}></div>
                <span className="text-muted-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>AI monitoring active • Last scan: now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}