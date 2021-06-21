import React from 'react';
import {Route,Redirect} from "react-router-dom";
import { useLocation } from 'react-router-dom'

const GuardRoute = (props) => {
    const location = useLocation();
    const { isLogged,typeOfUser,...all} = props;

    
    if(location.pathname.includes("admin")){
    if( typeOfUser!=="admin"){
       return <Redirect to="/"/>
    }else{
        return <Route {...all}/>}

    }
    else{
       return  <Redirect to={location.pathname}/>
    }
};

export default GuardRoute;