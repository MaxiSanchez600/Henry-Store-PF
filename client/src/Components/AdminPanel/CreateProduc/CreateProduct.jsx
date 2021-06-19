import React, { useState } from "react";
import CategoriesSelected from "../CategoriesSelected/CategoriesSelected";
import CreateCategory from "../CreateCategory/CreateCategory";

import './CreateProduct.scss'

function CreateProduct (){
    const categories=['ropa', 'calzado', 'accesorios']
    const [categoriesSaves, setCategoriesSaves]=useState(categories)
    const [categoryIsOpen, setCategoryIsOpen]=useState(false);
    const [categoriesSelected, setCategoriesSelected]=useState({})
    const [allData, setAllData]=useState({
        name:'',
        price:'',
        description:'',
        stock:'',
        coins:'',
        weight:'',
        dimensions:'',
        discount:0,
    })
    const onClickCreateCategory = (e)=>{
        e.preventDefault()
        setCategoryIsOpen(true)
    }
    const onChangeInputs = (e)=>{
        setAllData({...allData, [e.target.name]:e.target.value})
    }

    const onClickAddCategory = (e) =>{
        e.preventDefault()
        setCategoriesSelected({...categoriesSelected,[e.target.name]:true})
    }

    const submitForm = (e)=>{
        e.preventDefault()
    }

    return(
        <div className='createContainer'>
            <div className='createContent'>
                <h2>Crear Producto</h2>  
                <div>
                    <h4>Información del producto</h4>
                    <div className="basicInfoWrap">
                        <div className="inputField">
                            <label>Nombre:</label>
                            <input className='input' name='name' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Precio:</label>
                            <input className='smallInput' name='price' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Descripción:</label>
                            <textarea rows='5' name='description' onChange={onChangeInputs}></textarea>
                        </div>
                        <div className="inputField">
                            <label>Stock:</label>
                            <input className='smallInput' name='stock' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Henry coins:</label>
                            <input className='smallInput' name='coins' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Peso:</label>
                            <input className='smallInput' name='weight' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Dimensiones (Largo x Alto x Ancho):</label>
                            <input className='input' name='dimensions' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Descuento:</label>
                            <input className='smallInput' name='discount' onChange={onChangeInputs}></input>
                        </div>
                    </div>
    
                </div>
                <div className="categoryContainer">
                        <h4>Categoría</h4>      
                        <div>Seleccione una o mas categorias, en caso de no existir agregue una nueva:</div>
                        <ul>
                            {
                                categoriesSaves?.map((cat, index)=>(
                                    <button className='buttonCategory' name={cat} onClick={onClickAddCategory} key={index}>{cat}</button>
                                ))
                            }
                        </ul>
                        <CategoriesSelected categoriesSelected={categoriesSelected} categoriesStateController={setCategoriesSelected}/>
                        <button className='addCategory' onClick={onClickCreateCategory}>Nueva</button>
                        <CreateCategory open={categoryIsOpen} onClose={()=>setCategoryIsOpen(false)} addCategory={(e)=>setCategoriesSaves(categoriesSaves.concat(e))} 
                            categoriesSelected={categoriesSelected} categoriesStateController={setCategoriesSelected}
                        />
                </div>
                <div className="subCategoryContainer">
                    <h4>Subcategoría</h4>      
                   
                </div>
                <button type='submit'>Crear Producto</button>

            </div>
        </div>
        
    )
}


export default CreateProduct;