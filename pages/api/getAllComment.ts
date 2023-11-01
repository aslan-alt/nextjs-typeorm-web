import {NextApiHandler} from 'next';
import {UAParser} from 'ua-parser-js';
import {Comment} from '@database/entity/Comment';
import {getConnection} from '@database/getConnection';
import deepClone from '@lib/deepClone';

const GetAllComments: NextApiHandler = async (req, res) => {
  const ua = req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  const connection = await getConnection();

  const found = (await connection.manager.find(Comment)).sort(function (a, b) {
    return a.createdAt < b.createdAt ? 1 : -1;
  });

  await res.status(200).send({
    comments: deepClone(found),
    result: deepClone(result),
  });
};
export default GetAllComments;
