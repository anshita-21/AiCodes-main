export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { code } = req.body;

    // Call Gemini API using the environment variable
    const apiKey = process.env.GOOGLE_GEMINI_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Review this code:\n${code}` }] }]
        })
      }
    );

    const data = await response.json();
    res.status(200).json({ result: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}