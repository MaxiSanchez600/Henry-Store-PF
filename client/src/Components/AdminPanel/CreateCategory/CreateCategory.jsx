import React, { useState } from "react";
import Tags from "../Tags/Tags";
import './CreateCategory.scss'

function CreateCategory ({open, onClose, addCategory, categoriesSelected, categoriesStateController}){
    const [catAndSubCat, setCatAndSubCat]=useState({category: "", subCategory: ""})
    const [subCategories, setSubCategories]=useState([])
    if(!open) return null
    const createCategory = (e)=>{
        e.preventDefault()
        if(catAndSubCat.category !== ''){
            const arr=subCategories.map(element=>{
                return {name_sub_category:element}
            })
            addCategory({name_category:catAndSubCat.category, SubCategories:arr})
            categoriesStateController({...categoriesSelected, [catAndSubCat.category]:true})
            setSubCategories([])
            alert('Agregada con éxito')
            onClose()
        }

    }
    const onChange=(e)=>{
        setCatAndSubCat({...catAndSubCat, [e.target.name]:e.target.value})
    }

    return(
        <div>
            <div className="overlayBackground"></div>
            <div className='createCategoryContainer'>
                <div className='addAndClose'>
                    <div className='createTitle'>Agregar Categoria</div>
                    <button onClick={onClose}>X</button>
                </div>              
                <div className='inputField'>
                    <label>Nombre de la categoría:</label>
                    <input className='input' onChange={onChange} name='category'></input> 
                </div>
                <div className='inputField'>
                    <label>Añadir subCategoria(s):</label>
                </div>            
                <Tags tags={subCategories} setTags={setSubCategories} textPlaceholder='presione enter para agregar una opción'/>
                <div className='infoTextSubCat'>
                    Una categoría tiene a su vez subCategorias, por ejemplo, si la categoría es "ropa"
                    las subCategorias podrían ser "camisas", "pantalones"
                </div>
                <button onClick={createCategory}>Agregar</button>
                
                
            </div>
        </div>
        
    )
}


export default CreateCategory;