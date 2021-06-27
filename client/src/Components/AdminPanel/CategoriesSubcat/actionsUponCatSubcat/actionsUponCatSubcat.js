import Swal from 'sweetalert2'
import axios from 'axios'
import {GET_CATEGORIES, PROD_SUBCATEGORIES} from "../../../../Config/index"

export async function addCategory (resetfunc) {
    const { value: name } = await Swal.fire({
    title: 'Nueva categoría',
    input: 'text',
    inputLabel: 'Ingrese el nombre para la nueva categoría',
    inputValidator: (value) => {
        if (!value) {
        return 'Necesitas darle un nombre!'
        }
    }
    })

    if (name) {
        axios.post(GET_CATEGORIES,{
            category: name
        })
        .then(()=>{
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Categoría creada"
            })
        })
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
}

export async function editCategory (resetfunc, id, setcard, card) {
    const { value: cat } = await Swal.fire({
    title: 'Modificar valor',
    input: 'text',
    inputLabel: 'Ingrese el nuevo nombre para la categoría',
    inputValidator: (value) => {
        if (!value) {
        return 'Necesitas darle un nombre!'
        }
    }
    })
    if (cat) {
        setcard({
            ...card,
            title:cat
        })
        axios.put(GET_CATEGORIES,{
            name: cat,
            id: id,
        })
        .then(()=>{
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Categoria Modificada"
            })
        })
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
}

export async function deleteCategory (resetfunc, id_cat,setcard,initial) {
    const { value: accept } = await Swal.fire({
        title: 'Eliminar categoría',
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder:
          'Estas seguro que deseas eliminar esta categoría? Todos los productos con ella quedaran desconectados!',
        confirmButtonText:
          'Continue <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
          return !result && 'Necesitas confirmar que quieres eliminarla!'
        }
      })
      
      if (accept) {
        setcard(initial)
        axios.delete(GET_CATEGORIES,{
            data:{
                id : id_cat
            }
        })
        .then(()=>{
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Categoría eliminada"
            })
        })
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
    
}

export async function editSubCategory (resetfunc, id) {
    const { value: subcat } = await Swal.fire({
    title: 'Modificar valor',
    input: 'text',
    inputLabel: 'Ingrese el nuevo nombre para la subcategoría',
    inputValidator: (value) => {
        if (!value) {
        return 'Necesitas darle un nombre!'
        }
    }
    })

    if (subcat) {
        axios.put(PROD_SUBCATEGORIES,{
            name: subcat,
            idSubcat: id,
        })
        .then(()=>{
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Subcategoria Modificada"
            })
        })
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
}

export async function addsubCategory (resetfunc,idcat) {
    const { value: namesubcat } = await Swal.fire({
    title: 'Nueva subcategoría',
    input: 'text',
    inputLabel: 'Ingrese el nombre para la nueva subcategoría',
    inputValidator: (value) => {
        if (!value) {
        return 'Necesitas darle un nombre!'
        }
    }
    })

    if (namesubcat) {
        axios.post(PROD_SUBCATEGORIES,{
            nameSubcat: namesubcat,
            id_category : idcat
        })
        .then(()=>{
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Subcategoría creada"
            })
        })
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
}

export async function deleteSubCategory (resetfunc, id_subcat) {
    const { value: accept } = await Swal.fire({
        title: 'Eliminar subcategoría',
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder:
          'Estas seguro que deseas eliminar esta subcategoría? Todos los productos con ella quedaran desconectados!',
        confirmButtonText:
          'Continue <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
          return !result && 'Necesitas confirmar que quieres eliminarla!'
        }
      })
      
      if (accept) {
        axios.delete(PROD_SUBCATEGORIES,{
            data:{
                id_subcat : id_subcat
            }
        })
        .then(()=>{
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Subcategoría eliminada"
            })
        })
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
    
}
