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

    const errors = { username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[] }

    if (username.trim() === '') {
        errors.username.push('不能为空')
    }
    if (!/[a-zA-z0-9]/.test(username.trim())) {
        errors.username.push('格式错误')
    }
    if (username.trim().length > 42) {
        errors.username.push('超过最大长度')
    }
    if (username.trim().length <= 3) {
        errors.username.push('低于最小长度')
    }
    if (password === '') {
        errors.password.push('不能为空')
    }
    if (passwordConfirmation !== password) {
        errors.passwordConfirmation.push('两次密码不一致')
    }
    const hasErrors = Object.values(errors).find(v => v.length > 0)
    if (hasErrors) {
        console.log('是这里----')
        console.log(errors)
        res.status(422).json(errors)
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
