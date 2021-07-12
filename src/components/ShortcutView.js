import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: 350px;
  max-width: 550px;
  width: auto;
`
export const ShortcutView = ({
  name,
  category,
  description,
  image,
  keystroke,
  progress
}) => {
  console.log('____PROGRESS IN RIGHT PLACE WTF', progress);


  return (
    <div>
      <h3>Shortcut: {name}</h3>
      <p>{description}</p>
      <Image src={image} alt={description} />
      <p>Learn Level: {progress}</p>
    </div>
  )
}
