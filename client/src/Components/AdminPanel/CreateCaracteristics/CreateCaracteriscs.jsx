import React, { useState } from "react";
import Tags from "../Tags/Tags";
import './CreateCaracteriscs.scss'

function CreateCaracteriscs ({open, onClose, json, setJson, subCatSelected}){
    const [newCaracteristic, setNewCaracteristic]=useState('')
    const [optionsCaracteristic, setOptionsCaracteristic]=useState([]);
    const createCaracteristic =()=>{
        if(newCaracteristic !== '' && optionsCaracteristic.length>0){
            setJson({...json, caracteristics:{[newCaracteristic]:optionsCaracteristic}})
            setOptionsCaracteristic([])
            alert('Caracteristica agregada con éxito')
            onClose()
        }
    }
    const onChange=(e)=>{
        setNewCaracteristic(e.target.value)
    }
    if(!open) return null
    return(
        <div>
            <div className="overlayBackground"></div>
            <div className='createCaracteriscsContainer'>
                <div className='addAndClose'>
                    <div className='createTitle'>Agregar Categoria</div>
                    <button onClick={onClose}>X</button>
                </div>              
               
                <div className='inputField'>
                    <label>Nombre de la caracteristica:</label>
                    <input className='input' name='caracteristic' onChange={onChange}></input> 
                </div>
                <div className='inputField'>
                    <label>Opciones de dicha caracteristica:</label>
                </div>
                <Tags tags={optionsCaracteristic} setTags={setOptionsCaracteristic}  json={json} setJson={setJson} subCatSelected={subCatSelected} textPlaceholder='presione enter para agregar una opción'/>
                <button onClick={createCaracteristic}>Agregar</button>
                
            </div>
        </div>
        
    )
}


export default CreateCaracteriscs;