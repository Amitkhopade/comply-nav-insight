import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GitBranch, 
  Search, 
  Filter, 
  Download,
  Share,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  ArrowRight,
  ArrowLeft,
  Circle,
  Target
} from "lucide-react";

const lineageData = {
  nodes: [
    { id: 'trade-booking', name: 'Trade Booking System', type: 'source', system: 'Murex', steward: 'John Smith', status: 'active' },
    { id: 'risk-engine', name: 'Risk Calculation Engine', type: 'processing', system: 'Calypso', steward: 'Sarah Johnson', status: 'active' },
    { id: 'regulatory-report', name: 'BCBS 239 Position Report', type: 'target', system: 'Cognos', steward: 'Mike Chen', status: 'critical' },
    { id: 'data-warehouse', name: 'Enterprise Data Warehouse', type: 'storage', system: 'Snowflake', steward: 'Lisa Wong', status: 'active' },
    { id: 'client-positions', name: 'Client Position Summary', type: 'target', system: 'Tableau', steward: 'David Brown', status: 'review' }
  ],
  connections: [
    { from: 'trade-booking', to: 'risk-engine', type: 'real-time', volume: 'high', quality: 98.5 },
    { from: 'risk-engine', to: 'data-warehouse', type: 'batch', volume: 'medium', quality: 99.2 },
    { from: 'data-warehouse', to: 'regulatory-report', type: 'scheduled', volume: 'low', quality: 95.1 },
    { from: 'data-warehouse', to: 'client-positions', type: 'on-demand', volume: 'medium', quality: 97.8 }
  ]
};

const stewardshipIssues = [
  {
    id: 1,
    node: 'trade-booking',
    issue: 'Missing column-level lineage for settlement_date',
    severity: 'medium',
    assignee: 'John Smith',
    dueDate: '2024-01-15',
    status: 'open'
  },
  {
    id: 2,
    node: 'regulatory-report',
    issue: 'Outdated business glossary definitions',
    severity: 'high',
    assignee: 'Mike Chen',
    dueDate: '2024-01-10',
    status: 'in-progress'
  },
  {
    id: 3,
    node: 'data-warehouse',
    issue: 'Steward approval required for schema changes',
    severity: 'low',
    assignee: 'Lisa Wong',
    dueDate: '2024-01-20',
    status: 'pending'
  }
];

const LineageExplorer = () => {
  const [selectedTab, setSelectedTab] = useState("visualization");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'review': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  const getConnectionTypeIcon = (type: string) => {
    switch (type) {
      case 'real-time': return <Circle className="w-3 h-3 fill-success text-success" />;
      case 'batch': return <Circle className="w-3 h-3 fill-primary text-primary" />;
      case 'scheduled': return <Circle className="w-3 h-3 fill-warning text-warning" />;
      case 'on-demand': return <Circle className="w-3 h-3 fill-accent text-accent" />;
      default: return <Circle className="w-3 h-3 fill-muted text-muted" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Lineage Explorer</h1>
          <p className="text-muted-foreground mt-1">
            Visualize data flows and manage stewardship across your enterprise
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search datasets, systems, or stewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Systems</SelectItem>
            <SelectItem value="source">Source Systems</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="target">Target Systems</SelectItem>
            <SelectItem value="critical">Critical Path</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Lineage Visualization</TabsTrigger>
          <TabsTrigger value="stewardship">Stewardship</TabsTrigger>
          <TabsTrigger value="analysis">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-6">
          {/* Lineage Graph Visualization */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:LINEAGE --> */}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Data Flow Visualization
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    87% Coverage
                  </Badge>
                  <Button variant="outline" size="sm">
                    Refresh Lineage
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Simplified Visual Representation of Lineage */}
              <div className="bg-muted/20 rounded-lg p-6 min-h-[400px]">
                <div className="flex items-center justify-center h-full">
                  <div className="grid grid-cols-4 gap-8 w-full max-w-4xl">
                    {/* Source Systems */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Sources
                      </h4>
                      {lineageData.nodes.filter(n => n.type === 'source').map(node => (
                        <div
                          key={node.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                            selectedNode === node.id ? 'ring-2 ring-primary' : ''
                          } ${getNodeStatusColor(node.status)}`}
                          onClick={() => setSelectedNode(node.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Database className="w-4 h-4" />
                            <span className="text-xs font-medium">{node.system}</span>
                          </div>
                          <p className="text-xs text-foreground font-medium mb-1">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.steward}</p>
                        </div>
                      ))}
                    </div>

                    {/* Processing */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Processing
                      </h4>
                      {lineageData.nodes.filter(n => n.type === 'processing').map(node => (
                        <div
                          key={node.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                            selectedNode === node.id ? 'ring-2 ring-primary' : ''
                          } ${getNodeStatusColor(node.status)}`}
                          onClick={() => setSelectedNode(node.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4" />
                            <span className="text-xs font-medium">{node.system}</span>
                          </div>
                          <p className="text-xs text-foreground font-medium mb-1">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.steward}</p>
                        </div>
                      ))}
                    </div>

                    {/* Storage */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Storage
                      </h4>
                      {lineageData.nodes.filter(n => n.type === 'storage').map(node => (
                        <div
                          key={node.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                            selectedNode === node.id ? 'ring-2 ring-primary' : ''
                          } ${getNodeStatusColor(node.status)}`}
                          onClick={() => setSelectedNode(node.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Database className="w-4 h-4" />
                            <span className="text-xs font-medium">{node.system}</span>
                          </div>
                          <p className="text-xs text-foreground font-medium mb-1">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.steward}</p>
                        </div>
                      ))}
                    </div>

                    {/* Targets */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Targets
                      </h4>
                      {lineageData.nodes.filter(n => n.type === 'target').map(node => (
                        <div
                          key={node.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                            selectedNode === node.id ? 'ring-2 ring-primary' : ''
                          } ${getNodeStatusColor(node.status)}`}
                          onClick={() => setSelectedNode(node.id)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4" />
                            <span className="text-xs font-medium">{node.system}</span>
                          </div>
                          <p className="text-xs text-foreground font-medium mb-1">{node.name}</p>
                          <p className="text-xs text-muted-foreground">{node.steward}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Details */}
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium">Data Connections</h4>
                <div className="grid gap-3">
                  {lineageData.connections.map((conn, index) => {
                    const fromNode = lineageData.nodes.find(n => n.id === conn.from);
                    const toNode = lineageData.nodes.find(n => n.id === conn.to);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getConnectionTypeIcon(conn.type)}
                          <span className="text-sm font-medium">{fromNode?.name}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{toNode?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {conn.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Quality: {conn.quality}%
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stewardship" className="space-y-6">
          {/* Stewardship Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Active Stewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success mb-1">8</div>
                <p className="text-sm text-muted-foreground">Across 12 systems</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  Open Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning mb-1">3</div>
                <p className="text-sm text-muted-foreground">2 high priority</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Approval Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success mb-1">94%</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Stewardship Issues */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:STEWARDSHIP --> */}
            <CardHeader>
              <CardTitle>Stewardship Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stewardshipIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-sm">{issue.issue}</h4>
                        <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {issue.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Node: {issue.node}</span>
                        <span>Assignee: {issue.assignee}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due: {issue.dueDate}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Steward Assignment */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Steward Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Assign New Steward</h4>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dataset/system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trade-booking">Trade Booking System</SelectItem>
                        <SelectItem value="risk-engine">Risk Engine</SelectItem>
                        <SelectItem value="data-warehouse">Data Warehouse</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select steward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Chen</SelectItem>
                        <SelectItem value="lisa">Lisa Wong</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Assign Steward</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recent Approvals</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-success/5 rounded">
                      <span className="text-sm">Schema change approved</span>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-success/5 rounded">
                      <span className="text-sm">Glossary update approved</span>
                      <span className="text-xs text-muted-foreground">4h ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-warning/5 rounded">
                      <span className="text-sm">Access request pending</span>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Impact Analysis */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:IMPACT --> */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <h4 className="font-medium text-sm mb-2">Downstream Impact Assessment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If Trade Booking System goes offline, 4 downstream systems and 12 reports will be affected.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="ghost">Generate Report</Button>
                  </div>
                </div>

                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <h4 className="font-medium text-sm mb-2">Change Impact Preview</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Proposed schema changes to client_positions table will affect 3 downstream reports and require steward approval.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Review Changes</Button>
                    <Button size="sm" variant="ghost">Notify Stewards</Button>
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

export default LineageExplorer;