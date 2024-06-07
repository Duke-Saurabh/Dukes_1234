import React, { useCallback, useEffect, useRef, useState } from 'react'
import './PasswordGenerator.css';
// import Password from '../usersRegister/Password';

function PasswordGeneratorComp() {
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeCharacters, setIncludeCharacters] = useState(true);
      
    const generatePassword=useCallback(()=>{
        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeCharacters) chars += '!@#$%^&*()-_=+<>?';

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
        setGeneratedPassword(password);
    },[passwordLength, includeNumbers, includeCharacters]);   
    
    useEffect(()=>{
        generatePassword();
    },[passwordLength, includeNumbers, includeCharacters])
    
    const copyRef=useRef(null);
    const copyToClipboard = () => {
        if (generatedPassword) {
          const passwordToCopy = generatedPassword.slice(0, 30);
          navigator.clipboard.writeText(passwordToCopy).then(() => {
            // Select the first 30 characters in the input field text
            copyRef.current.select();
            copyRef.current.setSelectionRange(0, 30);
      
            // alert('Password copied to clipboard!');
          }).catch( (err) => {
            alert('Failed to copy the password');
          });
        } else {
          alert('Please generate a password first.');
        }
      };
      





  return (
     <div className='passwordGeneratorContainer'>
          <h3>Generate Strong Password</h3>
       
         <div className="generatedPasswordContainer">
        <input 
          type="text" 
          value={generatedPassword} 
          readOnly 
          placeholder="Generated password will appear here"
          ref={copyRef}
        />
        <button onClick={copyToClipboard}>Copy</button>
     </div>

     <div className='generatePasswordControllers'>
        <div className="controller">
          <label>Length: {passwordLength}</label>
          <input 
            type="range" 
            min={6} 
            max={100} 
            value={passwordLength} 
            onChange={(e) => setPasswordLength(e.target.value)} 
          />
        </div>  
        <div className="controller">
          <input 
            type="checkbox" 
            id="NumbersAllowed" 
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)} 
          />
          <label htmlFor="NumbersAllowed">Include Numbers</label>
        </div>
        <div className="controller">
          <input 
            type="checkbox" 
            id="CharactersAllowed" 
            checked={includeCharacters}
            onChange={(e) => setIncludeCharacters(e.target.checked)} 
          />
          <label htmlFor="CharactersAllowed">Include Special Characters</label>
        </div>

        </div>
        <div>
            <button onClick={generatePassword}> Generate Password </button>
        </div>
    </div>
  )
}

export default PasswordGeneratorComp