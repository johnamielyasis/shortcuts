import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import { firebaseApp, uiConfig, firebaseAuth, db } from './utils/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// todo: learn react routing, switches kind of like switch statements?
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { theme } from './constants';
import Banner from './components/Banner';
import Header from './components/Header';
import ShortcutHandler from './components/ShortcutHandler';
import CategoryChooser from './components/CategoryChooser';
import ShortcutAdder from './components/ShortcutAdder';
import { userIdAtom, shortcutsAtom, categoryAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: #FDF8F1;
}

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #DADADA;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

const BannerContainer = styled.div`
  background-color: #72BDD3;
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 16px rgba(0,0,0,0.2);
  z-index: 1;
  position: relative;
`;

const Container = styled.div`
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  background-color: ${theme.colors.surface};
  box-shadow: 2px 4px 16px rgba(0,0,0,0.2);
  border-radius: 8px;
`;
// method for tracking if authentication status has changed
const App = () => {
  const [user, setUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [uid, setUserId] = useRecoilState(userIdAtom);
  const setShortcuts = useSetRecoilState(shortcutsAtom);
  const category = useRecoilValue(categoryAtom);

  useEffect(() => {
    //firebase passes user/null in callback based on auth state
    // todo: understand https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    const unregister = firebaseApp.auth().onAuthStateChanged((user) => {
      setUser(user);
      setUserId(user?.uid); // store id for db use.
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

  // to do: let users log out
  const onSignOut = () => {
    firebaseApp.auth().signOut();
  };

  return (
    <Container>
      <GlobalStyle />
      {
        checkedAuth && (
          !user ?
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} /> :
            (
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Header />
                    {category ?
                      null
                      :
                      <BannerContainer>
                        <Banner />
                      </BannerContainer>}
                    <InnerContainer>
                      {category ? <ShortcutHandler /> :
                        <CategoryChooser />}
                    </InnerContainer>
                  </Route>
                  <Route path="/new-shortcut"><ShortcutAdder /></Route>
                </Switch>
              </Router>
            )
        )
      }
    </Container>
  );
};

export default App;
