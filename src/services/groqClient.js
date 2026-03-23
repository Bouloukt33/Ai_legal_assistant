import 'dotenv/config';
import Groq from 'groq-sdk';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.warn('Warning: GROQ_API_KEY is not set. Calls to Groq will fail.');
}

export const groqClient = new Groq({ apiKey: apiKey || 'missing-key' });

export const getLegalResponse = async ({
  question,
  systemPrompt,
  model = process.env.GROQ_MODEL || 'gpt-4o-mini',
  temperature = 0.2,
  maxTokens = 400,
}) => {
  if (!question?.trim()) throw new Error('La question est requise.');

  const completion = await groqClient.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ],
    temperature,
    max_tokens: maxTokens,
  });

  const answer = completion.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error('No completion returned from Groq.');
  return answer;
};
