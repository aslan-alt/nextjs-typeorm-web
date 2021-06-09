import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { withSession } from 'lib/withSession'
import { User } from 'src/entity/User'
import { useForm } from 'hooks/useForm'


const SignIn: NextPage<{ user: User }> = (props) => {
    const { form } = useForm({
        initFormData: { username: '', password: '' },
        submit: {
            request: (fromData) => axios.post('/api/sessions', fromData),
            message: '登陆成功'
        },
        fields: [
            { label: '用户名', key: 'username', type: 'text' },
            { label: '密码', key: 'password', type: 'text' }
        ], text: '登录'
    })
    return (
        <>
            {props.user && <div>当前登陆用户:{props.user.username}</div>}
            <h1> 登陆</h1>
            {form}
        </>
    )
}
export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
    //@ts-ignore
    const user = JSON.parse(JSON.stringify(context.req.session.get('currentUser') || null))
    return {
        props: {
            user
        }
    }
})