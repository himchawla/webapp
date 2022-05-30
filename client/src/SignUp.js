import axios from "axios";
import {useState} from "react";
import {Login} from "./Login";
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import { useNavigate } from "react-router-dom";


export function SignUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    const [dupeUsername, setDupeUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const error = document.getElementById("error");    

    const handleSubmit = () => {
        // e.preventDefault();
        if(password === confirmPassword) {
            axios.post("http://localhost:3001/create/", {
                name: name,
                username: username,
                email: email,
                password: password
            }).then(res => {
                console.log(res);
                if (res.data === "User already exists") {
                    alert("User already exists, please login");
                    return navigate("/Login?email=" + email);
                }
                else {
                    alert("User created successfully");
                    return navigate("/Login?email=" + email);
                }
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            alert("Passwords do not match");
        }
    };

    function setBorderColor(target, focusIn) {
        if(focusIn) {
            target.style.borderColor = "black";
            error.innerHTML = "";
        }
        else {
            if(password === confirmPassword) {
                target.style.borderColor = "green";
                error.style.color = "green";
                error.innerHTML = "Passwords match";
            }
            else {
                target.style.borderColor = "red";
                error.style.color = "red";
                error.innerHTML = "Passwords do not match";
            }
        }
    }



    const If = (props) => {
        const condition = props.condition || false;
        const positive = props.then || null;
        const negative = props.else || null;

        return condition ? positive : negative;
    };

    let errorMessage = () => {return <p>Test</p>}
    let noerror = () => {return null};

    function validateUserName() {
        axios.post("http://localhost:3001/check/", {
            username: username
        }).then(res => {
            if(res.data === "username already exists") {
                setDupeUsername(true);
            }
            else {
                setDupeUsername(false);
            }
        }
        ).catch(err => {
            console.log(err);
        });
    }

    let cansubmit = !(!dupeUsername && password === confirmPassword && password.length > 0 && username.length > 0 && name.length > 0 && email.length > 0);
    return (
        //Interactive Signup form, ask for one parameter at a time and then submit
        <div className="SignUp">
            <div className="App-header">
            </div>
            <div className="App-body">
                <div className="Input-Container">
                    
                    <label>Name:</label>
                    <input type={'text'} placeholder={'Enter your name'}
                            onChange={(event) => setName(event.target.value)}/> 
                    <label>Email:</label>
                    <input type={'text'} placeholder={'Enter your email'}
                            onChange={(event) => setEmail(event.target.value)}/>
                    <label>Username:</label>
                    <input type={'text'} placeholder={'Enter your username'}
                            onChange={(event) => setUsername(event.target.value)} 
                    onBlur={validateUserName}/>
                    
                    {dupeUsername ? <p style={{ color: 'red' }}>Username is unavailable</p> : null}
                    <label>Password:</label>
                    <input type={'password'} placeholder={'Enter your password'}
                            onChange={(event) => setPassword(event.target.value)}/>
                    <label>Confirm Password:</label>
                    <input type={'password'} placeholder={'Enter your password'}
                            onChange={(event) => setConfirmPassword(event.target.value)} onFocus={(event) => setBorderColor(event.target, true)} onBlur={(event) => setBorderColor(event.target, false)}/>
                    <p id={'error'}> </p>
                    {cansubmit ? <button disabled={true}>Submit</button> : <button onClick={handleSubmit}>Submit</button>}                     
                </div>
            </div>
        </div>
    );
    
    
}