// Layout.js
import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import './Layout.css';
import { UserContext } from "./userContext/UserContext";

function Layout() {
  const [logout, setLogout] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log(user);
    const dataObj = {
      email: user?.email || '',
      userName: user?.userName || '',
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    };

    try {
      const response = await fetch('/api/v1/users/logout', options);
      if (response.ok) {
        // Clear tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Clear user context
        setUser(null);
        setLogout(false);

        alert('Logout successful!');
        navigate(`/login`); // Redirect to login page
      } else {
        const errorData = await response.json();
        alert(`Logout failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  return (
    <div>
      {logout && (
        <div className="logout-panel">
          <div className="logout-box">
            <p>Do you want to logout?</p>
            <div className="logout-options">
              <button type="button" onClick={handleLogout}>Yes</button>
              <button type="button" onClick={() => setLogout(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <Header setLogout={setLogout} />
      <div className="Main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

