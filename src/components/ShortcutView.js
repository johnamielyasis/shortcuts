import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: 350px;
  max-width: 550px;
  width: auto;
`

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Step = styled.div`
  height: 8px;
  flex: 1;
  margin: 2px;
  background-color: ${p => p.color};
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
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const newSteps = [];
    for(let i = 0; i < max; i++) {
      newSteps.push(i);
    }
    setSteps(newSteps);
  }, [])

  let emojiBadge = '🤷‍♂️';
  if (progress > 0) emojiBadge = "👏";
  if (progress > 1) emojiBadge = "👀";
  if (progress > 2) emojiBadge = "💪";
  if (progress > 3) emojiBadge = "🎉";
  if (progress > 4) emojiBadge = "🔥";

  return (
    <div>
      <h3 style={{fontFamily: 'Courier New', fontSize: 25, color: `#06487D`}}>{name}</h3>
      <p style={{color: `#06487D`}}>{description}</p>
      <Image src={image} alt={description} />
      <ProgressContainer>
        {
          steps.map((p, i) => {
            return <Step color={i <= current ? 'green' : 'grey'} />
          })
        }
        <p style={{color: `#06487D`}}>{current + 1} / {max}</p>
      </ProgressContainer>
      <p style={{color: `#06487D`}}>Mastery Score: {progress} {emojiBadge}</p>
    </div>
  )
}
