import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { NextPage } from 'next'


const SignIn: NextPage = () => {
    const defaultErrors = {
        username: [] as string[],
        password: [] as string[],
    }
    const [fromData, setFormData] = useState({
        username: '',
        password: ''
    })
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
    return (
        <>
            <h1> 登陆</h1>

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
                    <button onClick={onSubmit} >登陆</button>
                </div>

            </div>
        </>
    )
}
export default SignIn