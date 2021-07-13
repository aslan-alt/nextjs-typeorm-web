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
    let found
    try {
        found = await connect.manager.find(User, { username })
    } catch (e) {
        // console.log(e)
    }
    console.log('found-------')
    console.log(found)
    if (found?.length > 0) {
        user.errors.username.push('用户名已存在')
    }
    console.log()
    await user.validate()
    if (user.hasErrors()) {
        res.status(422).json(user.errors)
    } else {
        console.log('user-------')
        console.log(user)
        await connect.manager.save(user)
        res.status(200).json(user)
    }
}
export default Users;
