import axios from 'axios'
import { NextPage } from 'next'
import { useForm } from 'hooks/useForm'


const SignUp: NextPage = () => {
    const { form } = useForm({
        initFormData: { username: '', password: '', passwordConfirmation: '' },
        submit: {
            request: (fromData) => axios.post('/api/users', fromData),
            success: (res) => { console.log(res) }
        },
        fields: [
            { label: '用户名', key: 'username', type: 'text' },
            { label: '密码', key: 'password', type: 'text' },
            { label: '确认密码', key: 'passwordConfirmation', type: 'text' }
        ],
        text: '注册账号'
    })
    return (
        <>
            <h1> 注册</h1>
            {form}
        </>
    )
}
export default SignUp