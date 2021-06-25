import React, { useState, useEffect } from "react";
import CategoriesSelected from "../CategoriesSelected/CategoriesSelected";
import CaracteristicsSelected from "../CaracteristicsSelected/CaracteristicsSelected";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImagesUploader/ImagesUploader";
import './CreateProduct.scss'
import axios from "axios"
import Swal from 'sweetalert2';

function CreateProduct ({ editIsActive, productData }) {
    const [catBack, setCatBack] = useState([]);
    const [carBack, setCarBack] = useState([]);
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
        const initialInfo = ()=>{
            if(editIsActive){
                /* setAllData({
                    name:productData.name,
                    price:productData.price,
                    description:productData.description,
                    unit_stock:productData.unit_stock,
                    henry_coin:productData.henry_coin,
                    weight:productData.weight,
                    size:productData.size,
                    percentage_discount:productData.percentage_discount,
                })
                
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
                    
                }) */
                const dataTags=productData.Tags.map(tag=>tag.name_tag)
                const imagesData=productData.Images.map(element=>element.name_image)
                const objCatAndSub={}
                console.log(productData.Caracteristics.find(element => element.name_caracteristic==='type').values_caracteristic)
                setJson({...json,
                    infoProduct: {
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
                    idProduct:productData.id_product,
                    categories: {

                    },
                    images:imagesData,
                })

            }
        }
        initialInfo()
        const getInfo = async function() {
            try {   
                const responseCat = await axios.get('http://localhost:3001/product/categories')
                setCatBack(responseCat.data);
                const responseCaracteristics = await axios.get('http://localhost:3001/product/caracteristics')
                setCarBack(responseCaracteristics.data.data)
            }catch (error) {
              console.error(error)
            }   
        };
        getInfo();
        
    },[]);

    const onClickCreateCategory = async () => {
        const { value: category } = await Swal.fire({
            title: 'Añade una categoría',
            input: 'text',
            inputLabel: 'Nombre:',
            showCancelButton: true,
            inputValidator: value => {
                if (!value) {
                    return '¡Debe digitar un nombre para la catergoria!';
                }
            }
        });
        if (category) {
            setCatBack([
                ...catBack,
                {
                    name_category: category,
                    SubCategories: []
                }
            ]);
            // Swal.fire(`La categoria "${category}" fue añadida con éxito.`);
        }
    };

    const onClickCreateCaracteristic = async () => {
        const { value: caracteristic } = await Swal.fire({
            title: 'Añade una caracteristica',
            input: 'text',
            inputLabel: 'Nombre:',
            showCancelButton: true,
            inputValidator: value => {
                if (!value) {
                    return '¡Debe digitar un nombre para la caracteristica!';
                }
            }
        });
        if (caracteristic) {
            setCarBack([
                ...carBack,
                {
                    name_caracteristic: caracteristic,
                    values_caracteristic: []
                }
            ]);
            // Swal.fire(`La categoria "${caracteristic}" fue añadida con éxito.`);
        }
    };

    const onChangeInputs = e => {
        setJson({
            ...json, 
            infoProduct: {
                ...json.infoProduct,
                [e.target.name]: e.target.value
            }
        });
    };

    const onClickAddCategory = e => {
        setJson({
            ...json,
            categories: {
                ...json.categories,
                [e.target.name]: []
            }
        });
    };

    const handleAddCaracteristic = e => {
        setJson({
            ...json,
            caracteristics: {
                ...json.caracteristics,
                [e.target.name] : []
            }
        });
    };

    const creacteProduct = () => {
        axios.post("http://localhost:3001/product", json)
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Producto creado con éxito',
                confirmButtonText: `OK`
              })
            .then((result) => {
                if (result.isConfirmed) {
                    setJson({
                        infoProduct: {
                            name:'',
                            price:undefined,
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
                }
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal, vuelve a intentar',
                confirmButtonText: `OK`,
            });
        });
    };
    

    return(
        <div className='createContainer'>
            <div className="createWrap">
                <div className='createContent'> 
                    <div className='basicInfo'>
                        <h4>Información del producto</h4>
                        <div className="basicInfoWrap">
                            <div className="inputField">
                                <label>Nombre:</label>
                                <input className='input' name='name' onChange={onChangeInputs} value={json.infoProduct.name} ></input>
                            </div>
                            <div className="inputField">
                                <label>Precio:</label>
                                <input className='smallInput' name='price' onChange={onChangeInputs} value={json.infoProduct.price} required></input>
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
                                            <button 
                                                className='buttonCategory' 
                                                name={cat.name_category} 
                                                onClick={onClickAddCategory} 
                                                key={index}
                                            >{cat.name_category}</button>
                                        ))  
                                    }
                                </ul>
                                <CategoriesSelected 
                                    json={json}
                                    setJson={setJson}
                                    catBack={catBack}
                                    setCatBack={setCatBack}
                                />
                                
                        </div>
        
                    </div>
                    <div className="createContent2">
                       
                        <div className="caracteristicsContainer">
                            <h4>Caracteristicas</h4>
                            <div>Son las propiedades que posee un producto, por ejemplo talla, color, etc. <span onClick={onClickCreateCaracteristic} className='addCaracteristic'>(Agregar caracteristica)</span></div>
                            <ul>
                                {
                                    carBack?.map((car, index) => {
                                        if(car.name_caracteristic !== 'type') {
                                                return <button 
                                                    className='buttonCaracteristic' 
                                                    name={car.name_caracteristic} 
                                                    onClick={handleAddCaracteristic} 
                                                    key={index}>
                                                {car.name_caracteristic}</button>
                                            }
                                        }
                                    ) 
                                }
                            </ul>
                            <CaracteristicsSelected 
                                json={json}
                                setJson={setJson}
                                carBack={carBack}
                                setCarBack={setCarBack}
                            />
                        </div>
                        <div className="tagsContainer">
                            <h4>Tags</h4>
                            <div>Los tags son palabras claves, las cuales permiten a los usuarion encontrar los productos de manera mas rápida</div>
                            <Tags json={json} setJson={setJson}  textPlaceholder='presione enter para agregar un tag'/>
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