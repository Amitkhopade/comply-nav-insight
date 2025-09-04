import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Bot, 
  FileText, 
  MessageSquare, 
  Search,
  CheckCircle,
  AlertCircle,
  Shield,
  BookOpen,
  Zap
} from "lucide-react";

const uploadedPolicies = [
  {
    id: 1,
    name: "MiFID II Transaction Reporting Requirements",
    type: "Regulatory",
    uploadDate: "2024-01-15",
    status: "Processed",
    obligations: 23,
    mappedAssets: 156
  },
  {
    id: 2,
    name: "BCBS 239 Risk Data Aggregation Principles",
    type: "Regulatory", 
    uploadDate: "2024-01-14",
    status: "Processing",
    obligations: 14,
    mappedAssets: 89
  },
  {
    id: 3,
    name: "Internal Data Classification Policy v2.1",
    type: "Internal",
    uploadDate: "2024-01-12",
    status: "Processed",
    obligations: 8,
    mappedAssets: 234
  }
];

const recentQueries = [
  {
    id: 1,
    question: "Which policies apply to Customer KYC data?",
    answer: "Based on uploaded policies, Customer KYC data is governed by: 1) AML/BSA Requirements, 2) GDPR Article 6 for data processing, 3) Internal Data Classification Policy (Level 3 - Confidential).",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    question: "How do we comply with SEC 17a-4 for trade records?",
    answer: "SEC 17a-4 requires: 1) 3-year retention for trade blotters and ledgers, 2) Write-Once-Read-Many (WORM) storage, 3) Immediate accessibility for first 2 years, 4) Segregated backup copies.",
    timestamp: "4 hours ago"
  }
];

const PolicyStudio = () => {
  const [selectedTab, setSelectedTab] = useState("upload");
  const [policyQuestion, setPolicyQuestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuestionSubmit = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "bg-success/10 text-success border-success/20";
      case "Processing":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Policy Studio</h1>
          <p className="text-muted-foreground mt-1">
            Upload regulations, extract obligations, and get AI-powered policy guidance
          </p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload Policy Document
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Policy Upload</TabsTrigger>
          <TabsTrigger value="qa">Policy Q&A</TabsTrigger>
          <TabsTrigger value="mapping">Obligation Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Upload Interface */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:POLICY_UPLOAD --> */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Upload Regulatory & Internal Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Policy Documents</h3>
                <p className="text-muted-foreground mb-4">
                  Support for PDF, DOCX, and TXT files. AI will extract obligations and map to data assets.
                </p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Policies */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Uploaded Policy Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <h4 className="font-medium text-sm">{policy.name}</h4>
                        <Badge variant="outline" className={getStatusColor(policy.status)}>
                          {policy.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {policy.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <span>Uploaded: {policy.uploadDate}</span>
                        <span>Obligations: {policy.obligations}</span>
                        <span>Mapped Assets: {policy.mappedAssets}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Mapping
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qa" className="space-y-6">
          {/* AI Q&A Interface */}
          <Card className="shadow-card border-accent/20">
            {/* <!-- AI_AGENT:POLICY_QA --> */}
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Ask About Policy Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="e.g., Which policies apply to Customer KYC data?"
                      value={policyQuestion}
                      onChange={(e) => setPolicyQuestion(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    onClick={handleQuestionSubmit}
                    disabled={isProcessing || !policyQuestion.trim()}
                    className="bg-gradient-primary"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Ask AI
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    GDPR compliance requirements
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Trade data retention rules
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    PII handling policies
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Risk reporting obligations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Q&A History */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Policy Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQueries.map((query) => (
                  <div key={query.id} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3 mb-3">
                      <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{query.question}</h4>
                        <p className="text-xs text-muted-foreground">{query.timestamp}</p>
                      </div>
                    </div>
                    <div className="bg-accent/5 p-3 rounded border-l-2 border-accent">
                      <p className="text-sm">{query.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          {/* Obligation to Asset Mapping */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:REGULATORY --> */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Policy Obligation Mapping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <h4 className="font-medium text-sm">BCBS 239 Risk Position Accuracy</h4>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Compliant
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Risk positions must be accurate and reconciled across systems
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Mapped to: risk_positions_eod, trade_bookings_prod, market_data_feeds
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <h4 className="font-medium text-sm">MiFID II Transaction Reporting</h4>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        Needs Review
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      All transactions must be reported within specified timeframes
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Mapped to: trade_orders, execution_reports (2 missing fields)
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Fix Mapping
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-sm">Data Retention Requirements</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Auto-mapped
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Client communications must be retained for 7 years
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Mapped to: client_communications, email_archive, voice_recordings
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PolicyStudio;