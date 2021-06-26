import React, { useEffect } from 'react'
import {GET_DOCUMENT_TYPES} from '../../../../Config/index.js'
import {GET_NACIONALITIES} from '../../../../Config/index.js'
import {LOGIN_URL} from '../../../../Config/index.js'
import './UserEdit.scss'
import axios from 'axios';
export default function UserEdit({nextClick, volverClick, residenciaSelected}){
    const iduser = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : (localStorage.getItem('userid') !== null) && localStorage.getItem('userid');
    const whichuser = (localStorage.getItem('userlogged') !== null) ? true : (localStorage.getItem('userid') !== null) && false;
    const [input, setInputs] = React.useState({
        id: iduser,
        firstname: "",
        lastname: "",
        email: "",
        nacionality: "",
        phone: "",
        documentType: "",
        identification: ""
    })
    const [residencia, setResidencia] = React.useState(residenciaSelected)
    const [erorres, seterrores] = React.useState({})
    const [documents, setDocuments] = React.useState([])
    const [nacionality, setNacionality] = React.useState([])
    useEffect(() =>{
        //Traigo los documentTypes
        let nacionalitytmp = []
        let documentstmp = []
         axios.get(GET_DOCUMENT_TYPES)
         .then(value =>{
             setDocuments(value.data)
             documentstmp = value.data
             return axios.get(GET_NACIONALITIES)            
         })
         .then(nacion =>{
            setNacionality(nacion.data)
            nacionalitytmp = nacion.data
            return axios.get(LOGIN_URL + `/?id=${iduser}`)
         })
         .then(value =>{
            setInputs({
                id: iduser,
                firstname: (value.data.name !== null) ? value.data.name : "",
                lastname: (value.data.lastname !== null) ? value.data.lastname : "",
                email: (value.data.email !== null) ? value.data.email : "",
                nacionality: (value.data.nacionality !== "Undefined") ? ((nacionalitytmp.filter(nacion => nacion.nacionality === value.data.nacionality))[0].id) : "",
                phone: (value.data.phone !== null) ? value.data.phone : "",
                documentType: (value.data.documentType !== "Undefined") ? ((documentstmp.filter(doc => doc.type === value.data.documentType))[0].id) : "",
                identification: (value.data.identification !== null) ? value.data.identification : "",
             })
         })
         .catch(error =>{
             alert(error)
         })

         //Traigo las nacionalidades
    }, [])

    const onHandleChange = ((e) =>{
        onValidate(e)
        setInputs({
            ...input,
            [e.target.name]: e.target.value
        })
    })

    const onHandleChangeResidencia = ((e) =>{
        setResidencia(e.target.value)
    })
    const onValidate = ((e) =>{
        //Define Regex
        var textformat = /^[0-9]*$/
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var emailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        //Validate Name Lastname
        if(e.target.name === 'firstname' || e.target.name === 'lastname'){
            if(format.test(e.target.value) || /\d/.test(e.target.value)){
                seterrores({
                     ...erorres,
                     [e.target.name]: 'Nombre o apellido invalido'
                    })
                }
                else{
                    seterrores({
                        ...erorres,
                    [e.target.name]: ''
                }) 
            }
        }                  
            
        //Validate Email
        if(e.target.name === 'email'){
            if(!emailformat.test(e.target.value) && e.target.value !== ''){
                seterrores({
                    ...erorres,
                    [e.target.name]: 'Mail invalido'
                })
            }
            else{
                seterrores({
                    ...erorres,
                    [e.target.name]: ''
                })  
            }
        }

        //Validate Phone
        if(e.target.name === 'phone'){
            if(!textformat.test(e.target.value) && e.target.value !== ''){
                seterrores({
                    ...erorres,
                    [e.target.name]: 'Telefono invalido'
                })
            }
            else{
                seterrores({
                    ...erorres,
                    [e.target.name]: ''
                })  
            }
        }

        //Validate ID
        if(e.target.name === 'identification'){
            if(!textformat.test(e.target.value) && e.target.value !== ''){
                seterrores({
                    ...erorres,
                    [e.target.name]: 'DNI invalido'
                })
            }
            else{
                seterrores({
                    ...erorres,
                    [e.target.name]: ''
                })  
            }
        }

    })
    const onNext = (() =>{
        for(const error in erorres){
            if(erorres[error] !== ""){
                return alert("Corregi los errores")
            }
        }
        for(const inputs in input){
            if(input[inputs] === ""){
                return alert("Completa todos los campos")
            }
        }
        if(residencia === ""){
            return alert("Completa todos los campos")
        }
        //Todo listo para pasar al prox componente
        axios.put(LOGIN_URL, {
            id: iduser,
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            nacionality: input.nacionality,
            phone: input.phone,
            documentType: input.documentType,
            identification: input.identification
        })
        .then(value =>{
            //Aca pasamos
            return nextClick(residencia)
        })
        .catch(error =>{
            alert(error)
        })
    })

    const onBack = (() =>{
        volverClick(residencia)
    })
    return(
        <div className = 'FullConteiner_UserEdit'>
            <h1 className = 'Complete_UserEdit'>{whichuser ? "Completa tu perfil" : "Completá el formulario"}</h1>
            <div className = 'GridInputs_UserEdit'>
                <div className = 'NameLastName_UserEdit'>
                    <div className = 'CommonDiv_UserEdit'>
                        <label>Nombre</label>
                        <input name = "firstname" placeholder = "Nombre" className = 'Input_UserEdit' value = {input.firstname} onChange = {onHandleChange}></input>
                        <label className = "LabelError_UserEdit">{erorres.firstname !== "" && erorres.firstname}</label>
                    </div>
                    <div className = 'CommonDiv_UserEdit'>
                        <label>Apellido</label>
                        <input name = "lastname" placeholder = "Apellido" className = 'Input_UserEdit' value = {input.lastname} onChange = {onHandleChange}></input>
                        <label className = "LabelError_UserEdit">{erorres.lastname !== "" && erorres.lastname}</label>
                    </div>
                </div>
                <div className = "CommonDiv_UserEdit">
                    <label>Correo electronico</label>
                    <input name = "email" placeholder = "Correo electronico" className = 'Input_UserEdit' value = {input.email} onChange = {onHandleChange}></input>
                    <label className = "LabelError_UserEdit">{erorres.email !== "" && erorres.email}</label>
                </div>
                <div className = "CommonDiv_UserEdit">
                    <label>Nacionalidad</label>
                    <select name = "nacionality" className = 'Select_UserEdit' value = {input.nacionality} onChange = {onHandleChange}>
                            <option value = "">Selecciona</option>
                            {nacionality.map(nacionality => <option value = {nacionality.id}>{nacionality.nacionality}</option>)}
                    </select>
                    <label className = "LabelError_UserEdit">{erorres.nacionality !== "" && erorres.nacionality}</label>
                </div>
                <div className = "CommonDiv_UserEdit">
                    <label>Lugar de residencia</label>
                    <select name = "residencia" className = 'Select_UserEdit' value = {residencia} onChange = {onHandleChangeResidencia}>
                            <option value = "">Selecciona</option>
                            {nacionality.map(nacionality => <option value = {nacionality.id}>{nacionality.nacionality}</option>)}
                    </select>
                    <label className = "LabelError_UserEdit">{erorres.nacionality !== "" && erorres.nacionality}</label>
                </div>
                <div className = "CommonDiv_UserEdit">
                    <label>Telefono</label>
                    <input name = "phone" placeholder = "Ej: 1141588259" className = 'Input_UserEdit' value = {input.phone} onChange = {onHandleChange}></input>
                    <label className = "LabelError_UserEdit">{erorres.phone !== "" && erorres.phone}</label>
                </div>
                <div className = 'NameLastName_UserEdit'>
                    <div className = 'CommonDiv_UserEdit'>
                        <label>Tipo</label>
                        <select name = "documentType" className = 'Select_UserEdit' value = {input.documentType} onChange = {onHandleChange}>
                            <option value = "">Selecciona</option>
                            {documents.map(document => <option value = {document.id}>{document.type}</option>)}
                        </select>
                        <label className = "LabelError_UserEdit">{erorres.documentType !== "" && erorres.documentType}</label>
                    </div>
                    <div className = 'CommonDiv_UserEdit'>
                        <label>Identificacion</label>
                        <input name = "identification" placeholder = "Identificacion" className = 'Input_UserEdit' value = {input.identification} onChange = {onHandleChange}></input>
                        <label className = "LabelError_UserEdit">{erorres.identification !== "" && erorres.identification}</label>
                    </div>
                </div>
            </div>
            <div className ='Buttons_UserEdit'>
                <button onClick = {onBack} className = 'ButtonVolver_UserEdit'>Volver</button>
                <button onClick = {onNext} className = 'ButtonNext_UserEdit'>Siguiente</button>
            </div>
        </div>
    )
}