import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, Lightbulb } from "lucide-react";

interface CodePanelProps {
  selectedFile: string | null;
}

const mockCodeFiles: Record<string, { content: string; language: string; improvements: Array<{ line: number; type: 'error' | 'warning' | 'info' | 'suggestion'; message: string; }> }> = {
  "src/auth/UserService.ts": {
    language: "typescript",
    content: `export class UserService {
  private users: User[] = [];
  
  // TODO: This method is too long and complex (127 lines)
  public processUser(userData: any): ProcessedUser {
    // Validation logic
    if (!userData) {
      throw new Error("User data is required");
    }
    
    if (!userData.email) {
      throw new Error("Email is required");
    }
    
    if (!userData.name) {
      throw new Error("Name is required");
    }
    
    // Processing logic - should be extracted
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
    
    // Save user
    this.users.push(processedUser);
    
    // Send notifications
    this.sendWelcomeEmail(processedUser);
    this.logUserCreation(processedUser);
    
    return processedUser;
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  private getDefaultPreferences(): UserPreferences {
    return {
      theme: 'light',
      notifications: true,
      language: 'en'
    };
  }
  
  private calculatePermissions(userData: any): string[] {
    // Complex permission calculation logic
    const basePermissions = ['read'];
    
    if (userData.role === 'admin') {
      return [...basePermissions, 'write', 'delete', 'manage'];
    }
    
    if (userData.role === 'editor') {
      return [...basePermissions, 'write'];
    }
    
    return basePermissions;
  }
  
  private enrichUserMetadata(userData: any): UserMetadata {
    return {
      source: 'registration',
      ipAddress: userData.ipAddress || 'unknown',
      userAgent: userData.userAgent || 'unknown',
      referrer: userData.referrer || 'direct'
    };
  }
  
  private sendWelcomeEmail(user: ProcessedUser): void {
    // Email sending logic
    console.log(\`Sending welcome email to \${user.email}\`);
  }
  
  private logUserCreation(user: ProcessedUser): void {
    console.log(\`User created: \${user.id}\`);
  }
}`,
    improvements: [
      { line: 4, type: 'error', message: 'Method is too long (127 lines). Consider extracting smaller methods.' },
      { line: 25, type: 'warning', message: 'Consider using a validation library instead of manual checks.' },
      { line: 45, type: 'suggestion', message: 'Extract user metadata calculation into separate method.' }
    ]
  },
  "src/utils/validators.ts": {
    language: "typescript",
    content: `// Duplicate validation patterns found across multiple files
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\\+?[1-9]\\d{1,14}$/;
  return phoneRegex.test(phone);
};

// TODO: This validation logic is duplicated in UserForm.tsx, ProfileSettings.tsx, and RegistrationForm.tsx
export const validateUserInput = (userData: any): string[] => {
  const errors: string[] = [];
  
  if (!validateEmail(userData.email)) {
    errors.push('Invalid email format');
  }
  
  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, and numbers');
  }
  
  return errors;
};`,
    improvements: [
      { line: 19, type: 'warning', message: 'This validation logic is duplicated across 5 files. Consider creating a shared utility.' },
      { line: 2, type: 'info', message: 'Consider using a validation library like Zod or Yup for better type safety.' }
    ]
  }
};

export const CodePanel = ({ selectedFile }: CodePanelProps) => {
  const fileData = selectedFile ? mockCodeFiles[selectedFile] : null;
  
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

  const getImprovementIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-3 w-3 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3 text-warning" />;
      case 'suggestion':
        return <Lightbulb className="h-3 w-3 text-info" />;
      default:
        return <Info className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getImprovementColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-destructive/20 bg-destructive/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'suggestion':
        return 'border-info/20 bg-info/5';
      default:
        return 'border-border bg-secondary/20';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* File Header */}
      <div className="p-3 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">{selectedFile}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {fileData.language}
            </Badge>
            {fileData.improvements.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {fileData.improvements.length} issues
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={fileData.language}
          style={oneDark}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'hsl(var(--background))',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            color: 'hsl(var(--muted-foreground))',
            paddingRight: '1em',
          }}
        >
          {fileData.content}
        </SyntaxHighlighter>
      </div>

      {/* Improvements Summary */}
      {fileData.improvements.length > 0 && (
        <div className="p-3 border-t border-border bg-secondary/20">
          <h4 className="text-sm font-medium text-foreground mb-2">Code Improvements</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {fileData.improvements.map((improvement, index) => (
              <div key={index} className={`p-2 rounded border text-xs ${getImprovementColor(improvement.type)}`}>
                <div className="flex items-start gap-2">
                  {getImprovementIcon(improvement.type)}
                  <div className="flex-1">
                    <span className="font-medium">Line {improvement.line}:</span> {improvement.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};