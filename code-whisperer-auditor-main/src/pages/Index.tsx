import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroSection } from "@/components/HeroSection";
import { MetricCard } from "@/components/MetricCard";
import { TechnicalDebtChart } from "@/components/TechnicalDebtChart";
import { RefactoringPanel } from "@/components/RefactoringPanel";
import { 
  AlertTriangle, 
  Code, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  FileText,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <main className="container mx-auto px-6 py-12 space-y-8">
        {/* Metrics Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Technical Debt Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Debt Score"
              value="72"
              unit="/100"
              icon={<BarChart3 className="h-5 w-5" />}
              trend="+5%"
              status="warning"
            />
            <MetricCard
              title="Code Smells"
              value="147"
              unit="issues"
              icon={<AlertTriangle className="h-5 w-5" />}
              trend="-12%"
              status="success"
            />
            <MetricCard
              title="Coverage"
              value="68"
              unit="%"
              icon={<CheckCircle className="h-5 w-5" />}
              trend="+3%"
              status="info"
            />
            <MetricCard
              title="Complexity"
              value="24"
              unit="avg"
              icon={<Code className="h-5 w-5" />}
              trend="+8%"
              status="danger"
            />
          </div>
        </section>

        {/* Navigation to Code Editor */}
        <div className="flex justify-center mb-8">
          <Link to="/editor">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Code className="h-4 w-4 mr-2" />
              Open Code Editor
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="refactoring" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Refactoring
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TechnicalDebtChart />
              
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Clock className="h-5 w-5 text-warning" />
                    Priority Issues
                  </CardTitle>
                  <CardDescription>Critical technical debt requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { file: "auth/UserService.ts", issue: "Cyclomatic complexity exceeds threshold", severity: "high" },
                    { file: "utils/dataProcessor.js", issue: "Duplicate code blocks detected", severity: "medium" },
                    { file: "api/endpoints.ts", issue: "Missing error handling", severity: "high" },
                    { file: "components/DataTable.tsx", issue: "Large component (500+ lines)", severity: "medium" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.file}</p>
                        <p className="text-xs text-muted-foreground">{item.issue}</p>
                      </div>
                      <Badge 
                        variant={item.severity === "high" ? "destructive" : "secondary"}
                        className="ml-2"
                      >
                        {item.severity}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Code Quality Analysis</CardTitle>
                <CardDescription>Detailed breakdown of code quality metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Maintainability Index", value: 68, max: 100, status: "warning" },
                  { label: "Test Coverage", value: 72, max: 100, status: "success" },
                  { label: "Code Duplication", value: 15, max: 100, status: "success" },
                  { label: "Security Vulnerabilities", value: 8, max: 100, status: "danger" }
                ].map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{metric.label}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}%</span>
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refactoring" className="space-y-6">
            <RefactoringPanel />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Generated Reports</CardTitle>
                <CardDescription>Historical analysis and trend reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Weekly Technical Debt Report", date: "2024-01-15", type: "PDF" },
                  { name: "Refactoring Recommendations", date: "2024-01-14", type: "JSON" },
                  { name: "Code Quality Trends", date: "2024-01-12", type: "CSV" },
                  { name: "Security Analysis Report", date: "2024-01-10", type: "PDF" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date} • {report.type}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;