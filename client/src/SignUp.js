import axios from "axios";
import {useState} from "react";
import {Login} from "./Login";
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import { useNavigate } from "react-router-dom";
import {serverPath} from "./App";
import {MainNavbar} from "./User/MainNavbar";



export function SignUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    const [dupeUsername, setDupeUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const error = document.getElementById("error");  
    const [description, setDescription] = useState("");
    const [numOfSkills, setNumSkills] = useState(1);
    const [skillsArray, setSkillsArray] = 
        useState([
            {skill: "1", proficiency: 1},
            {skill: "", proficiency: ""},
            {skill: "", proficiency: ""},
            {skill: "", proficiency: ""},
            {skill: "", proficiency: ""},
            {skill: "", proficiency: ""},
        ]);


    let cansubmit = !(!dupeUsername && password === confirmPassword && password.length > 0 && username.length > 0 && name.length > 0 && email.length > 0);
    let cansubmit2 = () => {
        for(let i = 0; i < numOfSkills; i++) {
            if(skillsArray[i].skill.length === 0 || skillsArray[i].proficiency.length === 0) {
                // document.getElementById("submit_2").disabled = true;
                return false;
            }
        }
        if(description.length === 0) {
            // document.getElementById("submit_2").disabled = true;
            return false;
        }
        // document.getElementById("submit_2").disabled = false;
        return true;
    }

    const handleSubmit = async () => {
        // e.preventDefault();

       if(signup === "signup1") {
           if (password === confirmPassword) {
               await axios.post("http://localhost:3001/create/", {
                   name: name,
                   username: username,
                   email: email,
                   password: password
               }).then(res => {
                   console.log(res);
                   if (res.data === "User already exists") {
                       alert("User already exists, please login");
                       window.location.href = "/login";
                   } else {
                       console.log("success");
                        window.location.href = "/login?=" + username;
                   }
               }).catch(err => {
                   console.log(err);
               });

           } else {
               alert("Passwords do not match");
           }
       }
       if(signup === "signup2")
       {
           //if(!cansubmit2())    return;
          
           await axios.post("http://localhost:3001/create/userDetails/", {
                username: username,
                description: description,
                numOfSkills: numOfSkills,
           }).then(res => {
                console.log(res);
              }).catch(err => {
                console.log(err);
            });
           
           for (let i = 0; i < numOfSkills; i++) {
               axios.post("http://localhost:3001/create/addSkill/", {
                   username: username,
                   skillName: skillsArray[i].skill,
                   skillProficiency: skillsArray[i].proficiency,
               }).then(res => {
                   console.log(res);
               }).catch(err => {
                   console.log(err);
               });
           }
       }
    };
    
    const signup1 = () => {
        
        
        return (<div className="SignUp">
            <MainNavbar active="Signup"/>
            <br />
            <br />
            <br />
            <div className="App-header">
            </div>
            <div className="App-body">
                <div className="Input-Container">

                    <label>Name:</label>
                    <input type={'text'} placeholder={'Enter your name'}
                           onChange={(event) => setName(event.target.value)} maxLength={50}/>
                    <label>Email:</label>
                    <input type={'text'} placeholder={'Enter your email'}
                           onChange={(event) => setEmail(event.target.value)} maxLength={100}/>
                    <label>Username:</label>
                    <input type={'text'} placeholder={'Enter your username'}
                           onChange={(event) => setUsername(event.target.value)} maxLength={50}/>
                           onBlur={validateUserName}/>

                    {dupeUsername ? <p style={{color: 'red'}}>Username is unavailable</p> : null}
                    <label>Password:</label>
                    <input type={'password'} placeholder={'Enter your password'}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <label>Confirm Password:</label>
                    <input type={'password'} placeholder={'Enter your password'}
                           onChange={(event) => setConfirmPassword(event.target.value)}
                           onFocus={(event) => setBorderColor(event.target, true)}
                           onBlur={(event) => setBorderColor(event.target, false)}/>
                    <p id={'error'}></p>
                    {cansubmit ? <button disabled={true}>Submit</button> :
                        <button onClick={handleSubmit}>Submit</button>}
                </div>
            </div>
        </div>)



        
    };

    const [signup, setSignup] = useState("signup1");

    function skill(i) {
        return (
            <div className="skill">
                <div className="App-header">
                </div>
                <div className="App-body">
                    <div className="border rounded-circle border-1 m-auto mb-3">
                        <label className="form-label">Skill</label>
                        <input className="form-control" type="text" name="skillName" placeholder="Skill Name" onChange={event => {
                            cansubmit2();
                            skillsArray[i].skill = event.target.value
                        }}/>
                        <input className="form-control" type="number" name="proficiency" placeholder="Proficiency" onChange={event => {
                            skillsArray[i].proficiency = event.target.value;
                            cansubmit2();
                            if(skillsArray[i].proficiency > 10)
                            {
                                skillsArray[i].proficiency = 10;
                                document.getElementsByName("proficiency")[i].value = 10;
                            }
                            else if(skillsArray[i].proficiency < 1 && skillsArray[i].proficiency !== "")
                            {
                                skillsArray[i].proficiency = 1;
                                document.getElementsByName("proficiency")[i].value = 1;
                            }
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
    
    const signup2 = () => {
        var s = [];
        for(let i = 0; i < numOfSkills; i++) {
            s.push(skill(i));
        }
        return(


        <div className="SignUp">
            <div className="App-header">
            </div>
            <div className="App-body">
                <div className="Input-Container">
                    <label>Description:</label>
                    <input type={'text'} placeholder={'Enter description'} onChange={(event) => {
                        setDescription(event.target.value);
                        cansubmit2();
                    }}/>
                    {s}
                    {
                        numOfSkills < 6
                            ?
                            <button onClick={() => setNumSkills(numOfSkills + 1)}>Add Skill</button>
                            :
                            <button disabled={true}>Add Skill</button>
                    }
                    <button onClick={handleSubmit}>Submit</button>
                </div>


            </div>
        </div>
    )
        
    
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
        axios.post(serverPath + "/check/", {
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

    if(signup === "signup1") {
        return signup1();
    }
    else if(signup === "signup2") {
        return signup2();
    }
    
        //Interactive Signup form, ask for one parameter at a time and then submit;
    
    
}