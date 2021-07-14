import React from 'react';
import styled from 'styled-components';
import { theme } from '../constants';

const FooterContainer = styled.div`
  position:absolute;
  bottom:0;
  width:100%;
  height:30px;   /* Height of the footer */
  background: ${theme.colors.screenBlue};
  color: ${theme.colors.textLight}
`;

export default function Footer() {
  return (
    <FooterContainer>
      <span>Powered By Firebase</span>
    </FooterContainer>
  )
}