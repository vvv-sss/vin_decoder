import React from 'react';
import './App.css';
import NavBar from "./home_page/navbar";
import Home from './home_page/home';
import About from './about_page/about';
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
