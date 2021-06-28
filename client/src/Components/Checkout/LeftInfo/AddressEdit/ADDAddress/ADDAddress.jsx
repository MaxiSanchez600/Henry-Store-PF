import React, { useEffect } from 'react'
import provinciasJson from '../../../../../Assets/jsons/provincias.json'
import {LOCALIDAD_GET, ADD_USER_ADDRESS, DIRECCION_BY_ID, UPDATE_DIRECCION} from '../../../../../Config/index'
import axios from 'axios';
import Swal from 'sweetalert2'
import "./ADDAddress.scss"

export default function ADDAddress({onClose, updateAddress, showAdd, idEdit, paisid}){
    //Variables y Hooks
    const iduser = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : (localStorage.getItem('userid') !== null) && localStorage.getItem('userid');
    const [input, setInput] = React.useState({
        userid: iduser,
        pais: paisid,
        province: "",
        localidad: "",
        direccion: "",
        numerodireccion: "",
        postal_code: "",
        description: ""
    })
    const provincias = provinciasJson.provincias
    const [localidades, setLocalidades] = React.useState([])
    const [errores, setErrores] = React.useState([])
    let departamentosLocalidades = []

    //Funciones
    const onHandleChangeProvincia = ((e) =>{
        //Cargo las localidades
        setInput({
            ...input,
            localidad: "",
            [e.target.name]: e.target.value
        })
        axios.get(LOCALIDAD_GET + e.target.value + "&max=1000")
        .then(valor =>{
            setLocalidades([...new Set(valor.data.localidades.map(element => element.nombre).sort())])
        })
        .catch(error =>{
            alert(error)
        })
    })

    const onHandleChange= ((e) =>{
        checkErrores(e)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    })

    const close = (()  =>{
        onClose()
    })

    const checkErrores = ((e) =>{
        var textformat = /^[0-9]*$/
        var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(e.target.name === "direccion" || e.target.name === "description"){
            if(format.test(e.target.value) || /\d/.test(e.target.value)){
                setErrores({
                     ...errores,
                     [e.target.name]: 'Direccion o descripcion invalida'
                    })
                }
                else{
                    setErrores({
                        ...errores,
                    [e.target.name]: ''
                }) 
            }
        }

        if(e.target.name === "numerodireccion"){
            if(!textformat.test(e.target.value) && e.target.value !== ''){
                setErrores({
                    ...errores,
                    [e.target.name]: 'Numero invalido'
                })
            }
            else{
                setErrores({
                    ...errores,
                    [e.target.name]: ''
                })  
            }
        }

        if(e.target.name === "postal_code"){
            if(format.test(e.target.value)){
                setErrores({
                     ...errores,
                     [e.target.name]: 'Codigo postal invalido'
                    })
                }
                else{
                    setErrores({
                        ...errores,
                    [e.target.name]: ''
                }) 
            }
        }
    })

    const AddPutDireccion = (() =>{
        for(const error in errores){
            if(errores[error] !== ""){
                return Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order_UserEdit',
                    title: 'title-order_UserEdit',
                    input: 'input-order_UserEdit',
                    validationMessage: 'validationMessage-order_UserEdit',
                    actions: 'actions-order_UserEdit',
                    confirmButton: 'confirmButton-order_UserEdit',
                    icon: 'iconpopup_UserEdit',
                  },
                    icon:"error",
                    title:"Corregi los errores",
                    text: "Para continuar es necesario que corrijas los errores"
                })
            }
        }
        for(const inputs in input){
            if(input[inputs] === ""){
                return Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                        popup: 'popup-order_UserEdit',
                        title: 'title-order_UserEdit',
                        input: 'input-order_UserEdit',
                        validationMessage: 'validationMessage-order_UserEdit',
                        actions: 'actions-order_UserEdit',
                        confirmButton: 'confirmButton-order_UserEdit',
                  },
                    icon:"error",
                    title:"Completa todos los campos",
                    text: "Para continuar es necesario que completes los campos"
                })
            }
        }
        if(idEdit !== undefined){
            axios.put(UPDATE_DIRECCION, {
                orderid: idEdit,
                pais: paisid,
                province: input.province,
                localidad: input.localidad,
                direccion: input.direccion,
                numerodireccion: input.numerodireccion,
                postal_code: input.postal_code,
                description: input.description
            })
            .then(() =>{
                Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#49AF41",
                    customClass:{
                        popup: 'popup-order_UserEdit',
                        title: 'title-order_UserEdit',
                        input: 'input-order_UserEdit',
                        validationMessage: 'validationMessage-order_UserEdit',
                        actions: 'actions-order_UserEdit',
                        confirmButton: 'confirmButton-order_UserEdit_success',
                  },
                    icon:"success",
                    title:"Editada con exito",
                    text: "Ahora podes seleccionarla en tu lista de direcciones"
                })
                updateAddress()
                close()
            })
        }
        else{
            axios.post(ADD_USER_ADDRESS, {
                userid: iduser,
                pais: paisid,
                province: input.province,
                localidad: input.localidad,
                direccion: input.direccion,
                numerodireccion: input.numerodireccion,
                postal_code: input.postal_code,
                description: input.description
            })
            .then(() =>{
                Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#49AF41",
                    customClass:{
                        popup: 'popup-order_UserEdit',
                        title: 'title-order_UserEdit',
                        input: 'input-order_UserEdit',
                        validationMessage: 'validationMessage-order_UserEdit',
                        actions: 'actions-order_UserEdit',
                        confirmButton: 'confirmButton-order_UserEdit_success',
                  },
                    icon:"success",
                    title:"Añadida con exito",
                    text: "Ahora podes seleccionarla en tu lista de direcciones"
                })
                updateAddress()
                close()
            })
        }
    })


    useEffect(() =>{
        if(idEdit !== undefined){
            axios.get(DIRECCION_BY_ID + `?direcid=${idEdit}`)
            .then(value =>{
                setInput({
                    ...input,
                    province: value.data.province,
                    localidad: value.data.localidad,
                    direccion: value.data.direccion,
                    numerodireccion: value.data.numerodireccion,
                    postal_code: value.data.postal_code,
                    description: value.data.description
                })
                axios.get(LOCALIDAD_GET + value.data.province + "&max=1000")
                .then(valor =>{
                    setLocalidades([...new Set(valor.data.localidades.map(element => element.nombre).sort())])
 
                })
                .catch(error =>{
                    alert(error)
                })
                    })
                    .catch(error =>{
                        alert(error)
                    })
        }
    }, [idEdit])
    return(
        <div className = "Full_ADDAddress">
            <div className = "TotalConteiner_ADDAddress">
                <section>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Provincia</label>
                        <select value = {input.province} name = "province" className = "Select_ADDAddress" onChange = {onHandleChangeProvincia}>
                            <option value = "">Choose</option>
                            {provincias.map(provincia => <option value = {provincia.nombre}>{provincia.nombre}</option>)}
                        </select>
                    </div>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Localidad</label>
                        <input value = {input.localidad}className = "Select_ADDAddress" list = "LocalidadesList" name = "localidad" onChange = {onHandleChange}/>
                        <datalist id = "LocalidadesList">
                            {localidades.map(localidad => <option value = {localidad}>{localidad}</option>)}
                        </datalist>
                    </div>
                </section>
                <section>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Direccion</label>
                        <input name = "direccion" value = {input.direccion} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                        <label className = "LabelError_ADDAddress">{errores.direccion !== "" && errores.direccion}</label>
                    </div>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Numero</label>
                        <input name = "numerodireccion" value = {input.numerodireccion} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                        <label className = "LabelError_ADDAddress">{errores.numerodireccion !== "" && errores.numerodireccion}</label>
                    </div>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Codigo Postal</label>
                        <input name = "postal_code" value = {input.postal_code} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                        <label className = "LabelError_ADDAddress">{errores.postal_code !== "" && errores.postal_code}</label>
                    </div>
                </section>
                <div className = "CommonDiv_ADDAddress">
                    <label>Descripcion</label>
                    <input name = "description" value = {input.description} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                    <label className = "LabelError_ADDAddress">{errores.description !== "" && errores.description}</label>
                </div>
            </div>
            <div className ='Buttons_ADDAddress'>
                <button onClick = {close} className = 'ButtonVolver_ADDAddress'>Cancelar</button>
                <button onClick = {AddPutDireccion}className = 'ButtonNext_ADDAddress'>{(idEdit !== undefined ? "Actualizar Direccion" : "Guardar Direccion")}</button>
            </div>
        </div>
    )
}