import React, { useState } from "react";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";
import logo from '../../Assets/Images/Logo_H_black.png'
import Modal from "../Modal/Modal";

// ! COMPONENTES
import FilterCategories from "../FilterCategories/FilterCategories";

const NavBar = () => {
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);

  const { data: user } = useUser();
  const firebase = useFirebaseApp();

  const logOut = async () => {
    await firebase.auth().signOut();
  }
 
  // ! CONTENT
  return (
    <div>
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


      <Modal isOpened={ModalLogin} onClose={() => setModalLogin(false)}>
        <Login isOpened={ModalLogin} loginClose={() => setModalLogin(false)} registerOpen={() => setModalRegister(true)} />
      </Modal>

      <Modal isOpened={ModalRegister} onClose={() => setModalRegister(false)}>
        <Register isOpened={ModalRegister} onClose={() => setModalRegister(false)} />
      </Modal>

      {user &&
        <div className="user_perfil">
          <img className="image" src={user.photoURL || logo} alt="not found" />
          <div className="user_buttons">
          <p>{user.providerData[0].displayName}</p>
          <button className="button_logout" onClick={logOut}><span class="iconify" data-icon="ant-design:close-circle-filled" data-inline="false"></span></button>
          </div>
          
          </div>
      }
  
    </div>
  );
};

export default NavBar;
