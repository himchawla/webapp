import React, {useEffect, useState} from "react";
import axios from "axios";
import {serverPath} from "../App";
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, ButtonGroup, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

function Project(props)
{
    axios.post(serverPath + "/user/getProject", {username: props.username, projectId: props.projectId}).then(res => {
        console.log(res.data);
        if(res.data !== "error") {
            console.log("success");
            document.getElementById("projectName" + props.projectId + "_" + props.username).innerHTML = res.data.projectName;
            document.getElementById("projectDes" + props.projectId + "_" + props.username).innerHTML = res.data.projectShortDescription + "<br>User:" + res.data.username;
            const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)));
            const image = "data:image/png;base64," + base64String;
            document.getElementById("projectImage" + props.projectId + "_" + props.username).src = image;
            console.log(image);
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
                    <img className="card-img-top scale-on-hover" id={"projectImage" + + props.projectId + "_" + props.username} src="" alt="Card Image"/>
                    
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

function AddProject(props) {
    const [projectName, setProjectName] = useState("");
    const [projectShortDescription, setProjectShortDescription] = useState("");
    const [projectLongDescription, setProjectLongDescription] = useState("");
    const [projectPublic, setProjectPublic] = useState('true');
    const [projectMain, setProjectMain] = useState('false');
    const [projectImage, setProjectImage] = useState("");


    const fileChangedHandler = (e) => {
        if(e.target.files[0].size > 102400 || e.target.files[0].type !== "image/png") {
            alert("File is too big! or File type is not supported!");
            e.target.value = "";
        }
        else {
            setProjectImage(e.target.files[0]);
        }
    };

    console.log(projectPublic);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        var formData = new FormData();
        formData.append("username", props.username);
        formData.append("projectName", projectName);
        formData.append("projectShortDescription", projectShortDescription);
        formData.append("projectLongDescription", projectLongDescription);
        formData.append("projectPublic", projectPublic);
        formData.append("projectMain", projectMain);
        formData.append("projectImage", projectImage);
        
        if(projectName === "" || projectShortDescription === "" || projectLongDescription === "" || projectImage === "") {
            alert("Please fill in all fields");
            return;
        }
        axios.post(serverPath + "/user/addProject", formData).then(res => {
            console.log(res.data);
            if(res.data !== "error") {
                console.log("success");
                window.location.href = "/" + props.username + "/projects";
            }
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <main className="page projects-page">
            <section className="portfolio-block projects-cards">
                <div className="container">
                    <div className="heading">
                        <h2>Add Project</h2>
                    </div>
                    <div className="card border-0">
                        <div className="form-group App">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="projectName">Project Name</label>
                                <input type="text" className="form-control" id="projectName"
                                       aria-describedby="projectName" placeholder="Enter project name"
                                       onChange={(e) => setProjectName(e.target.value)}/>
                                <label htmlFor={'projectImage'}>Project Image</label>
                                <input type="file" className="form-control" id={'projectImage'}
                                        aria-describedby="projectImage" placeholder="Enter project image"
                                        onChange={fileChangedHandler}/>
                                <label htmlFor="projectShortDescription">Project Short Description</label>
                                <input type="text" className="form-control" id="projectShortDescription"
                                       aria-describedby="projectShortDescription"
                                       placeholder="Enter project short description"
                                       onChange={(e) => setProjectShortDescription(e.target.value)}/>
                                <label htmlFor="projectLongDescription">Project Long Description</label>
                                <input type="text" className="form-control" id="projectLongDescription"
                                       aria-describedby="projectLongDescription"
                                       placeholder="Enter project long description"
                                       onChange={(e) => setProjectLongDescription(e.target.value)}/>
                                <label htmlFor="projectPublic">Project Public</label>
                                
                                <ToggleButtonGroup type="radio" name="projectPublic"
                                                    value={projectPublic}
                                                    onChange={(e) => setProjectPublic(e.target.value)}>
                                    <ToggleButton value={'true'} onClick={e=>setProjectPublic('true')}>Public</ToggleButton>
                                    <ToggleButton value={'false'} onClick={e=>setProjectPublic('false')}>Private</ToggleButton>
                                </ToggleButtonGroup>
                                <label htmlFor="projectMain">Project Main</label>
                                <ToggleButtonGroup type="radio" name="projectMain"
                                                    value={projectMain}
                                                    onChange={(e) => setProjectMain(e.target.value)}>
                                    <ToggleButton value={'true'} onClick={e=>setProjectMain('true')}>Main</ToggleButton>
                                    <ToggleButton value={'false'} onClick={e=>setProjectMain('false')}>Not Main</ToggleButton>
                                </ToggleButtonGroup>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
}



function EditProject(props) {
    const [projectName, setProjectName] = useState(props.projectName);
    const [projectShortDescription, setProjectShortDescription] = useState(props.projectShortDescription);
    const [projectLongDescription, setProjectLongDescription] = useState(props.projectLongDescription);
    const [projectPublic, setProjectPublic] = useState(props.projectPublic);
    const [projectMain, setProjectMain] = useState(props.projectMain);
    const [inputSet, setInputSet] = useState(false);
    const [projectImage, setProjectImage] = useState();

    const fileChangedHandler = (e) => {
        if(e.target.files[0].size > 102400 || e.target.files[0].type !== "image/png") {
            alert("File is too big! or File type is not supported!");
            e.target.value = "";
        }
        else {
            setProjectImage(e.target.files[0]);
        }
    };
    if(!inputSet) {
        axios.post(serverPath + "/user/getProject", {
            username: props.username,
            projectId: props.projectId
        }).then(res => {
            console.log(res.data);
            if (res.data !== "error") {
                console.log("success");
                // document.getElementById("projectName").innerHTML = res.data.projectName;
                // document.getElementById("projectDes" ).innerHTML = res.data.projectLongDescription;
                document.getElementById("projectName").value = res.data.projectName;
                document.getElementById("projectShortDescription").value = res.data.projectShortDescription;
                document.getElementById("projectLongDescription").value = res.data.projectLongDescription;
                document.getElementById("projectPublic").value = res.data.publicProject === 1 ? 'true' : 'false';
                document.getElementById("projectMain").value = res.data.mainProject === 1 ? 'true' : 'false';
                const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)));
                const image = "data:image/png;base64," + base64String;
                setProjectImage(image);
                document.getElementById("projectImage").src = image;
                
                setProjectLongDescription(res.data.projectLongDescription);
                setProjectName(res.data.projectName);
                setProjectShortDescription(res.data.projectShortDescription);
                setProjectPublic(res.data.publicProject === 1 ? 'true' : 'false');
                setProjectMain(res.data.mainProject === 1 ? 'true' : 'false');
                setInputSet(true);

                // setProjectLongDescription(res.data.projectLongDescription);
                // setProjectName(res.data.projectName);
                // setProjectShortDescription(res.data.projectShortDescription);
                // setProjectPublic(res.data.projectPublic);
                // projectPublicsetProjectMain(res.data.projectMain);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    console.log(projectPublic);
    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("username", props.username);
        formData.append("projectId", props.projectId);
        formData.append("projectName", projectName);
        formData.append("projectShortDescription", projectShortDescription);
        formData.append("projectLongDescription", projectLongDescription);
        formData.append("projectPublic", projectPublic);
        formData.append("projectMain", projectMain);
        formData.append("projectImage", projectImage);
        
        if(projectName !== "" && projectShortDescription !== "" && projectLongDescription !== "") {
            axios.post(serverPath + "/user/editProject", formData).then(res => {
                console.log(res.data);
                if (res.data !== "error") {
                    console.log("success");
                    window.location.href = "/" + props.username + "/projects";
                }
            }).catch(err => {
                console.log(err);
            });
        }
        else 
            alert("Please fill in all fields");
    }
    return (
        <main className="page projects-page">
            <section className="portfolio-block projects-cards">
                <div className="container">
                    <div className="heading">
                        <h2>Edit Project</h2>
                    </div>
                    <div className="card border-0">
                        <div className="form-group App">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="projectName">Project Name</label>
                                <input value={projectName} type="text" className="form-control" id="projectName"
                                       aria-describedby="projectName" placeholder="Enter project name"
                                       onChange={(e) => setProjectName(e.target.value)}/>
                                <label htmlFor={'projectImage'}>Project Image</label>
                                <img src={projectImage} id={'projectImage'} alt="projectImage" width="100" height="100"/>
                                <input type="file" className="form-control" id={'projectImageInput'}
                                       aria-describedby="projectImage" placeholder="Enter project image"
                                       onChange={fileChangedHandler}/>
                                <label htmlFor="projectShortDescription">Project Short Description</label>
                                <input value={projectShortDescription} type="text" className="form-control" id="projectShortDescription"
                                       aria-describedby="projectShortDescription"
                                       placeholder="Enter project short description"
                                       onChange={(e) => setProjectShortDescription(e.target.value)}/>
                                <label htmlFor="projectLongDescription">Project Long Description</label>
                                <input value={projectLongDescription} type="text" className="form-control" id="projectLongDescription"
                                       aria-describedby="projectLongDescription"
                                       placeholder="Enter project long description"
                                       onChange={(e) => setProjectLongDescription(e.target.value)}/>
                                <label htmlFor="projectPublic">Project Public</label>

                                <ToggleButtonGroup type="radio" name="projectPublic"
                                                   id="projectPublic"
                                                   value={projectPublic}
                                                   onChange={(e) => setProjectPublic(e.target.value)}>
                                    <ToggleButton value={'true'} onClick={e=>setProjectPublic('true')}>Public</ToggleButton>
                                    <ToggleButton value={'false'} onClick={e=>setProjectPublic('false')}>Private</ToggleButton>
                                </ToggleButtonGroup>
                                <label htmlFor="projectMain">Project Main</label>
                                <ToggleButtonGroup type="radio" name="projectMain"
                                                   id="projectMain"
                                                   value={projectMain}
                                                   onChange={(e) => setProjectMain(e.target.value)}>
                                    <ToggleButton value={'true'} onClick={e=>setProjectMain('true')}>Main</ToggleButton>
                                    <ToggleButton value={'false'} onClick={e=>setProjectMain('false')}>Not Main</ToggleButton>
                                </ToggleButtonGroup>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );
}

function ProjectView(props) {
    console.log(window);

    const [username, setUsername] = useState(props.username);
    const [projectId, setProjectId] = useState(props.projectId);
    const [projectName, setProjectName] = useState(props.projectName);
    const [projectShortDescription, setProjectShortDescription] = useState("");
    const [projectLongDescription, setProjectLongDescription] = useState("");
    const [projectPublic, setProjectPublic] = useState("");
    const [projectMain, setProjectMain] = useState("");
    const [isMyProject, setIsMyProject] = useState(false);

    if(window.location.pathname.split("/")[3] === "view" && username !== window.location.pathname.split("/")[4]) {
        setUsername(window.location.pathname.split("/")[4]);
        setProjectId(window.location.pathname.split("/")[5]);
        setIsMyProject(false);
    }     
    else if(window.location.pathname.split("/")[3] !== "view" &&projectId !== window.location.pathname.split("/")[3]) {
        setProjectId(window.location.pathname.split("/")[3]);
        setIsMyProject(true);
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
            const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)));
            const image = "data:image/png;base64," + base64String;
            // setProjectImage(image);
            document.getElementById("projectImage").src = image;
            setProjectLongDescription(res.data.projectLongDescription);
            setProjectName(res.data.projectName);
            setProjectShortDescription(res.data.projectShortDescription);
            setProjectPublic(res.data.projectPublic);
            setProjectMain(res.data.projectMain);
        }
    }).catch(err => {
        console.log(err);
    });
    
    function EditThisProject() {
        window.location.pathname += "/edit";
    }
    
    function DeleteProject(e) {
        e.preventDefault();
        axios.post(serverPath + "/user/deleteProject", {
            username: username,
            projectId: projectId
        }).then(res => {
            console.log(res.data);
            if (res.data !== "error") {
                console.log("success");
                window.location.href = "/" + username + "/projects";
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <main className="page projects-page">
            <Routes>
                <Route path="/edit" element={<EditProject username={username} projectId={projectId} projectName={projectName} projectShortDescription={projectShortDescription} projectLongDescription={projectLongDescription} projectPublic={projectPublic} projectMain={projectMain}/>}/>
            </Routes>
            <section className="portfolio-block projects-cards">
                <div className="container">
                    <div className="heading">
                        <h2 id={"projectName"}>Lorem Ipsum</h2>
                        {
                            isMyProject 
                                ?
                                <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                                    <Button className="btn btn-primary" onClick={EditThisProject}>
                                        <b className="fas fa-edit">Edit</b>
                                    </Button>

                                    <Button className="btn btn-primary" onClick={DeleteProject}>
                                        <b className="fas fa-trash">Delete</b>
                                    </Button>
                                </ButtonGroup>
                                :
                                <div></div>
                        }                    
                    </div>
                        <div className="card border-0">
                            
                            <div className="card-body">
                                <img className="card-img-top scale-on-hover" src="assets/img/nature/image1.jpg" id={'projectImage'} alt="Card Image"/>
                                <br />
                                <br />
                                <br />
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
                    <Project projectId={res.data[otherProjects.length].projectID} username={res.data[otherProjects.length].username}/>]);
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
                    <Route path={"addProject"} element={<AddProject username={props.username}/>}/>
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
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    window.location.pathname = "/" + props.username + "/Projects/addProject";
                                }}>Add Project</button>
                                
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