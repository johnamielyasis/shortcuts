import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'; // node_modules
import { shortcutsAtom, categoryAtom } from '../atoms'; // user defined in /src
import styled from 'styled-components';
/*
  useRecoilState    = (atom) => [value, setterFn] // returns value and setter (similar to useState)
  useRecoilValue    = (atom) => value             // only returns value ONLY
  useSetRecoilState = (atom) => setterFn          // only returns setterFn ONLY
*/
const CategoryButtonContainer = styled.div`
display: flex;
justify-content: space-between;
`;
const CategoryButton = styled.button`
  cursor: pointer;
  padding: 8px 15px;
  max-height: 50px;
  border-radius: 20px;
  border: none;
  background-color: #DDBD9A;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: #F7E8D0;
    color: #06487D;
  }
`;

const Instructions = styled.h2`

`;
export default function CategoryChooser(props) {
  const shortcuts = useRecoilValue(shortcutsAtom);
  const setCategory = useSetRecoilState(categoryAtom);

  const categories = shortcuts.reduce((acc, shortcut) => {
    const currentCategories = [...acc];
    if (acc.indexOf(shortcut.category) === -1) {
      currentCategories.push(shortcut.category);
    }
    return currentCategories;
  }, [])

  const onChooseCategory = (category) => {
    setCategory(category);
  };

  return (
    <div>
      <Instructions>
        <h4>Select Type of Shortcuts</h4>
      </Instructions>
      <CategoryButtonContainer>
        {categories.map(c => (
          <CategoryButton key={c} onClick={() => onChooseCategory(c)}>{c}</CategoryButton>
        ))}
      </CategoryButtonContainer>
    </div>
  )
}
