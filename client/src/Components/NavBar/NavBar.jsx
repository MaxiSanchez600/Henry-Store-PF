import React, { useState } from "react";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import "firebase/auth";
import { useFirebaseApp,useUser } from "reactfire";
import logo from '../../Assets/images/Logo_H_black.png'

import Modal from "../Modal/Modal";

const NavBar = () => {
  const [ModalLogin, setModalLogin] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);

  const { data: user } = useUser();
  const firebase = useFirebaseApp();

  const logOut=async()=>{
    await firebase.auth().signOut();
  }

  return (
    <div>
      RENDER NAVBAR
      {!user && 
      <>
        <button onClick={() => setModalLogin(true)}>INGRESAR</button>
        <button onClick={() => setModalRegister(true)}>REGISTRO</button>
      </>
      }
      
      <Modal isOpened={ModalLogin} onClose={() => setModalLogin(false)}>
         <Login isOpened={ModalLogin} loginClose={() =>setModalLogin(false)} registerOpen={()=>setModalRegister(true)}/> 
      </Modal>

      <Modal isOpened={ModalRegister} onClose={() => setModalRegister(false)}>
         <Register isOpened={ModalRegister} onClose={() => setModalRegister(false)}/>
      </Modal>

      {user && 
      <>
      <h2>Bienvenido</h2>
      <img className="image" src={user.photoURL || logo} alt="not found" />
      <button onClick={logOut}>Cerrar Sesión</button>
      </>
      }
    </div>
  );
};

export default NavBar;
