import React from 'react';
import { useGlobalContext } from "../../context";
import { Link } from 'react-router-dom';

import './SlideBar.scss';
import { BsPersonFill } from "react-icons/bs";
import {FaTimes,FaHome,} from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";

import {setUSerLogin} from "../../Redux/actions/actionsUsers";
import { useDispatch} from 'react-redux';
import { useFirebaseApp } from "reactfire";
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  const dispatch = useDispatch();

  const firebase = useFirebaseApp();

  const logOut = async () => {
      await firebase.auth().signOut();
     dispatch(setUSerLogin({}))
     localStorage.removeItem('userlogged');
     window.location.reload();
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
          <li><Link to="/"><FaHome/> Home</Link></li>
          <li > <Link  to="/Profile"> <BsPersonFill/> Profile</Link> </li> 
          <li>
          <div className="user_buttons">
              <button className="noselect" onClick={()=>{logOut();closeSidebar()}} >
                <span class='text'>Cerrar sesión</span><span class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                </svg>
                </span>
            </button>
          </div>
          </li>
        </ul>
        
      </div>
    </aside>
  );
};

export default Sidebar;
