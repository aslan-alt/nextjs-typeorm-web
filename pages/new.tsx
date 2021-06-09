import React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { useForm } from 'hooks/useForm'


const PostsNew: NextPage = () => {
    const { form } = useForm({
        initFormData: { title: '', content: '' },
        submit: {
            request: (fromData) => axios.post('/api/v1/posts', fromData),
            message: '提交成功'
        },
        fields: [
            { label: '标题', key: 'title', type: 'text' },
            { label: '内容', key: 'content', type: 'textarea' }
        ], text: '登录'
    })

    return (form)
}

export default PostsNew
