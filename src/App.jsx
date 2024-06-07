// App.js
import React from 'react';
import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Register from "./usersRegister/Register";
import Login from './usersLogin/Login';
import ChangePassword from './ChangePassword/ChangePassword';
import Message from './usersMessage/Message';
import { UserProvider } from './userContext/UserContext';
import BaseUrlContext from './BaseUrlContext/BaseUrlContext';
import Logout from './Logout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="changePassword" element={<ChangePassword />} />
      <Route path="logout" element={<Logout />} />
      <Route path="/" element={<Register />} />
      <Route path="*" element={<Register />} />
      <Route path=":userName/message" element={<Message />} />
    </Route>
  )
);

const baseURL = 'https://my-backend.vercel.app:3000';



function App() {
  return (
    <BaseUrlContext.Provider value={baseURL}>
    <UserProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
    </BaseUrlContext.Provider>
  );
}

export default App;
