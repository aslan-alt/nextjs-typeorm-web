import React, {useState} from 'react';
import {MDBBtn, MDBCol, MDBInput} from 'mdb-react-ui-kit';
import Link from 'next/link';
import styled from 'styled-components';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');

  return (
    <Container>
      <MDBCol>
        <p>Welcome back</p>
        <StyledInput
          wrapperClass="mb-4"
          label="Email address"
          id="formControlLg"
          type="text"
          size="lg"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <StyledInput
          wrapperClass="mb-4"
          label="Password"
          id="formControlLg"
          type="text"
          size="lg"
        />

        <StyledButton className="mb-4 w-100" size="lg" style={{backgroundColor: '#10a37f'}}>
          Sign in
        </StyledButton>
        <SignInText>
          Don't have an account?
          <Link href="/signIn" legacyBehavior>
            <a>Sign up</a>
          </Link>
        </SignInText>
        <Or>
          <span>OR</span>
        </Or>

        <GithubLoginButton className="mb-4 w-100" size="lg">
          <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          Continue with github
        </GithubLoginButton>
      </MDBCol>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 320px;
`;

const StyledButton = styled(MDBBtn)`
  height: 52px;
  margin-bottom: 16px !important;
`;

const StyledInput = styled(MDBInput)`
  height: 52px;
`;

const GithubLoginButton = styled(StyledButton)`
  background-color: #ffffff;
  box-shadow: none;
  color: #4f4f4f;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 9px;
  gap: 9px;

  &:hover {
    background: #ffffff !important;
  }
  border: 1px solid #c2c8d0;
`;

const lineStyle = `
    content: '';
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: 0.5em;
    margin: 0;
`;

const Or = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
  border: none;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  span {
    text-align: center;
    flex: 0.2 0 auto;
    margin: 0;
  }
  &::before {
    ${lineStyle};
  }
  &::after {
    ${lineStyle};
  }
`;

const SignInText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  gap: 0.5em;
`;
