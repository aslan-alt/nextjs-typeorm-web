import {useState, useEffect} from 'react';
import {Modal} from 'antd';
import axios from 'axios';
import {NextPage} from 'next';
import styled from 'styled-components';
import {UAParser} from 'ua-parser-js';
import AddMessage from 'components/MessageBard/AddMessage';
import MessageList from 'components/MessageBard/MessageList';
import Square from 'components/Square';

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
      <div className="message-list">
        <Square {...{top: 5, left}} />
        <MessageList {...data} />
      </div>
      <AddMessage {...{modal}} />
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #26252d;
  overflow: scroll;

  .message-list {
    position: relative;
    padding: 16px 0;
    margin-bottom: 30px;
    color: #4ecd8b;
    width: 35vw;
    @media (max-width: 600px) {
      width: 70vw;
    }
    .message-item {
      display: flex;
      align-items: center;
      .title-time-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        margin-bottom: 6px;
        margin-right: 8px;
        img {
          display: flex;
          max-width: 30px;
          border-radius: 50%;
        }
        .nickname {
          width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 3px;
          text-align: center;
        }
      }
      .content-wrapper {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .create-time {
          margin-bottom: 6px;
          font-size: 12px;
        }
        .content {
          font-size: 13px;
        }
      }
    }
  }
  .add-message {
    width: 35vw;
    margin-bottom: 100px;
    @media (max-width: 600px) {
      width: 70vw;
    }
    textarea {
      background: rgba(66, 178, 255, 0.1);
      color: white;
      border: 1px solid rgba(66, 178, 255);
      ::placeholder {
        color: white;
      }
    }
    .ant-input-textarea-show-count::after {
      color: white;
    }
    .ant-input-textarea-show-count::after {
      color: white;
    }
    .button-wrapper {
      display: flex;
      min-height: 30px;
      justify-content: flex-end;
      button {
        background: rgba(66, 178, 255, 0.1);
        border: 1px solid rgba(66, 178, 255);
        color: white;
      }
    }
  }
`;

export default MessageBoard;
