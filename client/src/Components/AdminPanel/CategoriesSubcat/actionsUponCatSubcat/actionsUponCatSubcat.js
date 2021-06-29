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
        .catch(()=>{
          Swal.fire({
            icon:"error",
            title:"Hubo un problema"
          })
        })
    
    }
}

export async function addsubCategory (resetfunc,card,setCard) {
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
            id_category : card.idcat
        })
        .then(()=>{
          return axios.get(`${PROD_SUBCATEGORIES}?id_category=${card.idcat}`)
        })
        .then((response)=>{
            setCard({
              ...card,
              subcat: response.data
            })
            resetfunc(true)
            Swal.fire({
                icon:"success",
                title: "Subcategoria Modificada"
            })
        })
        .catch(()=>{
          Swal.fire({
            icon:"error",
            title:"Hubo un problema"
          })
        })
    
    }
}

export async function actionsCategory (resetfunc, id, setcard, card, initial){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'edit': 'Editar categoría',
            'delete': 'Eliminar categoría',
          })
        }, 1000)
      })
      const { value: action } = await Swal.fire({
        title: 'Que acción deseas realizar?',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas elegir una opción!'
          }
        }
      })
      
      if (action==='edit') {
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
                .catch(()=>{
                  Swal.fire({
                    icon:"error",
                    title:"Hubo un problema"
                  })
                })
            
            }
      }
      if(action==='delete'){
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
                    id : id
                }
            })
            .then(()=>{
                resetfunc(true)
                Swal.fire({
                    icon:"success",
                    title: "Categoría eliminada"
                })
            })
            .catch(()=>{
              Swal.fire({
                icon:"error",
                title:"Hubo un problema"
              })
            })
          }
      }
}

export async function actionsSubcategory (resetfunc, id,card,setCard){
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'edit': 'Editar subcategoría',
            'delete': 'Eliminar subcategoría',
          })
        }, 1000)
      })
      const { value: action } = await Swal.fire({
        title: 'Que acción deseas realizar?',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas elegir una opción!'
          }
        }
      })
      
      if (action==='edit') {
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
                  return axios.get(`${PROD_SUBCATEGORIES}?id_category=${card.idcat}`)
                })
                .then((response)=>{
                    setCard({
                      ...card,
                      subcat: response.data
                    })
                    resetfunc(true)
                    Swal.fire({
                        icon:"success",
                        title: "Subcategoria Modificada"
                    })
                })
                .catch(()=>{
                  Swal.fire({
                    icon:"error",
                    title:"Hubo un problema"
                  })
                })
            
            }
      }
      if(action==='delete'){
        const { value: accept } = await Swal.fire({
            title: 'Eliminar subcategoría',
            input: 'checkbox',
            inputValue: 0,
            inputPlaceholder:
              'Estas seguro que deseas eliminar esta subcategoría? Todos los productos con ella quedaran desconectados!',
            confirmButtonText:
              'Continuar <i class="fa fa-arrow-right"></i>',
            inputValidator: (result) => {
              return !result && 'Necesitas confirmar que quieres eliminarla!'
            }
          })
          
          if (accept) {
            axios.delete(PROD_SUBCATEGORIES,{
                data:{
                    id_subcat : id
                }
            })
            .then(()=>{
              return axios.get(`${PROD_SUBCATEGORIES}?id_category=${card.idcat}`)
            })
            .then((response)=>{
                setCard({
                  ...card,
                  subcat: response.data
                })
                resetfunc(true)
                Swal.fire({
                    icon:"success",
                    title: "Subcategoria eliminada"
                })
            })
            .catch(()=>{
              Swal.fire({
                icon:"error",
                title:"Hubo un problema"
              })
            })
          }
      }
}