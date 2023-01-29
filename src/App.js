import React from 'react';
import './App.css';
import NavBar from "./home_page/NavBar";
import Home from './home_page/Home';
import About from './about_page/About';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
