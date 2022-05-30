import React, {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export function HomePage () {
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
