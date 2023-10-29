import {OpenAIStream, StreamingTextResponse} from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://service-016z5g6c-1321594460.sg.apigw.tencentcs.com/v1',
});
export const runtime = 'edge';
export async function POST(req: Request) {
  const {messages} = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  return new StreamingTextResponse(OpenAIStream(response));
}
