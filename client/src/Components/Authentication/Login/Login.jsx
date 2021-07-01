import React, { useState } from "react";
import { REGISTER_URL, GUEST_CART_USER} from "../../../Config/index";
import axios from "axios";
import { firebase } from "../../../Config/firebase-config";
import "./Login.scss";
// ! COMPONENTES
import "firebase/auth";
import { useDispatch } from 'react-redux';
import {getUserLogin} from "../../../Redux/actions/actionsUsers";
import {IoCloseCircle } from "react-icons/io5";
import Swal from 'sweetalert2'

const Login = ({ loginClose, registerOpen, ForgotPassOpen }) => {

  const dispatch = useDispatch();

  const initialState = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);

  let user = firebase.auth().currentUser;

  //inicia sesion
  if (user) {
    loginClose();
    Swal.fire({
      title:`Bienvenido!`,
      icon:"success",
      iconColor: "#49AF41",
      showConfirmButton: false,
      timer:4000,
      customClass:{
          popup: 'popup-user_login',
          title: 'title-user_login',
      },
    })
  }
  
  //Setea Formulario
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  
  // Login con Google y respuesta al back
  const handleGoogle = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        let i = res.additionalUserInfo;
        if (i.isNewUser) {
          return axios
            .post(REGISTER_URL, {
              id:res.user.uid,
              email: i.profile.email,
              firstname: i.profile.given_name.toLowerCase(),
              lastname: i.profile.family_name.toLowerCase(),
              image: i.profile.picture,
              registerOrigin: i.providerId,
            })
            .then((res) => {
              if(localStorage.getItem('userid') !== null){
                axios.put(GUEST_CART_USER, {
                  new_user: res.data.id_user,
                  guest_user: localStorage.getItem('userid')
                })
                .then(()=>{
                  localStorage.removeItem('userid');
                  localStorage.setItem('userlogged', res.data.id_user);
                  window.location.reload();
                })
                .catch((error) => {
                  Swal.fire({
                    target: document.getElementById("modal"),
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-user_errorLogin',
                    title: 'title-user_errorLogin',
                    confirmButton: 'confirmButton-user_errorLogin',
                    icon: 'iconpopup_user_errorLogin',
                  },
                    icon:"error",
                    title:`${error}`,
                  })
                });
              }else{
                localStorage.removeItem('userid');
                localStorage.setItem('userlogged', res.data.id_user);
                window.location.reload();
              }
            })
            .catch((error) => {
              return Swal.fire({
                target: document.getElementById("modal"),
                buttonsStyling:false,
                iconColor: "#F64749",
                customClass:{
                popup: 'popup-user_errorLogin',
                title: 'title-user_errorLogin',
                confirmButton: 'confirmButton-user_errorLogin',
                icon: 'iconpopup_user_errorLogin',
              },
                icon:"error",
                title:`${error}`,
            })
            });
          }
          else{
            dispatch(getUserLogin(res.user.uid))
            localStorage.removeItem('userid');
            localStorage.setItem('userlogged', res.user.uid);
            window.location.reload();
          }
        })
      .catch((error) => {
          Swal.fire({
            target: document.getElementById("modal"),
            buttonsStyling:false,
            iconColor: "#F64749",
            customClass:{
            popup: 'popup-user_errorLogin',
            title: 'title-user_errorLogin',
            confirmButton: 'confirmButton-user_errorLogin',
            icon: 'iconpopup_user_errorLogin',
            },
            icon:"error",
            title:`${error}`,
      })
      });
  };

  // Login con GitHub y respuesta al back
  const handleGithub = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        let i = res.additionalUserInfo;
        if (i.isNewUser) {
          return axios.post(REGISTER_URL, {
            id:res.user.uid,
            username: i.username,
            image: i.profile.avatar_url,
            registerOrigin: i.providerId
          })
          .then((res) => {
            if(localStorage.getItem('userid') !== null){
              // dispatch(getUserLogin(res.user.uid))
              axios.put(GUEST_CART_USER, {
                new_user: res.data.id_user,
                guest_user: localStorage.getItem('userid')
              })
              .then(()=>{
                localStorage.removeItem('userid');
                localStorage.setItem('userlogged', res.data.id_user);
                window.location.reload();
              })
            }else{
              localStorage.removeItem('userid');
              localStorage.setItem('userlogged', res.data.id_user);
              window.location.reload();
            }
          })
        }
        else{
          dispatch(getUserLogin(res.user.uid))
          localStorage.removeItem('userid');
          localStorage.setItem('userlogged', res.user.uid);
          window.location.reload();
        }
      })
      .catch((error) => {
        return Swal.fire({
          target: document.getElementById("modal"),
          buttonsStyling:false,
          iconColor: "#F64749",
          customClass:{
          popup: 'popup-user_errorLogin',
          title: 'title-user_errorLogin',
          confirmButton: 'confirmButton-user_errorLogin',
          icon: 'iconpopup_user_errorLogin',
        },
          icon:"error",
          title:`${error.message==="An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
          ?"La cuenta ya se encuentra asociada, al correo de un asuario creado":error}`,
      })
      });
  };

  //enviar Iniciar sesion
  const handleSubmit = async (e) => {
    e.preventDefault();
    return await firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        localStorage.removeItem('userid');
        localStorage.setItem('userlogged', res.user.uid);
        window.location.reload();
        setForm(initialState);
      })
      .catch((error) => {
        setForm(initialState);
        return Swal.fire({
          target: document.getElementById("modal"),
          buttonsStyling:false,
          iconColor: "#F64749",
          customClass:{
          popup: 'popup-user_errorLogin',
          title: 'title-user_errorLogin',
          confirmButton: 'confirmButton-user_errorLogin',
          icon: 'iconpopup_user_errorLogin',
        },
          icon:"error",
          title:`${error.message==="The email address is badly formatted."?"La dirección de correo electrónico está mal formateada."
          :error.message==="The password is invalid or the user does not have a password."?"La contraseña no es válida."
          :error.message==="There is no user record corresponding to this identifier. The user may have been deleted."?"No hay ningún registro de usuario. Es posible que se haya eliminado al usuario."
          :error.message}`,
      })
      });
  };

  return (
    <div className="content_Login">
      <div className="container_close_login">
        <span className="close-button-login" onClick={()=>loginClose()}>
            <IoCloseCircle/>
        </span>
      </div>

      <form className="formu-login" onSubmit={handleSubmit}>
          <h1 className="name">Login<div className="name_strip"></div></h1>
          <input
            className="imput_login" type="text" name="email" id="email" value={form.email}  onChange={handleOnChange} placeholder="Email..."
          />
          <input
            className="imput_login" type="password" name="password" id="password" value={form.password}  onChange={handleOnChange} placeholder="Contraseña..."
          />
            <button className="button_login" type="submit">Iniciar sesión</button>
      </form>
      <div className="ForgotPass_login">
        <p>
          <span
            className="recovery_pass"
            onClick={() => {
              ForgotPassOpen();
              loginClose();
            }}
          >Olvidaste tu contraseña?
          </span>
        </p>
        <br />
          <span className="go_register"onClick={()=>{registerOpen();loginClose()}}>
            Registrate
          </span>
        <div className="social_container">
          <p className="botoncito-google" onClick={handleGoogle}>
            <span
              class="iconify"
              data-icon="ant-design:google-plus-outlined"
              data-inline="false"
            ></span>
          </p>
          <p className="botoncito-github" onClick={handleGithub}>
            <span
              class="iconify"
              data-icon="akar-icons:github-outline-fill"
              data-inline="false"
            ></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;