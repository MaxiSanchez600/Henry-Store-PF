import React, { useEffect } from 'react'
import "./NoAddressEdit.scss"
import {GET_NACIONALITIES, GET_PAYMENT_ID, henryExchangeRoute, GET_ORDER} from '../../../../Config/index.js'
import axios from 'axios';



export default function NoAddressEdit({nextClick, volverClick, residenciaSelected, orderid}){
    const [total, setTotal] = React.useState(0)
    const [ars, setars] = React.useState(0)
    const [isLoading, setisLoading] = React.useState(true)
    const [henryExchange, sethenryExchange] = React.useState(0)
    const [residencia, setResidencia] = React.useState("")
    const goBack = (() =>{
        volverClick(residenciaSelected)
    })

    var MercadoPago = require('mercadopago');
     const mp = new MercadoPago('TEST-f7149905-e21f-4ea3-a559-1527bc66dcee', {})
    
     const mpcheck= ((preferenceid) =>{
         mp.checkout({
             preference: {
                 id: preferenceid
             }
         });
     })


    const getOrderPrice = (() =>{
        return axios.get(GET_ORDER + `?id=${orderid}`)
        .then(value =>{
            setTotal(value.data.totalprice)
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
                    setars(value.data.currency)
                    console.log(value.data.id)
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
                <p className = "SinEmbargo_NoAddressEdit">Sin embargo, podes continuar con tu compra y te llegara un mail de confirmacion para coordinar el envio con el <span>Staff de Henry.</span> El cargo sera de <span>{total * ars} </span>
                pesos argentinos, proximamente contaremos con mas medios de pago para todas las monedas.</p>               
            </div>
            <div className ='Buttons_NoAddressEdit'>
                <button onClick = {goBack} className = 'ButtonVolver_NoAddressEdit'>Volver</button>
                <div id = "buttonrender">{isLoading && <div class="loader"></div>}</div>
            </div>
        </div>
    )
}