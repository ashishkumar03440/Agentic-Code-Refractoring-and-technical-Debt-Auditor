import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileExplorer } from "@/components/FileExplorer";
import { CodePanel } from "@/components/CodePanel";
import { ImprovementPanel } from "@/components/ImprovementPanel";
import { PromptWriter } from "@/components/PromptWriter";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ArrowLeft, Settings, Play, Save, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CodeEditor = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>("src/auth/UserService.ts");
  const [isPromptWriterOpen, setIsPromptWriterOpen] = useState(false);
  const [isPromptWriterMinimized, setIsPromptWriterMinimized] = useState(false);

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-12 bg-secondary border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-foreground font-semibold">Code Refactoring Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsPromptWriterOpen(!isPromptWriterOpen)}
            className={isPromptWriterOpen ? "bg-primary/10 text-primary" : ""}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button variant="ghost" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="ghost" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Editor Area */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer selectedFile={selectedFile} onFileSelect={setSelectedFile} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Code Editor */}
        <ResizablePanel defaultSize={55} minSize={40}>
          <CodePanel selectedFile={selectedFile} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Improvements Panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <ImprovementPanel selectedFile={selectedFile} />
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* AI Prompt Writer */}
      <PromptWriter
        selectedFile={selectedFile}
        isOpen={isPromptWriterOpen}
        onClose={() => setIsPromptWriterOpen(false)}
        isMinimized={isPromptWriterMinimized}
        onToggleMinimize={() => setIsPromptWriterMinimized(!isPromptWriterMinimized)}
      />
    </div>
  );
};

export default CodeEditor;