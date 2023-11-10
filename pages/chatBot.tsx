import {Input} from 'antd';
import {withIronSessionSsr} from 'iron-session/next';
import {isEmpty} from 'lodash';
import {NextPage} from 'next';
import styled from 'styled-components';
import {Messages} from '@components/Chat/Messages';
import {User} from '@database/entity/User';
import {ironSessionConfig} from 'ironSessionConfig';
const ChatPage: NextPage<{user: User}> = ({user}) => {
  console.log('user------');
  console.log(user);

  return (
    <div>
      {isEmpty(user) ? (
        <Container>
          <LeftContent>left</LeftContent>
          <RightContent>
            <Input placeholder="请输入用户名" />
            <Input placeholder="请输入用户名" />
            <Input placeholder="请输入用户名" />
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
