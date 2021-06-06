import React from 'react'
import axios, { AxiosResponse } from 'axios'
import Form from 'components/Form'
import { NextPage } from 'next'
import { useForm } from 'hooks/useForm'


const PostsNew: NextPage = () => {

    const initFormData = { title: '', content: '' }
    const onSubmit = (fromData: typeof initFormData) => {
        axios.post('/api/v1/posts', fromData).then(res => {
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


    const { form, setErrors } = useForm({
        initFormData, onSubmit, fields: [
            { label: '标题', key: 'title', type: 'text' },
            { label: '内容', key: 'content', type: 'textarea' }
        ], text: '登录'
    })

    return (form)
}

export default PostsNew
