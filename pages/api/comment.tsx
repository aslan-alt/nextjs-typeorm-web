import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next'

import { Comment } from 'src/entity/Comment';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';

interface CommentData {
    commentContent: string;
    useId: number | string;
}

const Comments: NextApiHandler = async (req, res) => {
    const { commentContent } = req.body as CommentData
    const user = req.session.get('currentUser')


    const comment = new Comment()

    if (!user) {
        res.status(401).json({ message: '未登陆' });
        return
    }
    const connect = await getDatabaseConnection()
    comment.content = commentContent
    comment.userId = user.id
    comment.postId = 0
    comment.user = user
    comment.updateAt = new Date()
    console.log('comment-------')
    console.log(comment)
    await connect.manager.save(comment)
    res.status(200).json(comment);
}
export default withSession(Comments)