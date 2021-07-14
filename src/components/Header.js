import React from 'react';
import styled from 'styled-components';
import { firebaseApp } from '../utils/firebase';
import { theme } from '../constants';

const Container = styled.div`
  max-height: 60px;
  max-width: 100%;
  padding: 0 16px;
  align-items: center;
  display: flex;
  background-color: #F35918;
  justify-content: space-between;
  z-index: 2;
  position: relative;
`;

const Title= styled.h1`
  color: ${theme.colors.textLight};
  padding: 16px;
  font-weight: bolder;
`;
const StyledButton = styled.button`
  cursor: pointer;
  padding: 8px 15px;
  max-height: 50px;
  border-radius: 20px;
  border: none;
  background-color: #DDBD9A;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: #F7E8D0;
    color: #06487D;
  }
`;

export default function Header() {
  console.log('theme in header', theme.colors.textLight);
  const handleSignOut = () => {
    firebaseApp.auth().signOut();
    console.log('trying to run this in header');
  }

  return (
    <Container>
      <Title>
        <a href="https://shortcut-trainer.web.app/">Shortcuts</a>
      </Title>
      <StyledButton onClick={handleSignOut}>
        Sign Out
      </StyledButton>
    </Container>
  )
}