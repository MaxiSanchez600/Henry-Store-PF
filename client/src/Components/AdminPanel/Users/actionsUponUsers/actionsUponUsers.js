import Swal from 'sweetalert2'
import { BAN_USER, CHANGE_ROL, LOGIN_URL, RESET_PASSWORD} from "../../../../Config/index"
import axios from 'axios'
import "./actionsSweet.scss"

export default async function actionsUponUsers(name, id, origin, boolean, rol, pass, entry, refreshAfterAction) {
    if(entry){
      let inputOptions = "";
      if(origin==="password"){
          inputOptions = new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  'ban': (boolean?"Permitir su acceso":"Prohibir su acceso"),
                  'rol': 'Cambiar su rol',
                  'pass':'Resetear su contraseña',
                  'givehc':'Otorgar HC'
                })
              }, 1000)
            })
        }
      else{
        inputOptions = new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                'ban': (boolean?"Permitir su acceso":"Prohibir su acceso"),
                'rol': 'Cambiar su rol',
                'givehc':'Otorgar HC'
              })
            }, 1000)
          })
      }
          
        const { value: action } = await Swal.fire({
            title: `Que acción deseas realizar sobre ${name?name:"el Usuario"}?`,
            input: 'radio',
            inputOptions: inputOptions,
            buttonsStyling:false,
            customClass:{
              popup: 'popup-users',
              title: 'title-users',
              input: 'input-users',
              validationMessage: 'validationMessage-users',
              actions: 'actions-users',
              confirmButton: 'confirmButton-users',
            },
            confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',
            inputValidator: (value) => {
              if (!value) {
                return 'Necesitas elegir una acción'
              }
            }
          })
          
          if (action === "ban") {
            entry=false
            rol=false
            pass=false
            return actionsUponUsers(name, id, origin, boolean, rol, pass, entry, refreshAfterAction)
          }
          if (action === "rol") {
            entry=false
            rol=true
            pass=false
            return actionsUponUsers(name, id, origin, null, rol, pass, entry, refreshAfterAction)
          }
          if (action === "pass") {
            entry=false
            rol=false
            pass=true
            return actionsUponUsers(name, id, origin, null, rol, pass, entry, refreshAfterAction)
          }
          if(action==='givehc'){
            const { value: number } = await Swal.fire({
              title: 'Ingrese cantidad de HenryCoins',
              input: 'number',
              buttonsStyling:false,
              customClass:{
                popup: 'popup-products-delete',
                title: 'title-products',
                input: 'input-products-stock',
                validationMessage: 'validationMessage-products',
                actions: 'actions-products',
                confirmButton: 'confirmButton-products',
              },
              inputValidator: (value) => {
                if (!value) {
                  return 'Solo puedes ingresar valores numéricos!'
                }
              }
            })
            if (number) {
              axios.put(LOGIN_URL,{
                id: id,
                hc: number
              })
              .then(()=>{
                refreshAfterAction()
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
                  title:`El usuario recibio sus HC`,
              })
              })
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
                  title:`Error en la transacción`,
              })
              })
              
            }
          }
    }
    if(boolean && !rol && !entry && !pass){
        const { value: accept } = await Swal.fire({
        title: 'UNBAN',
        input: 'checkbox',
        inputValue: 0,
        buttonsStyling:false,
        customClass:{
          popup: 'popup-users',
          title: 'title-users',
          input: 'input-users',
          validationMessage: 'validationMessage-users',
          actions: 'actions-users',
          confirmButton: 'confirmButton-users',
        },
        inputPlaceholder:
            `Seguro deseas darle nuevamente acceso a${name?(" "+ name):"l Usuario"}?`,
        confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'Necesitas confirmar que quieres darle acceso nuevamente'
        }
        })
        if (accept) {
            axios.put(BAN_USER,{
                id:id,
                boolean:!boolean
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                  popup: 'popup-final-confirm',
                  title: 'title-final-confirm',
                  input: 'input-confirm',
                  confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`El Usuario puede acceder nuevamente!`,
                icon:"success",
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
                  title:"Hubo un problema al darle acceso"
                })
              })
        }
    }
    if(!boolean && !rol && !entry && !pass){
        const { value: accept } = await Swal.fire({
        title: 'BAN',
        input: 'checkbox',
        inputValue: 0,
        buttonsStyling:false,
        customClass:{
          popup: 'popup-users',
          title: 'title-users',
          input: 'input-users',
          validationMessage: 'validationMessage-users',
          actions: 'actions-users',
          confirmButton: 'confirmButton-users',
        },
        inputPlaceholder:
            `Seguro deseas prohibirle el acceso a${name?(" "+ name):"l Usuario"}?`,
        confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'Si no deseas realizar esta acción solo da click fuera del recuadro'
        }
        })
        if (accept) {
            axios.put(BAN_USER,{
                id:id,
                boolean:!boolean
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                  popup: 'popup-final-confirm',
                  title: 'title-final-confirm',
                  input: 'input-confirm',
                  confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`El Usuario ha sido baneado!`,
                icon:"success",
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
                  title:"Hubo un problema al banear al usuario"
                })
              })
        }
    }
    if(rol && !boolean){
        //aca habria que hacer un mapeo de los roles
        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                'user': 'Usuario',
                'admin': 'Administrador',
                'guest': 'Invitado'
              })
            }, 1000)
          })
          
        const { value: action } = await Swal.fire({
            title: 'Que rol deseas asignarle al Usuario?',
            input: 'radio',
            inputOptions: inputOptions,
            buttonsStyling:false,
            customClass:{
              popup: 'popup-users',
              title: 'title-users',
              input: 'input-users',
              validationMessage: 'validationMessage-users',
              actions: 'actions-users',
              confirmButton: 'confirmButton-users',
            },
            inputValidator: (value) => {
              if (!value) {
                return 'Necesitas designarle un rol!'
              }
            }
          })
          
          if (action === "user") {
            axios.put(CHANGE_ROL,{
                id:id,
                role:"user",
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                  popup: 'popup-final-confirm',
                  title: 'title-final-confirm',
                  input: 'input-confirm',
                  confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"success",
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
                  title:"Hubo un problema"
                })
              })
          }
          if (action === "admin") {
            axios.put(CHANGE_ROL,{
                id:id,
                role:"admin",
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                  popup: 'popup-final-confirm',
                  title: 'title-final-confirm',
                  input: 'input-confirm',
                  confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"success",
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
                  title:"Hubo un problema"
                })
              })
          }
          if (action === "guest") {
            axios.put(CHANGE_ROL,{
                id:id,
                role:"guest",
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                  popup: 'popup-final-confirm',
                  title: 'title-final-confirm',
                  input: 'input-confirm',
                  confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"success",
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
                  title:"Hubo un problema"
                })
              })
          }
    }
    if(pass && !rol && !boolean){
      const { value: reset } = await Swal.fire({
        title: 'Reset Pass',
        input: 'checkbox',
        inputValue: 0,
        buttonsStyling:false,
        customClass:{
          popup: 'popup-users',
          title: 'title-users',
          input: 'input-users',
          validationMessage: 'validationMessage-users',
          actions: 'actions-users',
          confirmButton: 'confirmButton-users',
        },
        inputPlaceholder:
            `Seguro deseas resetear la contraseña del Usuario`,
        confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'Necesitas confirmar que quieres resetear la contraseña'
        }
        })
        if (reset) {
            axios.put(RESET_PASSWORD,{
                id:id
            })
            .then((res)=>{
              refreshAfterAction()
              Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                  popup: 'popup-final-confirm',
                  title: 'title-final-confirm',
                  input: 'input-confirm',
                  confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`Contraseña cambiada`,
                html:`Contraseña por default: "${res.data}"`,
                icon:"success",
              })
            })
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
                  title:"No se pudo actualizar"
              })
            })
        }
    }
}