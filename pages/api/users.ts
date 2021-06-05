import { NextApiHandler } from 'next';
import { User } from 'src/entity/User';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';


interface SignData {
    username: string;
    password: string;
    passwordConfirmation: string;
}
const Users: NextApiHandler = async (req, res,) => {
    const { username, password, passwordConfirmation } = req.body as SignData
    const connect = await getDatabaseConnection()
    const user = new User()
    user.username = username
    user.password = password
    user.passwordConfirmation = passwordConfirmation
    const found = await connect.manager.find(User, { username })
    if (found.length > 0) {
        user.errors.username.push('用户名已存在')
    }

    await user.validate()
    if (user.hasErrors()) {
        res.status(422).json(user.errors)
    } else {
        await connect.manager.save(user)
        res.status(200).json(user)
    }
}
export default Users;
