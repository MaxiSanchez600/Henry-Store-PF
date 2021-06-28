import React, { useEffect } from 'react'
import "./AddressUserList.scss"

export default function AddressUserList({useraddress, clickEvent, addressSelected, showRename}){
    const [useraddressSelect, setuseraddressSelect] = React.useState(null)

    const clickAddress = (() =>{
        clickEvent(useraddress.id)
    })

    const editClick = (() =>{
        showRename(useraddress.id)
    })

    useEffect(() =>{
        if(addressSelected === useraddress.id){
            //Activo la clase
            document.getElementById(useraddress.id).classList.add("active_AddressUserList") 
        }
        else{
            //Se la saco
            document.getElementById(useraddress.id).classList.remove("active_AddressUserList") 
        }
    })


    return(
        <div className = "InfoConteiner_AddressUserList" id = {useraddress.id} onClick = {clickAddress}>
            <div>
                <h1 className = "H1_AddressUserList">{useraddress.direccion} {useraddress.numerodireccion}</h1>
                <h2 className = "H2_AddressUserList">{useraddress.province}({useraddress.postal_code}), {useraddress.localidad}</h2>
                <h3 className = "H3_AddressUserList">{useraddress.phone_contact}</h3>
                <p className = "P_AddressUserList">{useraddress.description}</p>
            </div>
            <h3 className = "Edit_AddressUserList" onClick = {editClick}>Editar</h3>
        </div>
    )
}