import React from 'react';
import {Route,Redirect} from "react-router-dom";

const GuardRoute = (props) => {

    const {isLogged,typeOfUser,typeRoute,...all} =props
    if(!isLogged && !typeOfUser && typeRoute==="private"){
        return <Redirect to="/"/>
    }else if(isLogged && typeOfUser==="user" && typeRoute==="private"){
        return <Redirect to="/"/>
    }
    return <Route {...all}/>
};

export default GuardRoute;