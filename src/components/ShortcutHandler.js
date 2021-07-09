
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { HotKeys } from 'react-hotkeys';
import { ShortcutView } from './ShortcutView';
import { db } from '../utils/firebase';
import { shortcutsAtom } from '../atoms';

// places focus on relevant part where key perss listener is
const FocusTrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  &:not(:focus) {
    &:after {
      content: 'Click to Continue';
      font-size: 24px;
      padding: 40px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: coral;
    }
    * { opacity: 0.5; }
    border: 2px dashed coral;
  }

  &:focus {
    border: none;
  }
`

const Hint = styled.div`
`;

export default function ShortcutHandler(props) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [hint, setHint] = useState(false);
  const shortcuts = useRecoilValue(shortcutsAtom);

  const currentShortcut = shortcuts[current];

  const handleSuccess = (e) => {
    e?.preventDefault && e.preventDefault();
    if (current + 1 < shortcuts.length) {
      if (hint) {
        setHint(false);
      }
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const handlers = {
    SUCCESS: handleSuccess
  };

  const keyMap = {
    // optional chaining
    // returns undefined if currentShortcut
    // without throwing error: "cannot find keystroke of undefined"
    SUCCESS: currentShortcut?.keystroke
  };

  const ref = useRef(null);

  const handleStartOver = () => {
    setDone(false);
    setCurrent(0);
  };

  const focusOnTrap = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const onHint = () => {
    setHint(true);
  }

  useEffect(() => {
    focusOnTrap()
  }, [current])

  return done ? (
    <div>
      <h1>Congrats!</h1>
      <button onClick={handleStartOver}>StartOver</button>
    </div>
  ) : (
    <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
      <FocusTrap ref={ref} tabIndex={0}>
        <ShortcutView {...currentShortcut} />
      </FocusTrap>
      <Hint><span><button onClick={onHint}>HINT</button> {hint ? currentShortcut.keystroke : null} </span></Hint>
    </HotKeys>
  )
}
