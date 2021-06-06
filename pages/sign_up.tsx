import { ChangeEvent, useCallback, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Form from 'components/Form'


const SignUp: NextPage = () => {
    const [fromData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    })
    const { username, password, passwordConfirmation } = fromData
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirmation: []
    })

    const onSubmit = () => {
        axios.post('/api/users', fromData).then(res => {
            console.log(res.data)
        }, (error) => {
            if (error.response) {
                const response: AxiosResponse = error.response
                if (response.status === 422) {
                    setErrors({ ...errors, ...response.data })
                }
            }

        })
        return false
    }
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>, key: 'password' | 'username' | 'passwordConfirmation') => {
        e.persist()
        setFormData(state => ({ ...state, [key]: e.target.value }))
    }, [fromData])

    return (
        <>
            <h1> 注册</h1>
            <Form
                fields={
                    [
                        {
                            label: '用户名',
                            value: username,
                            errors: errors.username,
                            type: 'text',
                            onChange: (e) => { onChange(e as ChangeEvent<HTMLInputElement>, 'username') }
                        },
                        {
                            label: '密码',
                            value: password,
                            errors: errors.password,
                            type: 'password',
                            onChange: (e) => { onChange(e as ChangeEvent<HTMLInputElement>, 'password') }
                        },
                        {
                            label: '确认密码',
                            value: password,
                            errors: errors.passwordConfirmation,
                            type: 'password',
                            onChange: (e) => { onChange(e as ChangeEvent<HTMLInputElement>, 'passwordConfirmation') }
                        }
                    ]
                }
                onSubmit={onSubmit}
                text="注册"
            />
        </>
    )
}
export default SignUp