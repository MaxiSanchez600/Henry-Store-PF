import Swal from 'sweetalert2'
import axios from 'axios'
import {GET_CATEGORIES, PROD_SUBCATEGORIES} from "../../../../Config/index"

export async function addCategory (resetfunc) {
    const { value: name } = await Swal.fire({
    title: 'Nueva categoría',
    input: 'text',
    buttonsStyling:false,
    iconColor: "#F64749",
    showCancelButton:false,
    inputPlaceholder:'Ingrese un nombre para la categoría',
    inputLabel:false,
    confirmButtonText:'Agregar',
    customClass:{
        popup:'popCreate',
        title:'titlePopCreate',
        confirmButton:'confirmBtnCreate',
        input:'inputPopCreate',
    },
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
                title: "Categoría creada",
                showConfirmButton: false,
                timer: 1400
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
    showCancelButton:false,
    inputPlaceholder:'Ingrese un nombre para la subcategoría',
    inputLabel:false,
    confirmButtonText:'Agregar',
    customClass:{
        popup:'popCreate',
        title:'titlePopCreate',
        confirmButton:'confirmBtnCreate',
        input:'inputPopCreate',
    },
    inputValidator: (value) => {
        if (!value) {
        return 'Debe digitar un nombre!'
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
                title: "Subcategoria creada con éxito",
                showConfirmButton: false,
                timer: 1400
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
        title: '¿Que acción deseas realizar?',
        input: 'radio',
        inputOptions: inputOptions,
        confirmButtonText:'Ok',
        customClass:{
            popup:'popCreate',
            title:'titlePopCreate',
            confirmButton:'confirmBtnCreate', 
        },
        inputValidator: (value) => {
          if (!value) {
            return 'Necesitas elegir una opción!'
          }
        }
      })
      
      if (action==='edit') {
          const { value: cat } = await Swal.fire({
            title: 'Modificar categoría',
            input: 'text',
            inputPlaceholder:'Digite el nuevo nombre para la categoría',
            inputLabel:false,
            confirmButtonText:'Modificar',
            customClass:{
                popup:'popCreate',
                title:'titlePopCreate',
                confirmButton:'confirmBtnCreate',
                input:'inputPopCreate',
            },
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
                        title: "Categoria Modificada",
                        showConfirmButton: false,
                        timer: 1400
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
            buttonsStyling:false,
            inputPlaceholder:'¿Estas seguro que deseas eliminar esta categoría? Todos los productos con ella quedaran desconectados',
            confirmButtonText:'Eliminar',
            showCancelButton:true,
            cancelButtonText:'CANCELAR',
            customClass:{
                popup:'popCreate',
                title:'titlePopCreate',
                confirmButton:'confirmBtnDelete',
                cancelButton:'confirmBtnCreate',
            },
            inputValidator: (result) => {
              return !result && '¡Necesitas confirmar que quieres eliminarla!'
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
        title: '¿Que acción deseas realizar?',
        inputLabel:false,
        customClass:{
            popup:'popCreate',
            title:'titlePopCreate',
            confirmButton:'confirmBtnCreate',
            
        },
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return '¡Debe elegir una opción!'
          }
        }
      })
      
      if (action==='edit') {
        const { value: subcat } = await Swal.fire({
            title: 'Modificar subcategoría',
            input: 'text',
            inputPlaceholder:'Digite el nombre para la subcategoría',
            inputLabel:false,
            confirmButtonText:'Modificar',
            customClass:{
                popup:'popCreate',
                title:'titlePopCreate',
                confirmButton:'confirmBtnCreate',
                input:'inputPopCreate',
            },
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
                        title: "Subcategoria Modificada",
                        showConfirmButton: false,
                        timer: 1400
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
            buttonsStyling:false,
            inputPlaceholder:
              '¿Estas seguro que deseas eliminar esta subcategoría? Todos los productos con ella quedaran desconectados!',
              confirmButtonText:'Eliminar',
              showCancelButton:true,
              cancelButtonText:'CANCELAR',
              customClass:{
                  popup:'popCreate',
                  title:'titlePopCreate',
                  confirmButton:'confirmBtnDelete',
                  cancelButton:'confirmBtnCreate',
              },
            inputValidator: (result) => {
              return !result && 'Debe confirmar que desea eliminarla!'
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
                    title: "Subcategoria eliminada",
                    showConfirmButton: false,
                    timer: 1400
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