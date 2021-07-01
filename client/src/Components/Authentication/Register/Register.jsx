import "firebase/auth";
import "./Register.scss";
import React, { useState } from "react";
import {REGISTER_URL, GUEST_CART_USER} from "../../../Config/index"
import axios from 'axios'
import {firebase} from '../../../Config/firebase-config'
import { useDispatch} from 'react-redux';
import {getUserLogin} from "../../../Redux/actions/actionsUsers";
import { IoArrowBackCircle,IoCloseCircle } from "react-icons/io5";
import Swal from 'sweetalert2';

const Register = ({RegisterClose,LoginOpen}) => {

  const dispatch = useDispatch();
  const imputsState = {
    email: "",
    password: "",
    confimationPass: "",
  };
  
  const [form, setForm] = useState(imputsState);
  const [check,setCheck] = useState(true)
  let user = firebase.auth().currentUser;
  
  if (user) {
    RegisterClose();
    setTimeout(function(){ dispatch(getUserLogin(user.uid))}, 2000); //revisar esta linea
    Swal.fire({
      title:`Bienvenido!`,
      icon:'success',
      iconColor: "#49AF41",
      showConfirmButton: false,
      timer:1000,
      customClass:{
        popup: 'popup-user_login',
        title: 'title-user_login',
      },
    })
  }
  
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //crear cuenta con correo y contraseña
  const createAccount = (e) => {
    e.preventDefault();
    if(form.password===form.confimationPass){
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
      .then((res)=> {
        return axios.post(REGISTER_URL,{
            id:res.user.uid,
            email: form.email,
            image:"https://i.ibb.co/Drj4mfK/Logo-H-black.png"
        })
      })
      .then((res)=>{
          if(localStorage.getItem('userid') !== null){
            axios.put(GUEST_CART_USER, {
              new_user: res.data.id_user,
              guest_user: localStorage.getItem('userid')
            })
            .then(()=>{
              localStorage.removeItem('userid');
              localStorage.setItem('userlogged', res.data.id_user);
              window.location.reload();
              setForm(imputsState)
            })
          }else{
            localStorage.removeItem('userid');
            localStorage.setItem('userlogged', res.data.id_user);
            window.location.reload();
            setForm(imputsState)
          }
      })
      .catch (function(error){
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
          title:`${error.message==="The email address is already in use by another account."
          ?"La dirección de correo electrónico ya está siendo utilizada por otra cuenta."
          :error.message==="Password should be at least 6 characters"?"La contraseña debe tener al menos 6 caracteres"
          :error}`,
      })
      })
    }else{
      setForm({
        ...form,
        password :"",
        confimationPass: "",
      })
      Swal.fire({
        target: document.getElementById("modal"),
        title:"las contraseñas no coinciden, vuelve a ingresarlas",
        icon:'error',
        buttonsStyling:false,
        iconColor: "#F64749",
        customClass:{
        popup: 'popup-user_errorLogin',
        title: 'title-user_errorLogin',
        confirmButton: 'confirmButton-user_errorLogin',
        icon: 'iconpopup_user_errorLogin',
      },
      })
    }
  };

  //Registro con Google
  const handleGoogle = (e) => {
    e.preventDefault()
    let provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
      .signInWithPopup(provider)
      .then((res) => {
        let i = res.additionalUserInfo;
        if (i.isNewUser) {
          axios.post(REGISTER_URL, {
            id:res.user.uid,
            email: i.profile.email,
            firstname: i.profile.given_name,
            lastname: i.profile.family_name,
            image: i.profile.picture,
            registerOrigin: i.providerId
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
                setForm(imputsState)
              })
            }else{
              localStorage.removeItem('userid');
              localStorage.setItem('userlogged', res.data.id_user);
              window.location.reload();
              setForm(imputsState)
            }
          })
        }
        else{
          localStorage.removeItem('userid');
          localStorage.setItem('userlogged', res.user.uid);
        }
      }).catch((error) => {
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
  }

  //Registro con gitHub
  const handleGithub = (e) => {
    e.preventDefault()
    let provider = new firebase.auth.GithubAuthProvider()
    firebase.auth()
      .signInWithPopup(provider)
      .then((res) => {
        let i = res.additionalUserInfo;
        if (i.isNewUser) {
          axios.post(REGISTER_URL, {
            id:res.user.uid,
            username: i.username,
            image: i.profile.avatar_url,
            registerOrigin: i.providerId
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
                setForm(imputsState)
              })
            }else{
              localStorage.removeItem('userid');
              localStorage.setItem('userlogged', res.data.id_user);
              window.location.reload();
              setForm(imputsState)
            }
          })
        }
        else{
          localStorage.removeItem('userid');
          localStorage.setItem('userlogged', res.user.uid);
        }
      }).catch((error) => {
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
  }

  const checkboxOnChange=()=>{
    if(check===true){
      setCheck(false)
    }else{
      setCheck(true)
    }
  }

  return (
      <div className="content_register">
        <div className="container_close_register">
          <span className="close-button-register" onClick={()=>RegisterClose()}>
          <IoCloseCircle/>
          </span>
          <span className="back-button-register" onClick={()=>{LoginOpen();RegisterClose()}}>
          <IoArrowBackCircle/>
          </span>
        </div>
        <form className="formu-register" onSubmit={createAccount}>
        <h2 className="name-register">Registro<div className="register_strip"></div></h2>
              <input className="inText-register" type="text" name="email" id="email" onChange={handleOnChange} value={form.email} required  placeholder="Email..."/>
              <input className="inText-register" type={check?"password":"text"} name="password" id="password" onChange={handleOnChange} value={form.password} required  placeholder="Contraseña..."/>
              <input className="inText-register" type={check?"password":"text"} name="confimationPass" id="confimationPass" onChange={handleOnChange} value={form.confimationPass} required  placeholder="Confirmacion de Contraseña..."/>
              <div className="showPass">
                <label for="showPass">Mostrar contraseña</label>
                <input className="checkbox" type="checkbox" id="showPass" value={check} onChange={checkboxOnChange}></input>
              </div>
            <button className="button_registerme" type="submit" >Registrarme</button>
        
            <div className="social_container">
              <p className="botoncito-google" onClick={handleGoogle}>
                <span class="iconify" data-icon="ant-design:google-plus-outlined" data-inline="false"></span>
              </p>
              <p className="botoncito-github" onClick={handleGithub}>
                <span class="iconify" data-icon="akar-icons:github-outline-fill" data-inline="false"></span>
              </p>
            </div>
        </form>
      </div>
  );
};

export default Register;
