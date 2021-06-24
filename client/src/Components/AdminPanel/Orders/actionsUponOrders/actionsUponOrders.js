import Swal from 'sweetalert2'
import { ADMIN_ORDERS, LOGIN_URL } from "../../../../Config/index"
import axios from 'axios'
import "./actionsUponOrders.scss"

export default async function actionsUponUsers( id, idUser, name, prevstate, hcSpend , hcEarned , refreshOrders ) {
    switch(prevstate){
        case "carrito":{
            const { value: newstate } = await Swal.fire({
                title: 'Cancelar orden',
                input: 'checkbox',
                inputValue: "cancelada",
                buttonsStyling:false,
                customClass:{
                  popup: 'popup-order-small',
                  title: 'title-order',
                  input: 'input-order',
                  validationMessage: 'validationMessage-order',
                  actions: 'actions-order',
                  confirmButton: 'confirmButton-order',
                },
                inputPlaceholder:
                  'Seguro desea cancelar esta orden?',
                confirmButtonText:
                  'Continuar <i class="fa fa-arrow-right"></i>',
                inputValidator: (result) => {
                  return !result && 'Necesitas confirmar que quieres cancelar!'
                }
              })
              
              if (newstate) {
                axios.put(ADMIN_ORDERS,{
                    id: id,
                    newstatus: "cancelada"
                })
                .then(()=>{
                    refreshOrders()
                    Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"success",
                    title:"Orden cancelada"
                })})
                .catch(Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                    popup: 'popup-order',
                    title: 'title-order',
                    input: 'input-order',
                    validationMessage: 'validationMessage-order',
                    actions: 'actions-order',
                    confirmButton: 'confirmButton-order',
                  },
                    icon:"error",
                    title:"Hubo un problema"
                }))
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
                  popup: 'popup-order-small',
                  title: 'title-order',
                  input: 'input-order',
                  validationMessage: 'validationMessage-order',
                  actions: 'actions-order',
                  confirmButton: 'confirmButton-order',
                },
                inputValidator: (value) => {
                  if (!value) {
                    return 'Si no deseas realizar esta acción solo da click fuera del recuadro'
                  }
                }
              })
            if(newstate==="cancelada"){
                //aca tambien hay que devolverle el dinero al cliente, si es una promesa trabajar con un Promise.All 
                let order = axios.put(ADMIN_ORDERS,{
                  id: id,
                  newstatus: newstate
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
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"success",
                    title:"Orden cancelada"
                })})
                .catch(Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"error",
                    title:"Hubo un problema"
                }))
            }
            if(newstate==="completa"){
                //en este caso pasaria de pagada a completa, habria que implementar cuando se despacha ejecute esta accion directamente
                axios.put(ADMIN_ORDERS,{
                  id: id,
                  newstatus: newstate
                })
                .then(()=>{
                  refreshOrders()
                  Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"success",
                    title:"Orden despachada"
                  })}
                )
                .catch(Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"error",
                    title:"Hubo un problema"
                }))
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
                  popup: 'popup-order-small',
                  title: 'title-order',
                  input: 'input-order',
                  validationMessage: 'validationMessage-order',
                  actions: 'actions-order',
                  confirmButton: 'confirmButton-order',
                },
                inputOptions: inputOptions,
                inputValidator: (value) => {
                  if (!value) {
                    return 'Si no deseas realizar esta acción solo da click fuera del recuadro'
                  }
                }
              })
            if(newstate==="cancelada"){
                //aca tambien hay que devolverle el dinero al cliente, si es una promesa trabajar con un Promise.All 
                let order = axios.put(ADMIN_ORDERS,{
                  id: id,
                  newstatus: newstate
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
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"success",
                    title:"Orden cancelada"
                })})
                .catch(Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"error",
                    title:"Hubo un problema"
                }))
            }
            if(newstate==="completa"){
                //en este caso pasaria de pagada a completa, habria que implementar cuando se despacha ejecute esta accion directamente
                axios.put(ADMIN_ORDERS,{
                  id: id,
                  newstatus: newstate
                })
                .then(()=>{
                  refreshOrders()
                  Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"success",
                    title:"Orden despachada"
                  })}
                )
                .catch(Swal.fire({
                    buttonsStyling:false,
                    customClass:{
                      popup: 'popup-order',
                      title: 'title-order',
                      input: 'input-order',
                      validationMessage: 'validationMessage-order',
                      actions: 'actions-order',
                      confirmButton: 'confirmButton-order',
                    },
                    icon:"error",
                    title:"Hubo un problema"
                }))
            }
            break;
        }
        default: {
            Swal.fire({
                buttonsStyling:false,
                customClass:{
                  popup: 'popup-order',
                  title: 'title-order',
                  input: 'input-order',
                  validationMessage: 'validationMessage-order',
                  actions: 'actions-order',
                  confirmButton: 'confirmButton-order',
                },
                icon:"error",
                title:"No puedes realizar ninguna acción sobre esta orden!"
            })
            break;
        }
    }
}