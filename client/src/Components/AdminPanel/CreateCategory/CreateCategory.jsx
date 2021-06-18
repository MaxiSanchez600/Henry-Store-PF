import React, { useState } from "react";
import './CreateCategory.scss'
import CreateSubCategory from "./CreateSubCategory/CreateSubCategory";

function CreateCategory ({open, onClose, addCategory, categoriesSelected, categoriesStateController}){
    const [catAndSubCat, setCatAndSubCat]=useState({category: "", subCategory: ""})
    const [subCategories, setSubCategories]=useState([])
    if(!open) return null
    const onSubmit = (e)=>{
        e.preventDefault()
        addCategory({name_category:catAndSubCat.category, SubCategories:subCategories})
        categoriesStateController({...categoriesSelected, [catAndSubCat.category]:true})
        setSubCategories([])
        alert('Agregada con éxito')
        onClose()
    }
    const onChange=(e)=>{
        setCatAndSubCat({...catAndSubCat, [e.target.name]:e.target.value})
    }

    const addSubCategory=()=>{
        if(catAndSubCat.subCategory !== ''){
            const subCat=subCategories.concat({name_sub_category:catAndSubCat.subCategory})
            setSubCategories(subCat)
            setCatAndSubCat({...catAndSubCat, subCategory:''})
        }
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
                        <input className='input' onChange={onChange} name='category'></input> 
                    </div>
                    <div className='inputField'>
                        <label>Añadir subCategoria (opcional):</label>
                        <input className='input' onChange={onChange} name='subCategory' value={catAndSubCat.subCategory || ''}></input>
                        <button onClick={addSubCategory} type='button'>añadir</button> 
                    </div>
                    <CreateSubCategory subCategories={subCategories} setSubCategories={setSubCategories}/>
                    <button type='submit'>Agregar</button>
                </form>
                
            </div>
        </div>
        
    )
}


export default CreateCategory;