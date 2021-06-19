import axios from "axios"
import { useEffect, useState } from "react"
import { GET_ALL_USERS} from "../../../Config/index"
import './Users.scss'
import { CgArrowsExchange } from 'react-icons/cg'
import { VscRefresh } from "react-icons/vsc";
import { RiShieldUserLine } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import Modal from "../../Modal/Modal"
import ModalRoles from './ModalRoles/ModalRoles'
import actionsUponUsers from './actionsUponUsers/actionsUponUsers'

export default function Users () {
    let initModalRol={
        idUser: "",
        boolean: false
    }
    const [users,setUsers] = useState([])
    const [usersCount,setUsersCount] = useState (0)
    const [reset,setReset] = useState (false)
    const [modalRol,setModalRol] = useState (initModalRol)

    useEffect(()=>{
        axios.get(GET_ALL_USERS)
        .then(response=>{
            setUsers(response.data)
            setUsersCount(response.data.length)
            setReset(false)
        })
    },[reset])

    let changeRol = function (id,tof) {
        setModalRol({
            ...modalRol,
            idUser: id,
            boolean: tof
        })
    }


    return <div>
        <h1>Panel de Usuarios</h1><button >asd</button>
        <h4>Cantidad de usuarios creados: {usersCount}</h4><button onClick={()=>setReset(true)}><VscRefresh/></button>
        {modalRol && <Modal isOpened={modalRol.boolean}
                            children={<ModalRoles
                                        id={modalRol.idUser} 
                                        reset={()=>setReset(true)} 
                                        closeModal={()=>setModalRol({...modalRol,boolean:false})}
                                        />}>
                     </Modal>}
        <table>
            <tr>
                <th>BAN</th>
                <th>Rol</th>
                <th>Acceso</th>
                <th>Estado</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email Register</th>
                <th>Email Newsletter</th>
                <th>Username</th>
                <th>Telefono</th>
                <th>Tipo de Documento</th>
                <th>Identificacion</th>
                <th>Nacionalidad</th>
                <th>Ultimo Ingreso</th>
                <th>Fecha registro</th>
                <th>Origen de registro</th>
            </tr>
            {users.map(user=>{
                return (<tr>
                    <td><button onClick={()=>actionsUponUsers(user.name, user.id_user, user.disabled, null, true)}>{user.disabled?<RiShieldUserFill/>:<RiShieldUserLine/>}</button></td>
                    <td>{user.Role.rol}<button onClick={()=>changeRol(user.id_user,true)}><CgArrowsExchange/></button></td>
                    <td>{user.disabled?"Bloqueado":"Permitido"}</td>
                    <td>{user.UserStatus.name_status}</td>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.emailFireBase}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.DocumentType.name_document_type}</td>
                    <td>{user.identification}</td>
                    <td>{user.Nacionality.name_nacionality}</td>
                    <td>{user.lastSignIn}</td>
                    <td>{user.creationTime}</td>
                    <td>{user.registrationOrigin}</td>
                </tr>)
            })}
        </table>
    </div>
}