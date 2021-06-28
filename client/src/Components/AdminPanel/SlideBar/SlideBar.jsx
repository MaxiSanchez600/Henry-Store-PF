import React, { useEffect } from "react";
import './SlideBar.scss'
import { Link } from "react-router-dom";
import henry from "../../../Assets/Images/Logo_H_white.png"

function SlideBar (){

    return(
        <div className='slideBarContainer'>
            <div>
                <img className='profilePic' alt="notfound" src={henry}></img>
                <h3>Resumen</h3>
                <ul>
                <Link to='/admin'><li>Estadisticas</li></Link>
                    <li>Ventas</li>
                </ul>
                <h3>Productos</h3>
                <ul>
                    <Link to='/admin/createProduct'><li>Crear un producto</li></Link>
                    <Link to='/admin/products'><li>Panel de Productos</li></Link>
                </ul>
                <h3>Categorias y Subcategorias</h3>
                <ul>
                <Link to='/admin/categories'><li>Panel general</li></Link>
                </ul>
                <h3>Ordenes</h3>
                <ul>
                    <Link to='/admin/orders'><li>Todas las ordenes</li></Link>
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