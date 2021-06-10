import React, { useState } from "react";
import Auth from "../Authentication/Auth";
import Login from "../Authentication/Login";
import Modal from "../Modal/Modal";

const NavBar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  console.log("isModalOpened", isModalOpened);

  return (
    <div>
      RENDER NAVBAR
      <button onClick={() => setIsModalOpened(true)}>Sing in</button>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <Login/>
          <Auth/> 
      </Modal>
    </div>
  );
};

export default NavBar;
