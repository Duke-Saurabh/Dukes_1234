import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import CaptchaCode from '../components/CaptchaCode';
import { UserContext } from '../userContext/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [passwordEntered, setPasswordEntered] = useState('');
  const [captchaVerified,setCaptchaVerified]=useState(false);
  
  const navigate=useNavigate()

  const { setUser } = useContext(UserContext);

 

const handleLogin = async (e) => {
  e.preventDefault();

  if (!captchaVerified) {
    alert('Captcha not verified.');
    return;
  }

  if (!email || !userName || !passwordEntered || [email, userName, passwordEntered].some(field => field.trim() === '')) {
    alert('All fields are required');
    return;
  }

  const dataObj = {
    email,
    userName,
    password: passwordEntered
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataObj)
  };

  try {
const response = await fetch('/api/v1/users/login', options);

    if (response.ok) {
      const responseData = await response.json();
      const { accessToken, refreshToken,user } = responseData;

      // Store the tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // // Store the tokens in cookies
      // document.cookie = `accessToken=${accessToken}; path=/; secure; HttpOnly`;
      // document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly`;

      alert('Login successful!');
      setUser(user);

      navigate(`/${userName}/message`);
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login. Please try again.');
  }
};


  return (
    <div className='page'>
    <div className="login">
      <h3>Registered User can Login</h3>
      <div className="login-box">
        <div className="login-description">
          <p><b>UserName and Email with Password</b></p>
        </div>
        <div>
          <div className="login-main-box">
            <p>Login with Your Email Address, UserName and Password</p>
          
          <div className="email-address">
            <label htmlFor="email-address">Email Address</label>
            <input
              placeholder="Enter The Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="user-name">
            <label htmlFor="user-name">User Name</label>
            <input
              placeholder="Enter The User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter The Password"
              type="password"
              value={passwordEntered}
              onChange={(e) => setPasswordEntered(e.target.value)}
              required
            />
          </div>
          
        </div>
        
      </div>




      <div>
            <CaptchaCode setCaptchaVerified={setCaptchaVerified} />
          </div>
          <div className='login-btn'>
            <form onSubmit={handleLogin} >
              <button type="submit">Sign In</button>
            </form>
          </div>
    </div>
        <div className='other-opt'>
          <div className="forgetPassword">
            <Link to="/changePassword" className="forgetPassword-link">Forget Password</Link>
          </div>
          <div className="sign-up">
            <Link to="/" className="sign-up-link">Sign Up</Link>
          </div>
        </div>
    </div>
    </div>
  );
}

export default Login;