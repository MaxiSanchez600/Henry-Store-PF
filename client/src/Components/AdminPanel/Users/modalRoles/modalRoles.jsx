import axios from "axios"
import { useEffect, useState } from "react"
import { CHANGE_ROL, GET_ROLES } from "../../../../Config"
import { IoChevronBackSharp } from "react-icons/io5"

export default function ModalRoles ({closeModal, id}) {
    const [roles,setRoles] = useState ([])

    useEffect(()=>{
        axios.get(GET_ROLES)
        .then(res=>{
            setRoles(res.data)
        })
    },[])

    let handleSubmit = function (e) {
        e.preventDefault();
        Object.values(e.target).forEach(e=>{
            if(e.checked === true){
                axios.put(CHANGE_ROL,{
                    id:id,
                    role:e.value,
                })
            }
        })
    }

    return <div>
        <h2>Selecciona su nuevo Rol</h2>
        <button onClick={()=>closeModal()}><IoChevronBackSharp/></button>
        <form onSubmit={handleSubmit}>
        {roles.map(r=>{
            return (<div>
                <label for={r.type}>{r.type}</label>
                <input type="radio" id={r.type} value={r.type} name="roles"/>
            </div>
            )
        })}
        <input type="submit" value="Enviar"/>
        </form>
    </div>
}