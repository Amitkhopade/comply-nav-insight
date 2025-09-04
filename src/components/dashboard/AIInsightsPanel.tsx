import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react";

interface InsightItem {
  id: string;
  type: 'suggestion' | 'alert' | 'completed';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  aiAgent: string;
  timestamp: string;
  action?: string;
}

const mockInsights: InsightItem[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Potential PII Exposure',
    description: 'Customer SSN detected in analytics sandbox',
    priority: 'high',
    aiAgent: 'AI_AGENT:POLICY',
    timestamp: '2 min ago',
    action: 'Review & Remediate'
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Missing Data Steward',
    description: 'Sales_Customer table lacks assigned steward',
    priority: 'medium',
    aiAgent: 'AI_AGENT:STEWARDSHIP',
    timestamp: '15 min ago',
    action: 'Suggest Steward'
  },
  {
    id: '3',
    type: 'completed',
    title: 'Lineage Updated',
    description: 'ETL pipeline mapping automatically generated',
    priority: 'low',
    aiAgent: 'AI_AGENT:LINEAGE',
    timestamp: '1 hour ago',
    action: 'View Details'
  }
];

export function AIInsightsPanel() {
  const getTypeIcon = (type: InsightItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getPriorityColor = (priority: InsightItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="shadow-card">
      {/* <!-- AI_AGENT:DISCOVERY --> */}
      {/* <!-- AI_AGENT:STEWARDSHIP --> */}
      {/* <!-- AI_AGENT:POLICY --> */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent-foreground" />
            </div>
            <CardTitle className="text-lg">AI Insights</CardTitle>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInsights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="mt-0.5">
              {getTypeIcon(insight.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-medium truncate">{insight.title}</h4>
                <Badge variant="outline" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                  {insight.priority}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                {insight.action && (
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    {insight.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
              
              {/* AI Agent Integration Comment */}
              <div className="text-xs text-muted-foreground mt-1 opacity-60">
                {insight.aiAgent}
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          View All Insights
        </Button>
      </CardContent>
    </Card>
  );
}