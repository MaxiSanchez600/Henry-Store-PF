import axios from "axios"
import { useEffect, useState } from "react"
import {GET_ALL_USERS} from "../../../Config/index"
export default function Users () {
const [users,setUsers] = useState([])
const [usersCount,setUsersCount] = useState (0)
    useEffect(()=>{
        axios.get(GET_ALL_USERS)
        .then(response=>{
            setUsers(response.data.rows)
            setUsersCount(response.data.count)
        })
    },[])

    return <div>
        <h1>Panel de Usuarios</h1>
        <h4>Cantidad de usuarios creados: {usersCount}</h4>
        {users.map(u=><h6>{u.username}</h6>)}
    </div>
}