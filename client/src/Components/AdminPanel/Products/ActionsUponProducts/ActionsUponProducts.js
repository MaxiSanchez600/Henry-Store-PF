import axios from "axios";
import Swal from 'sweetalert2';
import "./ActionsUponProducts.scss"
import { DELETE_PRODUCT, workspace } from "../../../../Config";

export async function actionsUponProducts (idProd,reset) {
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'edit': 'Editar producto',
            'stock': 'Modificar stock',
            'delete':'Eliminar producto'
          })
        }, 1000)
      })
      
      const { value: action } = await Swal.fire({
        title: 'Que acción deseas realizar?',
        input: 'radio',
        inputOptions: inputOptions,
        buttonsStyling:false,
        customClass:{
          popup: 'popup-products',
          title: 'title-products',
          input: 'input-products',
          validationMessage: 'validationMessage-products',
          actions: 'actions-products',
          confirmButton: 'confirmButton-products',
        },
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
            title: 'Ingrese nueva cantidad de stock',
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
      if (action === 'delete') {
        const { value: confirm } = await Swal.fire({
          title: 'Eliminar producto',
          input: 'checkbox',
          inputValue: 0,
          buttonsStyling:false,
          customClass:{
            popup: 'popup-products-delete',
            title: 'title-products',
            input: 'input-products',
            validationMessage: 'validationMessage-products',
            actions: 'actions-products',
            confirmButton: 'confirmButton-products',
          },
          inputPlaceholder:
            'Seguro desea eliminar este producto?',
          confirmButtonText:
            'Continuar <i class="fa fa-arrow-right"></i>',
          inputValidator: (result) => {
            return !result && 'Necesitas confirmar para eliminarlo'
          }
        })
        
        if (confirm) {
          axios.delete(DELETE_PRODUCT,{
              data:{id: idProd}
          })
          .then(()=>{
            reset(true)
            Swal.fire({
            buttonsStyling:false,
            iconColor: "#49AF41",
            customClass:{
              popup: 'popup-products-success',
              title: 'title-products-success',
              input: 'input-products-success',
              confirmButton: 'confirmButton-products-success',
            },
            icon:"success",
            title:"Producto eliminado"
          })})
          .catch(()=>{
            Swal.fire({
              buttonsStyling:false,
              iconColor: "#F64749",
              customClass:{
              popup: 'popup-products-error',
              title: 'title-products-error',
              input: 'input-products-error',
              confirmButton: 'confirmButton-products-error',
              },
              icon:"error",
              title:"No se pudo eliminar",
            })
          })
        }
      }
}