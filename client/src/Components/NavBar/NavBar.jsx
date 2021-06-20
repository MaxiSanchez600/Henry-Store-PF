import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import logo from '../../Assets/Images/Logo_H_black.png'
import Modal from "../Modal/Modal";
import FilterCategories from "../FilterCategories/FilterCategories";
import ForgotPassword from "../Authentication/ForgotPass/ForgotPassword";
import {  useSelector } from 'react-redux';
import {  useUser } from "reactfire";
import { useGlobalContext } from "../../context"
import henry from "../../Assets/Images/Logo_Henry_black.png"
import GeoLocation from '../GeoLocation/GeoLocation'
import SearchBar from '../SearchBar/SearchBar'
import {FaShoppingCart} from 'react-icons/fa'

// ! COMPONENTES
import "firebase/auth";


const NavBar = () => {

  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [ModalForgotPass, setModalForgotPass] = useState(false);

  const { openSidebar } = useGlobalContext();
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
        <img className="logohenry" src={henry}/>
        <GeoLocation></GeoLocation>
      </div>
      <div className="mid-box">
        <div className="searchbar">
          <SearchBar></SearchBar>
        </div>
        <div className="filter_categories">
          <FilterCategories />
        </div>
      </div>
      <div className="right-box">
        <div className="profile-box">
          {user &&
              <div className="header_perfil">
                <span onClick={openSidebar}>
                  <img className="image" src={dataUSerLogin.image || logo} alt="not found" />
                </span> 
                <span onClick={openSidebar}>
                  <h2>{dataUSerLogin.username}</h2>
                </span>
              </div>
          }
        </div>
      <div className="buttons-under-profile">
          <Link to = {'/cart'}><FaShoppingCart/></Link>
          {!user &&
              //Botones de login y registro 
            <>
              <button className="menu_category" onClick={() => setModalLogin(true)}>INGRESAR <span class="iconify" data-icon="clarity:login-line" data-inline="false"></span></button>
              <button className="menu_category" id = "buttonRegister" onClick={() => setModalRegister(true)}>REGISTRO <span class="iconify" data-icon="ph:user-circle-plus-duotone" data-inline="false"></span></button>
            </>
          }
      </div>
      </div>
    </div>
  );
};

export default NavBar;
