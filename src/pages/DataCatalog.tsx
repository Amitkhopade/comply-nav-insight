import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Database, 
  User, 
  Calendar,
  Shield,
  BarChart3,
  Bot,
  Plus
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockDatasets = [
  {
    id: 1,
    name: "customer_analytics",
    description: "Comprehensive customer behavior and demographic data",
    owner: "Sarah Chen",
    classification: "Confidential",
    quality: 94,
    lastUpdated: "2024-01-15",
    records: "2.3M",
    status: "Active",
    tags: ["Customer", "Analytics", "Marketing"]
  },
  {
    id: 2,
    name: "financial_reports_q4",
    description: "Quarterly financial reporting data with regulatory metrics",
    owner: "Michael Johnson",
    classification: "Restricted",
    quality: 98,
    lastUpdated: "2024-01-14",
    records: "450K",
    status: "Active",
    tags: ["Finance", "Regulatory", "Quarterly"]
  },
  {
    id: 3,
    name: "employee_directory",
    description: "Employee contact information and organizational structure",
    owner: "Lisa Wang",
    classification: "Internal",
    quality: 89,
    lastUpdated: "2024-01-13",
    records: "8.5K",
    status: "Active",
    tags: ["HR", "Directory", "Internal"]
  }
];

const DataCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassification, setSelectedClassification] = useState("");

  const getQualityColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 80) return "text-warning";
    return "text-destructive";
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Restricted":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Confidential":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Catalog</h1>
          <p className="text-muted-foreground mt-1">
            Discover, understand, and govern your data assets
          </p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Register Dataset
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search datasets, descriptions, or owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedClassification} onValueChange={setSelectedClassification}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classifications</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="confidential">Confidential</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions Panel */}
      <Card className="shadow-card border-accent/20">
        {/* <!-- AI_AGENT:STEWARDSHIP --> */}
        {/* <!-- AI_AGENT:DISCOVERY --> */}
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent-foreground" />
            </div>
            <CardTitle className="text-lg">AI Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-accent/5 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                <User className="w-3 h-3 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">Suggest Data Steward</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The "customer_analytics" dataset lacks an assigned steward. Based on access patterns and domain expertise, we recommend Sarah Chen from the Marketing Analytics team.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Assign Steward
                  </Button>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dataset Grid */}
      <div className="grid gap-6">
        {mockDatasets.map((dataset) => (
          <Card key={dataset.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{dataset.name}</h3>
                      <Badge variant="outline" className={getClassificationColor(dataset.classification)}>
                        {dataset.classification}
                      </Badge>
                      <Badge variant="secondary">{dataset.status}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{dataset.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="font-medium">{dataset.owner}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Quality:</span>
                  <span className={`font-medium ${getQualityColor(dataset.quality)}`}>
                    {dataset.quality}%
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Records:</span>
                  <span className="font-medium">{dataset.records}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium">{dataset.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline">
          Load More Datasets
        </Button>
      </div>
    </div>
  );
};

export default DataCatalog;