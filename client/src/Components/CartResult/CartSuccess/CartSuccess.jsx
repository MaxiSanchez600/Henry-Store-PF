import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import './CartSuccess.scss';
import {ORDER_TO_PAGADO_RETURN_TOTAL_PRICE, DIRECCION_BY_ID, REMOVE_PRODUCT_STOCK} from '../../../Config/index'
import axios from 'axios'
export default function CartSuccess(){
    const iduser = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : (localStorage.getItem('userid') !== null) && localStorage.getItem('userid');
    //http://localhost:3000/cart/success?collection_id=1238054777&collection_status=approved&payment_id=1238054777&status=approved&
    //external_reference=null&payment_type=credit_card&merchant_order_id=2866193969&preference_id=209521005-3e33f6a8-f33f-4b9e-8d0d-
    //400c042d1bbe&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
    const [totalprice, setTotalPrice] = React.useState("")
    const [pais, setPais] = React.useState("")
    const [direccion, setDireccion] = React.useState({})
    
    // NacionalityIdNacionality: 1
    // UserIdUser: "2"
    // createdAt: "2021-06-26T03:50:05.867Z"
    // description: "asd"
    // direccion: "Nuevados"
    // id: 15
    // localidad: "CERRO COLORADO"
    // numerodireccion: 123
    // phone_contact: 1141588259
    // postal_code: "456"
    // province: "San Luis"
    // updatedAt: "2021-06-26T05:43:44.244Z"

    const { orderid, addressid, residenceid} = useParams();
    const search = useLocation().search;
    const paymentid = new URLSearchParams(search).get("payment_id");
    // console.log(orderid, paymentid, addressid)

    let date = new Date();
    let today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    
    useEffect(async () =>{
        await axios.put(REMOVE_PRODUCT_STOCK + `?orderid=${orderid}`)
        .catch(error =>{
            alert(error)
        })
        await axios.put(ORDER_TO_PAGADO_RETURN_TOTAL_PRICE + `?orderid=${orderid}&direcid=${addressid}&paymentid=${paymentid}&userid=${iduser}&residenceid=${residenceid}`)
        .then(value =>{
            setTotalPrice(value.data.pricetotal)
            setPais(value.data.pais)
        })
        .catch(error =>{
            alert(error)
        })
        if(addressid !== "undefined"){
            return axios.get(DIRECCION_BY_ID + `?direcid=${addressid}`)
            .then(value =>{
                setDireccion(value.data)
            })
            .catch(error =>{
                alert(error)
            })
        }
    }, [])

    return(
        <div id="CartSuccess">
            <h1>Gracias por tu compra</h1>
            <div className="barra"></div>
            <p className="text-center">Nos pondremos en contacto contigo para <b>coordinar el envío.</b></p>
            <table>
                <tr>
                    <th>Fecha de la compra</th>
                    <td>{today}</td>
                </tr>
                <tr>
                    <th>ID de la orden</th>
                    <td>{orderid}</td>
                </tr>
                <tr>
                    <th>Dirección</th>
                        <td>{
                       (direccion.direccion !== undefined) ? direccion.direccion + ' ' + direccion.numerodireccion
                       : "Direccion de envío a coordinar"
                        }</td>
                </tr>
                <tr>
                    <th>Localidad</th>
                    <td>{direccion.localidad}</td>
                </tr>
                <tr>
                    <th>Provincia</th>
                    <td>{direccion.province}</td>
                </tr>
                <tr>
                    <th>País</th>
                    <td>{pais}</td>
                </tr>
                <tr>
                    <th>Teléfono de contacto</th>
                    <td>{direccion.phone_contact}</td>
                </tr>
            </table>

            <div id="CartSuccess-total">
                <h2>Total</h2>
                <h3>${totalprice * localStorage.getItem("currency")} {localStorage.getItem("currencyname")}</h3>
                {/* localStorage.getItem("currencyname") */}
            </div>
        </div>
    )
}