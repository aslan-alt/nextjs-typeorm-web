import React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { useForm } from 'hooks/useForm'


const PostsNew: NextPage = () => {
    const { form } = useForm({
        initFormData: { title: '', content: '' },
        submit: {
            request: (fromData) => axios.post('/api/v1/posts', fromData),
            success: (res) => {
                window.location.href = '/posts'
            }
        },
        fields: [
            { label: '标题', key: 'title', type: 'text' },
            { label: '内容', key: 'content', type: 'textarea' }
        ], text: '提交'
    })

    return (form)
}

export default PostsNew
