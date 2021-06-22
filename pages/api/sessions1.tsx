import { withSession } from 'lib/withSession';
import { NextApiHandler } from 'next'
import { SignIn } from 'src/model/SignIn';



const Sessions: NextApiHandler = async (req, res) => {

    const { username, password } = req.body
    const signIn = new SignIn()
    signIn.password = password
    signIn.username = username
    await signIn.validate()
    if (signIn.hasErrors()) {
        res.status(422).json(signIn.errors)
        return
    } else {
        req.session.set('currentUser', signIn.user)
        await req.session.save()
        res.status(200).json(signIn.user)
    }
}
export default withSession(Sessions)