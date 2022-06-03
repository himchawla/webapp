import React, {useState} from "react";
import axios from "axios";
import {serverPath} from "../App";
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {ToggleButton} from "react-bootstrap";

function Project(props)
{
    axios.post(serverPath + "/user/getProject", {username: props.username, projectId: props.projectId}).then(res => {
        console.log(res.data);
        if(res.data !== "error") {
            console.log("success");
            document.getElementById("projectName" + props.projectId + "_" + props.username).innerHTML = res.data.projectName;
            document.getElementById("projectDes" + props.projectId + "_" + props.username).innerHTML = res.data.projectShortDescription + "<br>User:" + res.data.username;
        }
    }).catch(err => {
        console.log(err);
    });
    console.log();
    var link = "/" + props.username + "/projects/";
    if(props.username === window.location.pathname.split("/")[1])
    {link += props.projectId }
    else {link += "view/" + props.username + "/" + props.projectId;}
    return(
        <div className="col-md-6 col-lg-4">
            <div className="card border-0">
                <a href={link}>
                    <img className="card-img-top scale-on-hover" src="assets/img/nature/image1.jpg" alt="Card Image"/>
                </a>
                <div className="card-body">
                    <h6>
                        <a href={link} id={"projectName" + props.projectId + "_" + props.username}>
                            Lorem Ipsum
                        </a>
                    </h6>
                    <p className="text-muted card-text" id={"projectDes" + props.projectId + "_" + props.username}>
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Nunc quam urna.
                    </p>
                </div>
            </div>
        </div>
    )
}


function ProjectView(props) {
    console.log(window);

    const [username, setUsername] = useState(props.username);
    const [projectId, setProjectId] = useState(props.projectId);

    if(window.location.pathname.split("/")[3] === "view" && username !== window.location.pathname.split("/")[4]) {
        setUsername(window.location.pathname.split("/")[4]);
        setProjectId(window.location.pathname.split("/")[5]);
    }     
    else if(projectId !== window.location.pathname.split("/")[3]) {
        setProjectId(window.location.pathname.split("/")[3]);
    }
    let params = (new URL(document.location)).searchParams;
    let token = params.get("projectId");
    const [on, setOn] = useState(false);
    axios.post(serverPath + "/user/getProject", {username: username, projectId: projectId}).then(res => {
        console.log(res.data);
        if (res.data !== "error") {
            console.log("success");
            document.getElementById("projectName").innerHTML = res.data.projectName;
            document.getElementById("projectDes" ).innerHTML = res.data.projectLongDescription;
        }
    }).catch(err => {
        console.log(err);
    });

    return (
        <main className="page projects-page">
            <section className="portfolio-block projects-cards">
                <div className="container">
                    <div className="heading">
                        <h2 id={"projectName"}>Lorem Ipsum</h2>
                    </div>
                        <div className="card border-0">
                            
                            <div className="card-body">
                                <img className="card-img-top scale-on-hover" src="assets/img/nature/image1.jpg" alt="Card Image"/>
                                <p className="text-muted card-text" id={"projectDes"}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nunc quam urna.
                                </p>
                            </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export function Projects(props) {
    
    const [projects, setProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);
    const [showAllProjects, setShowAllProjects] = useState(true);
    const [userProjectCount, setUserProjectCount] = useState(0);
    
    
    axios.post(serverPath + "/user/getProjectCount", {username: props.username}).then(res => {
             if (projects.length < res.data) {
                setProjects([...projects, <Project projectId={projects.length} username={props.username}/>]);
                console.log(projects);
                setUserProjectCount(res.data);
            }
    }).catch(err => {
        console.log(err);
    });
    // if(projects.length >= userProjectCount && projects.length > 0) {
        axios.post(serverPath + "/user/getAllProjectCount", {username: props.username}).then(res => {
            if (otherProjects.length < res.data.length) {
                setOtherProjects([...otherProjects,
                    <Project projectId={res.data[res.data.length - 1 + otherProjects.length].projectID} username={res.data[res.data.length - 1 + otherProjects.length].username}/>]);
                console.log(res.data.length - 1 + otherProjects.length);
            }
        }).catch(err => {
            console.log(err);
        });
    // }
    
   
   
   
    return (
        <div>
                <Routes>
                    <Route path="/:projectId/*" element={<ProjectView username={props.username}/>}/>
                </Routes>
            {
                window.location.pathname === "/" + props.username + "/projects" ?
                    <main className="page projects-page">
                        <section className="portfolio-block projects-cards">
                            <div className="container">
                                <div className="heading">
                                    <h2>Projects</h2>
                                    <input type="checkbox" data-toggle="toggle" onChange={event => setShowAllProjects(!event.target.checked)}/> Show my Projects only
                                </div>
                                <div className="row" id={"projects"}>
                                    {projects}
                                    {
                                        showAllProjects ?
                                            otherProjects : <div></div>
                                    }
                                </div>
                            </div>
                        </section>
                    </main>
                    :
                    <div>
                    </div>
            }
            
        </div>
    );
}