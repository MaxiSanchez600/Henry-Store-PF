import React, { useState, useEffect } from "react";
import CategoriesSelected from "../CategoriesSelected/CategoriesSelected";
import CaracteristicsSelected from "../CaracteristicsSelected/CaracteristicsSelected";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImagesUploader/ImagesUploader";
import './CreateProduct.scss'
import axios from "axios"
import Swal from 'sweetalert2';

function CreateProduct ({ editIsActive, productData }) {
    const [flag, setFlag] = useState(false);
    const [catBack, setCatBack] = useState([]);
    const [carBack, setCarBack] = useState([]);
    const [json, setJson] = useState({
        infoProduct: {
            name: '',
            price: '',
            description: '',
            unit_stock: '',
            henry_coin: '',
            weight: '',
            size: '',
            percentage_discount: '',  
        },
        categories: {},
        caracteristics: {},
        tags: [],
        images: []
    });

    const getInfo = async function() {
        try {   
            const responseCat = await axios.get('http://localhost:3001/product/categories')
            setCatBack(responseCat.data);
            const responseCaracteristics = await axios.get('http://localhost:3001/product/caracteristics')
            setCarBack(responseCaracteristics.data.data)
            setFlag(!flag);
        }catch (error) {
          console.error(error)
        }   
    };

    const initialInfo = () => {
        if(editIsActive) {
            //pongo images y tags en el json
            const tagsData = productData.Tags.map(tag => tag.name_tag);
            const imagesData = productData.Images.map(element => element.name_image);

            //pongo las categorias
            let categoriesData = {};
            for(let k = 0; k < productData.Categories.length; k++) {
                categoriesData[productData.Categories[k].name_category] = [];
            }

            //pongo las subcategorias
            const typeData = productData.Caracteristics.find(element => element.name_caracteristic==='type').values_caracteristic;
            let categoriesAux = []; // [[cat1, sub11, sub12], [cat2, sub21, sub22], etc...]
            for(let l = 0; l < catBack.length; l++) {
                categoriesAux.push([catBack[l].name_category]);
                for(let m = 0; m < catBack[l].SubCategories.length; m++) {
                    categoriesAux[l].push(catBack[l].SubCategories[m].name_sub_category)
                }
            }
            
            for(let n = 0; n < typeData.length; n++) {
                for(let o = 0; o < categoriesAux.length; o++) {
                    if(categoriesAux[o].slice(1).includes(typeData[n])) {
                        categoriesData[categoriesAux[o][0]].push(typeData[n]);
                    }
                }
            }

            //pongo las caracteristicas
            let caracteristicsData = {};
            for(let p = 0; p < productData.Caracteristics.length; p++) {
                if(productData.Caracteristics[p].name_caracteristic !== 'type') {
                    caracteristicsData[productData.Caracteristics[p].name_caracteristic] = productData.Caracteristics[p].values_caracteristic;
                }
            }
            
            setJson({...json,
                idProduct: productData.id_product,
                infoProduct: {
                    name: productData.name,
                    price: productData.price,
                    description: productData.description,
                    unit_stock: productData.unit_stock,
                    henry_coin: productData.henry_coin,
                    weight: productData.weight,
                    size: productData.size,
                    percentage_discount: productData.percentage_discount, 
                },
                categories: {
                   ...categoriesData 
                },
                caracteristics: {
                    ...caracteristicsData
                },
                tags: tagsData,
                images: imagesData,
            })

        }
    }; 

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        initialInfo();
    }, [flag]);


    const onClickCreateCategory = async () => {
        const { value: category } = await Swal.fire({
            title: 'Agregue una categoría',
            input: 'text',
            inputLabel: 'Nombre:',
            buttonsStyling:false,
            iconColor: "#F64749",
            showCancelButton:false,
            inputPlaceholder:'Nombre',
            inputLabel:false,
            confirmButtonText:'Agregar',
            customClass:{
                popup:'popCreate',
                title:'titlePopCreate',
                confirmButton:'confirmBtnCreate',
                input:'inputPopCreate',
            },
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
                    name_category: category[0].toUpperCase() + category.slice(1),
                    SubCategories: []
                }
            ]);
            return Swal.fire({
                icon: 'success',
                title: 'Agregada con éxito',
                showConfirmButton: false,
                timer: 1400
              })
        }
    };

    const onClickCreateCaracteristic = async () => {
        const { value: caracteristic } = await Swal.fire({
            title: 'Agregue una caracteristica',
            input: 'text',
            inputLabel: 'Nombre:',
            buttonsStyling:false,
            iconColor: "#F64749",
            showCancelButton:false,
            inputPlaceholder:'Nombre',
            inputLabel:false,
            confirmButtonText:'Agregar',
            customClass:{
                popup:'popCreate',
                title:'titlePopCreate',
                confirmButton:'confirmBtnCreate',
                input:'inputPopCreate',
            },
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
                    name_caracteristic: caracteristic[0].toUpperCase() + caracteristic.slice(1),
                    values_caracteristic: []
                }
            ]);
            return Swal.fire({
                icon: 'success',
                title: 'Agregada con éxito',
                showConfirmButton: false,
                timer: 1400
              })
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

    const creacteProduct = async () => {
        //validación infoProduct
        for(let j = 0; j < Object.values(json.infoProduct).length; j++) {
            if(Object.values(json.infoProduct)[j] === '') {
                return Swal.fire({
                    icon: 'warning',
                    title: 'Asegúrate de completar todos los campos de la información básica del producto.',
                    confirmButtonText: `OK`,
                    buttonsStyling:false,
                    customClass:{
                        popup:'popCreate',
                        title:'titlePopCreate',
                        confirmButton:'warningBtn',
                    },
                });
            }
            if(Object.entries(json.infoProduct)[j][0] !== 'name' 
            && Object.entries(json.infoProduct)[j][0] !== 'description' 
            && Object.entries(json.infoProduct)[j][1].toString().includes('-')) {
                return Swal.fire({
                    icon: 'warning',
                    title: 'Verificar que ningún campo tenga números negativos.',
                    confirmButtonText: `OK`,
                    buttonsStyling:false,
                    customClass:{
                        popup:'popCreate',
                        title:'titlePopCreate',
                        confirmButton:'warningBtn',
                    },
                });
            }
        }
        //validación categorías
        if(Object.keys(json.categories).length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Asegúrate de seleccionar al menos una categoría.',
                confirmButtonText: `OK`,
                buttonsStyling:false,
                customClass:{
                    popup:'popCreate',
                    title:'titlePopCreate',
                    confirmButton:'warningBtn',
                },
            });
        }
        for(let key in json.categories) {
            if(json.categories[key].length === 0) {
                return Swal.fire({
                    icon: 'warning',
                    title: 'Debe seleccionar una subcategoría por cada categoría.',
                    confirmButtonText: `OK`,
                    buttonsStyling:false,
                    customClass:{
                        popup:'popCreate',
                        title:'titlePopCreate',
                        confirmButton:'warningBtn',
                    },
                });
            }
        }
        //validación características 
        if(Object.keys(json.caracteristics).length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Un producto con varias características mejora la experiencia de compra, elige al menos una.',
                confirmButtonText: `OK`,
                buttonsStyling:false,
                customClass:{
                    popup:'popCreate',
                    title:'titlePopCreate',
                    confirmButton:'warningBtn',
                },
            });
        }
        for(let key in json.caracteristics) {
            if(json.caracteristics[key].length === 0) {
                return Swal.fire({
                    icon: 'warning',
                    title: 'Seleccione por lo menos un valor por cada característica.',
                    confirmButtonText: `OK`,
                    buttonsStyling:false,
                    customClass:{
                        popup:'popCreate',
                        title:'titlePopCreate',
                        confirmButton:'warningBtn',
                    },
                });
            }
        }
        //validación tags
        if(json.tags.length === 0) {
            const result = await Swal.fire({
                title: '¿Seguro no quiere agregar Tags?',
                showDenyButton: true,
                confirmButtonText: `Sí`,
                denyButtonText: `Volver`,
                buttonsStyling:false,
                customClass:{
                    popup:'popCreate',
                    title:'titlePopCreate',
                    confirmButton:'confirmBtnPop',
                    denyButton:'dennyBtnPop'
                },
            });
            if(result.isDenied) return;
        }
        //validación imágenes
        if(json.images.length === 0) {
            const result = await Swal.fire({
                title: 'Una imagen del producto mejora la experiencia del usuario.',
                showDenyButton: true,
                confirmButtonText: `Continuar de todas formas`,
                denyButtonText: `Volver`,
                buttonsStyling:false,
                customClass:{
                    popup:'popCreate',
                    title:'titlePopCreate',
                    confirmButton:'confirmBtnPop',
                    denyButton:'dennyBtnPop'
                },
            });
            if(result.isDenied) return;
        }
        //creación del producto
        axios.post("http://localhost:3001/product", json)
        .then(res => {
            if(editIsActive) {
                return Swal.fire({
                    icon: 'success',
                    title: 'Producto modificado con éxito',
                    showConfirmButton: false,
                    timer: 1400
                });
            }
            Swal.fire({
                icon: 'success',
                title: 'Producto creado con éxito',
                showConfirmButton: false,
                timer: 1400
            })
            .then((result) => {
                if (result.isConfirmed) {
                    setJson({
                        infoProduct: {
                            name: '',
                            price: '',    
                            description: '',
                            unit_stock: '',
                            henry_coin: '',
                            weight: '',
                            size: '',
                            percentage_discount: '',  
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
            if(error.toString().includes('status code 502')) {
                return Swal.fire({
                    icon: 'error',
                    title: '¡Ya existe un producto con ese nombre!',
                    confirmButtonText: `OK`,
                });
            }
            return Swal.fire({
                icon: 'error',
                title: 'Algo salió mal, vuelve a intentar',
                confirmButtonText: `OK`,
            });
        });
    };
    
    return(
        <div className='createContainer'>
            <h1>{editIsActive? 'Editar producto' : 'Crear producto'}</h1>
            <div className="createWrap">
                <div className='createContent'> 
                    <div className='basicInfo'>
                        <h4>Información del producto</h4>
                        <div className="basicInfoWrap">
                            <div className="inputField">
                                <label>Nombre:</label>
                                <input className={json.name !== ''? 'normalInput' : null} type='text' name='name' onChange={onChangeInputs} value={json.infoProduct.name} required></input>
                            </div>
                            <div className="inputField">
                                <label>Precio:</label>
                                <input className='smallInput' type='number' min='0' name='price' onChange={onChangeInputs} value={json.infoProduct.price} required></input>
                            </div>
                            <div className="inputField">
                                <label>Descripción:</label>
                                <textarea rows='5' type='text' name='description' onChange={onChangeInputs} value={json.infoProduct.description} required></textarea>
                            </div>
                            <div className="inputField">
                                <label>Stock:</label>
                                <input className='smallInput' type='number'  min='0' name='unit_stock' onChange={onChangeInputs} value={json.infoProduct.unit_stock} required></input>
                            </div>
                            <div className="inputField">
                                <label>Henry coins:</label>
                                <input className='smallInput' type='number' min='0' name='henry_coin' onChange={onChangeInputs} value={json.infoProduct.henry_coin} required></input>
                            </div>
                            <div className="inputField">
                                <label>Peso:</label>
                                <input className='smallInput' type='number' min='0' name='weight' onChange={onChangeInputs} value={json.infoProduct.weight} required></input>
                            </div>
                            <div className="inputField">
                                <label>Dimensiones (Largo x Alto x Ancho):</label>
                                <input className='normalInput' type='number' min='0' name='size' onChange={onChangeInputs} value={json.infoProduct.size} required></input>
                            </div>
                            <div className="inputField">
                                <label>Descuento:</label>
                                <input className='smallInput' type='number' min='0' name='percentage_discount' onChange={onChangeInputs} value={json.infoProduct.percentage_discount} required></input>
                            </div>
                        </div>
                        <div className="categoryContainer">
                                <h4>Categoría</h4>      
                                <div>Seleccione una o mas categorias, en caso de no existir <span className='addCategory' onClick={onClickCreateCategory}>agregue una nueva:</span></div>
                                <div className='categoriesWrap'>
                                    {catBack?.map((cat, index) => (
                                        <button 
                                            className='buttonCategory' 
                                            name={cat.name_category} 
                                            onClick={onClickAddCategory} 
                                            key={index}
                                        >{cat.name_category}</button>
                                    ))}
                                </div>
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
                            <div>Son las propiedades que posee un producto, por ejemplo talla, color, etc. <span onClick={onClickCreateCaracteristic} className='addCaracteristic'>Agregar caracteristica</span></div>
                            <ul>
                                {carBack?.map((car, index) => {
                                    if(car.name_caracteristic !== 'type') {
                                        return <button 
                                            className='buttonCaracteristic' 
                                            name={car.name_caracteristic} 
                                            onClick={handleAddCaracteristic} 
                                            key={index}>
                                        {car.name_caracteristic}</button>
                                    }
                                    return null;    //arregla un warning de que no se devuelve nada al final del arreglo (case type)
                                })}
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
                            <Tags 
                                json={json} 
                                setJson={setJson}  
                                textPlaceholder='presione enter para agregar un tag'
                            />
                        </div>
                        <h4>Imagenes</h4>
                        <ImageUploader 
                            json={json} 
                            setJson={setJson} 
                        />
                        <div className='finalBtnContainer'>
                            <button onClick={creacteProduct} className='btn-final-form'>{editIsActive?'Modificar producto' : 'Crear producto'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default CreateProduct;