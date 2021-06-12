import React from 'react'
import Logo_Henry_black from '../../Assets/images/Logo_Henry_black.png'


function Header() {
    return (
        <div className="content header">
           <img src={Logo_Henry_black} alt="" width="200px" srcset="" />
           <div>Crea tu cuenta</div>
           <div>Ingresa</div>
           <div>Mis compras</div>
        </div>
    )
}

export default Header
