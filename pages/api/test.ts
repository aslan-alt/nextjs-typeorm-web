import {NextApiHandler} from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://service-016z5g6c-1321594460.sg.apigw.tencentcs.com/v1',
});

export const config = {
  api: {
    bodyParser: false,
  },
};
const f: NextApiHandler = async (req, res) => {
  const response = await openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: '列出5种西安小吃',
    max_tokens: 2000,
    temperature: 0,
    // stream: true,
  });

  if (response?.choices?.[0]?.text) {
    console.log(response?.choices?.[0]?.text);
  } else {
    res.status(404).send({botAnswer: '404 not found'});
  }
  res.status(200).send({botAnswer: 'xxxx'});
};
export default f;
