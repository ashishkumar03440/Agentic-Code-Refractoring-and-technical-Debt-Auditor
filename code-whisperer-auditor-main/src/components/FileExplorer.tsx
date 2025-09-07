import { useState } from "react";
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  hasImprovements?: boolean;
  issueCount?: number;
}

const mockFileTree: FileNode[] = [
  {
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        name: "auth",
        path: "src/auth",
        type: "folder",
        children: [
          { name: "UserService.ts", path: "src/auth/UserService.ts", type: "file", hasImprovements: true, issueCount: 3 },
          { name: "AuthProvider.tsx", path: "src/auth/AuthProvider.tsx", type: "file" },
        ]
      },
      {
        name: "components",
        path: "src/components",
        type: "folder",
        children: [
          { name: "DataTable.tsx", path: "src/components/DataTable.tsx", type: "file", hasImprovements: true, issueCount: 2 },
          { name: "UserCard.tsx", path: "src/components/UserCard.tsx", type: "file" },
          {
            name: "ui",
            path: "src/components/ui",
            type: "folder",
            children: [
              { name: "button.tsx", path: "src/components/ui/button.tsx", type: "file" },
              { name: "card.tsx", path: "src/components/ui/card.tsx", type: "file" },
            ]
          }
        ]
      },
      {
        name: "utils",
        path: "src/utils",
        type: "folder",
        children: [
          { name: "dataProcessor.js", path: "src/utils/dataProcessor.js", type: "file", hasImprovements: true, issueCount: 1 },
          { name: "validators.ts", path: "src/utils/validators.ts", type: "file", hasImprovements: true, issueCount: 4 },
        ]
      },
      {
        name: "api",
        path: "src/api",
        type: "folder",
        children: [
          { name: "endpoints.ts", path: "src/api/endpoints.ts", type: "file", hasImprovements: true, issueCount: 2 },
        ]
      }
    ]
  }
];

interface FileExplorerProps {
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
}

export const FileExplorer = ({ selectedFile, onFileSelect }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "src/auth", "src/components", "src/utils", "src/api"]));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;
    
    return (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-secondary/50 text-sm",
            isSelected && "bg-primary/20 text-primary",
            node.hasImprovements && "border-l-2 border-l-warning"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.path);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 text-info" />
              ) : (
                <Folder className="h-4 w-4 text-info" />
              )}
            </>
          ) : (
            <>
              <div className="w-3" />
              <File className="h-4 w-4 text-muted-foreground" />
            </>
          )}
          
          <span className={cn("flex-1", isSelected && "font-medium")}>
            {node.name}
          </span>
          
          {node.hasImprovements && node.issueCount && (
            <span className="bg-warning text-warning-foreground text-xs px-1.5 py-0.5 rounded-full">
              {node.issueCount}
            </span>
          )}
        </div>
        
        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-secondary/30 border-r border-border">
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Explorer</h3>
      </div>
      <div className="p-2 space-y-1">
        {mockFileTree.map(node => renderNode(node))}
      </div>
    </div>
  );
};