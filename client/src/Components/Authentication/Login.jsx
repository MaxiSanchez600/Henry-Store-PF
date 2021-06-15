import "firebase/auth";
import "./Auth.scss";
import React, { useState } from "react";
import { REGISTER_URL } from "../../Config/index"
import axios from 'axios'
import { firebase } from '../../Config/firebase-config'


const Login = ({ loginClose, registerOpen }) => {

  const initialState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  let user = firebase.auth().currentUser;
  if (user) {
    loginClose()
  }
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
        let i = result.additionalUserInfo;
        if (i.isNewUser) {
          axios.post(REGISTER_URL, {
            email: i.profile.email,
            firstname: i.profile.given_name,
            lastname: i.profile.family_name,
            image: i.profile.picture,
            registerOrigin: i.providerId
          })
        }
      }).catch((error) => {
        alert(error)
      });
  }

  const handleGithub = (e) => {
    e.preventDefault()
    let provider = new firebase.auth.GithubAuthProvider()
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        let i = result.additionalUserInfo;
        if (i.isNewUser) {
          axios.post(REGISTER_URL, {
            username: i.username,
            image: i.profile.avatar_url,
            registerOrigin: i.providerId
          })
        }
      }).catch((error) => {
        alert(error)
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(() => setForm(initialState))
      .catch((error) => {
        setForm(initialState)
        alert(error.message);
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
    <div className="content_Login">
  
               <form className="formu" onSubmit={handleSubmit}>
          <div>
          <h1>Login</h1>
            <input type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="Email..." />
          </div>
          <div>
            <input type="password" name="password" id="password" value={form.password} required onChange={handleOnChange} placeholder="Contraseña..." />
          </div>
          <div className="buttons">
            <div className="button_login">
              <button type="submit">Iniciar sesión</button>
            </div>
          </div>
        </form>
        <div className="ForgotPass">
          <label className="recovery_pass">Olvidaste tu contraseña?<a onClick={() => forgotPassword(form.email)}>Recuperar</a> </label>
          
          <br />
          <a className="go_register" onClick={() => {
            registerOpen()
            loginClose()
          }}>Registrate</a>

          <div className="social_container">
            <a className="botoncito-google" onClick={handleGoogle}>
              <span class="iconify" data-icon="ant-design:google-plus-outlined" data-inline="false"></span>
            </a>
            <a className="botoncito-github" onClick={handleGithub}>
              <span class="iconify" data-icon="akar-icons:github-outline-fill" data-inline="false"></span>
            </a>
          </div>
        </div>
    </div>
  );
};

export default Login;