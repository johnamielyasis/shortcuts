import React, { useState } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: 350px;
  width: auto;
`
export const ShortcutView = ({
  name,
  category,
  description,
  image,
  keystroke,
}) => {

  return (
    <div>
      <h3>Shortcut: {name}</h3>
      <p>{description}</p>
      <Image src={image} alt={description} />
    </div>
  )
}
