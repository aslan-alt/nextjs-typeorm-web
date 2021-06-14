import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next';
import { Post } from 'src/entity/Post';

const Posts: NextApiHandler = withSession(
  async (req, res) => {
    if (req.method === 'POST') {
      const { title, content } = req.body
      const post = new Post()
      post.title = title
      post.content = content
      const user = req.session.get('currentUser')
      if (!user) {
        res.status(401).json({ message: '未登陆' });
        return
      }
      post.author = user
      const connect = await getDatabaseConnection()
      await connect.manager.save(post)
      res.status(200).json(post);
    }
  }
);
export default Posts;
