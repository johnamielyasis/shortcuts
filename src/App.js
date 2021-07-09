import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
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
import { userIdAtom, shortcutsAtom, categoryAtom } from './atoms';

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

const Container = styled.div``;
const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;
// method for tracking if authentication status has changed
const App = () => {
  const [user, setUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [uid, setUserId] = useRecoilState(userIdAtom);
  const setShortcuts = useSetRecoilState(shortcutsAtom);
  const category = useRecoilValue(categoryAtom);

  useEffect(() => {
    //firbase passes user/null in callback based on auth state
    const unregister = firebaseApp.auth().onAuthStateChanged((user) => {
      setUser(user);
      setUserId(user.uid); // store id for db use.
      setCheckedAuth(true);
    });
    return unregister;
  }, []);

  useEffect(() => {
    const shortcutsRef = db.ref("shortcuts");
    shortcutsRef.on("value", (snapshot) => {
      // data returns as an object
      const items = snapshot.val();
      // convert object to array of shortcuts with ids in key
      const itemList = Object.entries(items)
        .map(([key, value]) => {
          return {
            id: key,
            ...value,
          }
        });
      setShortcuts(itemList);
    });
  }, [setShortcuts]);

  return (
    <Container>
      <GlobalStyle />
      <Header />
      <Inner>
      {
        checkedAuth && (
          !user ?
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} /> :
          (
            <Router>
              <Switch>
                <Route exact path="/">
                  {category ? <ShortcutHandler /> : <CategoryChooser />}
                </Route>
                <Route path="/new-shortcut"><ShortcutAdder /></Route>
              </Switch>
            </Router>
          )
        )
      }
      </Inner>
    </Container>
  );
};

export default App;
