import React from 'react';
import styled from 'styled-components';
import { theme } from '../constants';
import { SiFirebase } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { GrReactjs } from 'react-icons/gr';
import { GiSpring } from 'react-icons/gi';
import { AiFillGithub } from 'react-icons/ai';

const FooterContainer = styled.div`
  position:absolute;
  display: flex;
  flex-direction: row-reverse;
  justify-content: right;
  align-items: center;
  bottom:0;
  width:100%;
  height:30px;   /* Height of the footer */
  background: ${theme.colors.screenBlue};
  color: ${theme.colors.textLight};
  a {
    margin: 5px;
    align-self: right;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <a
        href="https://yasis.dev/"
        alt="this emoji of spaghetti is the visual representation of John's code; it also links to his incomplete portfolio webbsite"
      >
        🍝
      </a>
      <a
        href="https://github.com/johnamielyasis/shortcuts"
        alt="git icon cat links to John's repositories of spaghetti"
      >
        <AiFillGithub />
      </a>
      <a
        href="https://react-icons.github.io/react-icons"
        alt="link to react icons"
      >
        <GrReactjs color="#E91E63" />
      </a>
      <a
        href="https://recoiljs.org/"
        alt="link to recoil"
      >
        <GiSpring color="#3678E5" />
      </a>
      <a
        href="https://reactjs.org/docs/hooks-intro.html"
        alt="link to react hooks"
      >
        <FaReact color="#61DAFB" />
      </a>
      <a
        href="https://firebase.google.com/"
        alt="link to firebase"
      >
        <SiFirebase color="#F78234" />
      </a>
    </FooterContainer>
  )
}