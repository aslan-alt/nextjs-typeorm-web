import axios from 'axios'
import { message } from 'antd'
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { User } from 'src/entity/User'
import { useForm } from 'hooks/useForm'
import qs from 'querystring'
import StarsLayout from 'components/StarsLayout'
import {ironOptions} from "../lib/withSession";




const SignIn: NextPage<{ user: User }> = () => {

    const { form } = useForm({
        initFormData: { username: '', password: '' },
        submit: {
            request: (fromData) => axios.post('/api/sessions', fromData),
            success: () => {
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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async (context: GetServerSidePropsContext) => {
    const user = JSON.parse(JSON.stringify((context.req.session as any).user || null))
    return {
        props: {
            user
        }
    }
},ironOptions)