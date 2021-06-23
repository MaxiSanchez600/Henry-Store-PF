import React, { useEffect } from "react";
import './Analytics.scss'
import axios from "axios"
import placeholder from "../../../Assets/Images/placeholder.png"
import { GET_CATEGORIES } from "../../../Config";

function Analytics (){
    useEffect(()=>{
        const getData = async function() {
            try {   
                const response = await axios.get(GET_CATEGORIES)
                window.localStorage.setItem('categories', JSON.stringify(response.data))
            }catch (error) {
              console.error(error)
            }   
        };
        getData()
    },[])
    return(
        <div className='analyticsContainer'>
            <h1>Estadisticas</h1> 
            <img className="img-analitics" src={placeholder} alt="notfound"/>
        </div>
        
    )
}

export default Analytics;