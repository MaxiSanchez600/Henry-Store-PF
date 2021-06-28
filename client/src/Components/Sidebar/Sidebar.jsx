import React from 'react';
import { useGlobalContext } from "../../context";
import { Link } from 'react-router-dom';
import './SlideBar.scss';
import { BsPersonFill } from "react-icons/bs";
import {FaTimes,FaHome,} from 'react-icons/fa';
import { RiAdminFill,RiLogoutCircleRLine } from "react-icons/ri";
import {setUSerLogin} from "../../Redux/actions/actionsUsers";
import { useDispatch} from 'react-redux';
import { useFirebaseApp } from "reactfire";
import Swal from 'sweetalert2';
import {  useSelector } from 'react-redux';
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiCoin } from "react-icons/bi";

const Sidebar = () => {

  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  const dispatch = useDispatch();

  const firebase = useFirebaseApp();

  const logOut = async () => {
    Swal.fire({
      title:'Sesión Cerrada',
      icon:'success',
      showConfirmButton: false,
      timer:1000
    })
    await firebase.auth().signOut();
     dispatch(setUSerLogin({}))
     localStorage.removeItem('userlogged');
     window.location.reload();
  }

  const HenryCoint=()=>{
    Swal.fire({
      title:`${dataUSerLogin.name} Tienes ${dataUSerLogin.hc} HenryCoints`,
      icon:'success',
    })
  }

  return (
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className='sidebar-header'>
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <div>
        <ul className='links'>
          <li className="liLinks" onClick={closeSidebar}><Link to="/home"><FaHome/> Home</Link></li>
          {dataUSerLogin.role==="admin"&& 
          <>
          <li className="liLinks" onClick={closeSidebar}> <Link  to="/admin"> <RiAdminFill/> Admin</Link> </li> 
          <li className="liLinks" onClick={closeSidebar}> <Link  to="/home/profile"> <BsPersonFill/> Profile</Link> </li> 
          <li className="liLinks" onClick={closeSidebar}> <Link  to="/home/myorders"> <AiOutlineFileSearch/> Mis Ordenes</Link> </li> 
          <li className="liLinks"><span className='icon-bicoin' onClick={()=>{closeSidebar(); HenryCoint()}}><BiCoin/> HenryCoints</span></li>       
          </>
          }
          <li className="liLinks"><Link to="/home" className='spanOut'  onClick={()=>{logOut();closeSidebar() }} ><RiLogoutCircleRLine/>Cerrar sesión</Link></li>
        </ul>
        
      </div>
    </aside>
  );
};

export default Sidebar;
