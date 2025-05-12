import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  SendIcon,
  PlayIcon,
  SaveIcon,
  MessageSquare,
  Terminal,
  Wand2,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generateAIAgent, fixPythonCode } from "@/lib/groq";
import { executeCode, initializePyodide } from "@/lib/codeExecutor";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultPythonCode = `# AI Agent Template
from typing import List, Dict
import json

class AIAgent:
    def __init__(self, name: str, capabilities: List[str]):
        self.name = name
        self.capabilities = capabilities
        self.state = {}
    
    def process_input(self, input_data: Dict) -> Dict:
        # Implement your agent's logic here
        return {"status": "success", "message": "Agent processed input"}
    
    def get_state(self) -> Dict:
        return self.state

# Example usage
if __name__ == "__main__":
    agent = AIAgent(
        name="ExampleAgent",
        capabilities=["text_processing", "data_analysis"]
    )
    result = agent.process_input({"text": "Hello, World!"})
    print(json.dumps(result, indent=2))
`;

const defaultPrompt =
  "Generate a Python AI agent that can process and analyze data";

const AIAgentIDE = () => {
  const [code, setCode] = useState(defaultPythonCode);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastError, setLastError] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Pyodide when the component mounts
    initializePyodide()
      .then(() => {
        setIsPyodideReady(true);
        setOutput("Python runtime is ready. You can now run your code.");
      })
      .catch((error) => {
        setOutput(`Error initializing Python runtime: ${error.message}`);
        toast({
          title: "Error",
          description:
            "Failed to initialize Python runtime. Please refresh the page.",
          variant: "destructive",
        });
      });
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const handleGenerateAIAgent = async () => {
    setIsGenerating(true);
    try {
      const generatedCode = await generateAIAgent(prompt);
      // Strip markdown code block markers if present
      const cleanCode = generatedCode.replace(/^```python\n|^```\n|```$/g, "");
      setCode(cleanCode);
      toast({
        title: "Success",
        description: "AI Agent code generated successfully!",
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const runCode = async () => {
    if (!isPyodideReady) {
      toast({
        title: "Not Ready",
        description: "Python runtime is still initializing. Please wait.",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    setOutput("Executing code...\n");
    try {
      const result = await executeCode(code);
      setOutput(result);
      setHasError(false);
      setLastError("");
      toast({
        title: "Success",
        description: "Code executed successfully!",
      });
    } catch (error: any) {
      const errorMessage = error.message || String(error);
      setOutput(`Error executing code: ${errorMessage}`);
      setHasError(true);
      setLastError(errorMessage);
      console.log("Error occurred:", errorMessage); // Debug log
      console.log("hasError set to:", true); // Debug log
    } finally {
      setIsExecuting(false);
    }
  };

  const handleFixCode = async () => {
    setIsFixing(true);
    try {
      const fixedCode = await fixPythonCode(code, lastError);
      // Strip markdown code block markers if present
      const cleanCode = fixedCode.replace(/^```python\n|^```\n|```$/g, "");
      setCode(cleanCode);
      setOutput(
        (prev) => prev + "\n\nCode has been fixed. Try running it again."
      );
      setHasError(false);
      setLastError("");
      toast({
        title: "Success",
        description: "Code has been fixed. Try running it again.",
      });
    } catch (fixError) {
      setOutput((prev) => prev + `\n\nFailed to fix code: ${fixError}`);
      toast({
        title: "Error",
        description: "Failed to fix code. Please try fixing it manually.",
        variant: "destructive",
      });
    } finally {
      setIsFixing(false);
    }
  };

  const saveCode = () => {
    // Implement code saving logic here
    console.log("Saving code:", code);
    toast({
      title: "Coming Soon",
      description: "Code saving will be available in a future update.",
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Agent IDE</h1>
          <div className="flex gap-4">
            {hasError ? (
              <Button
                onClick={handleFixCode}
                disabled={isFixing}
                className="bg-[#00B4AB] hover:bg-[#00B4AB]/80"
              >
                <Wand2 className="mr-2" size={18} />
                {isFixing ? "Fixing..." : "Fix Code"}
              </Button>
            ) : (
              <Button
                onClick={runCode}
                disabled={isExecuting || !isPyodideReady}
                className="bg-[#064119] hover:bg-[#064119]/80"
              >
                <PlayIcon className="mr-2" size={18} />
                {isExecuting ? "Running..." : "Run"}
              </Button>
            )}
            <Button
              onClick={saveCode}
              className="border-gray-300 hover:bg-[#1A1A1A]/80"
            >
              <SaveIcon className="mr-2" size={18} />
              Save
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#00B4AB] hover:bg-[#00B4AB]/80">
                  <MessageSquare className="mr-2" size={18} />
                  Generate AI Agent
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-[#1A1A1A] border border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Generate AI Agent
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Write a prompt describing the AI agent you want to create.
                    Be specific about its capabilities and functionality.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the AI agent you want to create..."
                    className="min-h-[150px] bg-[#2A2A2A] border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-700 text-white hover:bg-[#2A2A2A]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleGenerateAIAgent}
                    disabled={isGenerating}
                    className="bg-[#00B4AB] hover:bg-[#00B4AB]/80"
                  >
                    <SendIcon className="mr-2" size={18} />
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[calc(100vh-250px)] border border-gray-700 rounded-lg overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              theme="vs-dark"
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="h-[calc(100vh-250px)] border border-gray-700 rounded-lg overflow-hidden bg-[#1E1E1E]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-400">
                  Output
                </span>
                {!isPyodideReady && (
                  <span className="text-xs text-yellow-500 ml-2">
                    (Initializing Python runtime...)
                  </span>
                )}
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-40px)]">
              <pre className="p-4 text-sm font-mono text-gray-300 whitespace-pre-wrap">
                {output || "No output yet. Run your code to see the results."}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIAgentIDE;
