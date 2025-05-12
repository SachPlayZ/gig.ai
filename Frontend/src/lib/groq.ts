import { Groq } from "groq-sdk";

// Initialize the Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateAIAgent = async (prompt: string) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert Python developer specializing in creating AI agents. Generate clean, well-documented Python code for an AI agent based on the user's requirements. Only return the Python code, no explanations or markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error generating AI agent:", error);
    throw new Error("Failed to generate AI agent");
  }
};

export const fixPythonCode = async (code: string, error: string) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert Python developer. Fix the Python code that has an error. Only return the fixed Python code, no explanations or markdown. The code should be complete and runnable.`,
        },
        {
          role: "user",
          content: `Here is the Python code with an error:\n\n${code}\n\nError message:\n${error}\n\nPlease fix the code and return only the fixed version.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2048,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error fixing Python code:", error);
    throw new Error("Failed to fix Python code");
  }
};
