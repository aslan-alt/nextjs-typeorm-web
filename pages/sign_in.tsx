import { ChangeEvent, useCallback, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { withSession } from 'lib/withSession'
import { User } from 'src/entity/User'
import Form from 'components/Form'


const SignIn: NextPage<{ user: User }> = (props) => {
    const defaultErrors = {
        username: [] as string[],
        password: [] as string[],
    }
    const [fromData, setFormData] = useState({
        username: '',
        password: ''
    })
    const { username, password } = fromData

    const [errors, setErrors] = useState<typeof defaultErrors>(defaultErrors)

    const onSubmit = () => {
        setErrors(defaultErrors)
        axios.post('/api/sessions', fromData).then(res => {
            window.alert('success')
            console.log(res.data)
        }, (error) => {
            if (error.response) {
                const response: AxiosResponse = error.response
                if (response.status === 422) {
                    setErrors({ ...response.data })
                }
            }

        })
        return false
    }
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>, key: 'password' | 'username') => {
        e.persist()
        setFormData(state => ({ ...state, [key]: e.target.value }))
    }, [fromData])


    return (
        <>
            {
                props.user && <div>当前登陆用户:{props.user.username}</div>
            }
            <h1> 登陆</h1>
            {JSON.stringify(fromData)}
            <Form fields={
                [
                    {
                        label: '用户名',
                        value: username,
                        errors: errors.username,
                        type: 'text',
                        onChange: (e) => { onChange(e, 'username') }
                    },
                    {
                        label: '密码',
                        value: password,
                        errors: errors.password,
                        type: 'password',
                        onChange: (e) => { onChange(e, 'password') }
                    }
                ]

            }
                onSubmit={onSubmit}
                text="登陆"
            />

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