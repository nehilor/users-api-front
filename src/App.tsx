import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './containers/Login';
import Users from './containers/Users';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/users" element={<Users/>}/>
        </Routes>
      </Router>
  );
};

export default App;
