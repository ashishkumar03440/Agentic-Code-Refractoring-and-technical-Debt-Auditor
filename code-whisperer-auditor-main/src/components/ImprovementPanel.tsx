import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle, 
  Clock, 
  Zap, 
  TrendingUp,
  FileText,
  Settings
} from "lucide-react";

interface ImprovementPanelProps {
  selectedFile: string | null;
}

const mockImprovements: Record<string, {
  score: number;
  issues: Array<{
    type: 'critical' | 'major' | 'minor' | 'suggestion';
    title: string;
    description: string;
    effort: 'Low' | 'Medium' | 'High';
    impact: 'Low' | 'Medium' | 'High';
    autoFixable: boolean;
  }>;
  suggestions: Array<{
    title: string;
    description: string;
    benefit: string;
  }>;
}> = {
  "src/auth/UserService.ts": {
    score: 45,
    issues: [
      {
        type: 'critical',
        title: 'Method Too Complex',
        description: 'processUser method has cyclomatic complexity of 15 (threshold: 10)',
        effort: 'High',
        impact: 'High',
        autoFixable: false
      },
      {
        type: 'major',
        title: 'Missing Error Handling',
        description: 'Async operations without proper error handling',
        effort: 'Medium',
        impact: 'High',
        autoFixable: false
      },
      {
        type: 'minor',
        title: 'Magic Numbers',
        description: 'Hardcoded values should be constants',
        effort: 'Low',
        impact: 'Low',
        autoFixable: true
      }
    ],
    suggestions: [
      {
        title: 'Extract Method: calculateUserMetrics',
        description: 'Break down the large processUser method into smaller, focused methods',
        benefit: 'Improves readability and testability'
      },
      {
        title: 'Add Input Validation Layer',
        description: 'Implement a validation schema using Zod or similar library',
        benefit: 'Better type safety and error messages'
      }
    ]
  },
  "src/utils/validators.ts": {
    score: 72,
    issues: [
      {
        type: 'major',
        title: 'Code Duplication',
        description: 'Validation logic duplicated across 5 files',
        effort: 'Medium',
        impact: 'Medium',
        autoFixable: true
      },
      {
        type: 'suggestion',
        title: 'Use Validation Library',
        description: 'Consider replacing manual validation with a library',
        effort: 'Medium',
        impact: 'Medium',
        autoFixable: false
      }
    ],
    suggestions: [
      {
        title: 'Create Shared Validation Utilities',
        description: 'Centralize validation logic to reduce duplication',
        benefit: 'Reduces maintenance burden and ensures consistency'
      }
    ]
  }
};

export const ImprovementPanel = ({ selectedFile }: ImprovementPanelProps) => {
  const data = selectedFile ? mockImprovements[selectedFile] : null;
  
  if (!selectedFile || !data) {
    return (
      <div className="h-full bg-secondary/20 border-l border-border p-4">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a file to view improvements</p>
        </div>
      </div>
    );
  }

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-destructive border-destructive/20 bg-destructive/5';
      case 'major':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'minor':
        return 'text-info border-info/20 bg-info/5';
      case 'suggestion':
        return 'text-success border-success/20 bg-success/5';
      default:
        return 'text-muted-foreground border-border bg-secondary/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="h-full bg-secondary/20 border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Code Analysis</h3>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Code Quality Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Quality Score</span>
            <span className={`text-lg font-bold ${getScoreColor(data.score)}`}>
              {data.score}/100
            </span>
          </div>
          <Progress value={data.score} className="h-2" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Issues */}
        <Card className="bg-background/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Issues ({data.issues.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.issues.map((issue, index) => (
              <div key={index} className={`p-3 rounded-lg border ${getIssueColor(issue.type)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium">{issue.title}</h4>
                  {issue.autoFixable && (
                    <Badge variant="outline" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Auto-fix
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{issue.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span>Effort: {issue.effort}</span>
                  <span>Impact: {issue.impact}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    View Details
                  </Button>
                  {issue.autoFixable && (
                    <Button size="sm" className="text-xs h-7 bg-primary hover:bg-primary/90">
                      <Zap className="h-3 w-3 mr-1" />
                      Fix
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-background/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-info" />
              AI Suggestions ({data.suggestions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 rounded-lg border border-info/20 bg-info/5">
                <h4 className="text-sm font-medium text-foreground mb-2">{suggestion.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                <div className="flex items-center gap-1 text-xs text-success mb-3">
                  <TrendingUp className="h-3 w-3" />
                  {suggestion.benefit}
                </div>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Apply Suggestion
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-background/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <CheckCircle className="h-3 w-3 mr-2" />
              Run Full Analysis
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Zap className="h-3 w-3 mr-2" />
              Apply All Auto-fixes
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Clock className="h-3 w-3 mr-2" />
              View History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};