import type { AppProps } from 'next/app';
import styled from 'styled-components';
import React, { useState, createContext } from 'react';
import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();
export const UserContext = createContext();

function MyApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{ userId, userName, setUserId, setUserName, isLoggedIn, setIsLoggedIn }}
    >
      <GlobalStyle />
      <Background />
      <Content>
        <Component {...pageProps} />
      </Content>
    </UserContext.Provider>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
