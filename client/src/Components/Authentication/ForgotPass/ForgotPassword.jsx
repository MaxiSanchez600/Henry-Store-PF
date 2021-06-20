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
          title:'Verifica tu correo electrónico...',
          icon:'info',
         
        })
        forgotPassClose();
      
      }).catch( (e)=> {
        Swal.fire({
          target: document.getElementById("modal"),
          title:`${e}`,
          icon:'error',
          width:"80%",
          height:"20%",
          confirmButtonColor:"#3889EF ",
          background:"#F2F3F4",
        })
      })
  }

  return (
    <div>
       <div>
          <span className="back-button" onClick={()=>{LoginOpen();forgotPassClose()}}>
            <IoArrowBackCircle/>
          </span>
          <span className="close-button" onClick={()=>forgotPassClose()}>
            <IoCloseCircle/>
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
