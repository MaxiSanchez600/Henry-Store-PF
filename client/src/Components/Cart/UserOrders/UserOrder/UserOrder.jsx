import React,{useEffect,useState} from 'react';
import Sidebar from "../../../Sidebar/Sidebar";
import axios from 'axios';
import {GET_MYORDERS} from "../../../../Config/index";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import './UserOrder.scss'

//var idUser="QtPzcRRHoqXnpfbXMAJuB7254hk1";

const myOrder =
[
    {
        id_order: "13509980d47a11eb8cb72df2b289b295",
        status:"pagada",
        date:"2021-06-23 18:23:54",
        totalPrice:"200",
        hcSpent:"5",
        hcEarned:"2",
    },
    {
        id_order: "57cd0e40d48411eb8cb72df2b289b295",
        status:"completa",
        date:"2021-06-23 19:37:23",
        totalPrice:"500",
        hcSpent :"10",
        hcEarned:"20",
    }
]


const UserOrder = () => {

var userLogged = localStorage.getItem('userlogged');
const [orders, setOrders] = useState([]);
const [stateOrder, setStateOrder] = useState("");

    useEffect(() => {
    axios.get(`${GET_MYORDERS}?id=${userLogged}`)
    .then((response) => {
        // setOrders(myOrder)
        // console.log(orders);
    })
    .catch((e)=>{
        alert(e);
        setOrders(myOrder)
        //console.log(orders);
        })
    }, []);


    return (
        <div>
            <div className="container-table-UserOrder">
                <h1>Mis Ordenes</h1>
                <table className="content-table-UserOrder">
                    <tr>
                        <th></th>
                        <th>Num. Orden</th>
                        <th>Estado : 
                          <div>
                            <select name="nacionality" onChange={(e)=>setStateOrder(e.target.value)} defaultValue="">
                                <option value="">todas</option>
                                <option value="pagada">pagada</option>
                                <option value="coordinar">coordinar</option>
                                <option value="completa">completa</option>
                                <option value="cancelada">cancelada</option>
                            </select>
                          </div>
                      </th>
                        <th>Fecha Actualizacion</th>
                        <th>Valor Pagado</th>
                        <th>Henry Coints Gastados</th>
                        <th>Henry Coints Otorgados</th>
                        <th>ver</th>
                    </tr>
                     {stateOrder?orders.filter((order)=>order.status===stateOrder).map(order=>{
                        return (
                        <tr>
                            <td></td>
                            <td>{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{order.date}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.hcSpent}</td>
                            <td>{order.hcEarned}</td>
                            <td><Link to={`/home/myorders/${order.id_order}`} key={order.id_order}><MdRemoveRedEye/></Link></td> 
                        </tr>)
                    }):
                    orders.map(order=>{
                        return (
                        <tr>
                            <td></td>
                            <td>{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{order.date}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.hcSpent}</td>
                            <td>{order.hcEarned}</td>
                            <td><Link to={`/home/myorders/${order.id_order}`} key={order.id_order}><MdRemoveRedEye/></Link></td> 
                        </tr>)
                    })
                    } 
                </table>
            </div>
            <Sidebar />
        </div>

    );
};

export default UserOrder;