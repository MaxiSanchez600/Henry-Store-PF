import React, { useState } from "react";
import "firebase/auth";
import { useFirebaseApp, useUser, SuspenseWithPerf, useAuth } from "reactfire";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import "./Auth.scss";
import {REGISTER_URL} from "../../Assets/constans.js"
import CompleteForm from "./CompleteForm"

const SignInForm = () => {
  //const { data: user } = useUser();
  const auth = useAuth;
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // FUNCION LUEGO DE QUE SE COMPLETO EL INICIO DE SESION
      signInSuccessWithAuthResult: (e) => {
        console.log(e);
      },
    },
  };
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
};

const state = {
  email: "",
  password: "",
};

const Auth = () => {

  const [form, setForm] = useState(state);
  const firebase = useFirebaseApp();
  const { data: user } = useUser();

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(r=>{console.log(r.additionalUserInfo.profile)})
      .catch (function(error){
        alert(error);
      }) 
    setForm(state);

    try {
      let config={
        method:"POST",
            body:JSON.stringify(form),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
              },
            }
            await fetch(REGISTER_URL,config)
          } catch (error) {
            alert(error);
          }

  };

  const login = async (e) => {
    e.preventDefault();
   await firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(r=>{console.log(r.additionalUserInfo.profile)})
      .catch (function(error){
        alert(error);
      }) 
    console.log("inicie sesion");
 
  };

  // const onClickLabel =()=>{
  //   alert("onClickLabel")
  // }

  const forgotPassword = (Email) => {
    firebase.auth().sendPasswordResetEmail(Email)
        .then(function () {
            alert('Please check your email...')
        }).catch(function (e) {
            alert(e)
        }) 
    }

  return (
    <div>
      {!user && (
        <div>
          <h2 className="title">Log In </h2>
          <form className="formu">
            <div>
              <div>
                <input type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="email"/>
              </div>
              <div>
                <input type="password" name="password" id="password" value={form.password} required onChange={handleOnChange} placeholder="password"/>
              </div>
            </div>
          </form>
          <div className="buttons">
            <div className="butt">
              <button type="submit" onClick={submit}>Crear Cuenta</button>
            </div>
            <div className="butt">
              <button type="submit" onClick={login}>iniciar sesion</button>
            </div>
          </div>
          <div className="ForgotPass">
            <label onClick={()=>forgotPassword(form.email)}>Forgot Password?</label>
            
          </div>

          <div>
            <SuspenseWithPerf
              traceId={"firebase-user-wait"}
              fallback={<p>loading...</p>}
            >
              <SignInForm />
            </SuspenseWithPerf>
          </div>
        </div>
      )}

            {user && <CompleteForm/> }
    </div>
  );
};

export default Auth;
