import axios from "axios";
import React from "react";

import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";



export function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const useQuery = () => {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    
    const query = useQuery();
   
    const queryEmail = query.get("email");
    //remove query from url
    if(email === "") {
        setEmail(queryEmail);
        // document.getElementById("email").innerHTML = queryEmail;
    }
    
    const navigateToHomepage = () => {
        axios.get("http://localhost:3001/user/username/" + email).then(res => {
                console.log(res.data);
            navigate("/" +  res.data);
            });
        
    };
    
    const handleSubmit = () => {
         // e.preventDefault();
        console.log(email, password);
        axios.post("http://localhost:3001/login/", {
            email: email,
            password: password
        }).then(res => {
            if(res.data === "success") {
                console.log("success");
                // return navigateToHomepage();
                axios.get("http://localhost:3001/user/verify?id=test").then((response) => {
                    if (response.data.loggedIn == true) {
                        console.log("logged in");
                    }
                    else {
                        console.log("not logged in");
                    }
                });
            }
            else 
            {
                //console.log(name, res.data.password);
                console.log(res);
                console.log("error");
            }
        }).catch(err => {
            console.log(err);
        });
    };

    function setEmailFromQuery(target) {
        target.value = queryEmail;
    }

    return (
        <div className="Login">
            <div className="App-header">
            </div>
            <div className="App-body">
                <div className="Input-Container">
                    <label>Email:</label>
                    <input value={email} name={"mail"} type={'text'} placeholder={"Enter your email"}
                           onChange={(event) => setEmail(event.target.value)} id="email" />
                    <label>Password:</label>
                    <input type={'password'} placeholder={'Enter your password'}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}