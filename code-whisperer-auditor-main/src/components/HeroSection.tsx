import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, Sparkles, Upload } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-6">
      <div className="absolute inset-0 bg-background/5" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 animate-pulse-glow">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Code Analysis
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Agentic Code Refactoring
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/90">
            Technical Debt Auditor
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Leverage advanced AI agents to automatically identify, analyze, and resolve technical debt in your codebase. 
            Get intelligent refactoring suggestions that improve maintainability and reduce complexity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
              <Upload className="w-5 h-5 mr-2" />
              Upload Repository
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Bot className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: <Code className="w-8 h-8" />, title: "Smart Analysis", desc: "AI-powered code quality assessment" },
              { icon: <Bot className="w-8 h-8" />, title: "Auto Refactoring", desc: "Intelligent code improvement suggestions" },
              { icon: <Sparkles className="w-8 h-8" />, title: "Real-time Monitoring", desc: "Continuous technical debt tracking" }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-info/20 rounded-full blur-lg animate-float" style={{ animationDelay: "2s" }} />
    </section>
  );
};