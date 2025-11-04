import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, Sparkles, Upload } from "lucide-react";

export const HeroSection = () => {
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 📁 Upload repository handler
  const handleUploadRepo = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("repo", file);

    try {
      const res = await fetch("http://localhost:5000/api/repo/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");
      alert("✅ Repository uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 🤖 Initialize scan handler
  const handleStartScan = async () => {
    setScanning(true);

    try {
      const res = await fetch("http://localhost:5000/api/scan/start", {
        method: "POST"
      });

      if (!res.ok) throw new Error("Scan failed");
      alert("✅ Code scan started!");
    } catch (err) {
      console.error(err);
      alert("❌ Scan failed");
    } finally {
      setScanning(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero px-6">
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".zip"
        onChange={(e) => {
          if (e.target.files?.[0]) handleUploadRepo(e.target.files[0]);
        }}
      />

      <div className="container mx-auto relative z-10 text-center">
        <Badge className="mb-8 bg-primary/20 text-primary border-primary/50 backdrop-blur-sm animate-pulse-glow">
          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
          AI-Powered Code Analysis Engine
        </Badge>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent leading-tight"
          style={{ animation: "neon-flicker 3s ease-in-out infinite" }}>
          AGENTIC
          <span className="block text-5xl md:text-7xl mt-2">
            CODE REFACTORING
          </span>
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary uppercase tracking-wider">
          Technical Debt Auditor
        </h2>

        <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Deploy advanced AI agents to <span className="text-primary font-semibold">scan</span>, 
          <span className="text-primary font-semibold"> analyze</span> and 
          <span className="text-primary font-semibold"> refactor</span> your entire codebase.
        </p>

        {/* ✅ Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          
          <Button
            size="lg"
            disabled={uploading}
            className="bg-primary text-background hover:bg-primary/90 border border-primary/30 shadow-neon text-lg px-8 py-4 font-semibold uppercase tracking-wide"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-6 h-6 mr-3" />
            {uploading ? "Uploading..." : "Upload Repository"}
          </Button>

          <Button
            size="lg"
            variant="outline"
            disabled={scanning}
            className="border-primary/50 text-primary bg-background/20 hover:bg-primary/10 backdrop-blur-sm text-lg px-8 py-4 font-semibold uppercase tracking-wide"
            onClick={handleStartScan}
          >
            <Bot className="w-6 h-6 mr-3" />
            {scanning ? "Scanning..." : "Initialize Scan"}
          </Button>

        </div>

        {/* ✅ Feature Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {[
            { icon: <Code className="w-10 h-10" />, title: "Deep Analysis", desc: "Neural code comprehension" },
            { icon: <Bot className="w-10 h-10" />, title: "Auto Refactoring", desc: "Autonomous optimization engine" },
            { icon: <Sparkles className="w-10 h-10" />, title: "Real-time Intel", desc: "Continuous threat detection" }
          ].map((f, i) => (
            <div key={i} className="text-center animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-glow">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 uppercase">{f.title}</h3>
              <p className="text-foreground/80 font-mono text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
