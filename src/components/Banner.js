import React from 'react'
import styled from 'styled-components';

const StyledBanner = styled.div`
  background-image: url("https://cdn.dribbble.com/users/474881/screenshots/1907765/computer-overhead-dribbb_1.gif");
  height: 600px;
  width: 800px;
  color: #FDF8F1;
  display: flex;
  justify-content: center;
  z-index: 1;
  position: relative;
`;

export default function Banner() {
  return (
    <StyledBanner alt="gif of cartoon man typing">
      <h3>Shortcuts is a flashcard app that teaches... well... <em>shortcuts</em></h3>
    </StyledBanner>
  )
}