import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from 'firebase/compat/app'
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";

// console.log(firebase)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  // StrictMode 2번 렌더하는 이슈때문에 임시방편
  // <React.StrictMode>
  // </React.StrictMode>
);
