import React, { useState } from "react";
import { Link} from "react-router-dom";
import "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";

const state = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(state);
  const firebase = useFirebaseApp();
  const user = useUser();

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();

    await firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password);

    setForm(state);

    // try {
    //   let config={
    //     method:"POST",
    //         body:JSON.stringify(form),
    //         headers:{
    //             "Accept":"application/json",
    //             "Content-Type":"application/json"
    //           },
    //         }
    //         await fetch(POST_URL,config)
    //       } catch (error) {
    //         alert(error);
    //       }
  };

  return (
    <div>
      <h2>Log In </h2>

      {user && (
        <div>
          <form onSubmit={handleonSubmit}>
            <div>
              <input type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="email"/>
            </div>
            <div>
              <input type="password" name="password" id="password" value={form.password} required onChange={handleOnChange} placeholder="password"/>
            </div>
            <div>
              <button type="submit">Log In</button>
            </div>
          </form>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
      {
        user && console.log(user.email)
      }
    </div>
  );
};

export default Login;
