
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Copy, Play } from "lucide-react";

interface CodeEditorProps {
  initialCode: string;
  taskId: string;
  onCodeChange?: (code: string) => void;
  onRunCode?: (code: string) => void;
  onSaveCode?: (code: string, taskId: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  taskId,
  onCodeChange,
  onRunCode,
  onSaveCode
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('code');

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleRunCode = () => {
    setActiveTab('output');
    // Simulate running code - in a real app, this would send the code to be executed
    setOutput(`Running code...\n\nOutput:\n${code.length} characters of code processed.\nCode executed successfully.`);
    if (onRunCode) {
      onRunCode(code);
    }
  };

  const handleSaveCode = () => {
    if (onSaveCode) {
      onSaveCode(code, taskId);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Code Editor</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyCode}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleRunCode}>
              <Play className="mr-2 h-4 w-4" />
              Run
            </Button>
            <Button variant="default" size="sm" onClick={handleSaveCode}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="code" className="flex-grow p-4">
            <textarea
              className="w-full h-full min-h-[300px] font-mono text-sm p-4 bg-muted rounded-md focus:outline-none"
              value={code}
              onChange={handleCodeChange}
            />
          </TabsContent>
          <TabsContent value="output" className="flex-grow p-4">
            <pre className="w-full h-full min-h-[300px] font-mono text-sm p-4 bg-black text-green-400 rounded-md overflow-auto">
              {output}
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
