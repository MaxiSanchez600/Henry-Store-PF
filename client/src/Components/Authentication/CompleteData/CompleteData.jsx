import React, { useState, useEffect } from "react";
import {PUT_DATA_USER} from "../../../Config/index"
import "./CompleteData.scss";
import "firebase/auth";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import {getNacionalities,getDocumentTypes} from "../../../Redux/actions/actionsUsers";
import Logo_Henry_black from "../../../Assets/Images/Logo_Henry_black.png"
import { Link } from "react-router-dom";
import {getUserLogin} from "../../../Redux/actions/actionsUsers";
import logo from "../../../Assets/Images/Logo_H_black.png";

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
        phone: "" || dataUSerLogin.phone,
        username: "" || dataUSerLogin.username,
        nacionality:"",
        documentType:"",
        identification: "" || dataUSerLogin.identification,
        status:"",
        image: "" || dataUSerLogin.image,
  };


  const [form, setForm] = useState(stateFormData);
  const [enableForm, setEnableForm] = useState(true);
  const [check,setCheck] = useState(null);
  const [imageSelected,setImageSelected]=useState("");
  
  useEffect(() => {
    dispatch(getNacionalities());
    dispatch(getDocumentTypes());
  }, [dispatch]);

  const handleonSubmit = (e) => {
    e.preventDefault();
    
    axios.put(PUT_DATA_USER,form)
    .then(()=>{
      dispatch(getUserLogin(dataUSerLogin.id));
      setEnableForm(true)
    })
    .then(()=>{ 
      setForm(stateFormData);
      setCheck(null)
      Swal.fire({
        title:`Perfil Actualizado Correctamente &#128513 !`,
        icon:'success',
        showConfirmButton: false,
        timer:1500
      })
    })
    .catch ((error)=>{
      Swal.fire({
        title:`Username ya asignado, elija otro.. &#128517`,
        icon:'error',
        confirmButtonColor:"#3889EF ",
        background:"#F2F3F4",
      })
    });
    
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

  const uploadImage=()=>{ 
    const formData=new FormData();
    formData.append("file",imageSelected);
    formData.append("upload_preset","UsersHenry");
    axios.post("http://api.cloudinary.com/v1_1/dqyukl5cf/image/upload",formData)
    .then((res)=>{
      setForm({
        ...form,
        image: res.data.url,
      });
    })
    .catch((e)=>alert(e))
  }


  return (
    <div className="container">
      <div className="imageHenry">
        <Link to="/">
              <img src={Logo_Henry_black} alt="" width="200px" srcSet="" />
        </Link>
      </div>
        <div className="card2">
          <div className="content"> 
          <div>
            <h2>Profile</h2>
          </div>
            <form className="formData" onSubmit={handleonSubmit}>
              <div className="formu">
                <div>
                  <span>Nombre: </span>
                  <input
                    type="text" name="firstname" id="firstname" value={form.firstname} disabled={enableForm} onChange={handleOnChange} 
                    placeholder={dataUSerLogin.name || "Escribe tu Nombre"}
                  />
                </div>
                <div>
                <span>Apellido: </span>
                  <input
                    type="text" name="lastname" id="lastname" value={form.lastname} disabled={enableForm} onChange={handleOnChange}
                    placeholder={dataUSerLogin.lastname || "Escribe tu Apellido"}
                  />
                </div>
                <div>
                <span>Username: </span>
                  <input
                    type="text" name="username" id="username" value={form.username} disabled={enableForm}  onChange={handleOnChange} 
                    placeholder={dataUSerLogin.username || "Escribe tu username"}
                  />
                </div>
                <div>
                <span>Correo: </span>
                  <input
                    type="text" name="email" id="email" value={form.email}  disabled={enableForm} onChange={handleOnChange} 
                    placeholder={dataUSerLogin.email || "Escribe tu email"}
                  />
                </div>
                <div>
                <span>Telefono: </span>
                  <input
                    type="text" name="phone" id="phone" value={form.phone} disabled={enableForm}  onChange={handleOnChange} 
                    placeholder={dataUSerLogin.phone || "Numero Telefonico :"}
                  />
                </div>
                <div className="nacionality">
                  <span>Pais: </span>
                  <input
                      type="text" name="nacionality" id="nacionality" value ={form.nacionality} disabled={true}  onChange={handleOnChange} 
                      placeholder={dataUSerLogin.nacionality ==="Undefined"?"Seleccione Pais de Procedencia":dataUSerLogin.nacionality }
                    />
                    {
                      enableForm===false&&
                      <div >
                          <select name="nacionality" disabled={enableForm} onChange={handleOnChange} defaultValue="">
                            <option value="">Seleccione</option>
                            {
                            nationalities.map((e)=>(
                            <option key={e.id} value={e.id}>{e.nacionality}</option>))
                            } 
                          </select>
                      </div>
                    }
                </div>

                <div className="documentType" >
                  <span>Tipo de Documento:</span>
                  <input
                      type="text" name="documentType" id="documentType" value={form.documentType} disabled={true} required onChange={handleOnChange} 
                      placeholder={dataUSerLogin.documentType ==="Undefined"?"Seleccione ":dataUSerLogin.documentType }
                  />
                  { enableForm===false&&
                    documentTipes.map((e) =>
                    <div key={e.id}>
                      <input type="radio" id={e.type} name="documentType" value={e.id} disabled={enableForm}  checked={check} onChange={handleChangeCheck} />
                      <label>{e.type}</label>
                    </div>)
                  }
                </div>

                <div >
                  <span>Num. Identificacion: </span>
                  <input
                    type="text" name="identification" id="identification" value={form.identification}  onChange={handleOnChange} disabled={enableForm}  placeholder="numero documento de identidad"
                  />
                </div>
              </div>
              
              <div className="submit">
                {enableForm===false&&
                  <button type="submit" disabled={enableForm} >submit</button>
                }
              </div>
            </form>
          </div>
          <div className="imag">
            <img src={form.image||logo} alt="not found" />
            {enableForm===false &&
              <div>
                 <input type="file" onChange={(e)=>{
                   setImageSelected(e.target.files[0])
                 }}/> 
                 <button onClick={()=>{uploadImage()}}> Cargar imagen</button>
              </div>
            }
          </div>
          <div>
            <button onClick={chageStateForm}>Editar Perfil</button>
          </div>
        </div>
    </div>
  );
};

export default CompleteData;
