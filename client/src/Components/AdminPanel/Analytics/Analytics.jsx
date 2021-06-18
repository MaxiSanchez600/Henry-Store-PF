import React, { useEffect } from "react";
import './Analytics.scss'
import {getCategories} from '../../../Redux/actions/actions'
import {useDispatch} from "react-redux";
function Analytics (){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])
    
    return(
        <div className='analyticsContainer'>
            <h1>datos de ventas</h1>
        </div>
        
    )
}


export default Analytics;