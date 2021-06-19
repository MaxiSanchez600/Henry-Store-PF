import React, { useState, useEffect } from "react";
import {PUT_DATA_USER} from "../../../Config/index"
import "./CompleteData.scss";
import "firebase/auth";
import axios from 'axios';
import { firebase } from "../../../Config/firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import {getNacionalities,getDocumentTypes} from "../../../Redux/actions/actionsUsers";
import Logo_Henry_black from "../../../Assets/Images/Logo_Henry_black.png"
import { Link } from "react-router-dom";

const CompleteData = () => {
 
  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  const nationalities=useSelector((state)=>state.users.nationalities);
  const documentTipes=useSelector((state)=>state.users.documentTipes);
  const dispatch = useDispatch();

    const stateFormData = {
        id:dataUSerLogin.id,
        firstname: "" || dataUSerLogin.name,
        lastname: "" || dataUSerLogin.lastname,
        email: "" || dataUSerLogin.email,
        phone: "",
        username: "" || dataUSerLogin.username,
        nacionality:"",
        documentType:"",
        identification: "",
        status:"",
        image: "" || dataUSerLogin.image,
  };

  let user = firebase.auth().currentUser;

  const [form, setForm] = useState(stateFormData);
  const [enableForm, setEnableForm] = useState(true);
  const [check,setCheck] = useState(null);

  useEffect(() => {
    dispatch(getNacionalities());
    dispatch(getDocumentTypes());
  }, [dispatch]);

  const handleonSubmit = async (e) => {
    e.preventDefault();
    axios.put(PUT_DATA_USER,form)
    .then((res)=>{
      console.log(res);
    }) 
    .catch (function(error){
      alert(error);
    });
    setForm(stateFormData);
    setCheck(null)
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

  const chageStateForm =(e)=>{
    e.preventDefault();
    if(enableForm===true){
      setEnableForm(false)
    }else{
      setEnableForm(true)
    }
  }

  return (
    <div className="container">
      <div>
        <Link to="/">
              <img src={Logo_Henry_black} alt="" width="200px" srcSet="" />
        </Link>
      </div>
        {/* <div>
          <h3 className="title">Perfil</h3>
        </div> */}
        <div className="card2">
     
          <div className="content"> 
            <form className="formData" onSubmit={handleonSubmit}>
              <div className="formu">
                <div>
                  <input
                    type="text" name="name" id="name" value={form.name} disabled={enableForm} onChange={handleOnChange} placeholder="name"
                  />
                </div>
                <div>
                  <input
                    type="text" name="last_name" id="last_name" value={form.last_name} disabled={enableForm} onChange={handleOnChange}
                    placeholder="last_name"
                  />
                </div>
                <div>
                  <input
                    type="text" name="username" id="username" value={form.username} disabled={enableForm} required onChange={handleOnChange} placeholder="Username"
                  />
                </div>
                <div>
                  <input
                    type="text" name="email" id="email" value={form.email} required disabled={enableForm} onChange={handleOnChange} placeholder="email"
                  />
                </div>
                <div>
                  <input
                    type="text" name="phone" id="phone" value={form.phone} disabled={enableForm} required onChange={handleOnChange} placeholder="phone"
                  />
                </div>
                <div>
                  <span >Elige tu Nacionalidad</span>
                  <select name="nacionality" disabled={enableForm} onChange={handleOnChange} defaultValue="">
                  <option value="">Seleccione</option>
                {
                  nationalities.map((e)=>(
                      <option key={e.id} value={e.id}>{e.nacionality}</option>
                  ))
                }
                    
                  </select>
                </div>
                <div >
                  
                {
                  documentTipes.map((e) =>
                  <div key={e.id}>
                    <input type="radio" id={e.type} name="documentType" value={e.id} disabled={enableForm}  checked={check} onChange={handleChangeCheck} />
                    <label>{e.type}</label>
                  </div>
                  )
                }
                </div>
                <div>
                  <input
                    type="text" name="identification" id="identification" value={form.identification} required onChange={handleOnChange} disabled={enableForm}  placeholder="numero documento de identidad"
                  />
                </div>
              </div>
              <div className="submit">
                <button type="submit" disabled={enableForm} >submit</button>
              </div>
            </form>
          </div>

          <div className="imag">
            <img src={user.photoURL} alt="not found" />
          </div>
          <div>
            <button onClick={chageStateForm}>Editar Perfil</button>
          </div>

        </div>
    </div>
  );
};

export default CompleteData;
