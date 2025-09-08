import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgents } from "./AgentFramework";
import { 
  Bot, 
  Send, 
  Minimize2, 
  Maximize2, 
  MessageCircle,
  User,
  Database,
  Shield,
  GitBranch,
  BarChart3,
  Code,
  Sparkles
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentType?: string;
  suggestions?: string[];
}

interface AgentResponse {
  agentId: string;
  content: string;
  data?: any;
}

const getAgentIcon = (agentType?: string) => {
  switch (agentType) {
    case 'lineage': return GitBranch;
    case 'quality': return BarChart3;
    case 'policy': return Shield;
    case 'sql': return Code;
    case 'discovery': return Database;
    default: return Bot;
  }
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your enhanced AI Data Governance Assistant powered by advanced language models. I can help you with:\n\n' +
        '• Detailed policy analysis and compliance assessment\n' +
        '• Complex data quality investigations\n' +
        '• End-to-end data lineage tracking\n' +
        '• Natural language to SQL translation\n' +
        '• Cross-domain data governance questions\n\n' +
        'How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Analyze compliance gaps in our data policies',
        'Investigate data quality trends across systems',
        'Map data dependencies for critical assets',
        'Generate optimized SQL for compliance reporting',
        'Explain regulatory requirements for PII data'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { agents, runAgent, orchestrateAgents } = useAgents();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeUserQuery = async (query: string): Promise<{ 
    intent: string, 
    agentIds: string[], 
    context: any 
  }> => {
    const queryLower = query.toLowerCase();
    
    // First, always include the OpenRouter agent for enhanced understanding
    const defaultAgents = ['openai-agent'];
    
    // Add specialized agents based on content
    if (queryLower.includes('policy') || queryLower.includes('compliance') || queryLower.includes('regulation')) {
      return { 
        intent: 'policy', 
        agentIds: [...defaultAgents, 'policy-agent'], 
        context: { query, requiresCompliance: true } 
      };
    }
    
    if (queryLower.includes('quality') || queryLower.includes('completeness') || queryLower.includes('accuracy')) {
      return { 
        intent: 'quality', 
        agentIds: [...defaultAgents, 'quality-agent'], 
        context: { query, metrics: ['completeness', 'accuracy', 'timeliness'] } 
      };
    }
    
    if (queryLower.includes('lineage') || queryLower.includes('dependency') || queryLower.includes('impact')) {
      return { 
        intent: 'lineage', 
        agentIds: [...defaultAgents, 'lineage-agent'], 
        context: { query, includeDownstream: true } 
      };
    }
    
    if (queryLower.includes('sql') || queryLower.includes('query') || queryLower.includes('select')) {
      return { intent: 'sql', agentIds: ['sql-agent'], context: { query } };
    }
    
    if (queryLower.includes('discover') || queryLower.includes('catalog') || queryLower.includes('find')) {
      return { intent: 'discovery', agentIds: ['discovery-agent'], context: { query } };
    }
    
    // Multi-agent scenarios
    if (queryLower.includes('compliance check') || queryLower.includes('audit')) {
      return { 
        intent: 'compliance-audit', 
        agentIds: ['policy-agent', 'quality-agent', 'lineage-agent'], 
        context: { query } 
      };
    }
    
    // Default to general assistance
    return { intent: 'general', agentIds: [], context: { query } };
  };

  const simulateAgentResponse = async (agentIds: string[], query: string): Promise<AgentResponse[]> => {
    // <!-- AI_AGENT:ORCHESTRATION -->
    // This would integrate with LangChain/LangGraph for real agent orchestration
    
    const responses: AgentResponse[] = [];
    
    for (const agentId of agentIds) {
      const agent = agents.find(a => a.id === agentId);
      if (!agent) continue;
      
      // Simulate different agent responses based on type
      let content = '';
      let data = {};
      
      switch (agent.type) {
        case 'policy':
          content = `Based on regulatory analysis, I found 3 policies that apply to your query about "${query}". MiFID II requires trade data retention for 5 years, and GDPR mandates PII protection measures.`;
          data = { 
            policies: ['MiFID II', 'GDPR', 'SOX'], 
            compliance_score: 94.2,
            recommendations: ['Enable data masking', 'Update retention policy']
          };
          break;
          
        case 'quality':
          content = `Data quality analysis shows 2 issues in the queried datasets. Completeness is at 87.3% with missing timestamps in trade_orders table.`;
          data = { 
            quality_score: 87.3, 
            issues: ['Missing timestamps', 'Duplicate records'],
            affected_tables: ['trade_orders', 'client_positions']
          };
          break;
          
        case 'lineage':
          content = `Found 12 upstream dependencies and 8 downstream systems affected. The data flows from trading systems through risk engines to regulatory reports.`;
          data = { 
            upstream_count: 12, 
            downstream_count: 8,
            critical_path: ['Trading System', 'Risk Engine', 'Regulatory Reports']
          };
          break;
          
        case 'sql':
          content = `Generated optimized SQL query for your request. The query includes proper joins and filters for performance.`;
          data = { 
            sql: `SELECT t.trade_id, t.trade_date, c.client_name\nFROM trades t\nJOIN clients c ON t.client_id = c.client_id\nWHERE t.trade_date >= '2024-01-01'`,
            estimated_rows: 15420,
            execution_time: '0.3s'
          };
          break;
          
        case 'discovery':
          content = `Discovered 47 new tables in the connected databases. Found potential PII in 8 columns across 3 tables.`;
          data = { 
            new_tables: 47, 
            pii_columns: 8,
            classification_suggestions: ['Confidential', 'Internal', 'Public']
          };
          break;
          
        default:
          content = `Agent ${agent.name} processed your request successfully.`;
      }
      
      responses.push({ agentId, content, data });
    }
    
    return responses;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Analyze user query and determine which agents to use
      const analysis = analyzeUserQuery(inputValue);
      
      if (analysis.agentIds.length > 0) {
        // Run appropriate agents
        const agentResponses = await simulateAgentResponse(analysis.agentIds, inputValue);
        
        // Create assistant response with agent insights
        let assistantContent = '';
        let combinedData = {};
        
        if (agentResponses.length > 1) {
          assistantContent = `I've coordinated with ${agentResponses.length} agents to provide you with comprehensive insights:\n\n`;
          agentResponses.forEach((response, index) => {
            const agent = agents.find(a => a.id === response.agentId);
            assistantContent += `**${agent?.name}**: ${response.content}\n\n`;
            combinedData = { ...combinedData, [response.agentId]: response.data };
          });
        } else if (agentResponses.length === 1) {
          assistantContent = agentResponses[0].content;
          combinedData = agentResponses[0].data;
        }
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: assistantContent,
          timestamp: new Date(),
          agentType: analysis.agentIds[0]?.split('-')[0],
          suggestions: generateSuggestions(analysis.intent)
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Trigger actual agent execution for demo
        if (analysis.agentIds.length === 1) {
          await runAgent(analysis.agentIds[0], analysis.context);
        } else if (analysis.agentIds.length > 1) {
          await orchestrateAgents(analysis.agentIds, analysis.intent);
        }
        
      } else {
        // General response for queries that don't need specific agents
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'I can help you with data governance tasks. Try asking about data quality, policy compliance, data lineage, SQL queries, or data discovery.',
          timestamp: new Date(),
          suggestions: [
            'Show me data quality metrics',
            'What are the BCBS 239 requirements?',
            'Generate SQL for trade reporting',
            'Find all PII in my databases'
          ]
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'system',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSuggestions = (intent: string): string[] => {
    switch (intent) {
      case 'policy':
        return [
          'Show me GDPR compliance status',
          'Which data needs encryption?',
          'List all retention policies'
        ];
      case 'quality':
        return [
          'Run completeness check',
          'Show accuracy metrics',
          'Find duplicate records'
        ];
      case 'lineage':
        return [
          'Show impact analysis',
          'Find downstream dependencies',
          'Map data sources'
        ];
      case 'sql':
        return [
          'Optimize this query',
          'Show execution plan',
          'Generate report query'
        ];
      default:
        return [
          'How do I check data quality?',
          'What policies apply to my data?',
          'Show me data lineage'
        ];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-gradient-primary shadow-elevated hover:shadow-elevated z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 shadow-elevated z-50 transition-all duration-200 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-sm">AI Assistant</CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            ×
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-4rem)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const AgentIcon = getAgentIcon(message.agentType);
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type !== 'user' && (
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <AgentIcon className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${
                      message.type === 'user' ? 'order-2' : ''
                    }`}>
                      <div className={`rounded-lg px-3 py-2 text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.type === 'system'
                          ? 'bg-destructive/10 text-destructive border border-destructive/20'
                          : 'bg-muted text-foreground'
                      }`}>
                        {message.content}
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-6 px-2"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 order-1">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent animate-pulse" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about policies, data quality, lineage..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default AIAssistant;