import React, { useState } from 'react';

export const ShortcutView = ({
  name,
  category,
  description,
  image,
  keystroke,
}) => {
  return (
    <div>
      <div>
        <h3>Shortcut: {name}</h3>
        <img src={image} alt={description} />
        <p>{description}</p>
      </div>
    </div>
  )
}
