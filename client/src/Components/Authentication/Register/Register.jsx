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
    setTimeout(function(){ dispatch(getUserLogin(user.uid))}, 2000);
    Swal.fire({
      title:`Bienvenido!`,
      icon:'success',
      showConfirmButton: false,
      timer:1000
    })
  }
  
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
          }
          localStorage.removeItem('userid');
          localStorage.setItem('userlogged', res.data.id_user);
          window.location.reload();
          setForm(imputsState)
      })
      .catch (function(error){
        Swal.fire({
          target: document.getElementById("modal"),
          title:`${error}`,
          icon:'error',
          width:"80%",
          height:"20%",
          confirmButtonColor:"#3889EF ",
         background:"#F2F3F4",
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
        width:"80%",
        height:"20%",
        confirmButtonColor:"#3889EF ",
       background:"#F2F3F4",
      })
    }
  };

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
            }
            localStorage.removeItem('userid');
            localStorage.setItem('userlogged', res.data.id_user);
            window.location.reload();
          })
        }
        else{
          localStorage.removeItem('userid');
          localStorage.setItem('userlogged', res.user.uid);
        }
      }).catch((error) => {
        Swal.fire({
          target: document.getElementById("modal"),
          title:`${error}`,
          icon:'error',
          width:"80%",
          height:"20%",
          confirmButtonColor:"#3889EF ",
          background:"#F2F3F4",
        })
      });
  }

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
              //Ruta que cambie carrito de guest con el del user.
            }
            localStorage.removeItem('userid');
            localStorage.setItem('userlogged', res.data.id_user);
            window.location.reload();
          })
        }
        else{
          localStorage.removeItem('userid');
          localStorage.setItem('userlogged', res.user.uid);
        }
      }).catch((error) => {
        Swal.fire({
          target: document.getElementById("modal"),
          title:`${error}`,
          icon:'error',
          width:"80%",
          height:"20%",
          confirmButtonColor:"#3889EF ",
          background:"#F2F3F4",
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
    <div>
        <div>
          <div>
            <span className="back-button" onClick={()=>{LoginOpen();RegisterClose()}}>
            <IoArrowBackCircle/>
          </span>
            <span className="close-button" onClick={()=>RegisterClose()}>
            <IoCloseCircle/>
            </span>
          </div>
          <h2 className="title-register">Registro</h2>
          <form className="formu" onSubmit={createAccount}>
                <input className="inText" type="text" name="email" id="email" onChange={handleOnChange} value={form.email} required  placeholder="Email..."/>
                <input className="inText" type={check?"password":"text"} name="password" id="password" onChange={handleOnChange} value={form.password} required  placeholder="Contraseña..."/>
                <input className="inText" type={check?"password":"text"} name="confimationPass" id="confimationPass" onChange={handleOnChange} value={form.confimationPass} required  placeholder="Confirmacion de Contraseña..."/>
                <div className="showPass">
                  <label for="showPass">Mostrar contraseñas</label>
                  <input className="checkbox" type="checkbox" id="showPass" value={check} onChange={checkboxOnChange}></input>
                </div>
              <button className="button_register" type="submit" >Registrarme</button>
          </form>
              <div className="social_container">
                <p className="botoncito-google" onClick={handleGoogle}>
                  <span class="iconify" data-icon="ant-design:google-plus-outlined" data-inline="false"></span>
                </p>
                <p className="botoncito-github" onClick={handleGithub}>
                  <span class="iconify" data-icon="akar-icons:github-outline-fill" data-inline="false"></span>
                </p>
              </div>
        </div>
    </div>
  );
};

export default Register;
