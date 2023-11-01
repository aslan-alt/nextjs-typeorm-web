import {NextApiHandler} from 'next';
import {getServerSession} from 'next-auth';
import {UAParser} from 'ua-parser-js';
import {Comment} from '@database/entity/Comment';
import {getConnection} from '@database/getConnection';
import deepClone from '@lib/deepClone';
import {authOptions} from './auth/[...nextauth]';

const GetAllComments: NextApiHandler = async (req, res) => {
  // const ua = req.headers['user-agent'];
  // const result = new UAParser(ua).getResult();
  // const connection = await getConnection();
  //
  // const found = (await connection.manager.find(Comment)).sort(function (a, b) {
  //   return a.createdAt < b.createdAt ? 1 : -1;
  // });
  const session = await getServerSession(req, res, authOptions);
  console.log('session-------');
  console.log(session);
  if (!session) {
    res.status(401).json({message: 'You must be logged in.'});
    return;
  }

  await res.status(200).send({
    comments: [],
    result: {
      message: 'Success',
    },
  });
};
export default GetAllComments;
