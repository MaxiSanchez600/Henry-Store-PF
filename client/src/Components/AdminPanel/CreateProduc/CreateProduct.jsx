import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import CategoriesSelected from "../CategoriesSelected/CategoriesSelected";
import CreateCategory from "../CreateCategory/CreateCategory";
import Tags from "../Tags/Tags";
import './CreateProduct.scss'

function CreateProduct (){
    const [subCatSelected, setSubCatSelected]=useState({})
    const [tags, setTags] = useState([]);
    const categories=useSelector((store)=> store.categories)
    const [categoriesSaves, setCategoriesSaves]=useState([])
    const [categoryIsOpen, setCategoryIsOpen]=useState(false);
    const [categoriesSelected, setCategoriesSelected]=useState({})
    const [allData, setAllData]=useState({
        name:'',
        price:'',
        description:'',
        unit_stock:'',
        henry_coin:'',
        weight:'',
        size:'',
        percentage_discount:0,
    })
    const [json, setJson] = useState({
        infoProduct:{},
        categories:{},
        caracteristics:{},
        tags:[]
    })

    useEffect(()=>{
        setCategoriesSaves(categories)
    },[categories])

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

    const creacteProduct =()=>{
        setJson({...json,
            infoProduct:allData,
            categories:subCatSelected,
            tags:tags
        })
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
                            <input className='smallInput' name='unit_stock' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Henry coins:</label>
                            <input className='smallInput' name='henry_coin' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Peso:</label>
                            <input className='smallInput' name='weight' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Dimensiones (Largo x Alto x Ancho):</label>
                            <input className='input' name='size' onChange={onChangeInputs}></input>
                        </div>
                        <div className="inputField">
                            <label>Descuento:</label>
                            <input className='smallInput' name='percentage_discount' onChange={onChangeInputs}></input>
                        </div>
                    </div>
    
                </div>
                <div className="categoryContainer">
                        <h4>Categoría</h4>      
                        <div>Seleccione una o mas categorias, en caso de no existir agregue una nueva:</div>
                        <ul>
                            {
                                categoriesSaves?.map((cat, index)=>(
                                    <button className='buttonCategory' name={cat.name_category} onClick={onClickAddCategory} key={index}>{cat.name_category}</button>
                                ))  
                            }
                        </ul>
                        <CategoriesSelected 
                            categoriesSelected={categoriesSelected} 
                            categoriesStateController={setCategoriesSelected} 
                            categoriesSaves={categoriesSaves}
                            subCatSelected={subCatSelected}
                            setSubCatSelected={setSubCatSelected}
                        
                        />
                        <button className='addCategory' onClick={onClickCreateCategory}>Nueva</button>
                        <CreateCategory open={categoryIsOpen} onClose={()=>setCategoryIsOpen(false)} addCategory={(e)=>setCategoriesSaves(categoriesSaves.concat(e))} 
                            categoriesSelected={categoriesSelected} categoriesStateController={setCategoriesSelected}
                        />
                </div>
                <div className="tagsContainer">
                    <h4>Tags</h4>
                    <div>Los tags son palabras claves, las cuales permiten a los usuarion encontrar los productos de manera mas rápida</div>
                    <Tags tags={tags} setTags={setTags}/>
                </div>
                <button onClick={creacteProduct}>Crear Producto</button>

            </div>
        </div>
        
    )
}


export default CreateProduct;