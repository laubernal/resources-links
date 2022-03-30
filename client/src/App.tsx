import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Auth from './Auth/Components/Auth.tsx/Auth';
import SignIn from './Auth/Components/SignIn/SignIn';
import { AuthProvider } from './Auth/Context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/signin/*" element={<SignIn />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
