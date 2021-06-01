import { useState, FormEvent } from 'react'
import axios, { AxiosResponse } from 'axios'
import { NextPage } from 'next'


const SignUp: NextPage = () => {
    const [fromData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    })
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirmation: []
    })
    const onSubmit = () => {
        axios.post('/api/users', fromData).then(res => {
            console.log('res------')
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
    return (
        <>
            <h1> 注册</h1>

            <div >
                {JSON.stringify(fromData)}
                <div>
                    <label htmlFor="">用户名
                        <input type="text" value={fromData.username} onChange={(e) => {
                            e.persist()
                            setFormData(state => ({ ...state, username: e.target.value }))
                        }} />
                    </label>
                    {errors.username?.length > 0 && errors.username.join(',')}
                </div>
                <div>
                    <label htmlFor="">密码
                     <input type="text" value={fromData.password} onChange={(e) => {
                            e.persist()
                            setFormData(state => ({ ...state, password: e.target.value }))
                        }} />
                    </label>
                    {errors.password?.length > 0 && errors.password.join(',')}
                </div>

                <div>
                    <label htmlFor="">确认密码<input type="text" value={fromData.passwordConfirmation} onChange={(e) => {
                        e.persist()
                        setFormData(state => ({ ...state, passwordConfirmation: e.target.value }))
                    }} /></label>
                </div>
                {errors.passwordConfirmation?.length > 0 && errors.passwordConfirmation.join(',')}
                <div>
                    <button onClick={onSubmit} >注册</button>
                </div>

            </div>
        </>
    )
}
export default SignUp