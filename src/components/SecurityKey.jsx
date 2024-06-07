import React from 'react';
import './SecurityKey.css';

function SecurityKey({ securityQuestion, setSecurityQuestion, securityAnswer, setSecurityAnswer }) {
  return (
    <div className='securityKey'>
      <h3>Select Security Question</h3>
      <div className='securityKeyQuestion'>
        <select 
          value={securityQuestion} 
          onChange={(e) => setSecurityQuestion(e.target.value)}
          required
        >
          <option value="">Select a question</option>
          <option value="WHAT WAS YOUR CHILDHOOD NICKNAME?">
            WHAT WAS YOUR CHILDHOOD NICKNAME?
          </option>
          <option value="WHAT IS THE NAME OF YOUR FAVORITE CHILDHOOD FRIEND?">
            WHAT IS THE NAME OF YOUR FAVORITE CHILDHOOD FRIEND?
          </option>
          <option value="NAME OF YOUR FIRST GIRL FRIEND">
            NAME OF YOUR FIRST GIRL FRIEND  
          </option>
          <option value="WHAT IS YOUR FAVORITE TEAM?">
            WHAT IS YOUR FAVORITE TEAM?
          </option>
          <option value="WHAT IS YOUR FAVORITE MOVIE?">
            WHAT IS YOUR FAVORITE MOVIE?
          </option>
          <option value="WHAT IS YOUR FAVOURITE SPORT?">
            WHAT IS YOUR FAVOURITE SPORT?
          </option>
        </select>
      </div>
      <div className='securityKeyAnswer'>
        <input 
          value={securityAnswer} 
          onChange={(e) => setSecurityAnswer(e.target.value)} 
          placeholder="Enter your answer"
          required
        />
      </div>
    </div>
  );
}

export default SecurityKey;
