import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { useGlobalContext } from "../../context";
import {setUSerLogin} from "../../Redux/actions/actionsUsers";
import { useFirebaseApp } from "reactfire";

import { RiAdminFill,RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineFileSearch } from "react-icons/ai";
import {FaTimes,FaHome,} from 'react-icons/fa';
import { BsPersonFill } from "react-icons/bs";
import { BiCoin } from "react-icons/bi";
import Swal from 'sweetalert2';
import './SlideBar.scss';

const Sidebar = () => {

  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  const dispatch = useDispatch();
  const firebase = useFirebaseApp();

  useEffect(() => {
    const handleScroll=()=>{
      closeSidebar();
    }
    window.addEventListener("scroll",handleScroll)
  }, []);

  const logOut = async () => {
    Swal.fire({
      iconColor: "#49AF41",
      title:`Sesión Cerrada`,
      icon:'success',
      showConfirmButton: false,
      timer:4000,
      customClass:{
        popup: 'popup-closed_sessionUser',
        title: 'title-closed_sessionUser',
      },
    })
    await firebase.auth().signOut();
     dispatch(setUSerLogin({}))
     localStorage.removeItem('userlogged');
     window.location.reload();
  }

  const HenryCoint=()=>{
    let name=dataUSerLogin;
    Swal.fire({
      buttonsStyling:false,
      iconColor: "#49AF41",
      customClass:{
          popup: 'popup-info_HC',
          title: 'title-info_HC',
          confirmButton: 'confirmButton-info_HC',
    },
      icon:"info",
      title:`${name.name?name.name+" t":"T"}ienes ${dataUSerLogin.hc} HenryCoins`,
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
          <li className="liLinks" onClick={closeSidebar}> <Link  to="/admin"> <RiAdminFill/> Admin</Link> </li> 
          }
          <li className="liLinks" onClick={closeSidebar}> <Link  to="/home/profile"> <BsPersonFill/> Profile</Link> </li> 
          <li className="liLinks" onClick={closeSidebar}> <Link  to="/home/myorders"> <AiOutlineFileSearch/> Mis Ordenes</Link> </li> 
          <li className="liLinks"><span className='icon-bicoin' onClick={()=>{closeSidebar(); HenryCoint()}}><BiCoin/> HenryCoins</span></li>       
          <li className="liLinks"><Link to="/home" className='spanOut'  onClick={()=>{logOut();setTimeout(function(){closeSidebar()}, 4000);  }} ><RiLogoutCircleRLine/>Cerrar sesión</Link></li>
        </ul>
        
      </div>
    </aside>
  );
};

export default Sidebar;
