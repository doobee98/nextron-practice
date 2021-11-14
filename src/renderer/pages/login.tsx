import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthApi from 'renderer/apis/AuthApi';
import Button from 'renderer/components/base/Button';
import useInput from 'renderer/hooks/useInput';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 16px 20px;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 4px;
  background: white 0% 0% no-repeat padding-box;
  width: 100%;
  height: 48px;
  margin: 0 auto;
  border: 1px solid black;

  &:focus {
    outline: none;
  }
`;

const Login: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await AuthApi.instance.login({ id, password });
    if (response.isSuccess) {
      router.push('/user/all');
    }
  };
  return (
    <React.Fragment>
      <Head>
        <title>로그인</title>
      </Head>
      <LoginWrapper>
        <h2>Login</h2>
        <Input placeholder="ID" value={id} onChange={onChangeId} />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <Button onClick={handleLogin}>Login</Button>
      </LoginWrapper>
    </React.Fragment>
  );
};

export default Login;
