import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// wrap around highest level in tree that requires data
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.7.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
 */

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