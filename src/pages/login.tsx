import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { UserContext } from './_app';

interface IValidation {
  isError: boolean;
}

interface ILoginValidation {
  idError: boolean;
  pwError: boolean;
}
const LoginPage: NextPage = () => {
  const [typedId, setTypedId] = useState<string>('');
  const [idError, setIdError] = useState<boolean>(false);
  const [typedPw, setTypedPw] = useState<string>('');
  const [pwError, setPwError] = useState<boolean>(false);
  const router = useRouter();
  const context = useContext(UserContext);
  const { userId, userName, setUserId, setUserName, isLoggedIn, setIsLoggedIn } = context;

  useEffect(() => {
    const userLoggedInLocalStorage = localStorage.getItem('isLoggedin');
    console.log('thisisuserLoggedInLocalStorage', userLoggedInLocalStorage);
    if (userLoggedInLocalStorage) {
      setIsLoggedIn(userLoggedInLocalStorage);
    }
    console.log('thisisisLoggedIn', isLoggedIn);
    if (isLoggedIn || userLoggedInLocalStorage) {
      router.push('/');
    }
  }, []);

  const checkIdValidation = () => {
    const IdValidationCondition = /^[A-Za-z0-9]{5,30}$/;
    console.log(IdValidationCondition.test(typedId));
    if (!IdValidationCondition.test(typedId)) {
      setIdError(true);
    } else {
      setIdError(false);
    }
  };

  const checkPwValidtaion = () => {
    console.log('thisistypedPw', typedPw);
    const PwValidationCondition = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/;
    if (!PwValidationCondition.test(typedPw)) {
      setPwError(true);
    } else {
      setPwError(false);
    }
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form>
        <LoginTitle>아이디</LoginTitle>
        <TextInput
          isError={idError}
          type='text'
          onChange={(e) => {
            setTypedId(e.target.value);
          }}
          onBlur={() => checkIdValidation()}
        />
        {idError && <IdErrorMsg>올바른 아이디 형식으로 입력해주세요.</IdErrorMsg>}
        <LoginTitle>비밀번호</LoginTitle>
        <TextInput
          isError={pwError}
          type='password'
          onChange={(e) => {
            setTypedPw(e.target.value);
          }}
          onBlur={() => checkPwValidtaion()}
        />
        {pwError && <IdErrorMsg>올바른 비밀번호 형식으로 입력해주세요.</IdErrorMsg>}
        <LoginButton
          disabled={idError || pwError}
          idError={idError}
          pwError={pwError}
          onClick={() =>
            axios
              .post('/login')
              .then((res) => {
                console.log('thisisres', res);
                setUserId(res.data.data.user.Id);
                setUserName(res.data.data.user.NAME);
                setIsLoggedIn(true);
                localStorage.setItem('id', res.data.data.user.Id);
                localStorage.setItem('name', res.data.data.user.NAME);
                localStorage.setItem('isLoggedin', 'true');
                router.push('/');
              })
              .catch((err) => {
                setIsLoggedIn(false);
                console.log('thisiserr', err);
              })
          }
        >
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const TextInput = styled.input`
  border: 1px solid #000;
  margin-top: 8px;
  padding: 16px;
  background-color: #f7f7fa;
  border-radius: 12px;
  ${(props: IValidation) => (props.isError ? `background-color: #fdedee` : '')}
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  ${(props: ILoginValidation) =>
    !props.idError && !props.pwError ? '' : ` background-color: #e2e2ea;`}
`;

const LoginTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
  &:not(first-child) {
    padding-top: 16px;
  }
`;

const IdErrorMsg = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
