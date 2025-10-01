import axios from 'axios';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export const openRouterClient = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'HTTP-Referer': 'https://your-site.com',
    'Content-Type': 'application/json',
  }
});

export interface CompletionResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export async function getCompletion(prompt: string, context?: string): Promise<CompletionResponse> {
  try {
    const response = await openRouterClient.post('/chat/completions', {
      model: 'deepseek/deepseek-chat-v3.1:free',
      messages: [
        { role: 'system', content: 'You are a data governance AI assistant.' },
        ...(context ? [{ role: 'system', content: context }] : []),
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 300,
    });
    return {
      success: true,
      response: response.data.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return {
      success: false,
      error: 'Failed to get response from AI model'
    };
  }
}
