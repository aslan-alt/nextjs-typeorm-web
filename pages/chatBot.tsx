import {withIronSessionSsr} from 'iron-session/next';
import {isEmpty} from 'lodash';
import {NextPage} from 'next';
import styled from 'styled-components';
import {Messages} from '@components/Chat/Messages';
import {User} from '@database/entity/User';
import {ironSessionConfig} from 'ironSessionConfig';
import {useForm} from '../hooks/useForm';

const ChatPage: NextPage<{user: User}> = ({user}) => {
  console.log('user------');
  console.log(user);

  return (
    <div>
      {isEmpty(user) ? (
        <Container>
          <LeftContent>left</LeftContent>
          <RightContent>
            <div>
              <h3>Don't have an account?</h3>
              <a
                href={`https://github.com/login/oauth/authorize?client_id=Iv1.2a1db83cc737403b&redirect_uri=http://localhost:3000/api/v1/authCallback&scope=user:email`}
              >
                <button>Sign in</button>
              </a>
            </div>
            <div>
              <h3>Log in with Email</h3>
              <a
                href={`https://github.com/login/oauth/authorize?client_id=Iv1.2a1db83cc737403b&redirect_uri=http://localhost:3000/api/v1/authCallback&scope=user:email`}
              >
                <button>Sign in</button>
              </a>
            </div>
          </RightContent>
        </Container>
      ) : (
        <Messages />
      )}
    </div>
  );
};
export default ChatPage;

const Container = styled.section`
  display: grid;
  grid-template-columns: 60% 40%;
  height: 100vh;
`;

const LeftContent = styled.div`
  background: rgb(0, 55, 64);
`;

const RightContent = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
`;

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({req}) {
  return {
    props: {
      ...(req.session.user ? {user: req.session.user} : {}),
    },
  };
}, ironSessionConfig);
