import React from "react";
import {Link} from "react-router-dom";
import {MainNavbar} from "./User/MainNavbar";

export function Home() {
return (
    <div>
        <MainNavbar active={'Home'}/>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <br />
                    <br />
                    <br />
                    <h1>Welcome to the Portfolio Maker</h1>
                    <p>
                        Sign Up or Login to get started
                    </p>
                </div>
            </div>
        </div>
    </div>
)
}