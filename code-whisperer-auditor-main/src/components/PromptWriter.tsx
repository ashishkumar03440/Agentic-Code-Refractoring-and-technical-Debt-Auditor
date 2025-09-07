import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Sparkles, 
  Code, 
  FileText, 
  Zap, 
  X,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeChanges?: {
    file: string;
    changes: string;
  }[];
}

interface PromptWriterProps {
  selectedFile: string | null;
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const mockResponses = [
  "I'll help you refactor this code. Let me extract the validation logic into a separate utility function to reduce duplication.",
  "I can optimize this method by breaking it into smaller, more focused functions. This will improve readability and maintainability.",
  "I notice some potential performance issues. Let me suggest some improvements to optimize this code.",
  "I'll add proper error handling and type safety to make this code more robust."
];

export const PromptWriter = ({ 
  selectedFile, 
  isOpen, 
  onClose, 
  isMinimized, 
  onToggleMinimize 
}: PromptWriterProps) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I\'m your AI coding assistant. I can help you refactor code, fix bugs, add features, and improve code quality. What would you like me to help you with?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
        codeChanges: selectedFile ? [{
          file: selectedFile,
          changes: "Refactored validation logic and extracted utility functions"
        }] : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const quickPrompts = [
    { icon: Code, text: "Refactor this code", prompt: "Please refactor the selected code to improve readability and maintainability" },
    { icon: Zap, text: "Optimize performance", prompt: "Analyze and optimize this code for better performance" },
    { icon: FileText, text: "Add documentation", prompt: "Add comprehensive documentation and type annotations to this code" },
    { icon: Sparkles, text: "Fix issues", prompt: "Identify and fix any bugs or potential issues in this code" }
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 bg-background border border-border rounded-lg shadow-xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">AI Assistant</span>
          {selectedFile && (
            <Badge variant="outline" className="text-xs">
              {selectedFile.split('/').pop()}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="h-6 w-6 p-0"
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 p-3 h-[400px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.codeChanges && (
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <div className="text-xs opacity-80 mb-1">Code changes:</div>
                        {message.codeChanges.map((change, index) => (
                          <div key={index} className="text-xs bg-background/20 rounded p-1 mb-1">
                            <div className="font-mono">{change.file}</div>
                            <div className="opacity-80">{change.changes}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <Separator />

          {/* Quick Actions */}
          <div className="p-2 bg-secondary/20">
            <div className="grid grid-cols-2 gap-1">
              {quickPrompts.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs justify-start"
                  onClick={() => setPrompt(item.prompt)}
                >
                  <item.icon className="h-3 w-3 mr-1" />
                  {item.text}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={selectedFile ? `Ask about ${selectedFile.split('/').pop()}...` : "Ask me anything about your code..."}
                className="min-h-[60px] resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!prompt.trim() || isLoading}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Press Cmd+Enter to send
            </div>
          </form>
        </>
      )}
    </div>
  );
};