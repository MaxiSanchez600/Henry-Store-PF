import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import CategoriesSelected from "../CategoriesSelected/CategoriesSelected";
import CreateCaracteriscs from "../CreateCaracteristics/CreateCaracteriscs";
import CreateCategory from "../CreateCategory/CreateCategory";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImagesUploader/ImagesUploader";
import './CreateProduct.scss'
import {postProduct} from '../../../Redux/actions/actionsProducts'
import axios from "axios"
import Swal from 'sweetalert2';

function CreateProduct ({editIsActive, productData, title}){
    const [catBack, setCatBack] = useState([]);
    const dispatch = useDispatch()
    const [subCatSelected, setSubCatSelected]=useState({})
    const [tags, setTags] = useState([]);
    const categories=useSelector((store)=> store.categories)
    const [categoriesSaves, setCategoriesSaves]=useState(JSON.parse(window.localStorage.getItem('categories')))
    const [categoryIsOpen, setCategoryIsOpen]=useState(false);
    const [caracteristicIsOpen, setCaracteristicIsOpen]=useState(false);
    const [categoriesSelected, setCategoriesSelected]=useState({})
    const [allData, setAllData]=useState({

    })
    
    const [json, setJson] = useState({
        infoProduct: {
            name:'',
            price:'',
            description:'',
            unit_stock:'',
            henry_coin:'',
            weight:'',
            size:'',
            percentage_discount:'',  
        },
        categories: {},
        caracteristics: {},
        tags: [],
        images: []
    });

    useEffect(() => {
        /* const initialInfo = ()=>{
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
                const prevCaracteristicSize=productData.Caracteristics.length
                setCategoriesSelected(objCat)
                const imagesData=productData.Images.map(element=>element.name_image)
                setJson({...json, 
                    caracteristics:{[productData.Caracteristics[prevCaracteristicSize-1].name_caracteristic]:productData.Caracteristics[prevCaracteristicSize-1].values_caracteristic}, 
                    images:imagesData,
                    infoProduct:{
                        name:productData.name,
                        price:productData.price,
                        description:productData.description,
                        unit_stock:productData.unit_stock,
                        henry_coin:productData.henry_coin,
                        weight:productData.weight,
                        size:productData.size,
                        percentage_discount:productData.percentage_discount,
                    },
                    tags:dataTags,
                    idProduct:productData.id_product
                })
            }
        }
        initialInfo() */
        const getCat = async function() {
            try {   
                const response = await axios.get('http://localhost:3001/product/categories')
                setCatBack(response.data);
                
                //window.localStorage.setItem('categories', JSON.stringify(response.data))
            }catch (error) {
              console.error(error)
            }   
        };
        getCat();
        
    },[]);

    const onClickCreateCategory = async (e)=>{
        const { value: category } = await Swal.fire({
            title: 'Añade una categoría',
            input: 'text',
            inputLabel: 'Nombre:',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return '¡Debe digitar un nombre para la catergoria!'
                }
            }
            })
    
            if (category) {
                setCatBack([
                    ...catBack,
                    {
                        name_category: category,
                        SubCategories: []
                    }
                ]);
            Swal.fire(`La categoria "${category}" fue añadida con éxito.`)
            }
    }
    const onChangeInputs = (e) => {
        setJson({
            ...json, 
            infoProduct: {
                ...json.infoProduct,
                [e.target.name]: e.target.value
            }
        });
    };

    const onClickAddCategory = (e) => {
        setJson({
            ...json,
            categories: {
                ...json.categories,
                [e.target.name]: []
            }
        });
        setCategoriesSelected({...categoriesSelected,[e.target.name]:true})
    }

    const creacteProduct =()=>{
/*         setJson({...json,
            categories:subCatSelected,
            tags:tags
        }) */
        dispatch(postProduct(json))
    }
    const removeCaracteristic = ()=>{
        setJson({...json, caracteristics:{}})
    }

    return(
        <div className='createContainer'>
            <h2>{title}</h2> 
            <div className="createWrap">
                <div className='createContent'> 
                    <div className='basicInfo'>
                        <h4>Información del producto</h4>
                        <div className="basicInfoWrap">
                            <div className="inputField">
                                <label>Nombre:</label>
                                <input className='input' name='name' onChange={onChangeInputs} value={json.infoProduct.name}></input>
                            </div>
                            <div className="inputField">
                                <label>Precio:</label>
                                <input className='smallInput' name='price' onChange={onChangeInputs} value={json.infoProduct.price}></input>
                            </div>
                            <div className="inputField">
                                <label>Descripción:</label>
                                <textarea rows='5' name='description' onChange={onChangeInputs} value={json.infoProduct.description}></textarea>
                            </div>
                            <div className="inputField">
                                <label>Stock:</label>
                                <input className='smallInput' name='unit_stock' onChange={onChangeInputs} value={json.infoProduct.unit_stock}></input>
                            </div>
                            <div className="inputField">
                                <label>Henry coins:</label>
                                <input className='smallInput' name='henry_coin' onChange={onChangeInputs} value={json.infoProduct.henry_coin}></input>
                            </div>
                            <div className="inputField">
                                <label>Peso:</label>
                                <input className='smallInput' name='weight' onChange={onChangeInputs} value={json.infoProduct.weight}></input>
                            </div>
                            <div className="inputField">
                                <label>Dimensiones (Largo x Alto x Ancho):</label>
                                <input className='input' name='size' onChange={onChangeInputs} value={json.infoProduct.size}></input>
                            </div>
                            <div className="inputField">
                                <label>Descuento:</label>
                                <input className='smallInput' name='percentage_discount' onChange={onChangeInputs} value={json.infoProduct.percentage_discount}></input>
                            </div>
                        </div>
                        <div className="categoryContainer">
                                <h4>Categoría</h4>      
                                <div>Seleccione una o mas categorias, en caso de no existir <span className='addCategory' onClick={onClickCreateCategory}>agregue una nueva:</span></div>
                                <ul>
                                    {
                                        catBack?.map((cat, index)=>(
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
                                    json={json}
                                    setJson={setJson}
                                    catBack={catBack}
                                
                                />
                                {/* <button className='addCategory' onClick={onClickCreateCategory}>Nueva</button> */}
                                <CreateCategory 
                                    open={categoryIsOpen} 
                                    onClose={()=>setCategoryIsOpen(false)} 
                                    addCategory={(e)=>setCategoriesSaves(categoriesSaves.concat(e))} 
                                    categoriesSelected={categoriesSelected} 
                                    categoriesStateController={setCategoriesSelected}
                                    json={json}
                                    setJson={setJson}
                                    subCatSelected={subCatSelected}
                                />
                        </div>
        
                    </div>
                    <div className="createContent2">
                       
                        <div className="caracteristicsContainer">
                            <h4>Caracteristicas</h4>
                            <div>Son las propiedades que posee un producto, por ejemplo talla, color, etc.</div>
                            <button className='addCaracteristic' onClick={()=>setCaracteristicIsOpen(true)}>Agregar caracteristica</button>
                            <CreateCaracteriscs 
                                open={caracteristicIsOpen} 
                                onClose={()=>setCaracteristicIsOpen(false)}
                                json={json}
                                setJson={setJson}
                                subCatSelected={subCatSelected}
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
                            <Tags tags={tags} setTags={setTags} json={json} setJson={setJson} subCatSelected={subCatSelected} textPlaceholder='presione enter para agregar un tag'/>
                        </div>
                        <ImageUploader json={json} setJson={setJson} />
                    </div>
                </div>
                <button onClick={creacteProduct} className='btn-final-form'>{editIsActive?'Modificar producto' : 'Crear producto'}</button>
            </div>
        </div>
        
    )
}


export default CreateProduct;