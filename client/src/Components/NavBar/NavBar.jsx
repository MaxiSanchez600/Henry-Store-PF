import React, { useState } from "react";
import Auth from "../Authentication/Auth";
import AuthGithub from "../Authentication/AuthGithub";
import AuthGoogle from "../Authentication/AuthGoogle";
import Modal from "../Modal/Modal";

const NavBar = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  console.log("isModalOpened", isModalOpened);

  return (
    <div>
      RENDER NAVBAR
      <button onClick={() => setIsModalOpened(true)}>Sing in</button>
      <button onClick={() => setIsModalOpened(true)}>Sing up</button>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
         {/* <Auth/> */}
          {/* <AuthGoogle/> */}
          <br/>
          <br/>
          <AuthGithub/> 
      </Modal>
    </div>
  );
};

export default NavBar;
