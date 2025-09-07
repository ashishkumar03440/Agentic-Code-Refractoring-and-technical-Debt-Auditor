import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export const TechnicalDebtChart = () => {
  const data = [
    { name: "Mon", debt: 65, refactored: 12 },
    { name: "Tue", debt: 72, refactored: 18 },
    { name: "Wed", debt: 68, refactored: 15 },
    { name: "Thu", debt: 74, refactored: 22 },
    { name: "Fri", debt: 71, refactored: 19 },
    { name: "Sat", debt: 69, refactored: 16 },
    { name: "Sun", debt: 67, refactored: 14 },
  ];

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          Technical Debt Trends
        </CardTitle>
        <CardDescription>Weekly debt accumulation and resolution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mock Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2 p-4 bg-secondary/30 rounded-lg">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col gap-1 w-full">
                  {/* Debt Bar */}
                  <div 
                    className="bg-destructive rounded-t w-full transition-all duration-300 hover:bg-destructive/80"
                    style={{ height: `${item.debt}%` }}
                  />
                  {/* Refactored Bar */}
                  <div 
                    className="bg-success rounded-b w-full transition-all duration-300 hover:bg-success/80"
                    style={{ height: `${item.refactored}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-destructive" />
              <span className="text-muted-foreground">Technical Debt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-success" />
              <span className="text-muted-foreground">Refactored</span>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">+8.2%</p>
              <p className="text-xs text-muted-foreground">Debt Increase</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">+15.4%</p>
              <p className="text-xs text-muted-foreground">Resolution Rate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};