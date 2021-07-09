import React from 'react';
import styled from 'styled-components';
import {firebaseApp } from '../utils/firebase';

const Container = styled.div`
  background-color: black;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  max-width: 1080px;
  margin: 0 auto;
`;

export default function Header() {
  const onSignOut = () => {
    firebaseApp.auth().signOut();
  };

  return (
    <Container>
      <Inner>
        <h1>Shortcut Trainer</h1>
        <button onClick={onSignOut}>Sign Out</button>
      </Inner>
    </Container>
  )
}