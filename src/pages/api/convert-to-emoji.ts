import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that converts text to appropriate emojis. Respond only with emojis, no other text."
        },
        {
          role: "user",
          content: text
        }
      ],
      model: "gpt-3.5-turbo",
    }) as OpenAI.Chat.Completions.ChatCompletion;

    const emojiResult = completion.choices[0]?.message?.content || "";

    return res.status(200).json({ 
      result: `${emojiResult}` 
    });
  } catch (error) {
    console.error("Error converting to emoji:", error);
    return res.status(500).json({ error: "Failed to convert text to emoji" });
  }
}
