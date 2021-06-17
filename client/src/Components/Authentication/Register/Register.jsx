import "firebase/auth";
import "./Register.scss";
import React, { useState } from "react";
import {REGISTER_URL} from "../../../Config/index"
import axios from 'axios'
import {firebase} from '../../../Config/firebase-config'
// ! COMPONENTES
import { useDispatch} from 'react-redux';
import {getUserLogin} from "../../../Redux/actions/actionsUsers";

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
        axios.post(REGISTER_URL,{
            id:res.user.uid,
            email: form.email
        })
      })
      .then(()=>{
          setForm(imputsState)
      })
      .catch (function(error){
          alert(error);
      })
    }else{
      setForm({
        ...form,
        password :"",
        confimationPass: "",
      })
      alert("las contraseñas no coinciden, vuelve a ingresarlas")
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
      .then((res) => {
        let i = res.additionalUserInfo;
        if (i.isNewUser) {
          axios.post(REGISTER_URL, {
            id:res.user.uid,
            username: i.username,
            image: i.profile.avatar_url,
            registerOrigin: i.providerId
          })
        }
      }).catch((error) => {
        alert(error)
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
            <span  className="back-button" onClick={()=>{LoginOpen();RegisterClose()}}>
            Login
          </span>
            <span className="close-button" onClick={()=>RegisterClose()}>
              x
            </span>
          </div>
          <h2 className="title">Registro</h2>
          <form className="formu" onSubmit={createAccount}>
              <div>
                <input className="inText" type="text" name="email" id="email" onChange={handleOnChange} value={form.email} required  placeholder="Email..."/>
              </div>
              <div>
                <input className="inText" type={check?"password":"text"} name="password" id="password" onChange={handleOnChange} value={form.password} required  placeholder="Contraseña..."/>
              </div>
              <div>
                <input className="inText" type={check?"password":"text"} name="confimationPass" id="confimationPass" onChange={handleOnChange} value={form.confimationPass} required  placeholder="Confirmacion de Contraseña..."/>
              </div>
              <div >
                <label><input className="checkbox" type="checkbox" id="showPass" value={check} onChange={checkboxOnChange}/>Mostrar contraseñas</label>
              </div>
              <br/>
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
