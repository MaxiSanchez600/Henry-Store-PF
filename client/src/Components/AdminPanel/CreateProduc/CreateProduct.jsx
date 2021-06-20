import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux";
import CategoriesSelected from "../CategoriesSelected/CategoriesSelected";
import CreateCaracteriscs from "../CreateCaracteristics/CreateCaracteriscs";
import CreateCategory from "../CreateCategory/CreateCategory";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImagesUploader/ImagesUploader";
import './CreateProduct.scss'


function CreateProduct ({editIsActive, productData}){
    const [subCatSelected, setSubCatSelected]=useState({})
    const [tags, setTags] = useState([]);
    const categories=useSelector((store)=> store.categories)
    const [categoriesSaves, setCategoriesSaves]=useState(JSON.parse(window.localStorage.getItem('categories')))
    const [categoryIsOpen, setCategoryIsOpen]=useState(false);
    const [caracteristicIsOpen, setCaracteristicIsOpen]=useState(false);
    const [categoriesSelected, setCategoriesSelected]=useState({})
    const [allData, setAllData]=useState({
        name:'',
        price:'',
        description:'',
        unit_stock:'',
        henry_coin:'',
        weight:'',
        size:'',
        percentage_discount:'',
    })
    const [json, setJson] = useState({
        infoProduct:{},
        categories:{},
        caracteristics:{},
        tags:[],
        images: []
    })

    useEffect(()=>{
        const initialInfo = ()=>{
            if(editIsActive){
                setAllData({
                    name:productData.name,
                    price:productData.price,
                    description:productData.description,
                    unit_stock:productData.unit_stock,
                    henry_coin:productData.henry_coin,
                    weight:productData.weight,
                    size:productData.size,
                    percentage_discount:productData.percentage_discount,
                })
                const dataTags=productData.Tags.map(tag=>tag.name_tag)
                setTags(dataTags)
                const objCat={}
                productData.Categories.forEach(cat=>{
                    objCat[cat.name_category]=true
                })
                setCategoriesSelected(objCat)
                setJson({...json, caracteristics:{[productData.Caracteristics[0].name_caracteristic]:productData.Caracteristics[0].values_caracteristic}, images:productData.images})
            }
        }
        initialInfo()
        
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
    const removeCaracteristic = ()=>{
        setJson({...json, caracteristics:{}})
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
                            <input className='input' name='name' onChange={onChangeInputs} value={allData.name}></input>
                        </div>
                        <div className="inputField">
                            <label>Precio:</label>
                            <input className='smallInput' name='price' onChange={onChangeInputs} value={allData.price}></input>
                        </div>
                        <div className="inputField">
                            <label>Descripción:</label>
                            <textarea rows='5' name='description' onChange={onChangeInputs} value={allData.description}></textarea>
                        </div>
                        <div className="inputField">
                            <label>Stock:</label>
                            <input className='smallInput' name='unit_stock' onChange={onChangeInputs} value={allData.unit_stock}></input>
                        </div>
                        <div className="inputField">
                            <label>Henry coins:</label>
                            <input className='smallInput' name='henry_coin' onChange={onChangeInputs} value={allData.henry_coin}></input>
                        </div>
                        <div className="inputField">
                            <label>Peso:</label>
                            <input className='smallInput' name='weight' onChange={onChangeInputs} value={allData.weight}></input>
                        </div>
                        <div className="inputField">
                            <label>Dimensiones (Largo x Alto x Ancho):</label>
                            <input className='input' name='size' onChange={onChangeInputs} value={allData.size}></input>
                        </div>
                        <div className="inputField">
                            <label>Descuento:</label>
                            <input className='smallInput' name='percentage_discount' onChange={onChangeInputs} value={allData.percentage_discount}></input>
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
                        <CreateCategory 
                            open={categoryIsOpen} 
                            onClose={()=>setCategoryIsOpen(false)} 
                            addCategory={(e)=>setCategoriesSaves(categoriesSaves.concat(e))} 
                            categoriesSelected={categoriesSelected} 
                            categoriesStateController={setCategoriesSelected}
                        />
                </div>
                <div className="caracteristicsContainer">
                    <h4>Caracteristicas</h4>
                    <div>Son las propiedades que posee un producto, por ejemplo talla, color, etc.</div>
                    <button className='addCaracteristic' onClick={()=>setCaracteristicIsOpen(true)}>Agregar caracteristica</button>
                    <CreateCaracteriscs 
                        open={caracteristicIsOpen} 
                        onClose={()=>setCaracteristicIsOpen(false)}
                        json={json}
                        setJson={setJson}
                    />
                    {
                        Object.entries(json.caracteristics).map((e, index)=>(
                            <div key={index}>
                                <label>{e[0]}</label>
                                <button onClick={removeCaracteristic}>x</button>
                                {
                                    e[1].map((element, index2)=>(
                                        <div key={index2}>{element}</div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="tagsContainer">
                    <h4>Tags</h4>
                    <div>Los tags son palabras claves, las cuales permiten a los usuarion encontrar los productos de manera mas rápida</div>
                    <Tags tags={tags} setTags={setTags} textPlaceholder='presione enter para agregar un tag'/>
                </div>
                <ImageUploader json={json} setJson={setJson} />
                <button onClick={creacteProduct}>Crear Producto</button>

            </div>
        </div>
        
    )
}


export default CreateProduct;