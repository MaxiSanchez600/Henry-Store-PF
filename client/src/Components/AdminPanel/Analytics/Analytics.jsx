import React, { useEffect, useState } from "react";
import './Analytics.scss'
import {getCategories} from '../../../Redux/actions/actions'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios"

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
            <h1>datos de ventas</h1>
        </div>
        
    )
}


export default Analytics;