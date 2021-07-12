
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { HotKeys } from 'react-hotkeys';
import { ShortcutView } from './ShortcutView';
import { db } from '../utils/firebase';
import { userIdAtom, shortcutsAtom, categoryAtom } from '../atoms';

// places focus on relevant part where key perss listener is
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FinishedScreenContainer = styled.div`
  width: 100%;
  justify-content: center;
  padding: 100px;
`;


const FocusTrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  position: relative;
  margin: 10px;
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

const HintButton = styled.button`
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
  }`;

const SelectCategory = styled.button`
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

export default function ShortcutHandler(props) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [hint, setHint] = useState(false);
  const [progress, setProgress] = useState(0);
  const category = useRecoilValue(categoryAtom);
  const shortcuts = useRecoilValue(shortcutsAtom);
  const uid = useRecoilValue(userIdAtom);
  const filteredShortcuts = shortcuts.filter(s => s.category === category);
  const currentShortcut = filteredShortcuts[current];

  const progressRef = db.ref(`user_data`).child(uid).child(`shortcut_progress`);
  let obj, stuff
  progressRef.on("value", (snapshot) => {
    obj = snapshot ? snapshot.val() : {};
    stuff = obj ? Object.entries(obj) : [];

  });

  const handleSuccess = (e) => {
    console.log('this is stuff', stuff)
    // progress recording to db
    // in retrospect could just reduce/filter here to stop repeating having to loop but lazy
    let foundIt = false;
    for (let id of stuff) {
      if (id[1].shortcut_id === currentShortcut.id) {
        foundIt = true;
        console.log('their equal', id[1].value, 'id', id[0]);
        let update = {
          value: id[1].value + 1
        }
        db.ref(`user_data/${uid}/shortcut_progress/${id[0]}`).update(update);
        break;
      }
    }
    if (foundIt === false) {
      const itemRef = db.ref("user_data").child(uid).child('shortcut_progress').push({
        shortcut_id: currentShortcut.id,
        value: 1,
      });
    }
    // training advancement
    if (current + 1 < filteredShortcuts.length) {
      setCurrent(current + 1);
      setHint(false);
    } else {
      setDone(true);
    }
    e?.preventDefault();
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
    setHint(false);
    setCurrent(0);
  };

  const focusOnTrap = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleHint = () => {
    if (hint === false) {
      for (let id of stuff) {
        if (id[1].shortcut_id === currentShortcut.id) {
          console.log('their equal', id[1].value, 'id', id[0]);
          let update = {
            value: Math.max(id[1].value - 2, 0)
          }
          db.ref(`user_data/${uid}/shortcut_progress/${id[0]}`).update(update);
          break;
        }
      }
    }
    setHint(true);

  }

  const handleChooseCategory = () => {
    window.location.reload();
    // alternatively just clear the category atom? Hacky solution for now
  }

  useEffect(() => {
    if (!uid) return;
    const userDataRef = db.ref("user_data").child(uid).child('shortcut_progress');
    userDataRef.on("value", (snapshot) => {
      obj = snapshot ? snapshot.val() : {};
      stuff = obj ? Object.entries(obj) : [];
      for (let id of stuff) {
        if (id[1].shortcut_id === currentShortcut.id) {
          setProgress(id[1].value);
          console.log('whatsinhere', progress)
          break;
        }
      }
    });
  }, [uid, currentShortcut]);

  useEffect(() => {
    focusOnTrap()
  }, [current])
  console.log('THIS IS PROGRES IN HANDLER', progress);

  return done ? (
    <FinishedScreenContainer>
      <h1>Congrats!</h1>
      <ButtonsContainer>
        <SelectCategory onClick={handleStartOver}>
          StartOver
        </SelectCategory>
        <SelectCategory onClick={handleChooseCategory}>
          Select Category
        </SelectCategory>
      </ButtonsContainer>
    </FinishedScreenContainer>
  ) : (
    <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
      <FocusTrap ref={ref} tabIndex={0}>
        <ShortcutView {...currentShortcut} progress={progress} current={current} max={filteredShortcuts.length} />
      </FocusTrap>
      <ButtonsContainer>
        <Hint style={{color: "red"}}>
          <HintButton onClick={handleHint}>Hint</HintButton> {hint ? currentShortcut.keystroke : null}
        </Hint>
        <SelectCategory onClick={handleChooseCategory}>
          Select Category
        </SelectCategory>
      </ButtonsContainer>
    </HotKeys>
  )
}

/*
{
  "rules": {
    "shortcuts": {
      ".read": true,
      ".write": "auth.uid != null",
    },
    "user_data": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
      }
    }
  }
}
*/
