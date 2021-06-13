import React, { useState } from "react";
import "firebase/auth";
import "./Auth.scss";
import {REGISTER_URL} from "../../Assets/constans.js"
import axios from 'axios'
import {firebase} from '../../Config/firebase-config'


const Login = ({onClose}) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogle = (e) => {
    e.preventDefault()
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        let i=result.additionalUserInfo;
        if(i.isNewUser){
          axios.post(REGISTER_URL,{
            email: i.profile.email ,
            firstname: i.profile.given_name,
            lastname: i.profile.family_name,
            image: i.profile.picture,
            registerOrigin: i.providerId
          })
        }
      }).catch((error) => {
        alert(error)
          // var message = error.message
          // var email = error.email;
      });
  }

  const handleGithub = (e) => {
    e.preventDefault()
      let provider = new firebase.auth.GithubAuthProvider()
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        let i=result.additionalUserInfo;
        if(i.isNewUser){
          axios.post(REGISTER_URL,{
            username: i.username,
            image: i.profile.avatar_url,
            registerOrigin: i.providerId
          })
        }
      }).catch((error) => {
        alert(error)
      });
  }

  const login = async (e) => {
    e.preventDefault();
   await firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(r=>{console.log(r)})
      .catch (function(error){
        alert(error);
      }) 
  };

  const forgotPassword = (Email) => {
    firebase.auth().sendPasswordResetEmail(Email)
        .then(function () {
            alert('Verifica tu dirección de correo electrónico...')
        }).catch(function (e) {
            alert(e)
        }) 
    }

  return (
    <div>
        <div>
          <h2 className="title">INGRESO</h2>
          <form className="formu">
              <div>
                <input type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="Email..."/>
              </div>
              <div>
                <input type="password" name="password" id="password" value={form.password} required onChange={handleOnChange} placeholder="Contraseña..."/>
              </div>
          </form>
          <div className="buttons">
            <div className="butt">
              <button type="submit" onClick={login}>Iniciar sesión</button>
            </div>
          </div>
          <div className="ForgotPass">
            <label>Olvidaste tu contraseña? </label>
           <a onClick={()=>forgotPassword(form.email)}>Recuperar</a>
           <br/>
           <a onClick={onClose}>Registrate</a>
          </div>
          <div>
            <h2>Otros métodos para ingresar...</h2>
            <a className="botoncito-google" onClick={handleGoogle}>
              <span className="asdasd"></span>
              Ingresa con Google
            </a>
            <br/>
            <a className="botoncito-github" onClick={handleGithub}>
              <span className="asdasd"></span>
              Ingresa con Github
            </a>
          </div>
        </div>

    </div>
  );
};

export default Login;
