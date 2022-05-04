import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { AuthProvider } from './Auth/Context/AuthProvider';
import { RequireAuth } from './Auth/Context/RequireAuth';
import Home from './Home/Components/Home';
import Resources from './Pages/Resources/Resources';
import { ResourceProvider } from './ResourcesLinks/Context/Resource/ResourceProvider';
// import ResourcesLinks from './ResourcesLinks/Components/ResourcesLinks';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route
          path="/resources"
          element={
            <RequireAuth>
              <ResourceProvider>
                <Resources />
              </ResourceProvider>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
