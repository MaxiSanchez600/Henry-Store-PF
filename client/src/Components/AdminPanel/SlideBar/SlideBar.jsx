import React, { useState } from "react";
import './SlideBar.scss'
import { Link } from "react-router-dom";
import henry from "../../../Assets/images/Logo_H_white.png"

function SlideBar (){
    return(
        <div className='slideBarContainer'>
            <div>
                <img className='profilePic' src={henry}></img>
                <h3>Resumen</h3>
                <ul>
                    <li>Estadisticas</li>
                    <li>Ventas</li>
                </ul>
                <h3>Productos</h3>
                <ul>
                    <Link to='/admin/createProduct'><li>Crear un producto</li></Link>
                    <Link to='/admin/products'><li>Panel de Productos</li></Link>
                </ul>
                <h3>Categorias</h3>
                <ul>
                    <li>Crear categorias</li>
                    <li>Listado de categorias</li>
                </ul>
                <h3>Ordenes</h3>
                <ul>
                    <li>Todas las ordenes</li>
                    <li>Por despachar</li>
                </ul>
                <h3>Usuarios</h3>
                <ul>
                <Link to='/admin/users'><li>Panel de Usuarios</li></Link>
                </ul>
            </div>
        </div>
        
    )
}


export default SlideBar;