import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import firebase from 'firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { theme } from './constants';
import Header from './components/Header';
import ShortcutHandler from './components/ShortcutHandler';

// utilizes env file
// safe place to put because this is the top level of our app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// initializes firebase for app using the SDK config keys
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

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
  padding: 16px;234
`;
// method for tracking if authentication status has changed
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unregister = firebaseApp.auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    })
    return unregister;
  }, []);

  // to do: let users log out
  const onSignOut = () => {
    firebaseApp.auth().signOut();
  };

  return (
    <Container>
      <GlobalStyle />
      <Header />
      {
        !user ?
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> :
        (
          <>
            <ShortcutHandler />
            <button onClick={onSignOut}>Sign Out</button>
          </>
        )
      }
    </Container>
  );
};

export default App;

/*
  users
    {
      id: adufasdf1028934ahjdsfhads,
      name: john,
    },
    {
      id: 2,
      name: john,
    }

  users_shortcuts
    {
      user_id: 1,
      shortcut_id: 1,
      progress: 5,
    },
    {
      user_id: 2,
      shortcut_id: 1,
      progress: 2,
    }

  shortcuts
    {
      id: 1,
      category_id: 2,
      name: copy,
      keystroke_mac: cmd + copy,
      keystroke_win: ctrl + copy,
    },
    {
      id: 1,
      category_id: 1
      name: copy,
      keystroke_mac: cmd + copy,
      keystroke_win: ctrl + copy,
    }

  categories
    {
      id: 1,
      slug: general,
      name: General Shortcuts,
    },
    {
      id: 2,
      slug: vs-code,
      name: Visual Studio Code,
    },
*/

/*

sign up > firebase creates a user > token(encrypted user)
browser stores token (local storage/cookie)

firebase_user_id > extract id

shortcuts_user_id
app checks for token
  > has token - show logged in view > dropdown choose app > learn shortcuts
  > no token - show login screen

*/
