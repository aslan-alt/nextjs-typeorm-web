import { getDatabaseConnection } from 'lib/getDatabaseConnection'
import md5 from 'md5';
import { NextApiHandler } from 'next'
import { User } from 'src/entity/User';
import { SignIn } from 'src/model/SignIn';



const Sessions: NextApiHandler = async (req, res) => {

    const { username, password } = req.body
    const user = await (await getDatabaseConnection()).manager.findOne(User, { where: { username } })
    const signIn = new SignIn()
    signIn.password = password
    signIn.username = username
    await signIn.validate()
    if (signIn.hasErrors()) {
        res.status(422).json(signIn.errors)
        return
    } else {
        res.status(200).json(signIn.user)
    }
}
export default Sessions