
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { HotKeys } from 'react-hotkeys';
import { ShortcutView } from './ShortcutView';
import { db } from '../utils/firebase';
import { userIdAtom, shortcutsAtom, categoryAtom } from '../atoms';

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
  const [progress, setProgress] = useState([]);
  const category = useRecoilValue(categoryAtom);
  const shortcuts = useRecoilValue(shortcutsAtom);
  const uid = useRecoilValue(userIdAtom);
  const filteredShortcuts = shortcuts.filter(s => s.category === category);
  const currentShortcut = filteredShortcuts[current];
  const shortcutProgressRef = db.ref("user_data").child(uid).child('shortcut_progress');
  const existingShortcutProgress = progress.find(p => p.shortcut_id === currentShortcut.id);
  const shortcutProgress = existingShortcutProgress?.value|| 0;
  const totalProgress = progress.reduce((a, c) => a + c.value, 0)
  // existingShortcutProgress.id
  // existingShortcutProgress.shortcut_id

  const handleHint = () => {
    setHint(true);
    if (!!existingShortcutProgress) {
      shortcutProgressRef.child(existingShortcutProgress.id).update({
        value: Math.max(existingShortcutProgress.value - 2, 0),
      })
    }
  };

  const handleSuccess = (e) => {
    // progress recording to db
    if (!!existingShortcutProgress) {
      shortcutProgressRef.child(existingShortcutProgress.id).update({
        value: existingShortcutProgress.value + 1,
      })
    } else {
      shortcutProgressRef.push({
        shortcut_id: currentShortcut.id,
        value: 1,
      });
    }

    // training advancement
    if (current + 1 < filteredShortcuts.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }

    setHint(false);
    e?.preventDefault();
  };

  const handlers = {
    SUCCESS: handleSuccess
  };

  const keyMap = {
    SUCCESS: currentShortcut?.keystroke
    // optional?.chaining
    // returns undefined if currentShortcut
    // without throwing error: "cannot find keystroke of undefined"
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

  useEffect(() => {
    if (!uid) return;
    const userDataRef = db.ref("user_data").child(uid).child('shortcut_progress');
    userDataRef.on("value", (snapshot) => {
      const items = snapshot.val() || {};
      const itemList = Object.entries(items)
        .map(([key, value]) => {
          return {
            id: key,
            ...value,
          }
        });
      setProgress(itemList);
    });
  }, [uid, current]);

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
      <Hint><span><button onClick={handleHint}>HINT</button> {hint ? currentShortcut.keystroke : null} </span></Hint>
      <h4>Point Contribution: {shortcutProgress}</h4>
      <h4>Total Points: {totalProgress}</h4>
    </HotKeys>
  )
}
