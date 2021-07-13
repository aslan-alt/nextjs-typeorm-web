import { GetServerSideProps, NextPage } from 'next';
import { Input, Button, Modal, message } from 'antd'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Content, MessageWrapper } from 'styles/messageBoardStyle'
import { UAParser } from 'ua-parser-js';
import deepClone from 'lib/deepClone';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Comment } from 'src/entity/Comment';

type CommentItem = {
    id: number;
    userId: number;
    postId: number;
    content: string;
    user: string;
    post: string,
    createdAt: string;
    updateAt: string;
}
type Props = {
    userInfo: IUAParser.IResult
}

const messageBoard: NextPage<Props> = (props) => {

    const [comment, setComment] = useState('')
    const [modal, contextHolder] = Modal.useModal();

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
        axios.post('/api/comment', { commentContent: comment, useId: 'visitor' }).then(res => {
            message.success('提交成功')
        }).catch((e) => {
            prompt(e?.response?.data?.message)
        })
    }

    return (
        <MessageWrapper>
            {contextHolder}
            <div className="add-message">
                <Input.TextArea placeholder="随便说点什么吧。。。"
                    value={comment}
                    rows={4}
                    onChange={e => { setComment(e.target.value) }}
                    showCount={
                        { formatter: (a) => a.count === 0 ? '留言不能为空' : `已输入:${a.count}字` }
                    } />
                <div className="button-wrapper"></div>
                <div className="button-wrapper">
                    <Button type="primary" onClick={commitMessage} disabled={comment.length <= 0}>发表</Button>
                </div>
            </div>
        </MessageWrapper>
    );
};
export default messageBoard;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connect = await getDatabaseConnection()
    let found: Comment[]
    try {
        found = await connect.manager.find(Comment)
    } catch (e) {

    }
    console.log('------found')
    console.log(found)
    return {
        props: {
            userInfo: []
        }
    };
};

