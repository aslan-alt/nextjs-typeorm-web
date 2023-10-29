import {useCompletion} from 'ai/react';
import {NextPage} from 'next';
import {User} from '@database/entity/User';

const ChatPage: NextPage<{user: User}> = () => {
  const {completion, input, stop, isLoading, handleInputChange, handleSubmit} = useCompletion({
    api: '/api/chat',
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {completion}
        <input value={input} placeholder="Enter your prompt..." onChange={handleInputChange} />

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
