import { Code2, Target, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -top-20 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
          </div>
          <div className="relative z-10">
            <Code2 className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4 gradient-text">About TechDebt</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering developers to write cleaner, more maintainable code through intelligent technical debt analysis
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that every line of code matters. Our mission is to provide developers with the tools and insights 
                they need to identify, understand, and eliminate technical debt before it becomes a critical issue. By combining 
                advanced code analysis with intuitive visualizations, we make it easier than ever to maintain code quality and 
                accelerate development.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We deliver accurate, actionable insights that help you make informed decisions about your codebase
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Fast analysis and real-time feedback to keep your development workflow moving at full speed
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built for teams, designed to foster better communication and shared understanding of code quality
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Why Choose Us?</h2>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Our proprietary algorithms analyze your codebase in-depth, identifying patterns and issues that 
                    other tools might miss.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Developer-First</h3>
                  <p className="text-muted-foreground">
                    Built by developers, for developers. We understand your workflow and designed our tools to fit 
                    seamlessly into your existing processes.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Continuous Improvement</h3>
                  <p className="text-muted-foreground">
                    We're constantly evolving our platform based on user feedback and the latest industry best practices.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Scalable Solution</h3>
                  <p className="text-muted-foreground">
                    Whether you're working on a small project or managing enterprise-scale applications, our platform 
                    scales with your needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Made By Section */}
        <div className="text-center mt-20 border-t border-primary/20 pt-8">
          <p className="text-lg text-muted-foreground mb-2">
            <span className="font-semibold text-primary">Made with ❤️ by</span> Akrati Gupta &amp; Ashish Kumar
          </p>
          <div className="text-sm text-muted-foreground">
            <p>
              📧 <span className="font-medium">Ashish:</span> 
              <a href="mailto:ashishkumar03440@gmail.com" className="text-primary hover:underline ml-1">
                ashishkumar03440@gmail.com
              </a>
            </p>
            <p>
              📧 <span className="font-medium">Akrati:</span> 
              <a href="mailto:akratigarg1@gmail.com" className="text-primary hover:underline ml-1">
                akratigupta1@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
