import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { Content } from 'styles/messageBoardStyle'
import { Input, Button, message } from 'antd'
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';

interface Props {
    modal: Omit<ModalStaticFunctions, "warn">
}

export default function AddMessage({ modal }: Props) {
    const [comment, setComment] = useState('')


    const prompt = (title: string) => {
        modal.confirm({
            title,
            content: (
                <Content>
                    <p>评论功能必须登陆哦</p>
                    <Link href={`/sign_up?returnTo=${encodeURIComponent(window.location.pathname)}`}><a className='go-to-sign-up'>立即注册</a></Link>
                </Content>
            ),
            onOk: () => { location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}` },
            okText: '立即登陆',
            cancelText: '取消'
        })
    }

    const commitMessage = () => {
        if (comment.length < 1) {
            return message.error('留言不能为空啦')
        }
        axios.post('/api/comment', { commentContent: comment, useId: 'visitor' }).then(res => {
            message.success('提交成功')
        }).catch((e) => {
            prompt(e?.response?.data?.message)
        })
    }

    return (
        <div className="add-message">
            <Input.TextArea
                placeholder="随便说点什么吧。。。"
                value={comment}
                rows={4}
                onChange={e => { setComment(e.target.value) }}
                showCount={
                    { formatter: (a) => a.count === 0 ? '留言不能为空' : `已输入:${a.count}字` }
                } />
            <div className="button-wrapper"></div>
            <div className="button-wrapper">
                <Button type="primary" onClick={commitMessage}>发表</Button>
            </div>
        </div>
    )
}
