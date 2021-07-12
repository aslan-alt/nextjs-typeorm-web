import { NextPage } from 'next';
import { Input, Button, Modal } from 'antd'
import styled from 'styled-components'
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const MessageWrapper = styled.div`
    border: 1px solid red;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    .add-message{
        width: 40vw;
        @media (max-width: 600px) {
            width: 70vw;
        }
        textarea{}
        .button-wrapper{
            display: flex;
            min-height: 30px;
            justify-content: flex-end;
        } 
    }
`
const Content = styled.div`
    .go-to-sign-up{
        color:#1790FE;
    }
`

type Props = {

}
const messageBoard: NextPage<Props> = (props) => {
    const [value, setValue] = useState('')
    const [modal, contextHolder] = Modal.useModal();
    const commitMessage = () => {
        axios.post('/api/comment', { commentContent: value, useId: 'visitor' }).then(res => {
            console.log(res)
        }).catch((e) => {
            modal.confirm({
                title: e.response.data.message,
                content: (
                    <Content>
                        <p>评论功能必须登陆哦</p>
                        <Link href={'/sign_up'}><a className='go-to-sign-up'>立即注册</a></Link>
                    </Content>
                ),
                onOk: () => { location.href = '/sign_in' },
                okText: '立即登陆',
                cancelText: '取消'
            })
        })
    }

    return (
        <MessageWrapper>
            {contextHolder}
            <div className="add-message">
                <Input.TextArea placeholder="随便说点什么吧。。。"
                    value={value}
                    rows={4}
                    onChange={e => { setValue(e.target.value) }}
                    showCount={{
                        formatter: (a) => {
                            return a.count === 0 ? '' : `已输入:${a.count}字`
                        }
                    }} />
                <div className="button-wrapper"></div>
                <div className="button-wrapper">
                    <Button type="primary" onClick={commitMessage}>发表</Button>
                </div>
            </div>
        </MessageWrapper>
    );
};
export default messageBoard;

