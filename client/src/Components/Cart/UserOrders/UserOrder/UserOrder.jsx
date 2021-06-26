import React,{useEffect,useState} from 'react';
import Sidebar from "../../../Sidebar/Sidebar";
import axios from 'axios';
import {GET_MYORDERS} from "../../../../Config/index";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import './UserOrder.scss'

import { FaFilter } from "react-icons/fa";
const UserOrder = () => {

var userLogged = localStorage.getItem('userlogged');
const [stateOrder, setStateOrder] = useState("");
const [orders, setOrders] = useState([]);
const [sortOrders, setSortOrders] = useState(false);

    useEffect(() => {
    axios.get(`${GET_MYORDERS}?id=${userLogged}`)
    .then((response) => {
        if(!sortOrders){
            setOrders(response.data)
        }else{
            setOrders(response.data.reverse())
        }
    })
    .catch((e)=>{
        alert(e);
    })
    }, [sortOrders]);

const orderReverse=(e)=>{
    e.preventDefault();
    if(sortOrders){
        setSortOrders(false)
    }else {
        setSortOrders(true)
    }
}

    return (
        <div>
            <div className="container-table-UserOrder">
                <h1>Mis Ordenes</h1>
                <table className="content-table-UserOrder">
                    <tr className="content-row-Title">
                        <th></th>
                        <th className="num-orden">Num. Orden</th>
                        <th>Estado : </th>
                        <th>Fecha Actualizacion</th>
                        <th>Valor Pagado</th>
                        <th>Henry Coints Gastados</th>
                        <th>Henry Coints Otorgados</th>
                        <th>ver</th>
                        <th></th>
                    </tr>
                    <tr className="content-row-Filter">
                        <th className="icon-Filter"><FaFilter/></th>
                        <th><input /></th>
                        <th>
                          <div>
                            <select name="nacionality" onChange={(e)=>setStateOrder(e.target.value)} defaultValue="" >
                                <option value="">Seleccione</option>
                                <option value="pagada">Pagada</option>
                                <option value="coordinar">Coordinar</option>
                                <option value="completa">Completa</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                          </div>
                        </th>
                        <th>
                            <button onClick={orderReverse}>{sortOrders?"recientes":"mas antiguas"}</button>
                        </th>
                        <th><input /></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    < tbody className = 'Contenedor_UserOrder'> 
                 
                     {
                       
                     stateOrder?orders.filter((order)=>order.status===stateOrder).map((order)=>{
                        return (
                        <tr key={order.id_order}  >
                            <td></td>
                            <td className="num-orden">{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{order.createdAt}</td>
                            <td>{` $ ${order.totalprice}`}</td>
                            <td>{order.spenthc}</td>
                            <td>{order.givenhc}</td>
                            <td><Link to={`/home/myorders/${order.id_order}`}><MdRemoveRedEye/></Link></td> 
                            <td></td>
                        </tr>)
                    }):

                    orders.map(order=>{
                        return (
                        <tr key={order.id_order}>
                            <td></td>
                            <td className="num-orden">{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{order.createdAt}</td>
                            <td>{`  $ ${order.totalprice}`}</td>
                            <td>{order.spenthc}</td>
                            <td>{order.givenhc}</td>
                            <td><Link to={`/home/myorders/${order.id_order}`} ><MdRemoveRedEye/></Link></td> 
                            <td></td>
                        </tr>)
                    })
                    } 
                      </tbody > 
                </table>
            </div>
            <Sidebar />
        </div>

    );
};

export default UserOrder;