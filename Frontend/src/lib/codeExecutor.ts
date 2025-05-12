import { loadPyodide } from "pyodide";

let pyodide: any = null;

export const initializePyodide = async () => {
  if (!pyodide) {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
    });
    // Load required packages
    await pyodide.loadPackage(["numpy", "pandas"]);
  }
  return pyodide;
};

export const executeCode = async (code: string): Promise<string> => {
  try {
    const pyodide = await initializePyodide();

    // Capture stdout
    let stdout = "";
    pyodide.setStdout({
      write: (text: string) => {
        stdout += text;
      },
    });

    // Execute the code
    await pyodide.runPythonAsync(code);

    return stdout || "Code executed successfully with no output.";
  } catch (error: any) {
    // Ensure we're throwing a proper error
    const errorMessage = error.message || String(error);
    console.error("Python execution error:", errorMessage);
    throw new Error(errorMessage);
  }
};
