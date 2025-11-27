import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  trend?: string;
  status: "success" | "warning" | "danger" | "info";
}

export const MetricCard = ({ title, value, unit, icon, trend, status }: MetricCardProps) => {
  const statusColors = {
    success: "text-success border-success/20 bg-success/10",
    warning: "text-warning border-warning/20 bg-warning/10", 
    danger: "text-destructive border-destructive/20 bg-destructive/10",
    info: "text-info border-info/20 bg-info/10"
  };

  const trendUp = trend?.startsWith("+");
  const trendDown = trend?.startsWith("-");

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg", statusColors[status])}>
            {icon}
          </div>
          {trend && (
            <Badge variant="secondary" className="text-xs">
              {trendUp && <TrendingUp className="w-3 h-3 mr-1" />}
              {trendDown && <TrendingDown className="w-3 h-3 mr-1" />}
              {trend}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
            {value}
            {unit && <span className="text-base text-muted-foreground ml-1">{unit}</span>}
          </p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};