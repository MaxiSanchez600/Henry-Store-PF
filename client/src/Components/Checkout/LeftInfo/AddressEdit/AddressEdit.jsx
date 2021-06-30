import React, { useEffect } from 'react'
import "./AddressEdit.scss"
import {GET_USER_ADDRESS, GET_PAYMENT_ID, GET_ORDER, henryExchangeRoute} from '../../../../Config/index.js'
import axios from 'axios';
import AddressUserList from "./AddressUserList/AddressUserList.jsx"
import ADDAddress from './ADDAddress/ADDAddress';
import RENAMEAddress from './RENAMEAddress/RENAMEAddress';
import PaymentFinal from './PaymentFinal/PaymentFinal';

export default function AddressEdit({nextClick, volverClick, residenciaSelected, orderid}){
    const [henryExchange, sethenryExchange] = React.useState(0)
    const iduser = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : (localStorage.getItem('userid') !== null) && localStorage.getItem('userid');
    const [UserAddresses, setUserAddresses] = React.useState([])
    const [addressSelected, setaddressSelected] = React.useState(undefined)
    const [openAdd, setopenAdd] = React.useState(false)
    const [openRename, setopenRename] = React.useState(false)
    const [idEdit, setidEdit] = React.useState(undefined)
    const [isPago, setispago] = React.useState(false)
    const [isLoading, setisLoading] = React.useState(false)
    //window.Mercadopago.setPublishableKey("TEST-f7149905-e21f-4ea3-a559-1527bc66dcee");

    //false => add direc
    //true => edit direc 
     var MercadoPago = require('mercadopago');
     const mp = new MercadoPago('TEST-f7149905-e21f-4ea3-a559-1527bc66dcee', {
         locale: 'es-AR'
     })
    
     const mpcheck= ((preferenceid) =>{
         mp.checkout({
             preference: {
                 id: preferenceid
             }
         });
     })

    const goBack = (() =>{
        volverClick(residenciaSelected)
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

    const goNext = (async (idaddress) =>{
            if(!isPago){
                setisLoading(true)
                setispago(true)
                axios.get(GET_PAYMENT_ID + `?totalprice=${await getOrderPrice()}&orderid=${orderid}&addressid=${idaddress}&residencia=${residenciaSelected}`)
                .then(value =>{
                    const script = document.createElement('script');
                    console.log(value.data.id)
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
            }
    })

    useEffect(async () =>{
        sethenryExchange(await henryExchangeRoute())
        axios.get(GET_USER_ADDRESS + `/?userid=${iduser}`)
        .then(value =>{
            setUserAddresses(value.data)
        })
        .catch(error =>{
            alert(error)
        })
    }, [])


     const clickAddress = (async (idaddress) =>{
        if(idaddress === addressSelected){
            setaddressSelected()
            if(isPago){
                setispago(false)
            }
        }
        else{
            await setaddressSelected(idaddress)
            goNext(idaddress)
        }
     })

     const showAdd = ((id) =>{
         if(id !== undefined && idEdit !== undefined){
             console.log("caso1")
            if(id === idEdit){
                setidEdit(undefined)
                setopenAdd(!openAdd)
            }
            else{
                setidEdit(id)
            }
         }
         else if(id === undefined && idEdit !== undefined){
            console.log("caso2")
            setidEdit(undefined)
         }
         else if(id !== undefined && idEdit === undefined && openAdd){
            console.log("caso3")
            setidEdit(id)
         }
         else if(id !== undefined && idEdit === undefined && !openAdd){
            console.log("caso4")
            setidEdit(id)
            setopenAdd(true)
         }
         else{
            if(id !== undefined){
                console.log("caso5")
                setidEdit(id)
             }
             else{
                console.log("caso6")
                setidEdit(undefined)
             }
             setopenAdd(!openAdd)
         }
     })

     const onClose = (() =>{
         setidEdit(undefined)
         setopenAdd(false)
     })
     
     const updateAddress = (() =>{
        axios.get(GET_USER_ADDRESS + `/?userid=${iduser}`)
        .then(value =>{
            setUserAddresses(value.data)
        })
        .catch(error =>{
            alert(error)
        })
     })

    return(
        <div id = "FORM_ID" className = 'AddressEdit_Conteiner'>
            {(UserAddresses.length === 0) ? <h1 className = "H1Elegi_AddressEdit" >Actualmente no tenes direcciones cargadas, pero podes cargar una.</h1>:
            <h1 className = "H1Elegi_AddressEdit">Elige una de tus <span>direcciones</span></h1>}
            <div className = "AddressesConteiner_AddresEdit">
                {UserAddresses.map(address => <AddressUserList showRename = {showAdd} useraddress = {address} clickEvent = {clickAddress} addressSelected = {addressSelected}/>)}
            </div>
            <p onClick = {() => showAdd()} className = "Anadir_AddressEdit">Añadir una <span>nueva</span></p>
            {/* {openAdd && ((idEdit !== undefined) ? <ADDAddress updateAddress = {updateAddress} paisid = {residenciaSelected} idEdit = {idEdit} showAdd = {showAdd}/> : <ADDAddress updateAddress = {updateAddress} paisid = {residenciaSelected} showAdd = {showAdd}/>)} */}
            {(openAdd && (idEdit !== undefined)) && <ADDAddress onClose = {onClose} updateAddress = {updateAddress} paisid = {residenciaSelected} idEdit = {idEdit} showAdd = {showAdd}/>}
            {(openAdd && (idEdit === undefined)) && <ADDAddress onClose = {onClose} updateAddress = {updateAddress} paisid = {residenciaSelected} showAdd = {showAdd}/>}
            <div className ='Buttons_AddressEdit'>
                <button onClick = {goBack} className = 'ButtonVolver_AddressEdit'>Volver</button>
                {/* {isLoading && <div class="loader"></div>} */}
                {isPago && <div id = "buttonrender">{isLoading && <div class="loader"></div>}</div>}
            </div>
        </div>
    )
}