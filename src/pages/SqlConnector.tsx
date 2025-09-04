import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  CheckCircle, 
  XCircle,
  Plus,
  Play,
  Save,
  Key,
  Server,
  Search,
  Eye,
  Download
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const existingConnections = [
  {
    id: 1,
    name: "Murex Production DB",
    type: "SQL Server",
    host: "murex-prod-01.bank.local",
    database: "MurexDB",
    status: "Connected",
    lastTest: "2 min ago",
    schemas: 12,
    tables: 156
  },
  {
    id: 2,
    name: "Risk Data Warehouse",
    type: "Oracle",
    host: "risk-dwh-cluster.bank.local",
    database: "RISKDW",
    status: "Connected", 
    lastTest: "5 min ago",
    schemas: 8,
    tables: 89
  },
  {
    id: 3,
    name: "Reference Data Hub",
    type: "PostgreSQL",
    host: "mdm-ref-data.bank.local",
    database: "RefDataDB",
    status: "Error",
    lastTest: "1 hour ago",
    schemas: 0,
    tables: 0
  }
];

const sampleQueries = [
  {
    name: "Trade Data Quality Check",
    query: `SELECT 
  COUNT(*) as total_trades,
  COUNT(CASE WHEN trade_date IS NULL THEN 1 END) as missing_dates,
  COUNT(CASE WHEN counterparty_id IS NULL THEN 1 END) as missing_counterparty
FROM trades 
WHERE trade_date >= DATEADD(day, -1, GETDATE());`,
    description: "Daily completeness check for critical trade fields"
  },
  {
    name: "BCBS 239 Position Reconciliation",
    query: `SELECT 
  instrument_id,
  SUM(position_qty) as total_position,
  COUNT(DISTINCT source_system) as source_count
FROM positions p
WHERE position_date = '2024-01-15'
GROUP BY instrument_id
HAVING COUNT(DISTINCT source_system) < 2;`,
    description: "Identify positions not reconciled across multiple systems"
  }
];

const SqlConnector = () => {
  const [selectedTab, setSelectedTab] = useState("connections");
  const [connectionForm, setConnectionForm] = useState({
    name: "",
    type: "sqlserver",
    host: "",
    port: "",
    database: "",
    username: "",
    password: ""
  });
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    // Simulate connection test
    setTimeout(() => {
      setTestResult("success");
      setIsTestingConnection(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-success/10 text-success border-success/20";
      case "Error":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "Error":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Database className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SQL Database Connector</h1>
          <p className="text-muted-foreground mt-1">
            Connect to trading and risk databases for metadata discovery and data quality validation
          </p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Connection
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="setup">Setup New</TabsTrigger>
          <TabsTrigger value="explorer">Data Explorer</TabsTrigger>
          <TabsTrigger value="queries">Sample Queries</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          {/* Existing Connections */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Database Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingConnections.map((conn) => (
                  <div key={conn.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(conn.status)}
                        <h4 className="font-medium text-sm">{conn.name}</h4>
                        <Badge variant="outline" className={getStatusColor(conn.status)}>
                          {conn.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {conn.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground">
                        <span>Host: {conn.host}</span>
                        <span>Database: {conn.database}</span>
                        <span>Schemas: {conn.schemas}</span>
                        <span>Tables: {conn.tables}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Last tested: {conn.lastTest}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Explore
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

        <TabsContent value="setup" className="space-y-6">
          {/* Connection Setup Form */}
          <Card className="shadow-card">
            {/* <!-- AI_AGENT:DISCOVERY --> */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Database Connection Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="conn-name">Connection Name</Label>
                    <Input
                      id="conn-name"
                      placeholder="e.g., Trade Booking System"
                      value={connectionForm.name}
                      onChange={(e) => setConnectionForm({...connectionForm, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="db-type">Database Type</Label>
                    <Select value={connectionForm.type} onValueChange={(value) => setConnectionForm({...connectionForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqlserver">SQL Server</SelectItem>
                        <SelectItem value="oracle">Oracle</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="snowflake">Snowflake</SelectItem>
                        <SelectItem value="redshift">Amazon Redshift</SelectItem>
                        <SelectItem value="bigquery">Google BigQuery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="host">Host/Server</Label>
                      <Input
                        id="host"
                        placeholder="database.bank.local"
                        value={connectionForm.host}
                        onChange={(e) => setConnectionForm({...connectionForm, host: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        placeholder="1433"
                        value={connectionForm.port}
                        onChange={(e) => setConnectionForm({...connectionForm, port: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="database">Database Name</Label>
                    <Input
                      id="database"
                      placeholder="TradingDB"
                      value={connectionForm.database}
                      onChange={(e) => setConnectionForm({...connectionForm, database: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <Key className="w-4 h-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Credentials are encrypted and stored securely</span>
                  </div>

                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="service_account"
                      value={connectionForm.username}
                      onChange={(e) => setConnectionForm({...connectionForm, username: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={connectionForm.password}
                      onChange={(e) => setConnectionForm({...connectionForm, password: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleTestConnection}
                      disabled={isTestingConnection}
                      className="flex-1"
                    >
                      {isTestingConnection ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Test Connection
                    </Button>
                    <Button className="flex-1 bg-gradient-primary">
                      <Save className="w-4 h-4 mr-2" />
                      Save Connection
                    </Button>
                  </div>

                  {testResult && (
                    <div className={`p-3 rounded-lg ${testResult === 'success' ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'}`}>
                      <div className="flex items-center gap-2">
                        {testResult === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="text-sm font-medium">
                          {testResult === 'success' ? 'Connection Successful' : 'Connection Failed'}
                        </span>
                      </div>
                      {testResult === 'success' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Found 23 schemas and 145 tables. Ready to import metadata.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explorer" className="space-y-6">
          {/* Data Explorer Interface */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Database Schema Explorer
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Schema
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Schema Tree */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Schemas & Tables</h4>
                  <div className="border rounded-lg p-3 h-64 overflow-y-auto">
                    <div className="space-y-1 text-sm">
                      <div className="font-medium">📁 dbo</div>
                      <div className="pl-4 text-muted-foreground">📊 trades</div>
                      <div className="pl-4 text-muted-foreground">📊 positions</div>
                      <div className="pl-4 text-muted-foreground">📊 counterparties</div>
                      <div className="font-medium">📁 risk</div>
                      <div className="pl-4 text-muted-foreground">📊 risk_factors</div>
                      <div className="pl-4 text-muted-foreground">📊 var_calculations</div>
                      <div className="font-medium">📁 reference</div>
                      <div className="pl-4 text-muted-foreground">📊 currencies</div>
                      <div className="pl-4 text-muted-foreground">📊 instruments</div>
                    </div>
                  </div>
                </div>

                {/* Table Details */}
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-medium text-sm">Table: dbo.trades</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-2">Column</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Nullable</th>
                          <th className="text-left p-2">Key</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr className="border-t">
                          <td className="p-2 font-medium">trade_id</td>
                          <td className="p-2">bigint</td>
                          <td className="p-2">No</td>
                          <td className="p-2">
                            <Badge variant="outline" className="text-xs bg-primary/10">PK</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">trade_date</td>
                          <td className="p-2">datetime</td>
                          <td className="p-2">No</td>
                          <td className="p-2">-</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">counterparty_id</td>
                          <td className="p-2">varchar(50)</td>
                          <td className="p-2">Yes</td>
                          <td className="p-2">
                            <Badge variant="outline" className="text-xs bg-accent/10">FK</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">notional_amount</td>
                          <td className="p-2">decimal(18,2)</td>
                          <td className="p-2">No</td>
                          <td className="p-2">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Import to Data Catalog
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-6">
          {/* Sample Queries */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Data Quality Validation Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sampleQueries.map((query, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-sm">{query.name}</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Execute
                        </Button>
                        <Button variant="outline" size="sm">
                          Save to Library
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{query.description}</p>
                    <Textarea 
                      value={query.query}
                      readOnly
                      className="font-mono text-xs h-32 resize-none"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SqlConnector;
