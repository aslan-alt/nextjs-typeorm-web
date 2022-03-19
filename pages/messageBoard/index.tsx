import { NextPage } from 'next';
import { Modal } from 'antd'
import {  useState,useEffect } from 'react';
import Square from 'components/Square'
import axios from 'axios'
import { MessageWrapper } from 'styles/messageBoardStyle'
import MessageList from 'components/MessageBard/MessageList';
import AddMessage from 'components/MessageBard/AddMessage';
import { UAParser } from 'ua-parser-js';

type Data = {
    Comments?: CommentItem[],
    result: UAParser.IResult
}

const messageBoard: NextPage = () => {
    const [data,setData] = useState<Data|undefined>()

    const [modal, contextHolder] = Modal.useModal();

    useEffect(()=>{
        axios.get<Data>('/api/getAllComment').then((res)=>{setData(res.data)})
    },[])

    const left = !!data?.result?.device?.model ? 106 : 95
    return (
        <MessageWrapper>
            {contextHolder}
            <img className="background-img" src="/ying.jpg" alt="" />
            <div className="message-list">
                <Square {...{ top: 5, left }} />
                <MessageList {...data} />
            </div>
            <AddMessage {...{ modal }} />
        </MessageWrapper>
    );
};
export default messageBoard;


