import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import {firebaseApp, uiConfig, firebaseAuth, db } from './utils/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// react routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { theme } from './constants';
import Header from './components/Header';
import ShortcutHandler from './components/ShortcutHandler';
import CategoryChooser from './components/CategoryChooser';
import ShortcutAdder from './components/ShortcutAdder';
import { shortcutsAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.surface};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 16px;
`;
// method for tracking if authentication status has changed
const App = () => {
  const [user, setUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const setShortcuts = useSetRecoilState(shortcutsAtom);

  useEffect(() => {
    const unregister = firebaseApp.auth().onAuthStateChanged((user) => {
      setUser(user);
      setCheckedAuth(true);
    })
    return unregister;
  }, []);

  useEffect(() => {
    const shortcutRef = db.ref("shortcuts");
    shortcutRef.on("value", (snapshot) => {
      // data returns as an object
      const items = snapshot.val();
      // convert object to array
      setShortcuts(Object.values(items));
    });
  }, [setShortcuts]);

  // to do: let users log out
  const onSignOut = () => {
    firebaseApp.auth().signOut();
  };

  return (
    <Container>
      <GlobalStyle />
      <Header />
      {
        checkedAuth && (
          !user ?
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} /> :
          (
            <Router>
              <Switch>
                <Route to="/"><ShortcutHandler /></Route>
                <Route to="/onboarding"><CategoryChooser /></Route>
                <Route to="/new-shortcut"><ShortcutAdder /></Route>
              </Switch>

              <button onClick={onSignOut}>Sign Out</button>
            </Router>
          )
        )
      }
    </Container>
  );
};

export default App;
