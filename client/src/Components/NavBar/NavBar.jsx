import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import logo from '../../Assets/Images/Logo_H_black.png'
import Modal from "../Modal/Modal";
import FilterCategories from "../FilterCategories/FilterCategories";
import ForgotPassword from "../Authentication/ForgotPass/ForgotPassword";

import {  useUser } from "reactfire";
import { useGlobalContext } from "../../context"

// ! COMPONENTES
import "firebase/auth";


const NavBar = () => {
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [ModalForgotPass, setModalForgotPass] = useState(false);

  const { openSidebar } = useGlobalContext();
  const { data: user } = useUser();
 
  // ! CONTENT
  return (
    <div>
      <Link to = {'/cart'}>Fasdas</Link>
      <div className="contain_NavBar">
        <div className="menu_left">
          <FilterCategories />
        </div>
        <div className="menu_rigth">
          {!user &&
            <>
              <button className="menu_category" onClick={() => setModalLogin(true)}>INGRESAR <span class="iconify" data-icon="clarity:login-line" data-inline="false"></span></button>
              <button className="menu_category" onClick={() => setModalRegister(true)}>REGISTRO <span class="iconify" data-icon="ph:user-circle-plus-duotone" data-inline="false"></span></button>
            </>
          }
        </div>
      </div>


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

      {user &&
        <div className="user_perfil">
          <div className="header_perfil">
            <span onClick={openSidebar}>
              <img className="image" src={user.photoURL || logo} alt="not found" />
            </span> 
            <h2>{user.providerData[0].displayName}</h2>
          </div>
        </div>
      }
    </div>
  );
};

export default NavBar;
