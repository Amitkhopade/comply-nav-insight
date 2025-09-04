import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Rocket,
  Beaker,
  TrendingUp,
  Shield,
  Bot,
  Database,
  ChartBar,
  Lock,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const researchProjects = [
  {
    id: 1,
    title: "Automated Control Testing",
    description: "AI-powered framework for continuous control monitoring and testing across data pipelines",
    status: "active",
    progress: 73,
    category: "AI Research",
    priority: "high",
    estimatedCompletion: "Q2 2024",
    applications: ["SOX Compliance", "Data Quality", "Risk Management"],
    impact: "Reduce manual testing by 85%"
  },
  {
    id: 2,
    title: "Privacy-Preserving Data Tagging",
    description: "Machine learning models for automatic PII detection and classification using differential privacy",
    status: "planning",
    progress: 25,
    category: "Privacy Tech",
    priority: "medium",
    estimatedCompletion: "Q3 2024",
    applications: ["GDPR Compliance", "Data Discovery", "Risk Assessment"],
    impact: "Zero-touch PII classification"
  },
  {
    id: 3,
    title: "Regulatory Reporting Automation",
    description: "Natural language processing for automatic generation of regulatory reports from policy documents",
    status: "completed",
    progress: 100,
    category: "RegTech",
    priority: "high",
    estimatedCompletion: "Q1 2024",
    applications: ["MiFID II", "BCBS 239", "CAT Reporting"],
    impact: "50% faster report generation"
  },
  {
    id: 4,
    title: "Quantum-Safe Data Encryption",
    description: "Implementation of post-quantum cryptographic methods for sensitive financial data protection",
    status: "research",
    progress: 15,
    category: "Cryptography",
    priority: "low",
    estimatedCompletion: "Q4 2024",
    applications: ["Data Security", "Future-Proofing", "Compliance"],
    impact: "Quantum-resistant security"
  }
];

const aiCapabilities = [
  {
    name: "Autonomous Data Discovery",
    description: "Self-learning system that automatically identifies and catalogs new data sources",
    maturity: 85,
    icon: Database,
    status: "production"
  },
  {
    name: "Predictive Compliance Monitoring",
    description: "Forecasts potential compliance violations before they occur",
    maturity: 70,
    icon: Shield,
    status: "beta"
  },
  {
    name: "Intelligent Data Lineage",
    description: "AI-driven lineage discovery with semantic understanding of transformations",
    maturity: 92,
    icon: Brain,
    status: "production"
  },
  {
    name: "Natural Language Query Interface",
    description: "Chat with your data using plain English queries",
    maturity: 60,
    icon: Bot,
    status: "alpha"
  },
  {
    name: "Automated Policy Generation",
    description: "Generate governance policies from regulatory documents and business rules",
    maturity: 45,
    icon: Zap,
    status: "research"
  },
  {
    name: "Risk-Aware Data Classification",
    description: "Context-aware data classification considering business and regulatory risk",
    maturity: 78,
    icon: Lock,
    status: "beta"
  }
];

const Innovation = () => {
  const [selectedTab, setSelectedTab] = useState("research");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'planning': return 'bg-warning/10 text-warning border-warning/20';
      case 'research': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  const getMaturityColor = (maturity: number) => {
    if (maturity >= 80) return 'text-success';
    if (maturity >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getCapabilityStatus = (status: string) => {
    switch (status) {
      case 'production': return { color: 'bg-success/10 text-success border-success/20', icon: CheckCircle };
      case 'beta': return { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock };
      case 'alpha': return { color: 'bg-primary/10 text-primary border-primary/20', icon: Beaker };
      case 'research': return { color: 'bg-accent/10 text-accent border-accent/20', icon: Brain };
      default: return { color: 'bg-muted/50 text-muted-foreground border-muted', icon: AlertTriangle };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            Innovation Lab
          </h1>
          <p className="text-muted-foreground mt-1">
            Exploring next-generation AI and governance technologies for financial services
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Research Pipeline
          </Button>
          <Button className="bg-gradient-primary">
            <Rocket className="w-4 h-4 mr-2" />
            Propose Project
          </Button>
        </div>
      </div>

      {/* Innovation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">4</div>
            <p className="text-sm text-muted-foreground">2 in production</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Automation Gain
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success mb-1">67%</div>
            <p className="text-sm text-muted-foreground">Manual tasks reduced</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-warning" />
              Risk Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning mb-1">42%</div>
            <p className="text-sm text-muted-foreground">Compliance risks</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lab className="w-4 h-4 text-accent" />
              Research ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent mb-1">3.2x</div>
            <p className="text-sm text-muted-foreground">Investment return</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="research">Research Projects</TabsTrigger>
          <TabsTrigger value="capabilities">AI Capabilities</TabsTrigger>
          <TabsTrigger value="roadmap">Technology Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="research" className="space-y-6">
          {/* Research Projects */}
          <div className="grid gap-6">
            {researchProjects.map((project) => (
              <Card key={project.id} className="shadow-card hover:shadow-elevated transition-shadow">
                {/* <!-- AI_AGENT:RESEARCH --> */}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Beaker className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(project.priority)}>
                        {project.priority} priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  {project.status !== 'completed' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Applications</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.applications.map((app, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Expected Impact</h4>
                      <p className="text-sm text-success font-medium">{project.impact}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>ETA: {project.estimatedCompletion}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {project.status === 'completed' && (
                        <Button size="sm" className="bg-gradient-primary">
                          Deploy
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="capabilities" className="space-y-6">
          {/* AI Capabilities Matrix */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                AI Capability Maturity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {aiCapabilities.map((capability, index) => {
                  const statusConfig = getCapabilityStatus(capability.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <capability.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{capability.name}</h4>
                            <Badge variant="outline" className={statusConfig.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {capability.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{capability.description}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Maturity</span>
                                <span className={getMaturityColor(capability.maturity)}>
                                  {capability.maturity}%
                                </span>
                              </div>
                              <Progress value={capability.maturity} className="h-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Test
                        </Button>
                        {capability.status === 'production' && (
                          <Button size="sm" variant="ghost">
                            Monitor
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          {/* Technology Roadmap */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:ROADMAP --> */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-accent" />
                Innovation Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Q2 2024 */}
                <div className="border-l-2 border-primary pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full -ml-8" />
                    <h3 className="font-semibold text-primary">Q2 2024 - Current Focus</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium text-sm">Automated Control Testing</h4>
                      <p className="text-xs text-muted-foreground">Production deployment of AI-powered control monitoring</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <h4 className="font-medium text-sm">Enhanced Lineage Intelligence</h4>
                      <p className="text-xs text-muted-foreground">Semantic understanding of data transformations</p>
                    </div>
                  </div>
                </div>

                {/* Q3 2024 */}
                <div className="border-l-2 border-accent pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-accent rounded-full -ml-8" />
                    <h3 className="font-semibold text-accent">Q3 2024 - Next Phase</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-accent/5 rounded-lg">
                      <h4 className="font-medium text-sm">Privacy-Preserving Analytics</h4>
                      <p className="text-xs text-muted-foreground">Federated learning for cross-system insights</p>
                    </div>
                    <div className="p-3 bg-accent/5 rounded-lg">
                      <h4 className="font-medium text-sm">Natural Language Governance</h4>
                      <p className="text-xs text-muted-foreground">Chat-based policy management and Q&A</p>
                    </div>
                  </div>
                </div>

                {/* Q4 2024 */}
                <div className="border-l-2 border-muted pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-muted rounded-full -ml-8" />
                    <h3 className="font-semibold text-muted-foreground">Q4 2024 - Future Research</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <h4 className="font-medium text-sm">Quantum-Safe Cryptography</h4>
                      <p className="text-xs text-muted-foreground">Post-quantum security for financial data</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <h4 className="font-medium text-sm">Autonomous Governance</h4>
                      <p className="text-xs text-muted-foreground">Self-managing data governance systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Vision */}
          <Card className="shadow-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Future Vision: 2025 & Beyond
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Fully Autonomous Governance</h4>
                  <p className="text-sm text-muted-foreground">
                    Self-healing data governance systems that automatically detect, classify, 
                    and protect data while ensuring continuous compliance with evolving regulations.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">AI-Driven</Badge>
                    <Badge variant="outline" className="text-xs">Self-Healing</Badge>
                    <Badge variant="outline" className="text-xs">Zero-Touch</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Regulatory Intelligence</h4>
                  <p className="text-sm text-muted-foreground">
                    AI systems that continuously monitor regulatory changes globally and 
                    automatically adapt governance policies and controls in real-time.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Real-Time</Badge>
                    <Badge variant="outline" className="text-xs">Global</Badge>
                    <Badge variant="outline" className="text-xs">Adaptive</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Innovation;