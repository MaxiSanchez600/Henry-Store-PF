import React, {useState} from "react";
import './SlideBar.scss'
import { Link } from "react-router-dom";
import henry from "../../../Assets/Images/Logo_H_white.png"
import { 
    BsGraphUp, 
    BsBookmarkCheck, 
    BsGear, 
    BsCommand, 
    BsFiles,
    BsFileText,
    BsShuffle,
    BsPeople,
 } from "react-icons/bs";
 import { IoMdArrowRoundBack } from "react-icons/io";
function SlideBar (){
    const [pageActive, setPageActive] = useState('Estadisticas')

    const changePage = (e)=>{
        setPageActive(e.target.outerText)
    }

    return(
        <div className='slideBarContainer'>
            <Link to='/home'><button className='backButton'><IoMdArrowRoundBack size='30px'/></button></Link>
            <div className="slideBarWraper">
                <h2>Admin Panel</h2>
                <img className='profilePic' alt="notfound" src={henry}></img>
                <div className="slideBarMenu">
                    
                    <h3>Resumen</h3>
                    <ul>
                        <Link to='/admin'><li className={pageActive === 'Estadisticas' ? "active" : "unactive"} onClick={changePage}><BsGraphUp className='iconLi'/>Estadisticas</li></Link>
                       {/*  <li className={pageActive === 'Ventas' ? "active" : "unactive"} onClick={changePage}><BsBookmarkCheck className='iconLi'/>Ventas</li> */}
                    </ul>
            
                    <h3>Productos</h3>
                    <ul>
                        <Link to='/admin/createProduct'><li className={pageActive === 'Crear un producto' ? "active" : "unactive"} onClick={changePage}><BsGear className='iconLi'/>Crear un producto</li></Link>
                        <Link to='/admin/products'><li className={pageActive === 'Panel de Productos' ? "active" : "unactive"} onClick={changePage}><BsCommand className='iconLi'/>Panel de Productos</li></Link>
                    </ul>
                    <h3>Categorias</h3>
                    <ul>
                        <Link to='/admin/categories'><li className={pageActive === 'Panel general' ? "active" : "unactive"} onClick={changePage}><BsFiles className='iconLi'/>Panel general</li></Link>
                    </ul>
                    <h3>Ordenes</h3>
                    <ul>
                        <Link to='/admin/orders'><li className={pageActive === 'Todas las ordenes' ? "active" : "unactive"} onClick={changePage}><BsFileText className='iconLi'/>Todas las ordenes</li></Link>
                        <li className={pageActive === 'Por despachar' ? "active" : "unactive"} onClick={changePage}><BsShuffle className='iconLi'/>Por despachar</li>
                    </ul>
                    <h3>Usuarios</h3>
                    <ul>
                    <Link to='/admin/users'><li className={pageActive === 'Panel de Usuarios' ? "active" : "unactive"} onClick={changePage}><BsPeople className='iconLi'/>Panel de Usuarios</li></Link>
                    </ul>
                </div>
            </div>
            
        </div>
        
    )
}


export default SlideBar;