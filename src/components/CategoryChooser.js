import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { db } from '../utils/firebase';
import { useRecoilValue } from 'recoil'; // node_modules
import { shortcutsAtom } from '../atoms'; // user defined in /src
/*
  useRecoilState    = (atom) => [value, setterFn] // returns value and setter (similar to useState)
  useRecoilValue    = (atom) => value             // only returns value ONLY
  useSetRecoilState = (atom) => setterFn          // only returns setterFn ONLY
*/

export default function CategoryChooser(props) {
  const shortcuts = useRecoilValue(shortcutsAtom);
  console.log('shortcuts in category chooser', shortcuts);
  return (
    <div>category chooser</div>
  )
}
