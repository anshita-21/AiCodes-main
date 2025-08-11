import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { code } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(
      `Review this code:\n${code}`
    );

    const text = await result.response.text();
    res.status(200).json({ result: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}