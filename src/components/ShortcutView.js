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
  progress,
  current,
  max
}) => {
  console.log('____PROGRESS IN RIGHT PLACE WTF', current);


  return (
    <div>
      <h3 style={{fontFamily: 'Courier New', fontSize: 25}}>{name}</h3>
      <p>{description}</p>
      <Image src={image} alt={description} />
      <p>Progress: {current + 1} / {max}</p>
      <p>Learn Level: {progress}</p>
    </div>
  )
}
