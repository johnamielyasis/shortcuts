import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { HotKeys, configure } from 'react-hotkeys';
import { ShortcutView } from './ShortcutView';

configure({ defaultKeyEvent: 'keyup' });

const FocusTrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  &:not(:focus) {
    &:after {
      content: 'Click Into the Box to Continue';
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

const shortcuts = [
  {
    category: "vs-code",
    name: "Duplicate Line Down",
    description: "Make a copy of current line that cursor is on below",
    image: "https://miro.medium.com/max/526/1*UownOwu3ablWIC3EsvefcA.gif",
    keystroke: "shift+option+down"
  },
  {
    category: "vs-code",
    name: "Duplicate Line Up",
    description: "Make a copy of current line that cursor is on up",
    image: "https://miro.medium.com/max/526/1*UownOwu3ablWIC3EsvefcA.gif",
    keystroke: "shift+option+up"
  },
  {
    category: "vs-code",
    name: "Indent Line",
    description: "Indents line cursor is on",
    image: "https://i.stack.imgur.com/2BYAE.gif",
    keystroke: "command+]"
  },
  {
    category: "vs-code",
    name: "Outdent Line",
    description: "Outdents line cursor is on",
    image: "outdent.gif",
    keystroke: "command+["
  },
  {
    category: "general",
    name: "Copy",
    description: "Copies selection",
    image: "outdent.gif",
    keystroke: "command+c"
  },
]

//  /getShortcuts
//  /getShortcuts?category=general
//  /getShortcuts?category=vs-code
//  /getShortcuts?category=vs-code,general



export default function VSCode(props) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const currentShortcut = shortcuts[current];

  const handleSuccess = (e) => {
    if (current + 1 < shortcuts.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
    // e.preventDefault();
  };

  const handlers = {
    SUCCESS: handleSuccess
    // FAIL: () => console.log('wrong'),
  };

  const keyMap = {
    SUCCESS: currentShortcut.keystroke
    // FAIL: ['cmd', 'option', 'shift'],
  };

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [current])

  return done ? <h1>Congrats!</h1> : <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
    <FocusTrap ref={ref} tabIndex={0}>
      <ShortcutView {...currentShortcut} />
    </FocusTrap>
  </HotKeys>
}