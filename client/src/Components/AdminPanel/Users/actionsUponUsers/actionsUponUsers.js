import Swal from 'sweetalert2'
import { BAN_USER} from "../../../../Config/index"
import axios from 'axios'


export default async function actionsUponUsers(name, id, boolean, rol, entry) {
    if(entry){
        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                'ban': (boolean?"Autorizar acceso del Usuario":"Prohibir acceso al Usuario"),
                'rol': 'Cambiar su rol',
              })
            }, 1000)
          })
          
        const { value: action } = await Swal.fire({
            title: 'Que acción deseas realizar?',
            input: 'radio',
            inputOptions: inputOptions,
            inputValidator: (value) => {
              if (!value) {
                return 'Necesitas elegir una acción!'
              }
            }
          })
          
          if (action === "ban") {
            console.log(action)
            entry=false
            actionsUponUsers(name, id, boolean,rol,entry)
          }
          if (action === "rol") {
            console.log(action)
            entry=false
            actionsUponUsers(name, id, null,rol,entry)
          }
    }
    if(boolean){
        const { value: accept } = await Swal.fire({
        title: 'UNBAN',
        input: 'checkbox',
        inputValue: 1,
        inputPlaceholder:
            `Seguro deseas darle nuevamente el acceso a ${name}`,
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
            .then(Swal.fire(`El usuario puede acceder nuevamente`))
        }
    }
    if(!boolean){
        const { value: accept } = await Swal.fire({
        title: 'BAN',
        input: 'checkbox',
        inputValue: 1,
        inputPlaceholder:
            `Seguro deseas prohibirle el acceso al Usuario?`,
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
            .then(Swal.fire(`El usuario a sido baneado!`))
        }
    }
    // if(rol){
        
    // }
}