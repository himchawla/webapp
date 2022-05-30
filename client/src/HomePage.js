import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios, {Axios} from "axios";


export function HomePage () {

   // let useNavigate1 = useNavigate("/Login");



    const {id} = useParams();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    
    setUsername(id);
    axios.get("http://localhost:3001/user/name/" + id).then(res => {
            setName(res.data);
        }).catch(err => {
            console.log(err);
        });
    

    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}
