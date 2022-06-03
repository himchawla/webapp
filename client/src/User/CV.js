import {ProgressBar} from "react-bootstrap";


export function CV(props) {


    return (
        <div className="CV">
            <main className="page cv-page">
                <section className="portfolio-block block-intro border-bottom">
                    <div className="container">
                        <div className="avatar">
                            <img src={"assets/img/avatars/avatar.jpg"} alt="..." className="img-fluid"/>
                        </div>
                        <div className="about-me">
                            <p>Hello! I am <strong>Himanshu Chawla</strong>. I work as interface and front end developer. I
                                have passion for pixel perfect, minimal and easy to use interfaces.</p><a
                            className="btn btn-outline-primary" role="button" href={"/" + props.username + "/contact"}>Contact</a>
                        </div>
                    </div>
                </section>
                <section className="portfolio-block cv">
                    <div className="container">
                        <div className="work-experience group">
                            <div className="heading">
                                <h2 className="text-center">Work Experience</h2>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>Web Developer</h3>
                                        <h4 className="organization">Amazing Co.</h4>
                                    </div>
                                    <div className="col-md-6"><span className="period">10/2013 - 04/2015</span></div>
                                </div>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean eget velit ultricies, feugiat est sed, efficitur nunc, vivamus vel accumsan
                                    dui.</p>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>Front End Developer</h3>
                                        <h4 className="organization">Innovative Org.</h4>
                                    </div>
                                    <div className="col-md-6"><span className="period">05/2015 - 12/2017</span></div>
                                </div>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean eget velit ultricies, feugiat est sed, efficitur nunc, vivamus vel accumsan
                                    dui.</p>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>Web Developer</h3>
                                        <h4 className="organization">Special Inc.</h4>
                                    </div>
                                    <div className="col-md-6"><span className="period">12/2017 - Present</span></div>
                                </div>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean eget velit ultricies, feugiat est sed, efficitur nunc, vivamus vel accumsan
                                    dui.</p>
                            </div>
                        </div>
                        <div className="education group">
                            <div className="heading">
                                <h2 className="text-center">Education</h2>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>High School</h3>
                                        <h4 className="organization">Albert Einstein School</h4>
                                    </div>
                                    <div className="col-6"><span className="period">09/2005 - 05/2010</span></div>
                                </div>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean eget velit ultricies, feugiat est sed, efficitur nunc, vivamus vel accumsan
                                    dui.</p>
                            </div>
                            <div className="item">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>Applied Physics</h3>
                                        <h4 className="organization">Stephen Hawking College</h4>
                                    </div>
                                    <div className="col-md-6"><span className="period">09/2010 - 06/2015</span></div>
                                </div>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean eget velit ultricies, feugiat est sed, efficitur nunc, vivamus vel accumsan
                                    dui.</p>
                            </div>
                        </div>
                        <div className="group">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="skills portfolio-info-card">
                                        <h2>Skills</h2>
                                        <h3>HTML</h3>
                                        <ProgressBar now={90} label={""}/>
                                        <h3>PHP</h3>
                                        <ProgressBar now={60} label={""}/>
                                        <h3>JavaScript</h3>
                                        <ProgressBar now={80} label={""}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="contact-info portfolio-info-card">
                                        <h2>Contact Info</h2>
                                        <div className="row">
                                            <div className="col-1"><i className="icon ion-android-calendar icon"></i>
                                            </div>
                                            <div className="col-9"><span>10/10/1990</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1"><i className="icon ion-person icon"></i></div>
                                            <div className="col-9"><span>John Smith</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1"><i className="icon ion-ios-telephone icon"></i></div>
                                            <div className="col-9"><span>+235 3217 424</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1"><i className="icon ion-at icon"></i></div>
                                            <div className="col-9"><span>lorem@email.com</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hobbies group">
                            <div className="heading">
                                <h2 className="text-center">Hobbies</h2>
                            </div>
                            <p className="text-center text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Cras risus ligula, iaculis ut metus sit amet, luctus pharetra mauris. Aliquam
                                purus felis, pretium vel pretium vitae, dapibus sodales ante. Suspendisse potenti. Duis
                                nunc eros.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}