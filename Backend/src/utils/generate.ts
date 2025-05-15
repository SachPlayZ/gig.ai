import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generate(prompt: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'AIzaSyDTH5jjua96R-W5SFYFk5SD7DfQJ1treNw');
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}

// async function test() {
//   const response = await generate('Write me a poem about a cat');
//   console.log(response);
// }

// test();
