import React, { useState } from 'react';
// import styles here

export const ShortcutView = ({
  name,
  category,
  description,
  image,
  keystroke,
}) => {

  const [hint, setHint] = useState(false);

  return (
    <div>
        <h3>Shortcut: {name}</h3>
        <p>{description}</p>
        <img src={image} alt={description} />
    </div>
  )
}
