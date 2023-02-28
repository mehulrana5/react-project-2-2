import './App.css';

// import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App=()=>{
  const apiKey=process.env.REACT_APP_API_KEY
  return( 
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News key="general" country="in" apiKey={apiKey} category="general" />}></Route>
            <Route exact path="/business" element={<News key="business" country="in" apiKey={apiKey} category="business" />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" country="in" apiKey={apiKey} category="entertainment" />}></Route>
            <Route exact path="/health" element={<News key="health" country="in" apiKey={apiKey} category="health" />}></Route>
            <Route exact path="/science" element={<News key="science" country="in" apiKey={apiKey} category="science" />}></Route>
            <Route exact path="/sports" element={<News key="sports" country="in" apiKey={apiKey} category="sports" />}></Route>
            <Route exact path="/technology" element={<News key="technology" country="in" apiKey={apiKey} category="technology" />}></Route>
          </Routes>
        </div>
      </Router>
    )
}
export default App