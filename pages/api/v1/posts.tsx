import {Post} from '@database/entity/Post';
import {getConnection} from '@database/getConnection';

const posts = async (req, res) => {
  if (req.method === 'POST') {
    const {title, content} = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    const user = (req.session as any).user;
    if (!user) {
      res.status(401).json({message: '未登陆'});
      return;
    }
    post.author = user;
    const connect = await getConnection();
    await connect.manager.save(post);
    res.status(200).json(post);
  }
};
export default posts;
