import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthApi from 'renderer/apis/AuthApi';
import Button from 'renderer/components/base/Button';
import useInput from 'renderer/hooks/useInput';

const RegisterWrapper = styled.div`
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

const Register: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [name, onChangeName] = useInput('');
  const [carNumber, onChangeCarNumber] = useInput('');
  const router = useRouter();

  const goToLoginPage = () => {
    router.push('/login');
  };

  const handleRegister = async () => {
    const response = await AuthApi.instance.register({
      id,
      password,
      name,
      car_number: carNumber === '' ? undefined : carNumber,
    });

    if (response.isSuccess) {
      router.push('/login');
    }
  };
  return (
    <React.Fragment>
      <Head>
        <title>회원가입</title>
      </Head>
      <RegisterWrapper>
        <h2>Register</h2>
        <Input placeholder="ID" value={id} onChange={onChangeId} />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <Input placeholder="Name" value={name} onChange={onChangeName} />
        <Input
          placeholder="Car Number"
          value={carNumber}
          onChange={onChangeCarNumber}
        />
        <Button onClick={handleRegister}>Register!</Button>
        <Button onClick={goToLoginPage}>Back</Button>
      </RegisterWrapper>
    </React.Fragment>
  );
};

export default Register;
