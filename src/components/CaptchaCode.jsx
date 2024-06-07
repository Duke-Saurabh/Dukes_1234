import React, { useState, useEffect } from 'react';
import './CaptchaCode.css';
function CaptchaCode({setCaptchaVerified}) {
  const [enteredCaptcha, setEnteredCaptcha] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const captcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCaptcha(captcha);
  };

  const handleChange = (e) => {
    setEnteredCaptcha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredCaptcha === generatedCaptcha) {
      setCaptchaVerified((true));
      alert('CAPTCHA verified successfully!');
      // Perform any other actions upon successful verification
    } else {
      setCaptchaVerified((false));
      alert('Incorrect CAPTCHA. Please try again.');
      generateCaptcha(); // Optionally regenerate CAPTCHA on failure
      setEnteredCaptcha('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='captcha'>
      <div>
        <input
          type="text"
          value={enteredCaptcha}
          onChange={handleChange}
          placeholder='Enter the CAPTCHA'
          id='inputCaptcha'
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={generatedCaptcha}
          readOnly
          id='generatedCaptcha'
        />
      </div>
      <button type="submit">Verify</button>
    </form>
  );
}

export default CaptchaCode;
