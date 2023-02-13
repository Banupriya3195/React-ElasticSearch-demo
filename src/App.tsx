import React from 'react';
import './App.scss';
import {Routes,Route, NavLink} from "react-router-dom"
import Elsearch from './pages/Elsearch';
import Template from './pages/Template';

import CMPL from './pages/CMPL';

function App() {
  return (
    <div className="App">
      <header >
        <h1>Elastic Search</h1>
        
        <ul>
          <li ><NavLink  className={({ isActive }) => (isActive ? 'active-link-rout' : 'link-rout')} to={'/'}>Source</NavLink></li>
          <li><NavLink className={({ isActive }) => (isActive ? 'active-link-rout' : 'link-rout')} to={'/Template'}>Template</NavLink></li>
          <li><NavLink className={({ isActive }) => (isActive ? 'active-link-rout' : 'link-rout')} to={'/CMPL'}>CMPL</NavLink></li>
         
        </ul>
      </header>
      <Routes>
        <Route  path='/' element={<Elsearch />}/>
        <Route  path='/Template' element={<Template />}/>
        <Route  path='/CMPL' element={<CMPL />}/>
      </Routes>
    </div>
  );
}

export default App;
