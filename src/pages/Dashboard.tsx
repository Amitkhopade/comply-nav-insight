import { KPICard } from "@/components/dashboard/KPICard";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Shield, 
  BarChart3, 
  Users, 
  AlertTriangle,
  TrendingUp,
  GitBranch,
  Clock
} from "lucide-react";

const kpiData = [
  {
    title: "Total Datasets",
    value: "2,847",
    change: { value: "+12.5%", trend: "up" as const },
    icon: Database,
    description: "vs last month"
  },
  {
    title: "Policy Compliance",
    value: "94.2%",
    change: { value: "+2.1%", trend: "up" as const },
    icon: Shield,
    description: "across all systems"
  },
  {
    title: "Data Quality Score",
    value: "87.6%",
    change: { value: "-1.3%", trend: "down" as const },
    icon: BarChart3,
    description: "requires attention"
  },
  {
    title: "Active Users",
    value: "1,243",
    change: { value: "+5.7%", trend: "up" as const },
    icon: Users,
    description: "this week"
  }
];

const recentIssues = [
  {
    id: 1,
    title: "PII Data in Dev Environment",
    severity: "High",
    status: "Open",
    dataset: "customer_analytics_dev",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Missing Data Classification",
    severity: "Medium",
    status: "In Progress",
    dataset: "financial_reports_q4",
    time: "4 hours ago"
  },
  {
    id: 3,
    title: "Access Review Overdue",
    severity: "Medium",
    status: "Pending",
    dataset: "employee_sensitive_data",
    time: "1 day ago"
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Governance Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor compliance, quality, and governance across your data estate
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/lineage'}>
            <GitBranch className="w-4 h-4 mr-2" />
            View Lineage Map
          </Button>
          <Button className="bg-gradient-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Issues */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:RISK --> */}
            {/* <!-- AI_AGENT:POLICY --> */}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Recent Issues
                </CardTitle>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  {recentIssues.length} Open
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-sm">{issue.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={
                            issue.severity === 'High' 
                              ? 'bg-destructive/10 text-destructive border-destructive/20'
                              : 'bg-warning/10 text-warning border-warning/20'
                          }
                        >
                          {issue.severity}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {issue.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{issue.dataset}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{issue.time}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Issues
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <div className="lg:col-span-1">
          <AIInsightsPanel />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => window.location.href = '/catalog'}>
              <Database className="w-6 h-6" />
              <span className="text-xs">Catalog Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => window.location.href = '/policies'}>
              <Shield className="w-6 h-6" />
              <span className="text-xs">Create Policy</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => window.location.href = '/quality'}>
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">Run Quality Check</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => window.location.href = '/access'}>
              <Users className="w-6 h-6" />
              <span className="text-xs">Manage Access</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;