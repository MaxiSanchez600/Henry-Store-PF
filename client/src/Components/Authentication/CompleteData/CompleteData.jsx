import React, { useState, useEffect } from "react";
//import axios from "axios";
import "firebase/auth";
import { firebase } from "../../../Config/firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import {getNacionalities,getDocumentTypes} from "../../../Redux/actions/actionsUsers";
import Logo_Henry_black from "../../../Assets/Images/Logo_Henry_black.png"
import { Link } from "react-router-dom";
const CompleteData = () => {
  
  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  //const nationalities=useSelector((state)=>state.users.nationalities);
  const documentTipes=useSelector((state)=>state.users.documentTipes);
  const dispatch = useDispatch();

    const stateFormData = {
        name: "" || dataUSerLogin.name,
        last_name: "" || dataUSerLogin.lastname,
        email: "" || dataUSerLogin.email,
        phone: "",
        username: "" || dataUSerLogin.username,
        nationality:"",
        documentType:"",
        dni: "",
        status:"",
        img: "" || dataUSerLogin.image,
  };

  let user = firebase.auth().currentUser;

  const [form, setForm] = useState(stateFormData);
  const [check,setCheck] = useState(null)

  useEffect(() => {
    dispatch(getNacionalities());
    dispatch(getDocumentTypes());
  }, []);
  

  const handleonSubmit = async (e) => {
    e.preventDefault();
    //axios.put()
    setForm(stateFormData);
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCheck = (e) => {
    setForm({
      ...form,
      documentType: e.target.value,
    });
  };

  return (
    <div>
      <>
      <div>
        <Link to="/">
              <img src={Logo_Henry_black} alt="" width="200px" srcSet="" />
        </Link>
      </div>
        <div>
          <h2 className="title">Completar Cuenta</h2>
        </div>
        <div className="image">
          <img src={user.photoURL} alt="not found" />
        </div>
        <form className="formu" onSubmit={handleonSubmit}>
          <div>
            <div>
              <input
                type="text" name="name" id="name" value={form.name} onChange={handleOnChange} placeholder="name"
              />
            </div>
            <div>
              <input
                type="text" name="last_name" id="last_name" value={form.last_name} onChange={handleOnChange}
                placeholder="last_name"
              />
            </div>
            <div>
              <input
                type="text" name="username" id="username" value={form.username} required onChange={handleOnChange} placeholder="Username"
              />
            </div>
            <div>
              <input
                type="text" name="email" id="email" value={form.email} required onChange={handleOnChange} placeholder="email"
              />
            </div>
            <div>
              <input
                type="text" name="phone" id="phone" value={form.phone} required onChange={handleOnChange} placeholder="phone"
              />
            </div>
            <div >
              {/* className={moduleStyles.types} */}
            {
              documentTipes.map((e) => (
                <div key={e.id}>
                  <input type="radio" id={e.type} name="documentType" value={e.id} checked={check} onChange={handleChangeCheck} />
                  <label>{e.type}</label>
                </div>
              ))
            }
            </div>
            <div>
              <input
                type="text" name="dni" id="dni" value={form.dni} required onChange={handleOnChange} placeholder="numero documento de identidad"
              />
            </div>
          </div>
          <div className="submit">
            <button type="submit">submit</button>
          </div>
        </form>
    </>
    </div>
  );
};

export default CompleteData;
