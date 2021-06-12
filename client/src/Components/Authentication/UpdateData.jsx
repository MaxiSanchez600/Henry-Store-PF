import React,{useState} from 'react';
import "firebase/auth";
import { useFirebaseApp,useUser } from "reactfire";
import {REGISTER_URL} from "../../Assets/constans.js"

const state = {
    email: "",
    img:"",
    name: "",
    last_name: "",
    username: "",
    phone: "",
    dni: "",
  };

const UpdateData = () => {

    const [form, setForm] = useState(state);
  const { data: user } = useUser();
 const firebase = useFirebaseApp();

 const handleonSubmit = async (e) => {
    e.preventDefault();
    setForm(state);
    setForm({
      ...form,
      email: e.target.value,
    });

    try {
        let config={
          method:"PUT",
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

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const logOut = async () => {
    setForm(state); 
    await firebase.auth().signOut();
  };
    return (
        <div>
          {user.email||user.displayName ? (
            <>
            <div >
            <h2 className="title">Actualizar Cuenta</h2>
            </div>
              
              <div className="image">
                <img src={user.photoURL} alt="not found"/>
              </div>
              <form className="formu" onSubmit={handleonSubmit}>
                <div>
                  <div>
                    <input type="text" name="name" id="name" value={form.name} required onChange={handleOnChange} placeholder="name"/> 
                    </div>
                  <div>
                    <input type="text" name="last_name" id="last_name" value={form.last_name} required onChange={handleOnChange} placeholder="last_name"/>
                  </div>
                  <div>
                    <input type="text" name="username" id="username" value={form.username} required onChange={handleOnChange} placeholder="Username"/>
                  </div>
                  <div>
                    <input type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="email"/>
                  </div>
                  <div>
                    <input type="text" name="phone" id="phone" value={form.phone} required onChange={handleOnChange} placeholder="phone"/>
                  </div>
                  <div>
                    <input type="text" name="dni" id="dni" value={form.dni} required onChange={handleOnChange} placeholder="dni"/>
                  </div>
                </div>
                <div className="submit">
                  <button type="submit">submit</button>
                </div>
              </form>
            </>
          ) : (
            <h2>{user.displayName}</h2>
          )}

           <button onClick={logOut}>logOut</button> 
        </div>
    );
};

export default UpdateData;