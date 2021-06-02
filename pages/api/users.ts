import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import md5 from 'md5'

interface SignData {
    username: string;
    password: string;
    passwordConfirmation: string;
}

const Posts: NextApiHandler = async (req, res,) => {
    const { username, password, passwordConfirmation } = req.body as SignData
    const user = new User()
    user.username = username
    user.password = password
    user.passwordConfirmation = passwordConfirmation
    await user.validate()
    if (user.hasErrors()) {
        res.status(422).json(user.errors)
    } else {
        const connect = await getDatabaseConnection()
        const user = new User()
        user.username = username
        user.passwordDigest = md5(password)
        await connect.manager.save(user)
        res.status(200).json(user)
    }






};
export default Posts;
