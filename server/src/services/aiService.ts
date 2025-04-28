import OpenAI from "openai";
import { ILinkedInProfile, IPersonalizedMessage } from "../types";

class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
  }

  async generatePersonalizedMessage(
    profile: ILinkedInProfile
  ): Promise<IPersonalizedMessage> {
    try {
      const prompt = `
        Generate a personalized, friendly outreach message for a LinkedIn connection request to:
        
        Name: ${profile.name}
        Job Title: ${profile.job_title}
        Company: ${profile.company}
        Location: ${profile.location}
        Profile Summary: ${profile.summary}
        
        The message should:
        1. Be concise (max 200 characters)
        2. Mention their role and company
        3. Highlight how OutFlo (an AI outreach tool for sales teams) could help them
        4. End with a call to action to connect
        5. Sound natural and conversational, not like a generic template
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      });

      const messageContent =
        response.choices[0]?.message?.content?.trim() || "";

      return { message: messageContent };
    } catch (error) {
      //   logger.error("Error generating personalized message:", error);
      console.log("Error generating personalized message:", error);
      throw new Error("Failed to generate personalized message");
    }
  }
}

export const aiService = new AIService();
