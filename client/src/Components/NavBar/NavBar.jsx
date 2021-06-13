import React, { useState } from "react";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import "firebase/auth";
import { useFirebaseApp,useUser } from "reactfire";

import Modal from "../Modal/Modal";

const NavBar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalOpened2, setIsModalOpened2] = useState(false);

  const { data: user } = useUser();
  const firebase = useFirebaseApp();

  const logOut=async()=>{
    await firebase.auth().signOut();
  }

  return (
    <div>
      RENDER NAVBAR
      <button onClick={() => setIsModalOpened(true)}>INGRESAR</button>
      <button onClick={() => setIsModalOpened2(true)}>REGISTRO</button>
      
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
         <Login isOpened={isModalOpened} onClose={() => {
           setIsModalOpened(false)
           setIsModalOpened2(true)
           }}/> 
      </Modal>

      <Modal isOpened={isModalOpened2} onClose={() => setIsModalOpened2(false)}>
         <Register isOpened={isModalOpened2} onClose={() => setIsModalOpened2(false)}/>
      </Modal>

      {user && <button onClick={logOut}>logOut</button>}
    </div>
  );
};

export default NavBar;
