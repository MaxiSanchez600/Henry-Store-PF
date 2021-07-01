import Swal from 'sweetalert2'
import { ADMIN_ORDERS, LOGIN_URL } from "../../../../Config/index"
import axios from 'axios'
import "./actionsUponOrders.scss"
import sendShippingURL from './sendShippingURL'

export default async function actionsUponOrders( id, idUser, name, prevstate, hcSpend , hcEarned , refreshOrders ) {
    switch(prevstate){
        case "carrito":{
            const { value: newstate } = await Swal.fire({
                title: 'Cancelar orden',
                input: 'checkbox',
                inputValue: 0,
                buttonsStyling:false,
                customClass:{
                  popup: 'popup-order-info',
                  title: 'title-order-info',
                  input: 'input-order-info',
                  validationMessage: 'validationMessage-order-info',
                  confirmButton: 'confirmButton-order-info',
                },
                inputPlaceholder:
                  'Seguro desea cancelar esta orden?',
                confirmButtonText:
                  'Continuar <i class="fa fa-arrow-right"></i>',
                inputValidator: (result) => {
                  return !result && 'Necesitas confirmar para cancelar la orden'
                }
              })
              
              if (newstate) {
                axios.put(ADMIN_ORDERS,{
                    id: id,
                    newstatus: "cancelada",
                    oldstatus: prevstate
                })
                .then(()=>{
                    refreshOrders()
                    Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#49AF41",
                    customClass:{
                      popup: 'popup-order-success',
                      title: 'title-order-success',
                      input: 'input-order-success',
                      confirmButton: 'confirmButton-order-success',
                    },
                    icon:"success",
                    title:"Orden cancelada"
                })})
                .catch(()=>{
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                    icon:"error",
                    title:"Hubo un problema",
                    text:"No pudimos cancelar la orden"
                  })
                })
              }
              break;
        };
        case "pagada":{
            const inputOptions = new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    'cancelada': 'Cancelada',
                    'completa': 'Despachada',
                  })
                }, 1000)
              })
              
              const { value: newstate } = await Swal.fire({
                title: `Que estado quiere asignarle a la orden de${name?" " + name:"l Usuario"}`,
                input: 'radio',
                inputOptions: inputOptions,
                buttonsStyling:false,
                customClass:{
                  popup: 'popup-order-info',
                  title: 'title-order-info',
                  input: 'input-order-info',
                  validationMessage: 'validationMessage-order-info',
                  confirmButton: 'confirmButton-order-info',
                },
                inputValidator: (value) => {
                  if (!value) {
                    return 'Necesitas seleccionar una opción'
                  }
                }
              })
            if(newstate==="cancelada"){
                let order = axios.put(ADMIN_ORDERS,{
                  id: id,
                  newstatus: newstate,
                  oldstatus: prevstate
                })
                let hcUser =axios.put(LOGIN_URL,{
                    id: idUser,
                    hc: hcSpend-hcEarned
                })
                Promise.all([order,hcUser])
                .then(()=>{
                    refreshOrders()
                    Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#49AF41",
                    customClass:{
                      popup: 'popup-order-success',
                      title: 'title-order-success',
                      input: 'input-order-success',
                      confirmButton: 'confirmButton-order-success',
                    },
                    icon:"success",
                    title:"Orden cancelada"
                })})
                .catch(()=>{
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                    icon:"error",
                    title:"Hubo un problema",
                    text:"No pudimos cancelar la orden"
                  })
                })
            }
            if(newstate==="completa"){
                sendShippingURL()
                .then((res)=>{
                  return axios.put(ADMIN_ORDERS,{
                    id: id,
                    newstatus: newstate,
                    oldstatus: prevstate,
                    shipping_id: res
                  })
                })
                .then(()=>{
                  refreshOrders()
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#49AF41",
                    customClass:{
                      popup: 'popup-order-success',
                      title: 'title-order-success',
                      input: 'input-order-success',
                      confirmButton: 'confirmButton-order-success',
                    },
                    icon:"success",
                    title:"Orden despachada"
                  })}
                )
                .catch(()=>{
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                    icon:"error",
                    title:"Hubo un problema",
                    text:"No pudimos completar la orden"
                  })
                })
            }
            
            break;
            };
        case "coordinar":{
            const inputOptions = new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    'cancelada': 'Cancelada',
                    'completa': 'Despachada',
                  })
                }, 1000)
              })
              
              const { value: newstate } = await Swal.fire({
                title: `Que estado quiere asignarle a la orden de${name?" " + name:"l Usuario"}`,
                input: 'radio',
                buttonsStyling:false,
                customClass:{
                  popup: 'popup-order-info',
                  title: 'title-order-info',
                  input: 'input-order-info',
                  validationMessage: 'validationMessage-order-info',
                  confirmButton: 'confirmButton-order-info',
                },
                inputOptions: inputOptions,
                inputValidator: (value) => {
                  if (!value) {
                    return 'Necesitas seleccionar una opción'
                  }
                }
              })
            if(newstate==="cancelada"){
                let order = axios.put(ADMIN_ORDERS,{
                  id: id,
                  newstatus: newstate,
                  oldstatus: prevstate
                })
                let hcUser =axios.put(LOGIN_URL,{
                    id: idUser,
                    hc: hcSpend-hcEarned
                })
                Promise.all([order,hcUser])
                .then(()=>{
                  refreshOrders()
                  Swal.fire({
                  buttonsStyling:false,
                  iconColor: "#49AF41",
                  customClass:{
                    popup: 'popup-order-success',
                    title: 'title-order-success',
                    input: 'input-order-success',
                    confirmButton: 'confirmButton-order-success',
                  },
                  icon:"success",
                  title:"Orden cancelada"
              })})
              .catch(()=>{
                Swal.fire({
                  buttonsStyling:false,
                  iconColor: "#F64749",
                  customClass:{
                  popup: 'popup-order-error',
                  title: 'title-order-error',
                  input: 'input-order-error',
                  confirmButton: 'confirmButton-order-error',
                  },
                  icon:"error",
                  title:"Hubo un problema",
                  text:"No pudimos cancelar la orden"
                })
              })
            }
            if(newstate==="completa"){
                sendShippingURL()
                .then((res)=>{
                  return axios.put(ADMIN_ORDERS,{
                    id: id,
                    newstatus: newstate,
                    oldstatus: prevstate,
                    shipping_id: res
                  })
                })
                .then(()=>{
                  refreshOrders()
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#49AF41",
                    customClass:{
                      popup: 'popup-order-success',
                      title: 'title-order-success',
                      input: 'input-order-success',
                      confirmButton: 'confirmButton-order-success',
                    },
                    icon:"success",
                    title:"Orden despachada"
                  })}
                )
                .catch(()=>{
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                    icon:"error",
                    title:"Hubo un problema",
                    text:"No pudimos completar la orden"
                  })
                })
            }
            break;
        }
        default: {
            Swal.fire({
                buttonsStyling:false,
                iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                icon:"error",
                title:`La orden esta ${(prevstate === "completa")?"despachada":prevstate}`,
                text:"No puedes realizar ninguna acción sobre ella"
            })
            break;
        }
    }
}