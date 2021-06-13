import "firebase/auth";
import "./Auth.scss";
import React, { useState } from "react";
import {REGISTER_URL} from "../../Assets/constans.js"
import axios from 'axios'
import {firebase} from '../../Config/firebase-config'

const Register = ({onClose}) => {

  const imputsState = {
    email: "",
    password: "",
  };
  
  const [form, setForm] = useState(imputsState);
  let user = firebase.auth().currentUser;
  
  if (user) {
    onClose()
  }
  
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createAccount = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
    .then(()=> axios.post(REGISTER_URL,{
        email: form.email
    }))
    .then(()=>{
        setForm(imputsState)
    })
    .catch (function(error){
        alert(error);
    })
  };

  return (
    <div>
        <div>
          <h2 className="title">Register</h2>
          <form className="formu" onSubmit={createAccount}>
              <div>
                <input type="text" name="email" id="email" onChange={handleOnChange} value={form.email} required  placeholder="Put your email to Register"/>
              </div>
              <div>
                <input type="password" name="password" id="password" onChange={handleOnChange} value={form.password} required  placeholder="Put your password to Register"/>
              </div>
              <button type="submit" >Crear Cuenta</button>
          </form>
        </div>
    </div>
  );
};

export default Register;
