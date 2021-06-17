import React, { useState } from "react";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import logo from '../../Assets/Images/Logo_H_black.png'
import Modal from "../Modal/Modal";
import FilterCategories from "../FilterCategories/FilterCategories";
import ForgotPassword from "../Authentication/ForgotPass/ForgotPassword";
import {setUSerLogin} from "../../Redux/actions/actionsUsers";
import { useFirebaseApp, useUser } from "reactfire";

// ! COMPONENTES
import "firebase/auth";
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [ModalForgotPass, setModalForgotPass] = useState(false);
 // const [ModalCompleteData, setModalCompleteData] = useState(false);

  //let user = firebase.auth().currentUser;
  const dispatch = useDispatch();

  const { data: user } = useUser();
  const firebase = useFirebaseApp();

  const logOut = async () => {
    await firebase.auth().signOut();
     dispatch(setUSerLogin({}))
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
            <img className="image" src={user.photoURL || logo} alt="not found" />
            <h2>{user.providerData[0].displayName}</h2>
          </div>
          <div className="user_buttons">
            <button className="noselect" onClick={logOut}><span class='text'>Cerrar sesión</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg></span></button>
          </div>
          <div>
            <Link  to="/Profile" >Perfil</Link>
          </div>
        </div>
      }

    </div>
  );
};

export default NavBar;
