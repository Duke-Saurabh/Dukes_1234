import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header({setLogout}) {
 
  return (
    <header className="Header">
      <h1 className='head'>Welcome to My App</h1>
      <div className='logout'>
        <button type='button' onClick={()=>setLogout(prev=>!prev)}>Log Out</button>
      </div>
    </header>
  );
}

export default Header;
