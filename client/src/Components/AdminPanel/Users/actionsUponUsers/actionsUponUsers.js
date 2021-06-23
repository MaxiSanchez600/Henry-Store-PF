import Swal from 'sweetalert2'
import { BAN_USER, CHANGE_ROL, RESET_PASSWORD} from "../../../../Config/index"
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
                  'pass':'Resetear su contraseña'
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
              popup: 'popup',
              title: 'title',
              input: 'input',
              validationMessage: 'validationMessage',
              actions: 'actions',
              confirmButton: 'confirmButton',
            },
            confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',
            inputValidator: (value) => {
              if (!value) {
                return 'Necesitas elegir una acción!'
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
    }
    if(boolean && !rol && !entry && !pass){
        const { value: accept } = await Swal.fire({
        title: 'UNBAN',
        input: 'checkbox',
        inputValue: 1,
        buttonsStyling:false,
        customClass:{
          popup: 'popup',
          title: 'title',
          input: 'input',
          validationMessage: 'validationMessage',
          actions: 'actions',
          confirmButton: 'confirmButton',
        },
        inputPlaceholder:
            `Seguro deseas darle nuevamente acceso a${name?(" "+ name):"l Usuario"}?`,
        confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'Si no deseas realizar esta acción solo da click fuera del recuadro :)'
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
                customClass:{
                  popup: 'popup-final',
                  title: 'title-final',
                  input: 'input',
                  validationMessage: 'validationMessage',
                  actions: 'actions',
                  confirmButton: 'confirmButton',
                },
                buttonsStyling:false,
                title:`El Usuario puede acceder nuevamente!`,
                icon:"success",
              })})
        }
    }
    if(!boolean && !rol && !entry && !pass){
        const { value: accept } = await Swal.fire({
        title: 'BAN',
        input: 'checkbox',
        inputValue: 1,
        buttonsStyling:false,
        customClass:{
          popup: 'popup',
          title: 'title',
          input: 'input',
          validationMessage: 'validationMessage',
          actions: 'actions',
          confirmButton: 'confirmButton',
        },
        inputPlaceholder:
            `Seguro deseas prohibirle el acceso a${name?(" "+ name):"l Usuario"}?`,
        confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'Si no deseas realizar esta acción solo da click fuera del recuadro :)'
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
                customClass:{
                  popup: 'popup-final',
                  title: 'title-final',
                  input: 'input',
                  validationMessage: 'validationMessage',
                  actions: 'actions',
                  confirmButton: 'confirmButton',
                },
                buttonsStyling:false,
                title:`El Usuario ha sido baneado!`,
                icon:"success",
              })})
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
              popup: 'popup',
              title: 'title',
              input: 'input',
              validationMessage: 'validationMessage',
              actions: 'actions',
              confirmButton: 'confirmButton',
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
                customClass:{
                  popup: 'popup-final',
                  title: 'title-final',
                  input: 'input',
                  validationMessage: 'validationMessage',
                  actions: 'actions',
                  confirmButton: 'confirmButton',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"success",
              })})
          }
          if (action === "admin") {
            axios.put(CHANGE_ROL,{
                id:id,
                role:"admin",
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                customClass:{
                  popup: 'popup-final',
                  title: 'title-final',
                  input: 'input',
                  validationMessage: 'validationMessage',
                  actions: 'actions',
                  confirmButton: 'confirmButton',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"sucess",
              })})
          }
          if (action === "guest") {
            axios.put(CHANGE_ROL,{
                id:id,
                role:"guest",
            })
            .then(()=>{
              refreshAfterAction()
              Swal.fire({
                customClass:{
                  popup: 'popup-final',
                  title: 'title-final',
                  input: 'input',
                  validationMessage: 'validationMessage',
                  actions: 'actions',
                  confirmButton: 'confirmButton',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"success",
              })})
          }
    }
    if(pass && !rol && !boolean){
      const { value: reset } = await Swal.fire({
        title: 'Reset Pass',
        input: 'checkbox',
        inputValue: 1,
        buttonsStyling:false,
        customClass:{
          popup: 'popup',
          title: 'title',
          input: 'input',
          validationMessage: 'validationMessage',
          actions: 'actions',
          confirmButton: 'confirmButton',
        },
        inputPlaceholder:
            `Seguro deseas resetear la contraseña del Usuario`,
        confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'Si no deseas realizar esta acción solo da click fuera del recuadro :)'
        }
        })
        if (reset) {
            axios.put(RESET_PASSWORD,{
                id:id
            })
            .then((res)=>{
              refreshAfterAction()
              Swal.fire({
                customClass:{
                  popup: 'popup-final',
                  title: 'title-final',
                  input: 'input',
                  validationMessage: 'validationMessage',
                  actions: 'actions',
                  confirmButton: 'confirmButton',
                },
                buttonsStyling:false,
                title:`Contraseña cambiada`,
                html:`Contraseña por default: "${res.data}"`,
                icon:"success",
              })
            })
        }
    }
}