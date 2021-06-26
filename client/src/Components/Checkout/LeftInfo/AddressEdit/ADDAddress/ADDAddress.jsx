import React, { useEffect } from 'react'
import provinciasJson from '../../../../../Assets/jsons/provincias.json'
import {LOCALIDAD_GET} from '../../../../../Config/index'
import axios from 'axios';
import "./ADDAddress.scss"

export default function ADDAddress({showAdd, idEdit, paisid}){
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
        phone_contact: "",
        description: ""
    })
    const provincias = provinciasJson.provincias
    const [localidades, setLocalidades] = React.useState([])
    let departamentosLocalidades = []

    //Funciones
    const onHandleChangeProvincia = ((e) =>{
        //Cargo las localidades
        axios.get(LOCALIDAD_GET + e.target.value + "&max=1000")
        .then(valor =>{
            setLocalidades([...new Set(valor.data.localidades.map(element => element.nombre).sort())])
            setInput({
                ...input,
                localidad: "",
                [e.target.name]: e.target.value
            })
        })
        .catch(error =>{
            alert(error)
        })

        //Cargo la provincia seleccionada
    })

    const onHandleChange= ((e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    })
    const close = (() =>{
        showAdd()
    })

    //const onHandleChange
    return(
        <div className = "Full_ADDAddress">
            <div className = "TotalConteiner_ADDAddress">
                <section>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Provincia</label>
                        <select name = "province" className = "Select_ADDAddress" onChange = {onHandleChangeProvincia}>
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
                    </div>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Numero</label>
                        <input name = "numerodireccion" value = {input.numerodireccion} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                    </div>
                    <div className = "CommonDiv_ADDAddress">
                        <label>Codigo Postal</label>
                        <input name = "postal_code" value = {input.postal_code} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                    </div>
                </section>
                <div className = "CommonDiv_ADDAddress">
                    <label>Descripcion</label>
                    <input name = "description" value = {input.description} className = "Input_ADDAddress" onChange = {onHandleChange}></input>
                </div>
            </div>
            <div className ='Buttons_ADDAddress'>
                <button onClick = {close} className = 'ButtonVolver_ADDAddress'>Cancelar</button>
                <button className = 'ButtonNext_ADDAddress'>Guardar Direccion</button>
            </div>
        </div>
    )
}