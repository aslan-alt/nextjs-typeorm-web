import {OpenAIStream, StreamingTextResponse} from 'ai';
import {NextApiHandler} from 'next';
import OpenAI from 'openai';

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const {value, done} = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

async function* makeIterator(array: string[]) {
  for (const i of array) {
    yield encoder.encode(i);
    await sleep(200);
  }
}

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://service-016z5g6c-1321594460.sg.apigw.tencentcs.com/v1',
});
export const runtime = 'edge';
const openAiChat: NextApiHandler = async (req) => {
  const {value} = await (req.body as ReadableStream).getReader().read();

  const stringBody = new TextDecoder().decode(value ?? []);
  const stringBody2 = new TextDecoder().decode(new Uint8Array());
  console.log('stringBody2------------');
  console.log(stringBody2);
  if (stringBody?.length ?? 0) {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: JSON.parse(stringBody)?.prompt,
      max_tokens: 2000,
      temperature: 0,
      stream: true,
    });
    return new StreamingTextResponse(OpenAIStream(response));
  } else {
    return new Response(iteratorToStream(makeIterator(['prompt is required'])));
  }
};
export default openAiChat;
