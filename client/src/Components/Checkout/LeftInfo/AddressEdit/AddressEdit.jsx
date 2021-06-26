import React, { useEffect } from 'react'
import "./AddressEdit.scss"
import {GET_USER_ADDRESS} from '../../../../Config/index.js'
import axios from 'axios';
import AddressUserList from "./AddressUserList/AddressUserList.jsx"
import ADDAddress from './ADDAddress/ADDAddress';
import RENAMEAddress from './RENAMEAddress/RENAMEAddress';

export default function AddressEdit({nextClick, volverClick, residenciaSelected}){
    const iduser = (localStorage.getItem('userlogged') !== null) ? localStorage.getItem('userlogged') : (localStorage.getItem('userid') !== null) && localStorage.getItem('userid');
    const [UserAddresses, setUserAddresses] = React.useState([])
    const [addressSelected, setaddressSelected] = React.useState(undefined)
    const [openAdd, setopenAdd] = React.useState(false)
    const [openRename, setopenRename] = React.useState(false)
    const [idEdit, setidEdit] = React.useState(undefined)
    //false => add direc
    //true => edit direc 

    const goBack = (() =>{
        volverClick(residenciaSelected)
    })

    const goNext = (() =>{
        if(addressSelected !== undefined){
            alert("Direccion seleccionada, proceso de pago")
        }
        else{
            alert("Selecciona una direccion")
        }
    })

    useEffect(() =>{
        axios.get(GET_USER_ADDRESS + `/?userid=${iduser}`)
        .then(value =>{
            setUserAddresses(value.data)
        })
        .catch(error =>{
            alert(error)
        })
    }, [])


     const clickAddress = ((idaddress) =>{
        if(idaddress === addressSelected){
            setaddressSelected()
        }
        else{
            setaddressSelected(idaddress)
        }
     })

     const showAdd = ((id) =>{
         if(id !== undefined && idEdit !== undefined){
             console.log("caso1")
            if(id === idEdit){
                setidEdit(undefined)
                setopenAdd(!openAdd)
            }
            else{
                setidEdit(id)
            }
         }
         else if(id === undefined && idEdit !== undefined){
            console.log("caso2")
            setidEdit(undefined)
         }
         else if(id !== undefined && idEdit === undefined && openAdd){
            console.log("caso3")
            setidEdit(id)
         }
         else if(id !== undefined && idEdit === undefined && !openAdd){
            console.log("caso4")
            setidEdit(id)
            setopenAdd(true)
         }
         else{
            if(id !== undefined){
                console.log("caso5")
                setidEdit(id)
             }
             else{
                console.log("caso6")
                setidEdit(undefined)
             }
             setopenAdd(!openAdd)
         }
     })

     const onClose = (() =>{
         setidEdit(undefined)
         setopenAdd(false)
     })
     
     const updateAddress = (() =>{
        axios.get(GET_USER_ADDRESS + `/?userid=${iduser}`)
        .then(value =>{
            setUserAddresses(value.data)
        })
        .catch(error =>{
            alert(error)
        })
     })

    return(
        <div className = 'AddressEdit_Conteiner'>
            {(UserAddresses.length === 0) ? <h1 className = "H1Elegi_AddressEdit" >Actualmente no tenes direcciones cargadas, pero podes cargar una.</h1>:
            <h1 className = "H1Elegi_AddressEdit">Elige una de tus <span>direcciones</span></h1>}
            <div className = "AddressesConteiner_AddresEdit">
                {UserAddresses.map(address => <AddressUserList showRename = {showAdd} useraddress = {address} clickEvent = {clickAddress} addressSelected = {addressSelected}/>)}
            </div>
            <p onClick = {() => showAdd()} className = "Anadir_AddressEdit">Añadir una <span>nueva</span></p>
            {/* {openAdd && ((idEdit !== undefined) ? <ADDAddress updateAddress = {updateAddress} paisid = {residenciaSelected} idEdit = {idEdit} showAdd = {showAdd}/> : <ADDAddress updateAddress = {updateAddress} paisid = {residenciaSelected} showAdd = {showAdd}/>)} */}
            {(openAdd && (idEdit !== undefined)) && <ADDAddress onClose = {onClose} updateAddress = {updateAddress} paisid = {residenciaSelected} idEdit = {idEdit} showAdd = {showAdd}/>}
            {(openAdd && (idEdit === undefined)) && <ADDAddress onClose = {onClose} updateAddress = {updateAddress} paisid = {residenciaSelected} showAdd = {showAdd}/>}
            <div className ='Buttons_AddressEdit'>
                <button onClick = {goBack} className = 'ButtonVolver_AddressEdit'>Volver</button>
                <button onClick = {goNext} className = 'ButtonNext_AddressEdit'>Pagar</button>
            </div>
        </div>
    )
}