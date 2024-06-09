import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './ChangePassword.css';
import SecurityKey from '../components/SecurityKey';
import VerifyCaptcha from '../usersRegister/VerifyCaptcha';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handlePasswordChangeEvent = async(event) => {
    event.preventDefault();

    // if (!captchaVerified) {
    //   alert('Captcha is not Verified');
    //   return;
    // }

    if (!email || !userName || !securityQuestion || !securityAnswer || !newPassword || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New Password and Confirm Password are Different.');
      return;
    }

    const objdata = {
      userName,
      name,
      email,
      securityQuestion,
      securityAnswer,
      newPassword,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objdata),
    };

    console.log(objdata);
    try {
      // Perform the password change request
      // fetch('your-api-endpoint', options).then(response => response.json()).then(data => { /* handle response */ });
      const response=await fetch('https://dukes-1234-backend.vercel.app/api/v1/users/password',options);
        if (response.ok) {
          alert('Password Change successful!');
          
        } else {
          alert('Password Change failed. Please try again.');
        }
    } catch (error) {
      console.error('Error during password change', error);
      alert('Some Error in Password Changing. Try Again.')
    }
  };

  return (
    <div className="this-page">
      <div className="changePassword">
        <h3>User can Change Password</h3>
        <div className="changePassword-box">
          <div className="changePassword-description">
            <p><b>Security Key, User Name and Email with New Password</b></p>
          </div>
          <div>
            <div className="login-main-box">
              <p>Change Password with Your Email Address, User Name, and Security Question</p>
              <div className="name">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  placeholder="Enter The Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="email-address">
                <label htmlFor="email-address">Email Address</label>
                <input
                  id="email-address"
                  placeholder="Enter The Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="user-name">
                <label htmlFor="user-name">User Name</label>
                <input
                  id="user-name"
                  placeholder="Enter The User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="verify-part">
                <div className="security-key">
                  <SecurityKey
                    securityQuestion={securityQuestion}
                    setSecurityQuestion={setSecurityQuestion}
                    securityAnswer={securityAnswer}
                    setSecurityAnswer={setSecurityAnswer}
                  />
                </div>
                {/* <div className="verifyCaptcha">
                  <VerifyCaptcha setCaptchaVerified={setCaptchaVerified} />
                </div> */}
              </div>
              <div className="password-change">
                <label htmlFor="new-password">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <form className="password-change-btn" onSubmit={handlePasswordChangeEvent}>
                <button type="submit"> Change Password </button>
              </form>
            </div>
          </div>
          <div className="back-to-login">
            <Link to="/Login" className="back-to-login-link">Back To Login Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;