import React from 'react';
import {withIronSessionSsr} from 'iron-session/next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {ironSessionConfig} from '../ironSessionConfig';

const LoginForm = dynamic(() => import('@components/LoginForm').then(({LoginForm}) => LoginForm), {
  ssr: false,
});

function SignIn() {
  return (
    <Container>
      <div>xxxx</div>
      <LoginForm />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 60% 40%;
`;

export default SignIn;

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({req}) {
  return {
    props: {
      ...(req.session.user ? {user: req.session.user} : {}),
    },
  };
}, ironSessionConfig);
