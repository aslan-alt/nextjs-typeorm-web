import qs from 'querystring';
import {useEffect, useState} from 'react';
import {useCompletion} from 'ai/react';
import {message} from 'antd';
import axios from 'axios';
import {withIronSessionSsr} from 'iron-session/next';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {User} from '@database/entity/User';
import {ironOptions} from '@lib/withSession';
import StarsLayout from 'components/StarsLayout';
import {useForm} from 'hooks/useForm';

const ChatPage: NextPage<{user: User}> = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.nativeEvent.preventDefault();
          axios.post('/api/chat', {prompt: input}).then((res) => {
            console.log(res);
          });
        }}
      >
        <input
          value={input}
          placeholder="Enter your prompt..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <p>Completion result</p>
        <button type="button">Stop</button>
        <button disabled={false} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ChatPage;
