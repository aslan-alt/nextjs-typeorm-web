import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next'

import { Comment } from 'src/entity/Comment';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';

interface CommentData {
    commentContent: string;
    useId: number | string;
}

const Comments: NextApiHandler = async (req, res) => {
    const { commentContent, useId } = req.body as CommentData
    const comment = new Comment()
    const user = req.session.get('currentUser')
    if (!user) {
        res.status(401).json({ message: '未登陆' });
        return
    }
    res.status(200).json({ name: 'chenggong' });
    // const connect = await getDatabaseConnection()
    // comment.content = commentContent
    // comment.userId = useId
    // await connect.manager.save(comment)

}
export default withSession(Comments)