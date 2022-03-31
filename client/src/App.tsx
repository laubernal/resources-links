import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './Auth/Context/AuthProvider';
import Home from './Home/Components/Home';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
