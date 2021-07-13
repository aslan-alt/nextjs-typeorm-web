import axios from 'axios'
import { message } from 'antd'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { withSession } from 'lib/withSession'
import { User } from 'src/entity/User'
import { useForm } from 'hooks/useForm'
import qs from 'querystring'
import StarsLayout from 'components/StarsLayout'




const SignIn: NextPage<{ user: User }> = (props) => {

    const { form } = useForm({
        initFormData: { username: '', password: '' },
        submit: {
            request: (fromData) => axios.post('/api/sessions', fromData),
            success: (res) => {
                message.success('登陆成功')
                const query = qs.parse(window.location.search.substr(1))
                location.href = query.returnTo.toString()
            }
        },
        fields: [
            { label: '用户名', key: 'username', type: 'text' },
            { label: '密码', key: 'password', type: 'text' }
        ],
        buttonText: '登陆',
        goToSignIn: true
    })
    return (
        <StarsLayout>
            <div className="signIn">
                {form}
            </div>
        </StarsLayout>
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