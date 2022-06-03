import React, {useEffect} from "react";


export function Navbar(props) {

    console.log(("NavBar" + props.active));
    
    useEffect(() => {
        document.getElementById("NavBar" + props.active) !== null ? document.getElementById("NavBar" + props.active)?.classList.add("active") :
            console.log("no active");
    }, [props.active]);


    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-white portfolio-navbar gradient">
                <div className="container">
                    <a className="navbar-brand logo" href="#">Brand</a>
                    <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navbarNav">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" id={"NavBarHome"} href={"/" + props.username}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id={"NavBarProjects"}
                                   href={"/" + props.username + "/projects"}>Projects</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id={"NavBarCV"} href={"/" + props.username + "/cv" }>
                                    CV</a></li>
                            <li className="nav-item"><a className="nav-link" id={"NavBarContact"}
                                                        href={"/" + props.username + "/contact"}>Contact</a></li>
                            <li className="nav-item"><a className="nav-link" id={"NavBarLogout"}
                                                        href={"/" + props.username + "/logout"}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {
                
            }
        </div>

    )
    
}

export function Footer(props)
{
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="links">
                    <a href={"/" + props.username + "/about"}>About me</a>
                    <a href={"/" + props.username + "/contact"}>Contact me</a>
                    <a href={"/" + props.username + "/projects"}>Projects</a></div>
                <div className="social-icons">
                    <a href={"/" + props.username + "/github"}><i className="icon ion-social-github"></i></a>
                    <a href={"/" + props.username + "/linkedin"}><i className="icon ion-social-linkedin"></i></a>
                    {/*<a href={"/" + props.username + "/"}><i className="icon ion-social-instagram-outline"></i></a>*/}
                    {/*<a href={"/" + props.username + "/"}><i className="icon ion-social-twitter"></i></a>*/}
                </div>
            </div>
        </footer>
    )
}

