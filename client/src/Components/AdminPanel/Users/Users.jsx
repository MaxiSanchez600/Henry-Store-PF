import axios from "axios"
import { useEffect, useState } from "react"
import { GET_ALL_USERS} from "../../../Config/index"
import './Users.scss'
import { VscRefresh } from "react-icons/vsc";
import { RiSettings4Fill } from "react-icons/ri";
import actionsUponUsers from './actionsUponUsers/actionsUponUsers'

export default function Users () {
    const [users,setUsers] = useState([])
    const [reset,setReset] = useState (false)

    useEffect(()=>{
        axios.get(GET_ALL_USERS)
        .then(response=>{
            setUsers(response.data)
            setReset(false)
        })
    },[reset])
    let refreshAfterAction = ()=>{
        setReset(true)
    }

    return <div>
        <div className="container-table-users">
        <h1>Panel de Usuarios</h1>
        <div className="users-refresh-qty">
        <h4>Cantidad de usuarios creados: {users.length}</h4>
        <button className="button-refresh-user" onClick={()=>setReset(true)}><VscRefresh/></button>
        </div>
        <table className="content-table-users">
            <tr>
                <th></th>
                <th>Rol</th>
                <th>Acceso</th>
                <th>Estado de cuenta</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email Register</th>
                <th>Email Newsletter</th>
                <th>Username</th>
                <th>Tipo de Documento</th>
                <th>Identificacion</th>
                <th>Nacionalidad</th>
                <th>Ultimo Ingreso</th>
                <th>Fecha registro</th>
                <th>Origen de registro</th>
            </tr>
            {users?.map(user=>{
                return (<tr>
                    <td><div className="action-wheel-users"><RiSettings4Fill onClick={()=>actionsUponUsers(user.name, user.id_user, user.registrationOrigin, user.disabled, false, false, true, refreshAfterAction)}/></div></td>
                    <td>{user.Role.rol}</td>
                    <td>{user.disabled?"Bloqueado":"Permitido"}</td>
                    <td>{user.UserStatus.name_status}</td>
                    <td>{user.name?user.name:"-"}</td>
                    <td>{user.last_name?user.last_name:"-"}</td>
                    <td>{user.emailFireBase?user.emailFireBase:"-"}</td>
                    <td>{user.email?user.email:"-"}</td>
                    <td>{user.username?user.username:"-"}</td>
                    <td>{(user.DocumentType.name_document_type.toLowerCase() === "undefined")?"Incompleto":user.DocumentType.name_document_type}</td>
                    <td>{user.identification?user.identification:"-"}</td>
                    <td>{(user.Nacionality.name_nacionality.toLowerCase() === "undefined")?"Incompleto":user.Nacionality.name_nacionality}</td>
                    <td>{user.lastSignIn}</td>
                    <td>{user.creationTime}</td>
                    <td>{user.registrationOrigin}</td>
                </tr>)
            })}
        </table>
        </div>
    </div>
}