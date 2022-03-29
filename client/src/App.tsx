import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import SignIn from './Auth/Components/SignIn/SignIn';
import { AuthProvider } from './Auth/Context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin/*" element={<SignIn />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
