import React, { useEffect } from 'react'
import "./NoAddressEdit.scss"
import {GET_NACIONALITIES} from '../../../../Config/index.js'
import axios from 'axios';



export default function NoAddressEdit({nextClick, volverClick, residenciaSelected}){
    const [residencia, setResidencia] = React.useState("")
    const goBack = (() =>{
        volverClick(residenciaSelected)
    })

    const goNext = (() =>{
        alert("Pagar")
    })

     useEffect(() =>{
         axios.get(GET_NACIONALITIES)
         .then(value =>{
            setResidencia(value.data.filter(nacion => (nacion.id + "") === (residenciaSelected + ""))[0].nacionality)
         })
     }, [])


    return(
        <div>
            <div className = "FullConteiner_NoAddressEdit">
                <h1 className = "H1Principal_NoAddressEdit">Por el momento no disponemos de envios a <span>{residencia}</span></h1>
                <p className = "SinEmbargo_NoAddressEdit">Sin embargo, podes continuar con tu compra y te llegara un mail de confirmacion para coordinar el envio con el <span>Staff de Henry.</span></p>
            </div>
            <div className ='Buttons_NoAddressEdit'>
                <button onClick = {goBack} className = 'ButtonVolver_NoAddressEdit'>Volver</button>
                <button onClick = {goNext} className = 'ButtonNext_NoAddressEdit'>Pagar</button>
            </div>
        </div>
    )
}