import { useState } from 'react';
import { Send, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

export function UserReport() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Report submitted successfully!', {
        description: 'Our security team will review your submission.'
      });
      setUrl('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Report New Threat</h2>
        <p className="text-muted-foreground">
          Help us protect the community by reporting suspicious URLs and new fraud patterns you've encountered.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Submit Fraud Report
              </CardTitle>
              <CardDescription>
                Provide details about the suspicious activity or phishing attempt you've discovered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="url">Suspicious URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://suspicious-website.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-input-background dark:bg-input"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the complete URL of the suspicious website, email link, or message.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Fraud Description *</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe the fraud pattern, phishing attempt, or suspicious activity you encountered. Include details like: What made it suspicious? How did you receive it? What action was it asking you to take?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[200px] bg-input-background dark:bg-input"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide as much detail as possible to help our AI learn and protect other users.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Help & Guidelines */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Help & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">What to Report</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Suspicious emails requesting personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Fake websites mimicking legitimate services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>SMS or WhatsApp messages with malicious links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>New scam patterns or social engineering attempts</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground mb-2">Privacy Notice</h4>
                <p className="text-sm text-muted-foreground">
                  Your report helps improve Quorix's AI detection capabilities. We analyze the information you provide to enhance protection for all users.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  Our security team reviews reports within 24-48 hours. Critical threats are prioritized and addressed immediately.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Immediate Threat?</h4>
                  <p className="text-sm text-muted-foreground">
                    If you've shared sensitive information or credentials, contact your financial institution immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}