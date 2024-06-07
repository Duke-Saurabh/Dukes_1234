import React, { useState, useEffect } from 'react';
import { InputComp, PasswordGeneratorComp } from '../components/Index.jsx';

function Password({ password, setPassword,myStyle,className }) {
  const label = "Enter The Password: ";
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordNotes, setConfirmPasswordNotes] = useState('');

  useEffect((event) => {
    const passwordSubstring = password.slice(0, confirmPassword.length);
    console.log()
    if(confirmPassword.length>0){
      if (confirmPassword === passwordSubstring) {
          if (password.length === confirmPassword.length) {
            setConfirmPasswordNotes('Your Password Matched');
          } else {
            setConfirmPasswordNotes('Your Password is Matching Proceed Further');
          }
        }
       else {
          setConfirmPasswordNotes('Your Password is <strong>NOT MATCHING</strong>. Recorrect it.');
        }
    }else{
      setConfirmPasswordNotes('');

    }

    // if (confirmPassword === passwordSubstring) {
    //   if (password.length === confirmPassword.length) {
    //     setConfirmPasswordNotes('Your Password Matched');
    //   } else {
    //     setConfirmPasswordNotes('Your Password is Matching Proceed Further');
    //   }
    // } else {
    //   setConfirmPasswordNotes('Your Password is <strong>NOT MATCHING</strong>. Recorrect it.');
    // }
  }, [confirmPassword, password]);

  return (
    <div style={myStyle} className={className}>
      <InputComp 
        label={label}
        value={password}
        setValue={setPassword}
        type='password'
      />
      <InputComp 
        label={'Enter The Password Again'}
        value={confirmPassword}
        setValue={setConfirmPassword}
        type='password'
        placeholder={'Confirm Password'}
      />
      <p dangerouslySetInnerHTML={{ __html: confirmPasswordNotes }}></p>

      <PasswordGeneratorComp></PasswordGeneratorComp>
    </div>
  );
}

export default Password;
