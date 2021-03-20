import React from 'react';
import Intro from '../../components/Intro/Intro.js';

import './LandingPage.css'

export default function Landing() {
  document.body.style.background = "#FDB813";
  return(
    <div className="wrapper">
      <Intro />
    </div>
);
} 