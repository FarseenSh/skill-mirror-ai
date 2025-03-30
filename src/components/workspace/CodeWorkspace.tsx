
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";

interface CodeWorkspaceProps {
  problemCode: string;
  onSubmitSolution: (solution: string) => void;
}

export const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({
  problemCode,
  onSubmitSolution
}) => {
  const [solution, setSolution] = useState<string>('// Add your solution here');
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Project Workspace</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Resources</Button>
          <Button variant="default" size="sm" onClick={() => onSubmitSolution(solution)}>
            Submit Work
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t">
          <div className="p-4 bg-muted/40">
            <div className="flex items-center gap-2 text-sm font-mono mb-2">
              <FileCode className="h-4 w-4" />
              <span>auth-service.js</span>
            </div>
            <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono">
              {problemCode}
            </pre>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 cursor-pointer mb-2" 
                onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
              <span className="font-mono text-sm">Your Solution:</span>
            </div>
            
            {showSolution && (
              <div className="bg-gray-900 text-gray-50 p-4 rounded-md">
                <textarea
                  className="w-full h-64 bg-transparent font-mono text-sm focus:outline-none resize-none"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
