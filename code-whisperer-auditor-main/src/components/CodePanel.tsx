import { useEffect, useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Badge } from "@/components/ui/badge";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

interface CodePanelProps {
  selectedFile: string | null;
}

const mockCodeFiles: Record<
  string,
  {
    content: string;
    language: string;
    improvements: Array<{
      line: number;
      type: "error" | "warning" | "info" | "suggestion";
      message: string;
    }>;
  }
> = {
  "src/auth/UserService.ts": {
    language: "typescript",
    content: `export class UserService {
  private users: User[] = [];
  
  public processUser(userData: any): ProcessedUser {
    if (!userData) throw new Error("User data is required");
    if (!userData.email) throw new Error("Email is required");
    if (!userData.name) throw new Error("Name is required");

    const processedUser = {
      id: this.generateId(),
      email: userData.email.toLowerCase(),
      name: userData.name.trim(),
      createdAt: new Date(),
      isActive: true,
      preferences: this.getDefaultPreferences(),
      permissions: this.calculatePermissions(userData),
      metadata: this.enrichUserMetadata(userData)
    };

    this.users.push(processedUser);
    this.sendWelcomeEmail(processedUser);
    this.logUserCreation(processedUser);
    
    return processedUser;
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}`,
    improvements: [
      {
        line: 4,
        type: "error",
        message: "Method too long. Extract smaller functions.",
      },
      {
        line: 10,
        type: "warning",
        message: "Use validation library like Zod instead of manual checks.",
      },
      {
        line: 20,
        type: "suggestion",
        message: "Consider separating processing logic.",
      },
    ],
  },

  "src/utils/validators.ts": {
    language: "typescript",
    content: `export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};`,
    improvements: [
      {
        line: 1,
        type: "info",
        message: "Consider using Yup or Zod for validation.",
      },
    ],
  },
};

export const CodePanel = ({ selectedFile }: CodePanelProps) => {
  const fileData = selectedFile ? mockCodeFiles[selectedFile] : null;
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState("");

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (!selectedFile || !fileData || !editorRef.current) return;

    setCode(fileData.content);

    const markers = fileData.improvements.map((i) => ({
      startLineNumber: i.line,
      startColumn: 1,
      endLineNumber: i.line,
      endColumn: 200,
      message: i.message,
      severity:
        i.type === "error"
          ? monaco.MarkerSeverity.Error
          : i.type === "warning"
          ? monaco.MarkerSeverity.Warning
          : monaco.MarkerSeverity.Info,
    }));

    const model = editorRef.current.getModel();
    if (model) {
      monaco.editor.setModelMarkers(model, "owner", markers);
    }
  }, [selectedFile]);

  if (!selectedFile || !fileData) {
    return (
      <div className="h-full bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select a file from the explorer to view code</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-3 border-b border-border bg-secondary/30 flex justify-between">
        <h3 className="text-sm font-medium">{selectedFile}</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">{fileData.language}</Badge>
          {fileData.improvements.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {fileData.improvements.length} issues
            </Badge>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          value={code}
          onChange={(v) => setCode(v || "")}
          onMount={handleMount}
          defaultLanguage={fileData.language}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Improvement list */}
      <div className="p-3 border-t border-border bg-secondary/20 text-xs space-y-1">
        {fileData.improvements.map((i, idx) => (
          <div key={idx} className="flex gap-2">
            {i.type === "error" && (
              <AlertTriangle className="text-red-500 h-4 w-4" />
            )}
            {i.type === "warning" && (
              <AlertTriangle className="text-yellow-500 h-4 w-4" />
            )}
            {i.type === "suggestion" && (
              <Lightbulb className="text-blue-500 h-4 w-4" />
            )}
            <span>
              <b>Line {i.line}:</b> {i.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
