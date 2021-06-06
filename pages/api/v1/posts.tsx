import { NextApiHandler } from 'next';
import { getPosts } from 'lib/posts';


const Posts: NextApiHandler = async (req, res) => {
  const posts = req.body
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(posts));
  res.end();
};
export default Posts;
