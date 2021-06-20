import React, { useEffect, useState } from "react";
import './Analytics.scss'
import axios from "axios"
import placeholder from "../../../Assets/Images/placeholder.png"

function Analytics (){
    //const dispatch = useDispatch()
    //const categories=useSelector((store)=> store.categories)
/*     useEffect(()=>{
        dispatch(getCategories())
    },[dispatch]) */
    useEffect(()=>{
        const getData = async function() {
            try {   
                const response = await axios.get("http://localhost:3001/product/categories")
                window.localStorage.setItem('categories', JSON.stringify(response.data))
            }catch (error) {
              console.error(error)
            }   
        };
        getData()
    },[])
/*     const setLocalStorage =()=>{
        try {
            window.localStorage.setItem('categories', JSON.stringify(categories))
        } catch (error) {
            console.error(error)
        }
    } */
/*     useEffect(()=>{
        setLocalStorage()
    },[categories]) */
    return(
        <div className='analyticsContainer'>
            <h1>Estadisticas</h1>
            
            <img className="img-analitics" src={placeholder}/>
        </div>
        
    )
}


export default Analytics;