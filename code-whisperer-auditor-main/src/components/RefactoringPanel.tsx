import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Zap, Code, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export const RefactoringPanel = () => {
  const suggestions = [
    {
      id: 1,
      title: "Extract Method: calculateUserMetrics",
      file: "src/services/UserService.ts",
      description: "Method 'processUser' is too long (127 lines). Extract calculation logic into separate method.",
      impact: "High",
      effort: "Medium",
      savings: "4h/week",
      status: "pending"
    },
    {
      id: 2,
      title: "Eliminate Code Duplication",
      file: "src/utils/validators.ts",
      description: "Similar validation logic repeated across 5 files. Create shared validation utilities.",
      impact: "Medium",
      effort: "Low",
      savings: "2h/week", 
      status: "in-progress"
    },
    {
      id: 3,
      title: "Replace Magic Numbers",
      file: "src/constants/api.ts",
      description: "Replace hardcoded timeout values with named constants throughout the codebase.",
      impact: "Low",
      effort: "Low",
      savings: "1h/week",
      status: "completed"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bot className="h-6 w-6 text-primary" />
            AI Refactoring Assistant
          </CardTitle>
          <CardDescription>
            Intelligent code improvement suggestions powered by advanced static analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">23</p>
              <p className="text-sm text-muted-foreground">Active Suggestions</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
              <Code className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">12</p>
              <p className="text-sm text-muted-foreground">Completed This Week</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-info/10 border border-info/20">
              <Clock className="h-8 w-8 text-info mx-auto mb-2" />
              <p className="text-2xl font-bold text-info">32h</p>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
          </div>

          <Tabs defaultValue="suggestions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="automated">Auto-Fixes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="bg-secondary/50 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(suggestion.status)}
                        <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                      </div>
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} Impact
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.file}</p>
                    <p className="text-sm text-foreground mb-4">{suggestion.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Effort: {suggestion.effort}</span>
                        <span>Saves: {suggestion.savings}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {suggestion.status === "pending" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Zap className="h-3 w-3 mr-1" />
                            Apply Fix
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="automated" className="space-y-4">
              <Card className="bg-secondary/30 border-border">
                <CardContent className="p-6 text-center">
                  <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Automated Refactoring</h3>
                  <p className="text-muted-foreground mb-4">
                    Enable AI-powered automatic fixes for common code quality issues
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Configure Auto-Fixes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="text-center text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Refactoring history will appear here once you start applying suggestions</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};