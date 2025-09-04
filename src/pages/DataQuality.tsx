import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Database,
  Play,
  Bot,
  Calendar,
  Target
} from "lucide-react";

const qualityMetrics = [
  {
    name: "Trade Data Completeness",
    score: 99.2,
    trend: "+0.3%",
    status: "excellent",
    dataset: "trade_bookings_prod",
    lastRun: "5 min ago",
    critical: true
  },
  {
    name: "Counterparty Reference Accuracy",
    score: 94.7,
    trend: "-1.2%",
    status: "good",
    dataset: "mdm_counterparty",
    lastRun: "15 min ago",
    critical: true
  },
  {
    name: "Risk Position Timeliness", 
    score: 87.3,
    trend: "-2.8%",
    status: "warning",
    dataset: "risk_positions_eod",
    lastRun: "1 hour ago",
    critical: true
  },
  {
    name: "KYC Documentation Status",
    score: 78.9,
    trend: "+4.1%",
    status: "attention",
    dataset: "kyc_documents",
    lastRun: "30 min ago",
    critical: false
  }
];

const activeTests = [
  {
    id: 1,
    name: "BCBS 239 Position Completeness",
    type: "Regulatory",
    schedule: "End of Day",
    status: "Running",
    progress: 65,
    eta: "2 min"
  },
  {
    id: 2,
    name: "MiFID II Trade Reporting Validation",
    type: "Regulatory", 
    schedule: "Real-time",
    status: "Passed",
    progress: 100,
    eta: "Complete"
  },
  {
    id: 3,
    name: "CAT Data Quality Checks",
    type: "Regulatory",
    schedule: "Hourly",
    status: "Failed",
    progress: 100,
    eta: "Review needed"
  }
];

const DataQuality = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-warning";
    return "text-destructive";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-success/10 text-success border-success/20";
      case "good":
        return "bg-primary/10 text-primary border-primary/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Quality Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor regulatory compliance and data integrity across trading systems
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Tests
          </Button>
          <Button className="bg-gradient-primary">
            <Play className="w-4 h-4 mr-2" />
            Run All Checks
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {qualityMetrics.map((metric, index) => (
          <Card key={index} className={`shadow-card hover:shadow-elevated transition-shadow ${metric.critical ? 'border-primary/20' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                {metric.critical ? (
                  <Target className="w-4 h-4 text-primary" />
                ) : (
                  <BarChart3 className="w-4 h-4 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                {metric.score}%
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className={getStatusBadge(metric.status)}>
                  {metric.trend}
                </Badge>
                <p className="text-xs text-muted-foreground">{metric.lastRun}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.dataset}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Quality Overview</TabsTrigger>
          <TabsTrigger value="tests">Active Tests</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Regulatory Compliance Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Regulatory Compliance Status
                </CardTitle>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  94.2% Overall
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium">BCBS 239 Risk Data Aggregation</h4>
                    <p className="text-sm text-muted-foreground">Position completeness and timeliness</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-success">99.1%</div>
                    <Progress value={99.1} className="w-24 mt-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium">MiFID II Transaction Reporting</h4>
                    <p className="text-sm text-muted-foreground">Trade data accuracy and completeness</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-success">97.8%</div>
                    <Progress value={97.8} className="w-24 mt-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium">CAT Consolidated Audit Trail</h4>
                    <p className="text-sm text-muted-foreground">Order and trade lifecycle tracking</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-warning">85.4%</div>
                    <Progress value={85.4} className="w-24 mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-6">
          {/* Active Test Executions */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:DQ --> */}
            <CardHeader>
              <CardTitle>Running Quality Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-sm">{test.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {test.type}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={
                            test.status === "Running" ? "bg-primary/10 text-primary" :
                            test.status === "Passed" ? "bg-success/10 text-success" :
                            "bg-destructive/10 text-destructive"
                          }
                        >
                          {test.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={test.progress} className="w-32" />
                        <span className="text-xs text-muted-foreground">{test.eta}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Schedule: {test.schedule}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          {/* AI Recommendations */}
          <Card className="shadow-card border-accent/20">
            {/* <!-- AI_AGENT:DQ --> */}
            {/* <!-- AI_AGENT:RISK --> */}
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">AI Quality Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">CAT Reporting Quality Issue Detected</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        The trade_orders table is missing 12.3% of required timestamps for CAT reporting. 
                        This violates Rule 613 requirements and may result in regulatory fines.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Generate Fix
                        </Button>
                        <Button size="sm" variant="ghost">
                          View Impact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Recommended Quality Test</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on recent data patterns, I recommend adding a real-time completeness check 
                        for client_reference_data to ensure BCBS 239 compliance.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Create Test
                        </Button>
                        <Button size="sm" variant="ghost">
                          Learn More
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

export default DataQuality;