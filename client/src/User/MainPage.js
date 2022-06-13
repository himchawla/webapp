import React, {useState} from "react";
import axios from "axios";
import {serverPath} from "../App";
import {Logout} from "./HomePage";


function SpecialSkills(props) {
    var skillName = props.username + "_" + props.skillID;
    var skillDescription = "";
    axios.post(serverPath + "/user/getSpecialSkills", {username: props.username, skillId: props.skillID}).then(res => {
        skillName = res.data.skillName
        document.getElementById("skillName" + props.skillID).innerHTML = res.data.skillName;
        skillDescription = res.data.skillDescription
        document.getElementById("skillDes" + props.skillID).innerHTML = res.data.skillDescription;
    }).catch(err => {
        console.log(err);
    });


    return (
        <div className="col-md-4">

            <div className="card special-skill-item border-0">
                <div className="card-header bg-transparent border-0">
                    <i className="icon ion-ios-star-outline"></i></div>
                <div className="card-body">
                    <h3 className="card-title" id={"skillName" + props.skillID}>{skillName}</h3>
                    <p className="card-text" id={"skillDes" + props.skillID}>
                        {skillDescription}
                    </p>
                </div>
            </div>
        </div>
    )}


export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            user: "",
            username: props.username,
            specialSkills: [],
        }


        if (window.location.pathname !== "/" + this.state.username) {
            Logout();
            // window.location.href = "/login";
            // console.log(window.location.href, "and" ,window.location.pathname, "/" + props.username);
        }

        //if(this.state.user === "") {
        axios.post(serverPath + "/user/getDescription/", {username: this.state.username}).then(res => {
            this.state.user = res.data;
            if (res.data !== undefined) {
                this.state.description = res.data.description;
                // this.render();
                document.getElementById("userDescription").innerHTML = this.state.description;
            }
            //this.setState({user: user});
        }).catch(err => {
            console.log(err);
        });

        axios.post(serverPath + "/user/getMainProject", {username: this.state.username}).then(res => {
            if (res.data !== "error") {
                document.getElementById("mainProject").innerHTML = res.data.projectName;
                document.getElementById("mainProjectDes").innerHTML = res.data.projectLongDescription;
                const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)));
                const image = "data:image/png;base64," + base64String;
                // setProjectImage(image);
                document.getElementById("mainProjectImage").src = image;

            }
            else
            {
                document.getElementById("MainProject").innerHTML = ""
            }

        }).catch(err => {
            console.log(err);
        });
    
        // }
    }





    render() {


        // if(this.state.user !== undefined) {
        //     this.state.description = this.state.user.description;
        // }
        return (
            <div>
                {/*<main className="page lanidng-page">*/}
                {/*    <section className="portfolio-block block-intro">*/}
                {/*        <div className="container">*/}
                {/*            <div className="avatar">*/}
                {/*                <img src="assets/img/avatars/avatar.jpg" alt="..."*/}
                {/*                     className="img-fluid rounded-circle"/>*/}
                {/*            </div>*/}
                {/*            <div className="about-me">*/}
                {/*                <p id={"userDescription"}>*/}
                {/*                    {*/}
                {/*                        ""*/}
                {/*                    }*/}
                {/*                </p>*/}
                {/*                <a className="btn btn-outline-primary" role="button" href="#">Hire me</a>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*    <section className="portfolio-block photography">*/}
                {/*        <div className="container">*/}
                {/*            <div className="row g-0">*/}
                {/*                <div className="col-md-6 col-lg-4 item zoom-on-hover">*/}
                {/*                    <a href="#">*/}
                {/*                        <img className="img-fluid image" src="assets/img/nature/image5.jpg"/>*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-6 col-lg-4 item zoom-on-hover">*/}
                {/*                    <a href="#">*/}
                {/*                        <img className="img-fluid image" src="assets/img/nature/image2.jpg"/>*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-6 col-lg-4 item zoom-on-hover">*/}
                {/*                    <a href="#">*/}
                {/*                        <img className="img-fluid image" src="assets/img/tech/image4.jpg"/>*/}
                {/*                    </a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*    <section className="portfolio-block skills">*/}
                {/*        <div className="container">*/}
                {/*            <div className="heading">*/}
                {/*                <h2>Special Skills</h2>*/}
                {/*            </div>*/}
                {/*            <div className="row" id={"specialSkills"}>*/}
                {/*                <SpecialSkills username={this.state.username} skillID={0}/>*/}
                {/*                <SpecialSkills username={this.state.username} skillID={1}/>*/}
                {/*                <SpecialSkills username={this.state.username} skillID={2}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </section>*/}
                {/*</main>*/}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div id={"MainProject"}>
                    <section className="portfolio-block website gradient">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-12 col-lg-5 offset-lg-1 text">
                                    <h3 id={"mainProject"}>Website Project</h3>
                                    <p id={"mainProjectDes"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Aenean eget velit ultricies,
                                        feugiat
                                        est sed, efr nunc, vivamus vel accumsan dui. Quisque ac dolor cursus, volutpat
                                        nisl
                                        vel,
                                        porttitor eros.</p>
                                </div>
                                <div className="col-md-12 col-lg-5">
                                    <div className="portfolio-laptop-mockup">
                                        <div className="screen">
                                            <div className="screen-content">
                                                <img id={'mainProjectImage'} src={"assets/img/tech/image6.png"} alt="..."
                                                     className="img-fluid"/>
                                            </div>
                                        </div>
                                        <div className="keyboard"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}