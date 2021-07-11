import React from 'react';
import styled from 'styled-components';
import { firebaseApp } from '../utils/firebase';

const Container = styled.div`
  text-align: center;
`;

export default function Header() {
  const handleSignOut = () => {
    firebaseApp.auth().signOut();
    console.log('trying to run this');
  }

  return (
    <Container>
      <h1>Shortcut Trainer</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </Container>
  )
}