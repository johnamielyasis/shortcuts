import { HotKeys } from "react-hotkeys";
import React, { useState } from 'react';

// create array of shortcut objects
const shortcuts = [
  {
    name: "Duplicate Line Down",
    description: "Make a copy of current line that cursor is on below",
    image: "dupe.gif",
    keystroke: "shift+option+down"
  },
  {
    name: "Duplicate Line Up",
    description: "Make a copy of current line that cursor is on up",
    image: "dup.gif",
    keystroke: "shift+option+up"
  }
]

const App = () => {
  const [current, setCurrent] = useState(0);

  const currentShortcut = shortcuts[current];
  const handleSuccess = React.useCallback(() => {
    // logic here
    setCurrent(current + 1);
  }, [])

  const handlers = {
    SUCCESS: handleSuccess
  };

  const keyMap = {
    SUCCESS: currentShortcut.keystroke
  }

  return (
    <HotKeys keyMap={keyMap} handlers={handlers} >
      <div>
        {currentShortcut.name}
      </div>
    </HotKeys>
  );
};

export default App;
