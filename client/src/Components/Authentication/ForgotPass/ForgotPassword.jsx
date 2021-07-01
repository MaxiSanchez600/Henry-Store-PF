import "firebase/auth";
import "./ForgotPassword.scss";
import React, { useState } from "react";
import {firebase} from '../../../Config/firebase-config'
import { IoArrowBackCircle,IoCloseCircle } from "react-icons/io5";
import Swal from 'sweetalert2';
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
      .then( () =>{
        
        Swal.fire({
          title:`Verifica tu correo electrónico.`,
          icon:'info',
          iconColor: "#49AF41",
          showConfirmButton: false,
          timer:1000,
          customClass:{
            popup: 'popup-user_login',
            title: 'title-user_login',
          },
        })
        forgotPassClose();
      
      }).catch( (e)=> {
        
        Swal.fire({ 
        target: document.getElementById("modal"),
        title:`${e.message==="There is no user record corresponding to this identifier. The user may have been deleted."
          ?"No hay ningún registro de usuario. El usuario puede haber sido eliminado.":e.message}`,
        icon:'error',
        buttonsStyling:false,
        iconColor: "#F64749",
        customClass:{
        popup: 'popup-user_errorLogin',
        title: 'title-user_errorLogin',
        confirmButton: 'confirmButton-user_errorLogin',
        icon: 'iconpopup_user_errorLogin',
      }})
      })
  }

  return (
    <div className="container_forgot_pass">
       <div className="container_closeback_forgotpass">
          <span className="close-button-forgotpass" onClick={()=>forgotPassClose()}>
            <IoCloseCircle/>
          </span>
          <span className="back-button-forgotpass" onClick={()=>{LoginOpen();forgotPassClose()}}>
            <IoArrowBackCircle/>
          </span>
        </div>
          <form className="formu-forgot" onSubmit={forgotPassword} >
            <div className="container_name_strip">
              <h2 className="forgotpass_title">Cambiar Contraseña</h2>
              <div className="forgotpass_title_strip"></div>
            </div>
                <input className="imput_forgot" type="text" name="email" id="email" onChange={handleOnChange} value={form.email} required  placeholder="Email..."/>
              <button className="button_forgot" type="submit" >Enviar</button>
          </form>
    </div>
  );
};

export default ForgotPassword;
