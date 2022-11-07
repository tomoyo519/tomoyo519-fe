import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from './_app';
import { useRouter } from 'next/router';
const HomePage: NextPage = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  const { userId, userName, setUserId, setUserName, isLoggedIn, setIsLoggedIn } = context;

  useEffect(() => {
    const userIdLocalStorage = localStorage.getItem('id');
    const userNameLocalStorage = localStorage.getItem('name');
    const userLoggedInLocalStorage = localStorage.getItem('isLoggedin');
    if (userIdLocalStorage) {
      setUserId(userIdLocalStorage);
    }
    if (userNameLocalStorage) {
      setUserName(userNameLocalStorage);
    }
    if (userLoggedInLocalStorage) {
      setIsLoggedIn(userLoggedInLocalStorage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('isLoggedin');
    setUserId('');
    setUserName('');
    setIsLoggedIn(false);
  };
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          {isLoggedIn ? (
            <>
              <div>
                <p>{userName}</p>
              </div>
              <div>
                <p
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  logout
                </p>
              </div>
            </>
          ) : (
            <p>login</p>
          )}
        </Link>
      </Header>
      <Container>
        <Link href='/pagination?page=1'>
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href='/infinite-scroll'>
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
