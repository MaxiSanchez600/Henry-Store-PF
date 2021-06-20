import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import logo from '../../Assets/Images/Logo_H_white.png'
import Modal from "../Modal/Modal";
import FilterCategories from "../FilterCategories/FilterCategories";
import ForgotPassword from "../Authentication/ForgotPass/ForgotPassword";
import {  useSelector } from 'react-redux';
import {  useUser } from "reactfire";
import { useGlobalContext } from "../../context"
import henry from "../../Assets/Images/new_logo.png"
import GeoLocation from '../GeoLocation/GeoLocation'
import SearchBar from '../SearchBar/SearchBar'
import {FaShoppingCart} from 'react-icons/fa'
import {IoEnter} from "react-icons/io5"
import {FaUserAlt} from "react-icons/fa"

// ! COMPONENTES
import "firebase/auth";


const NavBar = () => {

  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [ModalForgotPass, setModalForgotPass] = useState(false);

  const { openSidebar, closeSidebar } = useGlobalContext();
  const { data: user } = useUser();
 
  // ! CONTENT
  return (
    <div className="contain_NavBar">
      <Modal isOpened={ModalLogin} onClose={() => setModalLogin(false)} >
        <Login isOpened={ModalLogin} 
               loginClose={() => setModalLogin(false)} 
               registerOpen={() => setModalRegister(true)} 
               ForgotPassOpen={()=>setModalForgotPass(true)}/>
      </Modal>
      <Modal isOpened={ModalRegister} onClose={() => setModalRegister(false)}>
        <Register isOpened={ModalRegister} 
                  RegisterClose={() => setModalRegister(false)} 
                  LoginOpen={() => setModalLogin(true)}
                  />
      </Modal>

      <Modal isOpened={ModalForgotPass} onClose={() => setModalForgotPass(false)}>
        <ForgotPassword isOpened={ModalForgotPass} 
                        forgotPassClose={() => setModalForgotPass(false)}
                        LoginOpen={() => setModalLogin(true)}
                        />
      </Modal>
      <div className="left-box">
        <Link to="/">
          <img className="logohenry" src={henry} alt ="not"/>
        </Link>
        
        <div className="geolocation"><GeoLocation/></div>
      </div>
      <div className="mid-box">
          <p>Nosotros</p>
          <p>Sucursales</p>
          <FilterCategories />
          <p>Contacto</p>
          <p>FAQ</p>
      </div>
      <div className="right-box">
        <div className="profile-box">
          {user &&
              <div className="header_perfil">
                <span onMouseMove={openSidebar}>
                  <h2>{dataUSerLogin.username}</h2>
                </span>
                <span onMouseMove={openSidebar}>
                  <img className="image" src={dataUSerLogin.image || logo} alt="not found" />
                </span> 
              </div>
          }
        </div>
      <div className="buttons-under-profile">
        <div className="carrito">
        <Link to={'/cart'}><FaShoppingCart color="white" size="22px"  /></Link>
        </div>
        {!user &&
            //Botones de login y registro 
          <>
            <button className="menu_category" onClick={() => setModalLogin(true)}>INGRESAR <IoEnter/></button>
            <button className="menu_category" id = "buttonRegister" onClick={() => setModalRegister(true)}>REGISTRO <FaUserAlt/></button>
          </>
        }
      </div>
      </div>
    </div>
  );
};

export default NavBar;
