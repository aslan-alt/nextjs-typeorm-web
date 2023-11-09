import {useChat} from 'ai/react';

export const Messages = () => {
  const {messages, input, handleInputChange, handleSubmit} = useChat();
  return (
    <>
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
    </>
  );
};