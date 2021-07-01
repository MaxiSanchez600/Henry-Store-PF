import React, { useState, useEffect } from "react";
import {PUT_DATA_USER} from "../../../Config/index"
import "./CompleteData.scss";
import "firebase/auth";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import {getNacionalities,getDocumentTypes} from "../../../Redux/actions/actionsUsers";
import { Link } from "react-router-dom";
import {getUserLogin} from "../../../Redux/actions/actionsUsers";
import logo from "../../../Assets/Images/Logo_H_black.png";
import Logo_Henry_black from "../../../Assets/Images/Logo_Henry_black.png";
import {FaHome,} from 'react-icons/fa';
import Sidebar from "../../Sidebar/Sidebar"


export function validate(form){
  let errors={};
  if(!/\S+@\S+\.\S+/.test(form.email)){
    errors.email = 'Ingrese un Email valido..';
  } 
  if(!/(?=.*[0-9])/.test(form.phone)){
    errors.phone="No puede contener letras";
  }
  if(!/(?=.*[0-9])/.test(form.identification)){
    errors.identification="No puede contener letras";
  }
  return errors;
}

const CompleteData = () => {
  var dataToSend;

  const dataUSerLogin=useSelector((state)=>state.users.dataUSerLogin);
  const nationalities=useSelector((state)=>state.users.nationalities);
  const documentTipes=useSelector((state)=>state.users.documentTipes);
  const dispatch = useDispatch();

    const stateFormData = {
        id:dataUSerLogin.id,
        image:"",
        firstname: "" ,
        lastname: "" ,
        email: "" ,
        phone: "",
        username: "",
        nacionality:"",
        documentType:"",
        identification: "",
        status:"",
  };
  
  const [form, setForm] = useState(stateFormData);
  const [enableForm, setEnableForm] = useState(true);
  const [check,setCheck] = useState(null);
  const [errors, setErrors] = useState({});
  var userLogged = localStorage.getItem('userlogged');

  useEffect(() => {
    dispatch(getUserLogin(userLogged));
    dispatch(getNacionalities());
    dispatch(getDocumentTypes());
    setForm({
      id:dataUSerLogin.id,
      image:dataUSerLogin.image,
      firstname: dataUSerLogin.name,
      lastname:dataUSerLogin.lastname,
      email: dataUSerLogin.email,
      phone: dataUSerLogin.phone,
      username:  dataUSerLogin.username,
      nacionality: dataUSerLogin.nacionality,
      documentType: dataUSerLogin.documentType,
      identification: dataUSerLogin.identification,
      status:"",
  });
  }, []);

  

  const handleonSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(errors).length !== 0 ){
      Swal.fire({
        title:`Errores en el formulario.. `,
        icon:'error',
        confirmButtonColor:"#3889EF ",
        background:"#F64749",
      })
      
    }
    else{
      dataToSend=form;
      dataToSend.nacionality= nationalities.find(n=>form.nacionality===n.nacionality).id;
      dataToSend.documentType=documentTipes.find(d=> form.documentType===d.type).id;

      axios.put(PUT_DATA_USER,dataToSend)
      .then(()=>{ 
      setEnableForm(true)
      setCheck(null)
      Swal.fire({
        title:`Perfil actualizado correctamente.`,
        icon:"success",
        iconColor: "#49AF41",
        showConfirmButton: false,
        timer:1500,
        customClass:{
        popup: 'popup-update_dataUser',
        title: 'title-update_dataUser',
        },
      })
      dataToSend=form;
      dataToSend.nacionality= nationalities.find(n=>form.nacionality===n.id).nacionality;
      dataToSend.documentType=documentTipes.find(d=> form.documentType===d.id).type;
      dispatch(getUserLogin(userLogged));
    })
    .catch ((err)=>{
  
      return Swal.fire({
        buttonsStyling:false,
        iconColor: "#F64749",
        customClass:{
            popup: 'popup-errorUpdate_dataUser',
            title: 'title-errorUpdate_dataUser',
            confirmButton: 'confirmButton-errorUpdate_dataUser',
      },
        icon:"error",
        title:`Username ya asignado ${err}`,
        text: "Para continuar es necesario elijas otro Username."
    })
    });
  }
  };


  const handleOnChange = (e) => {
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value,
    }))
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
      setForm({
        id:dataUSerLogin.id,
        image:dataUSerLogin.image,
        firstname: dataUSerLogin.name,
        lastname:dataUSerLogin.lastname,
        email: dataUSerLogin.email,
        phone: dataUSerLogin.phone,
        username:  dataUSerLogin.username,
        nacionality: dataUSerLogin.nacionality,
        documentType: dataUSerLogin.documentType,
        identification: dataUSerLogin.identification,
        status:"",
    });
    }else{
      setEnableForm(true)
    }
  }

  const uploadImage=async(imageSelected)=>{ 
    const formData=new FormData();

    formData.append("file",imageSelected);
    formData.append("upload_preset","UsersHenry");
    await axios.post("http://api.cloudinary.com/v1_1/dqyukl5cf/image/upload",formData)

    .then((res)=>{
      setForm({
        ...form,
        image: res.data.url,
      });
     
      Swal.fire({
        title:`Imagen Actualizada`,
        icon:'success',
        iconColor: "#49AF41",
        showConfirmButton: false,
        timer:1500,
        timerProgressBar:true,
        position: 'bottom-end',
        toast:true,
        customClass:{
          popup: 'popup-errorUpdate_dataUser',
          title: 'title-errorUpdate_dataUser',
          confirmButton: 'confirmButton-errorUpdate_dataUser',
    },
      })
    })
    .catch((e)=>{
      Swal.fire({
         title:`Error al subir imagen, elige otra `,
         icon:'error',
         showConfirmButton: false,
         timer:1500,
         timerProgressBar:true,
         position: 'bottom-end',
         toast:true
       })
    })
  }


  return (
    <div className="containerCompleteData">
      <div className="divNavProfile">
        <div className="labelPerfil">
          <h1>Perfil</h1>
        </div>
        <div className="navRigth">
          <div className="ButtonEditProfile">
              <button onClick={chageStateForm}>{enableForm?"Editar Perfil":"volver"}</button>
            </div>
        </div>

      </div>
        <div className="card2">
          <div className="content"> 
            <form className="formData"  >
             <div className={enableForm&&"initiald"}>
                <div className="divInfoForm">
                  <label>Nombre: </label>
                  <input
                    type="text" name="firstname" id="firstname" value={form.firstname} disabled={enableForm} onChange={handleOnChange} 
                    placeholder={dataUSerLogin.name || "Escribe tu Nombre..."}
                  />
                </div>
                <div className="divInfoForm">
                <label>Apellido: </label>
                  <input
                    type="text" name="lastname" id="lastname" value={form.lastname} disabled={enableForm} onChange={handleOnChange}
                    placeholder={dataUSerLogin.lastname || "Escribe tu Apellido..."}
                  />
                </div>
                <div className="divInfoForm">
                <label>Username: </label>
                  <input
                    type="text" name="username" id="username" value={form.username} disabled={enableForm}  onChange={handleOnChange} 
                    placeholder={dataUSerLogin.username || "Escribe tu username..."}
                  />
                </div>
                <div className="divInfoForm">
                <label>Correo: </label>
                  <input
                    type="text" name="email" id="email" value={form.email}  disabled={enableForm} onChange={handleOnChange} 
                    placeholder={dataUSerLogin.email || "Escribe tu email..."}
                    className={!enableForm&&(errors.email&&"inputError")}
                  />
                   {!enableForm&&(errors.email && (<p className="danger">{errors.email}</p>))}
                </div>

                <div className="divInfoForm">
                <label>Telefono: </label>
                  <input
                    type="text" name="phone" id="phone" value={form.phone} disabled={enableForm}  onChange={handleOnChange} 
                    placeholder={dataUSerLogin.phone || "Numero Telefonico..."}
                    className={!enableForm&&(errors.phone&&"inputError")}
                  />
                  {!enableForm&&(errors.phone && (<p className="danger">{errors.phone}</p>))}
                </div>

                <div className="divInfoForm">
                  <label>Pais: </label>
                  <input className="inputNacionality"
                      type="text" name="nacionality" id="nacionality" value={form.nacionality} disabled={true}  onChange={handleOnChange} 
                      placeholder={dataUSerLogin.nacionality ==="Undefined"?"...":dataUSerLogin.nacionality }
                    />
                    {
                      enableForm===false&&
                      <div >
                          <select name="nacionality" disabled={enableForm} onChange={handleOnChange} defaultValue="">
                            <option value="">Seleccione</option>
                            {
                            nationalities.map((e)=>(
                            <option key={e.id} value={e.nacionality}>{e.nacionality}</option>))
                            } 
                          </select>
                      </div>
                    }
                </div>

                <div className="divInfoForm" >
                  <label>Tipo de Documento:</label>
                  <input className="inputDocumentType"
                      type="text" name="documentType" id="documentType" value={form.documentType}  disabled={true} required onChange={handleOnChange} 
                      placeholder={dataUSerLogin.documentType ==="Undefined"?"... ":dataUSerLogin.documentType }
                  />
                  { enableForm===false&&
                    documentTipes.map((e) =>
                    <div key={e.id} className="divRadio">
                      <input type="radio" id={e.type} name="documentType" value={e.type} disabled={enableForm}  checked={check} onChange={handleChangeCheck} />
                      <label>{e.type}</label>
                    </div>)
                  }
                </div>

                <div className="divInfoForm">
                  <label>Num. Identificacion: </label>
                  <input
                    type="text" name="identification" id="identification" value={form.identification}  onChange={handleOnChange} disabled={enableForm}  
                    placeholder={dataUSerLogin.identification ==="Undefined"?"numero de identidad...":dataUSerLogin.identification }
                    className={!enableForm&&(errors.identification&&"inputErrorIdentification")}
                  />
                  {!enableForm&&(errors.identification && (<p className="danger">{errors.identification}</p>))}
                </div>
              </div>
            </form>
          </div>

          

          <div className="imag">
             <label>Imagen de Perfil</label>
            <img src={dataUSerLogin.image||logo} alt="not found" />
            {enableForm===false && 
            <>
              <div class="custom-input">
                 <input type="file" class="input-file" 
                 onChange={(e)=>{
                   var nameImg=e.target.files[0]
                   uploadImage(nameImg);
                 }}
                 /> Actualizar Imagen
              </div>
            </>  
            }
          </div>
            <div className="submit">
                {enableForm===false&&
                  <button type="submit" disabled={enableForm} onClick={handleonSubmit}>Actualizar Perfil</button>
                }
            </div>
        </div>
        <Sidebar />
    </div>
  );
};

export default CompleteData;