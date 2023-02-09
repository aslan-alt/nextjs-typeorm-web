import {useState, useEffect} from 'react';
import {Modal} from 'antd';
import axios from 'axios';
import {NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import AddMessage from 'components/MessageBard/AddMessage';
import MessageList from 'components/MessageBard/MessageList';
import Square from 'components/Square';
import {MessageWrapper} from 'styles/messageBoardStyle';

type Data = {
  comments?: CommentItem[];
  result: UAParser.IResult;
};

const MessageBoard: NextPage = () => {
  const [data, setData] = useState<Data | undefined>();

  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    axios.get<Data>('/api/getAllComment').then((res) => {
      setData(res.data);
    });
  }, []);

  const left = data?.result?.device?.model ? 106 : 95;
  return (
    <MessageWrapper>
      {contextHolder}
      <img className="background-img" src="/ying.jpg" alt="" />
      <div className="message-list">
        <Square {...{top: 5, left}} />
        <MessageList {...data} />
      </div>
      <AddMessage {...{modal}} />
    </MessageWrapper>
  );
};
export default MessageBoard;
