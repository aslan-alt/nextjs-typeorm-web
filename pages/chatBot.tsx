import qs from 'querystring';
import {useEffect, useState} from 'react';
import {useChat, useCompletion} from 'ai/react';
import {message} from 'antd';
import axios from 'axios';
import {withIronSessionSsr} from 'iron-session/next';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {User} from '@database/entity/User';
import {ironOptions} from '@lib/withSession';
import StarsLayout from 'components/StarsLayout';
import {useForm} from 'hooks/useForm';

const ChatPage: NextPage<{user: User}> = () => {
  const {messages, input, handleInputChange, handleSubmit} = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatPage;
