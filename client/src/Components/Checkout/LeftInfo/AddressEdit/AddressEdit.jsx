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
    const [addressSelected, setaddressSelected] = React.useState()
    const [openAdd, setopenAdd] = React.useState(false)
    const [openRename, setopenRename] = React.useState(false)
    const [idEdit, setidEdit] = React.useState()
    //false => add direc
    //true => edit direc 
    const goBack = (() =>{
        volverClick(residenciaSelected)
    })

    const goNext = (() =>{
        alert("Paga")
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
         if(showAdd !== undefined){
            setidEdit(id)
         }
         else{
            setidEdit(undefined)
         }
         setopenAdd(!openAdd)
     })

    return(
        <div className = 'AddressEdit_Conteiner'>
            {(UserAddresses.length === 0) ? <h1 className = "H1Elegi_AddressEdit" >Actualmente no tenes direcciones cargadas, pero podes cargar una.</h1>:
            <h1 className = "H1Elegi_AddressEdit">Elige una de tus <span>direcciones</span></h1>}
            <div className = "AddressesConteiner_AddresEdit">
                {UserAddresses.map(address => <AddressUserList showRename = {showAdd} useraddress = {address} clickEvent = {clickAddress} addressSelected = {addressSelected}/>)}
            </div>
            <p onClick = {() => showAdd()} className = "Anadir_AddressEdit">Añadir una <span>nueva</span></p>
            {openAdd && ((idEdit !== undefined) ? <ADDAddress paisid = {residenciaSelected} idEdit = {idEdit} showAdd = {showAdd}/> : <ADDAddress paisid = {residenciaSelected} showAdd = {showAdd}/>)}
            <div className ='Buttons_AddressEdit'>
                <button onClick = {goBack} className = 'ButtonVolver_AddressEdit'>Volver</button>
                <button onClick = {goNext} className = 'ButtonNext_AddressEdit'>Pagar</button>
            </div>
        </div>
    )
}