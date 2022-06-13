import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {Login} from "./Login";
import {SignUp} from "./SignUp";
import {Home} from "./Home";
import React from "react";
import {HomePage} from "./User/HomePage";
import {Cookies} from "react-cookie";
import './bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'


export const cookies = new Cookies();
export const serverPath = "http://127.0.0.1:3001";


//Main App function
function App() {

    var userName = cookies.get('username');
    if(userName === undefined) {
        userName = "";
    }
    return (
    <Router>
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />;
                <Route path="/signup" element={<SignUp />} />;
                <Route path="/" element={<Home />} />
                <Route exact path={"/:id/*"} element={<HomePage id={userName}/>} /> />
            </Routes>
        </div>
    </Router>
  );
   

}

export default App;
