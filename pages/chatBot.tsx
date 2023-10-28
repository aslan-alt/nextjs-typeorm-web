import qs from 'querystring';
import {useEffect} from 'react';
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
  const {completion, input, stop, isLoading, handleInputChange, handleSubmit} = useCompletion({
    api: '/api/chat',
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} placeholder="Enter your prompt..." onChange={handleInputChange} />
        <p>Completion result: {completion}</p>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button disabled={isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ChatPage;
