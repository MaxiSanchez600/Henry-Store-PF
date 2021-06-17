import React, { useState } from "react";
import { REGISTER_URL,LOGIN_URL} from "../../../Config/index";
import axios from "axios";
import "firebase/auth";
import { firebase } from "../../../Config/firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import {setUSerLogin} from "../../../Redux/actions/actionsUsers";
const Login = ({ loginClose, registerOpen, ForgotPassOpen }) => {

  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  console.log(dataUSerLogin)
  const dispatch = useDispatch();

  const initialState = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);

  let user = firebase.auth().currentUser;

  if (user) {
    console.log(user);
    loginClose();
  }
  //Setea Formulario
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getDataUser= (email,username) => {
    axios.get(`${LOGIN_URL}?email=${email}&username=${username}`)
    .then(res=>{
      console.log(res.data)
      dispatch(setUSerLogin(res.data));
    })
    .catch(e=>console.log(e))
};

  // Login con Google y respuesta al back
  const handleGoogle = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let i = result.additionalUserInfo;
        if (i.isNewUser) {
          axios
            .post(REGISTER_URL, {
              email: i.profile.email,
              firstname: i.profile.given_name,
              lastname: i.profile.family_name,
              image: i.profile.picture,
              registerOrigin: i.providerId,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              alert(error);
            });
        }
        if (!i.isNewUser) {
          console.log("entre")
          getDataUser(i.profile.email);
          // dispatch(getUserLogin());
          // console.log(dataUSerLogin)

        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  // Login con GitHub y respuesta al back
  const handleGithub = (e) => {
    e.preventDefault();
    let provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let i = result.additionalUserInfo;
        if (i.isNewUser) {
          axios.post(REGISTER_URL, {
            username: i.username,
            image: i.profile.avatar_url,
            registerOrigin: i.providerId,
          });
        }
        if (!i.isNewUser) {
          console.log("entregithub")
          getDataUser(null,i.username);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //enviar Iniciar sesion
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        console.log(res);
        setForm(initialState);
      })
      .catch((error) => {
        setForm(initialState);
        alert(error.message);
      });
  };

  return (
    <div className="content_Login">
      <div>
        <span className="close-button" onClick={() => loginClose()}>
          x
        </span>
      </div>
      <form className="formu" onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <input
            type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="Email..."
          />
        </div>
        <div>
          <input
            type="password" name="password" id="password" value={form.password} required onChange={handleOnChange} placeholder="Contraseña..."
          />
        </div>
        <div className="buttons">
          <div className="button_login">
            <button type="submit">Iniciar sesión</button>
          </div>
        </div>
      </form>
      <div className="ForgotPass">
        <p>
          <span
            class="recovery_pass"
            onClick={() => {
              ForgotPassOpen();
              loginClose();
            }}
          >
            Olvidaste tu contraseña?
          </span>
        </p>
        <br />
        <p>
          <span
            className="go_register"
            onClick={() => {
              registerOpen();
              loginClose();
            }}
          >
            Registrate
          </span>
        </p>
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

// const mapStateToProps = (state) => {
//   return {
//     types: state.types,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUserLogin: () => dispatch(getUserLogin()),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;

