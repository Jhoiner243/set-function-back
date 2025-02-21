import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../../../config';

export class PromptRepository {
  public static async prompt(prompt: string) {
    try {
      const genAi = new GoogleGenerativeAI(API_KEY);
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generar contenido en flujo (stream)
      const result = await model.generateContentStream([prompt]);

      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText; 
      }

      return text; 
    } catch (error) {
      console.error("Error al generar contenido:", error);
      throw new Error("Ocurrió un error al procesar tu solicitud");
    }
  }
}