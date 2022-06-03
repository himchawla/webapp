import axios from "axios";
import React from "react";

import {useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Cookies from "universal-cookie";


export function Login() {
    const [searchParams] = useSearchParams();
    const cookie = new Cookies();

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
    if(email === ""&& queryEmail !== null) {
        setEmail(queryEmail);
        // document.getElementById("email").innerHTML = queryEmail;
    }
    



    const handleSubmit = async () => {
         // e.preventDefault();
        var userName = "";
        await axios.get("http://localhost:3001/user/username/" + email).then(res => {
            console.log(res.data);
            if(res.data === "") {
                alert("User does not exist");
            } else {
                userName = res.data;
            }
        }).catch(err => {
            console.log(err);
        });

        console.log(email, password);
        axios.post("http://localhost:3001/login/", {
            email: email,
            password: password,
            token: "TOKEN",
            }).then(res => {
            if(res.data.msg === "success") {
                console.log("success");
                cookie.set("sessionToken", res.data.cookie, { path: '/' });
                cookie.set("username", userName, { path: '/' });
                window.location.href = ("/" +  userName);

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
                    {
                        email !== ""
                            ? <input value={email} name={"mail"} type={'text'} placeholder={"Enter your email"}
                                   onChange={(event) => setEmail(event.target.value)}/>
                            : <input  name={"mail"} type={'text'} placeholder={"Enter your email"}
                            onChange={(event) => setEmail(event.target.value)}/>
                    }
                            <label>Password:</label>
                            <input type={'password'} placeholder={'Enter your password'}
                                   onChange={(event) => setPassword(event.target.value)}/>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    }
            </div>
        </div>
    );
}