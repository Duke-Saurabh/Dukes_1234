import React from 'react';
import './Register.css';// Ensure the CSS file path is correct
import { InputComp } from '../components/Index.jsx';

function Email({ email, setEmail ,myStyle}) {
  // console.log(registerComp);
  return (
    <div style={myStyle}>
      <InputComp
        label={'Enter Your Email:'}
        value={email}
        setValue={setEmail}
      />
      <p>Email You Entered: {email}</p>
    </div>
  );
}

export default Email;
