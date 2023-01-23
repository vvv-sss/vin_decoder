import React from 'react';
import './App.css';
import NavBar from "./home_page/navbar";
import Home from './home_page/home';
import About from './about_page/about';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
