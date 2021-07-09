import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../utils/firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
      itemRef.push(values);
    } else {
      alert('All fields are required');
    }
  }

  return (
    <Container>
      <label>
        category:
        <input name="category" value={values.category}/>
      </label>
      <label>
        name:
        <input name="name" value={values.name}/>
      </label>
      <label>
        description:
        <input name="description" value={values.description}/>
      </label>
      <label>
        image:
        <input name="image" value={values.image}/>
      </label>
      <label>
        keystroke:
        <input name="keystroke" value={values.keystroke}/>
      </label>
      <button onClick={handleAdd}>ADD SHORTCUTS</button>
    </Container>
  )
}