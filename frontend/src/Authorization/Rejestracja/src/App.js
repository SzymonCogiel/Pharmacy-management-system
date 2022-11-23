import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Register } from './Register';
import avatar from './avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function App() {

    return (
    <div className="App">
      <Register></Register>
    </div>
  )
}

export default App;
