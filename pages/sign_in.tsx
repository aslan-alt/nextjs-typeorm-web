import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { withSession } from 'lib/withSession'
import { User } from 'src/entity/User'
import { useForm } from 'hooks/useForm'
import qs from 'querystring'
import styled from 'styled-components'
import StarsLayout from 'components/StarsLayout'


const SignInWrapper = styled.div`
    .signIn{
        border:1px solid red;
        width: 600px;
        height: 600px;
    }
    h1{
        text-align: center;
    }
`


const SignIn: NextPage<{ user: User }> = (props) => {



    const { form } = useForm({
        initFormData: { username: '', password: '' },
        submit: {
            request: (fromData) => axios.post('/api/sessions', fromData),
            success: (res) => {
                alert('登陆成功')
                const query = qs.parse(window.location.search.substr(1))
                location.href = query.returnTo.toString()
            }
        },
        fields: [
            { label: '用户名', key: 'username', type: 'text' },
            { label: '密码', key: 'password', type: 'text' }
        ], text: '登录'
    })
    return (
        <StarsLayout>
            <SignInWrapper>
                <div className="signIn">
                    {props.user && <div>当前登陆用户:{props.user.username}</div>}
                    <h1> 登陆</h1>
                    {form}
                </div>
            </SignInWrapper>
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