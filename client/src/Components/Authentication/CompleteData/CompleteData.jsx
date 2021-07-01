import React, { useState, useEffect } from "react";
import {PUT_DATA_USER} from "../../../Config/index"
import "./CompleteData.scss";
import "firebase/auth";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import {getNacionalities,getDocumentTypes} from "../../../Redux/actions/actionsUsers";
import {getUserLogin} from "../../../Redux/actions/actionsUsers";
import logo from "../../../Assets/Images/Logo_H_black.png";
import Sidebar from "../../Sidebar/Sidebar"


export function validate(form){
  let errors={};
  if(form.email){
    const re = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if(!re.test(form.email)){
      errors.email = 'Ingrese un Email valido..';
    } 
  }
  if(form.phone){
    if(!/^[0-9]+$/.test(form.phone)){
      errors.phone="No puede contener letras";
    }
  }
  if(form.identification){ 
    if(!/^[0-9]+$/.test(form.identification)){
      errors.identification="No puede contener letras";
    }
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
        image:""||dataUSerLogin.image,
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
    dispatch(getNacionalities());
    dispatch(getDocumentTypes());
    dispatch(getUserLogin(userLogged))
  }, []);
  
  useEffect(()=>{
    setForm({
      id:dataUSerLogin.id,
      image:dataUSerLogin.image,
      firstname: dataUSerLogin.name,
      lastname:dataUSerLogin.lastname,
      email: dataUSerLogin.email,
      phone: dataUSerLogin.phone,
      username:  dataUSerLogin.username,
      nacionality: dataUSerLogin.nacionality==="Undefined"?dataUSerLogin.nacionality="":dataUSerLogin.nacionality,
      documentType: dataUSerLogin.documentType==="Undefined"?dataUSerLogin.documentType="":dataUSerLogin.documentType,
      identification: dataUSerLogin.identification,
      status:"",
  });
  },[dataUSerLogin,enableForm])

  const handleonSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(errors).length !== 0 ){
       Swal.fire({
        buttonsStyling:false,
        iconColor: "#F64749",
        customClass:{
        popup: 'popup-errorUpdate_dataUser',
        title: 'title-errorUpdate_dataUser',
        confirmButton: 'confirmButton-errorUpdate_dataUser',
      },
        icon:"error",
        title:`Errores en el formulario.`,
        text: "Para continuar es necesario corrigas los campos marcados."
       })

       if(errors.phone){
        setErrors({})
        setForm({
          ...form,
         phone: dataUSerLogin.phone===null?"":dataUSerLogin.phone,
         });
       }
       if(errors.email){
        setErrors({})
        setForm({
          ...form,
          email: dataUSerLogin.email===null?"":dataUSerLogin.email
         });
       }
       if(errors.identification){
        setErrors({})
        setForm({
          ...form,
          identification: dataUSerLogin.identification===null?"":dataUSerLogin.identification,
         });
       }
      
    }
    else{
      dataToSend=form;
      (dataToSend.nacionality==="")?dataToSend.nacionality="":dataToSend.nacionality=(nationalities.find(n=>form.nacionality===n.nacionality).id);
      (dataToSend.documentType==="")?dataToSend.documentType="":dataToSend.documentType=documentTipes.find(d=> form.documentType===d.type).id;

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
        (dataToSend.nacionality==="")?dataToSend.nacionality="":dataToSend.nacionality= nationalities.find(n=>form.nacionality===n.id).nacionality;
        (dataToSend.documentType==="")?dataToSend.documentType="":dataToSend.documentType=documentTipes.find(d=> form.documentType===d.id).type;
        dispatch(getUserLogin(userLogged));
      })
    .catch ((err)=>{
      setForm({
        id:dataUSerLogin.id,
        image:dataUSerLogin.image,
        firstname: dataUSerLogin.name,
        lastname:dataUSerLogin.lastname,
        email: dataUSerLogin.email,
        phone: dataUSerLogin.phone,
        username:  dataUSerLogin.username,
        nacionality: dataUSerLogin.nacionality==="Undefined"?dataUSerLogin.nacionality="":dataUSerLogin.nacionality,
        documentType: dataUSerLogin.documentType==="Undefined"?dataUSerLogin.documentType="":dataUSerLogin.documentType,
        identification: dataUSerLogin.identification,
        status:"",
    });

    return Swal.fire({
      buttonsStyling:false,
      iconColor: "#F64749",
      customClass:{
      popup: 'popup-errorUpdate_dataUser',
      title: 'title-errorUpdate_dataUser',
      confirmButton: 'confirmButton-errorUpdate_dataUser',
    },
      icon:"error",
      title:`Username ya asignado`,
      text: "Para continuar es necesario elijas otro Username."
    })
    });
    }
  };
  const handleOnChangeEmail=(e)=>{
    setErrors(validate({
      ...form,
      email: e.target.value,
    }))
    setForm({
      ...form,
      email: e.target.value,
    });
  }
  const handleOnChangeIdent=(e)=>{
    setErrors(validate({
      ...form,
      identification: e.target.value,
    }))
    setForm({
      ...form,
      identification: e.target.value,
    });
  }
  const handleOnChangeTel=(e)=>{
    setErrors(validate({
      ...form,
      phone: e.target.value,
    }))
    setForm({
      ...form,
      phone: e.target.value,
    });
  }

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
      setErrors({})
      setForm({
        email: dataUSerLogin.email===null?"":dataUSerLogin.email,
        phone: dataUSerLogin.phone===null?"":dataUSerLogin.phone,
        identification: dataUSerLogin.identification===null?"":dataUSerLogin.identification,
    });
      setEnableForm(true);
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
                    placeholder={dataUSerLogin.name || "Escribe tu nombre..."}
                  />
                </div>
                <div className="divInfoForm">
                <label>Apellido: </label>
                  <input
                    type="text" name="lastname" id="lastname" value={form.lastname} disabled={enableForm} onChange={handleOnChange}
                    placeholder={dataUSerLogin.lastname || "Escribe tu apellido..."}
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
                    type="text" name="email" id="email" value={form.email}  disabled={enableForm} onChange={handleOnChangeEmail} 
                    placeholder={dataUSerLogin.email || "Escribe tu email..."}
                    className={!enableForm&&(errors.email&&"inputError")}
                  />
                   {!enableForm&&(errors.email && (<p className="danger">{errors.email}</p>))}
                </div>

                <div className="divInfoForm">
                <label>Telefono: </label>
                  <input
                    type="text" name="phone" id="phone" value={form.phone} disabled={enableForm}  onChange={handleOnChangeTel} 
                    placeholder={dataUSerLogin.phone || "Numero Telefonico..."}
                    className={!enableForm&&(errors.phone&&"inputError")}
                  />
                  {!enableForm&&(errors.phone && (<p className="danger">{errors.phone}</p>))}
                </div>

                <div className="divInfoForm">
                  <label>Pais: </label>
                  <input className="inputNacionality"
                      type="text" name="nacionality" id="nacionality" value={form.nacionality} disabled={true}  onChange={handleOnChange} 
                      placeholder={dataUSerLogin.nacionality ===""?"...":dataUSerLogin.nacionality }
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
                      placeholder={dataUSerLogin.documentType ===""?"...":dataUSerLogin.documentType }
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
                    type="text" name="identification" id="identification" value={form.identification}  onChange={handleOnChangeIdent} disabled={enableForm}  
                    placeholder={dataUSerLogin.identification ===null?"numero de identidad...":dataUSerLogin.identification }
                    className={!enableForm&&(errors.identification&&"inputErrorIdentification")}
                  />
                  {!enableForm&&(errors.identification && (<p className="danger">{errors.identification}</p>))}
                </div>
              </div>
            </form>
          </div>

          

          <div className="imag">
             <label>Imagen de Perfil</label>
            <img src={form.image||logo} alt="not found" />
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