import "firebase/auth";
import "./ForgotPassword.scss";
import React, { useState } from "react";
import {firebase} from '../../../Config/firebase-config'

const ForgotPassword = ({forgotPassClose,LoginOpen}) => {

  const inputsState = {
    email: "",
  };
  
  const [form, setForm] = useState(inputsState);

  
  let user = firebase.auth().currentUser;
  
  if (user) {
    forgotPassClose()
  }
  
  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(form.email)
      .then(function () {
        alert('Verifica tu dirección de correo electrónico...');
        forgotPassClose();
        LoginOpen();
      }).catch(function (e) {
        alert(e)
      })
  }



  return (
    <div>
       <div>
            <span  className="back-button" onClick={()=>{LoginOpen();forgotPassClose()}}>
            Login
          </span>
            <span className="close-button" onClick={()=>forgotPassClose()}>
              x
            </span>
          </div>
        <div>
          <h2 className="title">Cambiar Contraseña</h2>
          <form className="formu" onSubmit={forgotPassword} >
              <div>
                <input type="text" name="email" id="email" onChange={handleOnChange} value={form.email} required  placeholder="Diligenciar Email..."/>
              </div>
            
              <button className="button_register" type="submit" >Enviar</button>
          </form>

        </div>
    </div>
  );
};

export default ForgotPassword;
