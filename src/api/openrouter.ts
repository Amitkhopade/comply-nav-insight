import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'deepseek/deepseek-chat-v3.1:free', temperature = 0.2, max_tokens = 300 } = req.body;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model,
        messages,
        temperature,
        max_tokens,
        headers: {
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL,
          'X-Title': 'Comply Nav Insights'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to get response from AI model',
      details: error.response?.data || error.message
    });
  }
}
