import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Plus,
  Upload,
  Bot,
  TrendingUp,
  Link,
  Server
} from "lucide-react";

const sourceInventory = [
  {
    id: 1,
    name: "Murex Trading System",
    type: "Core Trading",
    status: "Connected",
    criticality: "Critical",
    lastSync: "5 min ago",
    coverage: 98.5,
    datasets: 23,
    required: true
  },
  {
    id: 2,
    name: "MDM Counterparty Hub",
    type: "Reference Data",
    status: "Connected", 
    criticality: "Critical",
    lastSync: "2 min ago",
    coverage: 99.2,
    datasets: 8,
    required: true
  },
  {
    id: 3,
    name: "Risk Calculation Engine",
    type: "Risk Management",
    status: "Partial",
    criticality: "Critical",
    lastSync: "15 min ago",
    coverage: 76.3,
    datasets: 12,
    required: true
  },
  {
    id: 4,
    name: "Bloomberg Market Data",
    type: "Market Data",
    status: "Connected",
    criticality: "High",
    lastSync: "1 min ago", 
    coverage: 94.7,
    datasets: 5,
    required: true
  },
  {
    id: 5,
    name: "Legacy Settlement System",
    type: "Operations",
    status: "Missing",
    criticality: "Medium",
    lastSync: "Never",
    coverage: 0,
    datasets: 0,
    required: true
  }
];

const missingGaps = [
  {
    id: 1,
    system: "FX Options Trading Desk",
    type: "Trading System",
    impact: "High",
    reason: "Not catalogued - discovered through lineage analysis",
    recommendation: "Connect via JDBC, auto-discover schemas"
  },
  {
    id: 2, 
    system: "Collateral Management Portal",
    type: "Risk System",
    impact: "Medium",
    reason: "Manual process - no direct API available",
    recommendation: "Implement daily CSV export workflow"
  },
  {
    id: 3,
    system: "Client Onboarding Database",
    type: "KYC System", 
    impact: "High",
    reason: "Shadow IT system - recently discovered",
    recommendation: "Urgent integration required for regulatory compliance"
  }
];

const SourceCompleteness = () => {
  const [selectedTab, setSelectedTab] = useState("inventory");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-success/10 text-success border-success/20";
      case "Partial":
        return "bg-warning/10 text-warning border-warning/20";
      case "Missing":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "Critical":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "High":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "Partial":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "Missing":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Database className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const overallCompleteness = 78.6;
  const criticalSystemsConnected = sourceInventory.filter(s => s.criticality === "Critical" && s.status === "Connected").length;
  const totalCriticalSystems = sourceInventory.filter(s => s.criticality === "Critical").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Source Completeness Monitor</h1>
          <p className="text-muted-foreground mt-1">
            Ensure all required trading and risk systems are captured in the governance catalog
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import System Inventory
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Source System
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Completeness</p>
                <div className="text-2xl font-bold text-foreground">{overallCompleteness}%</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Progress value={overallCompleteness} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Systems</p>
                <div className="text-2xl font-bold text-foreground">{criticalSystemsConnected}/{totalCriticalSystems}</div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Connected and monitored</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Missing Systems</p>
                <div className="text-2xl font-bold text-destructive">{missingGaps.length}</div>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Datasets</p>
                <div className="text-2xl font-bold text-foreground">{sourceInventory.reduce((sum, s) => sum + s.datasets, 0)}</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Catalogued and governed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">System Inventory</TabsTrigger>
          <TabsTrigger value="gaps">Missing Sources</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* System Inventory */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Source System Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourceInventory.map((system) => (
                  <div key={system.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(system.status)}
                        <h4 className="font-medium text-sm">{system.name}</h4>
                        <Badge variant="outline" className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                        <Badge variant="outline" className={getCriticalityColor(system.criticality)}>
                          {system.criticality}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-xs text-muted-foreground">
                        <span>Type: {system.type}</span>
                        <span>Coverage: {system.coverage}%</span>
                        <span>Datasets: {system.datasets}</span>
                        <span>Last Sync: {system.lastSync}</span>
                        <Progress value={system.coverage} className="w-16" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Link className="w-3 h-3 mr-1" />
                        View Connection
                      </Button>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          {/* Missing Sources */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:SOURCE_COMPLETENESS --> */}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Identified System Gaps
                </CardTitle>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  {missingGaps.length} Systems Missing
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missingGaps.map((gap) => (
                  <div key={gap.id} className="p-4 rounded-lg bg-muted/30 border-l-4 border-warning">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-4 h-4 text-destructive" />
                        <h4 className="font-medium text-sm">{gap.system}</h4>
                        <Badge variant="outline" className="text-xs">
                          {gap.type}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={
                            gap.impact === "High" ? "bg-destructive/10 text-destructive border-destructive/20" :
                            "bg-warning/10 text-warning border-warning/20"
                          }
                        >
                          {gap.impact} Impact
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Start Integration
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{gap.reason}</p>
                    <div className="bg-accent/5 p-3 rounded border-l-2 border-accent">
                      <p className="text-sm font-medium text-accent">AI Recommendation:</p>
                      <p className="text-sm">{gap.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-6">
          {/* AI Analysis */}
          <Card className="shadow-card border-accent/20">
            {/* <!-- AI_AGENT:SOURCE_COMPLETENESS --> */}
            {/* <!-- AI_AGENT:DISCOVERY --> */}
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">AI Source Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Regulatory Compliance Risk Detected</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on lineage analysis, the Legacy Settlement System contains data required for 
                        MiFID II transaction reporting. Missing connection creates compliance gap.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Prioritize Integration
                        </Button>
                        <Button size="sm" variant="ghost">
                          Generate Evidence Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Source Discovery Complete</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Analyzed network logs and found 3 previously unknown systems processing trade data. 
                        All have been flagged for immediate cataloguing and governance review.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Review Discoveries
                        </Button>
                        <Button size="sm" variant="ghost">
                          Auto-Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Completeness Trend Analysis</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Source completeness has improved by 12% this month. Current pace will achieve 
                        85% completeness by end of quarter, meeting regulatory target.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Forecast
                        </Button>
                        <Button size="sm" variant="ghost">
                          Export Report
                        </Button>
                      </div>
                    </div>
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

export default SourceCompleteness;