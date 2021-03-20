import React from 'react';
import Login from '../components/Login/Login.js';

function storeSession(){
  fetch()
}
export default function Landing() {
  document.body.style.background = "#FDB813";
  return(
    <Login storeSession={storeSession}/>
);
}