import React, { useState } from "react";

import "firebase/auth";
import { firebase } from "../../../Config/firebase-config";

const CompleteData = ({CompleteDataClose}) => {
  
    const stateFormData = {
        name: "",
        last_name: "",
        email: "",
        phone: "",
        username: "",
        nationality:"",
        documentType:"",
        num_documento: "",
        status:"",
        img: "",
  };

  const [form, setForm] = useState(stateFormData);

  let user = firebase.auth().currentUser;

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


  return (
    <div>
      <>
            <span className="close-button" onClick={()=>CompleteDataClose()}>
              x
            </span>
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
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  required
                  onChange={handleOnChange}
                  placeholder="name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={form.last_name}
                  required
                  onChange={handleOnChange}
                  placeholder="last_name"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={form.username}
                  required
                  onChange={handleOnChange}
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={form.email}
                  required
                  onChange={handleOnChange}
                  placeholder="email"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  required
                  onChange={handleOnChange}
                  placeholder="phone"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="dni"
                  id="dni"
                  value={form.dni}
                  required
                  onChange={handleOnChange}
                  placeholder="dni"
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
