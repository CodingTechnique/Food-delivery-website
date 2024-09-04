import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/screems/Home';
import Signup from './components/screems/Signup';
import Myorder from './components/screems/Myorder'; // Path सही रखें
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardProvider } from './components/ContexReducer.js';

function App() {
  return (
    <CardProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route path="/myorders" element={<Myorder />} /> {/* Path सही करें */}
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;
