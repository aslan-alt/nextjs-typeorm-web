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
    const now = new Date()
    comment.content = commentContent
    comment.userId = user.id
    comment.postId = 0
    comment.user = user

    console.log('comment-------')
    console.log(comment)
    comment.createdAt = now
    comment.updateAt = now
    comment.nickname = user.username
    await connect.manager.save(comment)
    res.status(200).json(comment);
}
export default withSession(Comments)