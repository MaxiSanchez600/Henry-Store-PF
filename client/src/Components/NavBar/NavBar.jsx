import React, { useState } from "react";
import Auth from "../Authentication/Auth";
import "firebase/auth";
import { useFirebaseApp,useUser } from "reactfire";

import Modal from "../Modal/Modal";

const NavBar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  console.log("isModalOpened", isModalOpened);

  const { data: user } = useUser();
  const firebase = useFirebaseApp();


  const logOut=async()=>{
    await firebase.auth().signOut();
  }

  
  return (
    <div className="contain_NavBar">
      <button>Categoria</button>
      <button>Ofertas</button>
      <button>Historial</button>
      <button>Vender</button>
      <button>Ayuda/PQR</button>


      <button className="button_login" onClick={() => setIsModalOpened(true)}>Sing in</button>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
         <Auth/> 
      </Modal>
      {user&&
      <>
      <button onClick={logOut}>logOut</button>
      <h2>{`Bienvenido ${user.displayName}`}</h2>
      <div className="image">
          <img src={user.photoURL} alt="not found" />
      </div>
      </>
      }
    </div>
  );
};

export default NavBar;
