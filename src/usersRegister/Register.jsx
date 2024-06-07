import React, { useState , useContext} from 'react';
import BaseUrlContext from '../BaseUrlContext/BaseUrlContext';
import Name from './Name';
import UserName from './UserName';
import Email from './Email';
import Password from './Password';
import PhotoUploader from './PhotoUploader';
import VerifyCaptcha from './VerifyCaptcha';
import SecurityKey from '../components/SecurityKey';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState(null); // URL for preview
  const [userPhotoFile, setUserPhotoFile] = useState(null); // Original file for upload
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);


  const baseURL = useContext(BaseUrlContext);


  const myStyle = {
    backgroundColor: 'pink',
    padding: '10px',
    borderRadius: '5px',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    maxWidth: '900px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert('Your captcha is not verified.');
      return;
    }

    // Ensure all fields are filled
    if (!name || !userName || !email || !password || !securityQuestion || !securityAnswer) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userPhoto', userPhotoFile); // Use the original file
    formData.append('securityQuestion', securityQuestion);
    formData.append('securityAnswer', securityAnswer);

    try {
        const response = await fetch(`${baseURL}/api/v1/users/register`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred in Register. Please try again.');
    }
  };

  return (
    <div id='Register-container'>
      <div className='page-top-manage'>
        <div className='photoUploader'>
          <PhotoUploader 
           photo={userPhoto} 
           setPhoto={setUserPhoto} 
           setPhotoFile={setUserPhotoFile} 
        />
        </div>
        <div className='login-page-route'>
          <Link to={'/login'}>
            <button>Go to Login Page</button>
          </Link>
        </div>
    
      </div> 
      <Name name={name} setName={setName} myStyle={myStyle} />
      <UserName userName={userName} setUserName={setUserName} myStyle={myStyle} />
      <Email email={email} setEmail={setEmail} myStyle={myStyle} />
      <Password password={password} setPassword={setPassword} myStyle={myStyle} />
      <div className='verify-part'>
        <SecurityKey
          securityQuestion={securityQuestion}
          setSecurityQuestion={setSecurityQuestion}
          securityAnswer={securityAnswer}
          setSecurityAnswer={setSecurityAnswer}
        />
        <div className='verifyCaptcha'>
          <VerifyCaptcha setCaptchaVerified={setCaptchaVerified} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
