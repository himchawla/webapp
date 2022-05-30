import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {SignUp} from "./SignUp";
import {Home} from "./Home";
import React from "react";
import {HomePage} from "./HomePage";

function App() {
  return (
    <Router>
        <div>
        
            
            <Routes>
                <Route path="/login" element={<Login />} />;
                <Route path="/signup" element={<SignUp />} />;
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<HomePage />} />
            </Routes>

            
        
        </div>
    </Router>

  );
   

}

export default App;
