import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

export default function Header() {
  return (
    <Container>
      <h1>Shortcut Trainer</h1>
    </Container>
  )
}