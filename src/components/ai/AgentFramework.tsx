import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Database, 
  Shield, 
  BarChart3, 
  Code, 
  GitBranch,
  CheckCircle,
  AlertCircle,
  Clock,
  Play,
  Pause,
  Square
} from "lucide-react";

// Agent Interface Definition
export interface Agent {
  id: string;
  name: string;
  description: string;
  type: 'lineage' | 'quality' | 'policy' | 'sql' | 'compliance' | 'discovery';
  status: 'idle' | 'running' | 'completed' | 'error';
  icon: React.ComponentType<any>;
  capabilities: string[];
  lastRun?: Date;
  progress?: number;
  results?: any;
}

// Agent Context for global state management
interface AgentContextType {
  agents: Agent[];
  runAgent: (agentId: string, params?: any) => Promise<any>;
  stopAgent: (agentId: string) => void;
  getAgentStatus: (agentId: string) => Agent['status'];
  registerAgent: (agent: Agent) => void;
  orchestrateAgents: (agentIds: string[], workflow: string) => Promise<any>;
}

const AgentContext = createContext<AgentContextType | null>(null);

// Default agents configuration
const defaultAgents: Agent[] = [
  {
    id: 'lineage-agent',
    name: 'Data Lineage Agent',
    description: 'Analyzes data flow and dependencies across systems',
    type: 'lineage',
    status: 'idle',
    icon: GitBranch,
    capabilities: [
      'SQL parsing for lineage extraction',
      'Cross-system dependency mapping',
      'Impact analysis',
      'Automated lineage discovery'
    ]
  },
  {
    id: 'quality-agent',
    name: 'Data Quality Agent',
    description: 'Monitors data quality metrics and generates recommendations',
    type: 'quality',
    status: 'idle',
    icon: BarChart3,
    capabilities: [
      'Completeness validation',
      'Accuracy assessment',
      'Timeliness monitoring',
      'Consistency checking'
    ]
  },
  {
    id: 'policy-agent',
    name: 'Policy Compliance Agent',
    description: 'Ensures regulatory compliance and policy adherence',
    type: 'policy',
    status: 'idle',
    icon: Shield,
    capabilities: [
      'Regulatory mapping',
      'Compliance checking',
      'Policy Q&A',
      'Risk assessment'
    ]
  },
  {
    id: 'sql-agent',
    name: 'SQL Query Agent',
    description: 'Natural language to SQL translation and query optimization',
    type: 'sql',
    status: 'idle',
    icon: Code,
    capabilities: [
      'Natural language to SQL',
      'Query optimization',
      'Performance analysis',
      'Schema understanding'
    ]
  },
  {
    id: 'discovery-agent',
    name: 'Data Discovery Agent',
    description: 'Automated data cataloging and classification',
    type: 'discovery',
    status: 'idle',
    icon: Database,
    capabilities: [
      'Schema discovery',
      'PII detection',
      'Data classification',
      'Metadata extraction'
    ]
  }
];

// Agent Provider Component
export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);

  const runAgent = useCallback(async (agentId: string, params?: any) => {
    // <!-- AI_AGENT:ORCHESTRATION -->
    // This is where backend agent execution would be triggered
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'running', progress: 0 }
        : agent
    ));

    // Simulate agent execution
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.id === agentId && agent.status === 'running') {
          const newProgress = Math.min((agent.progress || 0) + 10, 100);
          return {
            ...agent,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : 'running',
            lastRun: newProgress === 100 ? new Date() : agent.lastRun
          };
        }
        return agent;
      }));
    }, 500);

    // Clean up after completion
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return { success: true, agentId, params };
  }, []);

  const stopAgent = useCallback((agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'idle', progress: 0 }
        : agent
    ));
  }, []);

  const getAgentStatus = useCallback((agentId: string) => {
    return agents.find(agent => agent.id === agentId)?.status || 'idle';
  }, [agents]);

  const registerAgent = useCallback((newAgent: Agent) => {
    setAgents(prev => {
      const exists = prev.find(agent => agent.id === newAgent.id);
      if (exists) {
        return prev.map(agent => 
          agent.id === newAgent.id ? newAgent : agent
        );
      }
      return [...prev, newAgent];
    });
  }, []);

  const orchestrateAgents = useCallback(async (agentIds: string[], workflow: string) => {
    // <!-- AI_AGENT:ORCHESTRATION -->
    // This would integrate with LangGraph for complex workflows
    console.log(`Orchestrating agents: ${agentIds.join(', ')} for workflow: ${workflow}`);
    
    const results = [];
    for (const agentId of agentIds) {
      const result = await runAgent(agentId, { workflow });
      results.push(result);
    }
    
    return results;
  }, [runAgent]);

  return (
    <AgentContext.Provider value={{
      agents,
      runAgent,
      stopAgent,
      getAgentStatus,
      registerAgent,
      orchestrateAgents
    }}>
      {children}
    </AgentContext.Provider>
  );
}

// Hook to use Agent Context
export function useAgents() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
}

// Agent Status Badge Component
function AgentStatusBadge({ status }: { status: Agent['status'] }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'running':
        return { className: 'bg-primary/10 text-primary border-primary/20', text: 'Running' };
      case 'completed':
        return { className: 'bg-success/10 text-success border-success/20', text: 'Completed' };
      case 'error':
        return { className: 'bg-destructive/10 text-destructive border-destructive/20', text: 'Error' };
      default:
        return { className: 'bg-muted/50 text-muted-foreground border-muted', text: 'Idle' };
    }
  };

  const config = getStatusConfig();
  return (
    <Badge variant="outline" className={config.className}>
      {config.text}
    </Badge>
  );
}

// Agent Control Panel Component
export function AgentControlPanel() {
  const { agents, runAgent, stopAgent } = useAgents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Agent Framework</h2>
          <p className="text-muted-foreground">
            Manage and orchestrate AI agents for data governance tasks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <agent.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{agent.type}</p>
                  </div>
                </div>
                <AgentStatusBadge status={agent.status} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{agent.description}</p>
              
              {agent.progress !== undefined && agent.status === 'running' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{agent.progress}%</span>
                  </div>
                  <Progress value={agent.progress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Capabilities
                </p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 2).map((capability, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {agent.capabilities.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{agent.capabilities.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {agent.lastRun && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Last run: {agent.lastRun.toLocaleString()}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {agent.status === 'running' ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => stopAgent(agent.id)}
                    className="flex-1"
                  >
                    <Square className="w-3 h-3 mr-1" />
                    Stop
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => runAgent(agent.id)}
                    className="flex-1"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Run
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Orchestration Panel */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" />
            Agent Orchestration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => {
                const { orchestrateAgents } = useAgents();
                orchestrateAgents(['discovery-agent', 'quality-agent'], 'data-onboarding');
              }}
            >
              <Database className="w-6 h-6 text-primary" />
              <span className="text-xs">Data Onboarding</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => {
                const { orchestrateAgents } = useAgents();
                orchestrateAgents(['policy-agent', 'quality-agent'], 'compliance-check');
              }}
            >
              <Shield className="w-6 h-6 text-success" />
              <span className="text-xs">Compliance Check</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => {
                const { orchestrateAgents } = useAgents();
                orchestrateAgents(['lineage-agent', 'sql-agent'], 'impact-analysis');
              }}
            >
              <GitBranch className="w-6 h-6 text-accent" />
              <span className="text-xs">Impact Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AgentControlPanel;