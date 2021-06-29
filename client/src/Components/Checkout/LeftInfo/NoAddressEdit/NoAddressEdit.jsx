import React, { useEffect } from 'react'
import "./NoAddressEdit.scss"
import {GET_NACIONALITIES, GET_PAYMENT_ID, henryExchangeRoute, GET_ORDER} from '../../../../Config/index.js'
import axios from 'axios';



export default function NoAddressEdit({nextClick, volverClick, residenciaSelected, orderid}){
    const [isLoading, setisLoading] = React.useState(true)
    const [henryExchange, sethenryExchange] = React.useState(0)
    const [residencia, setResidencia] = React.useState("")
    const goBack = (() =>{
        volverClick(residenciaSelected)
    })

    const goNext = (() =>{
        alert("Pagar")
    })

    const getOrderPrice = (() =>{
        return axios.get(GET_ORDER + `?id=${orderid}`)
        .then(value =>{
            return (value.data.totalprice - (value.data.spenthc * henryExchange))
            //(order.totalprice - (order.spenthc * henryExchange)) * currency
        })
        .catch(error =>{
            alert(error)
        })
    })

     useEffect(async () =>{
        await sethenryExchange(await henryExchangeRoute())
         axios.get(GET_NACIONALITIES)
         .then(value =>{
            setResidencia(value.data.filter(nacion => (nacion.id + "") === (residenciaSelected + ""))[0].nacionality)
         })
         axios.get(GET_PAYMENT_ID + `?totalprice=${await getOrderPrice()}&orderid=${orderid}&addressid=${undefined}&residencia=${residenciaSelected}`)
                .then(value =>{
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src =
                        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
                    script.setAttribute('data-preference-id', value.data.id);
                    //script.setAttribute('data-header-color', "#000000");
                    //script.setAttribute('data-elements-color', "#2d2d2d");
                    const form = document.getElementById("buttonrender");
                    form.appendChild(script);
                    setisLoading(false)
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
                <div id = "buttonrender">{isLoading && <div class="loader"></div>}</div>
            </div>
        </div>
    )
}