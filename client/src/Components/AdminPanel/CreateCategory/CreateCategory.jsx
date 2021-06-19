import React, { useState } from "react";
import './CreateCategory.scss'

function CreateCategory ({open, onClose, addCategory, categoriesSelected, categoriesStateController}){
    const [category, setCategory]=useState('')
    if(!open) return null
    const onSubmit = (e)=>{
        e.preventDefault()
        addCategory(category)
        categoriesStateController({...categoriesSelected, [category]:true})
        alert('Agregada con éxito')
        onClose()
    }
    return(
        <div>
            <div className="overlayBackground"></div>
            <div className='createCategoryContainer'>
                <div className='addAndClose'>
                    <div className='createTitle'>Agregar Categoria</div>
                    <button onClick={onClose}>X</button>
                </div>              
                <form onSubmit={onSubmit}>
                    <div className='inputField'>
                        <label>Nombre de la categoría:</label>
                        <input className='input' onChange={(e)=>setCategory(e.target.value)}></input> 
                    </div>
                    <button type='submit'>Agregar</button>
                </form>
                
            </div>
        </div>
        
    )
}


export default CreateCategory;