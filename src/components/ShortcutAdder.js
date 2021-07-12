import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../utils/firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  > * {
    margin: 8px;
  }
`

export default function ShortcutAdder(props) {
  const  [values, setValues] = useState({
    category: 'vs-code',
    name: '',
    description: '',
    image: '',
    keystroke: '',
  });

  const handleChange = (e) => {
    let newValues = {...values};
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
  };

  const handleAdd = () => {
    const itemRef = db.ref("shortcuts");
    if (
      values.category &&
      values.name &&
      values.description &&
      values.image &&
      values.keystroke
    ) {
      itemRef.push(values, (error)=> {
        if (error) alert(`${error}\n\nAt this time only John can add shortcuts.`);
      });
    } else {
      alert('All fields are required');
    }
  }

  return (
    <Container>
      <label>
        category:
        <input name="category" value={values.category} onChange={handleChange} />
      </label>
      <label>
        name:
        <input name="name" value={values.name} onChange={handleChange} />
      </label>
      <label>
        description:
        <input name="description" value={values.description} onChange={handleChange} />
      </label>
      <label>
        image:
        <input name="image" value={values.image} onChange={handleChange} />
      </label>
      <label>
        keystroke:
        <input name="keystroke" value={values.keystroke} onChange={handleChange} />
      </label>
      <button onClick={handleAdd}>ADD SHORTCUTS</button>
    </Container>
  )
}