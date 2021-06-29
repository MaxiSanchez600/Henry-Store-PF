import axios from "axios";
import Swal from 'sweetalert2';
import { workspace } from "../../../../Config";

export async function actionsUponProducts (idProd,reset) {
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'edit': 'Editar producto',
            'stock': 'Modificar su stock',
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
      
      if (action === 'edit') {
        window.location =`editProduct/${idProd}`
      }
      if (action === 'stock') {
        const { value: number } = await Swal.fire({
            title: 'Ingrese nuevo valor de stock para el producto',
            input: 'number',
            inputValidator: (value) => {
              if (!value) {
                return 'Solo puedes ingresar valores numéricos!'
              }
            }
          })
          if (number) {
            axios.put(`${workspace}/product/stock`,{
              id: idProd,
              newstock: number
            })
            .then(()=>{
              reset(true)
              Swal.fire({
                icon:"success",
                title:`Stock renovado`,
                text:`${number} Unid. disponibles` 
            })
            })
            .catch(()=>{
              Swal.fire({
                icon:"error",
                title:`Error en cambio de stock`,
            })
            })
            
          }
      }
}