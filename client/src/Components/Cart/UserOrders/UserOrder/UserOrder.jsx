import React,{useEffect,useState} from 'react';
import Sidebar from "../../../Sidebar/Sidebar";
import axios from 'axios';
import {GET_MYORDERS, henryExchangeRoute} from "../../../../Config/index";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import './UserOrder.scss'


const UserOrder = () => {

var userLogged = localStorage.getItem('userlogged');
const [orders, setOrders] = useState([]);
const [total, settotal] = React.useState()
    const getprice = (async () =>{
        let ex = await henryExchangeRoute()
        return ex
    })
    useEffect(async () => {
    axios.get(`${GET_MYORDERS}?id=${userLogged}`)
    .then(async(response) => { 
        setOrders(response.data) 
        settotal(parseFloat(response.data[0].totalprice - (response.data[0].spenthc * await henryExchangeRoute())))  
    })
    }, []);

    return (
        <div>
            <div className="container-table-UserOrder">
                <h1>Mis Ordenes</h1>
                <table className="content-table-UserOrder">
                    <tr className="content-row-Title">
                        <th></th>
                        <th className="num-order">Num. Orden</th>
                        <th>Estado  </th>
                        <th className="fecha-order">Fecha Actualizacion</th>
                        <th className="HC-Usados">HC Usados</th>
                        <th className="HC-Usados">HC Ganados</th>
                        <th>Valor Pagado</th>
                        <th>ver</th>
                        <th></th>
                    </tr>
                    < tbody className = 'Contenedor_UserOrder'> 
                    {
                    orders.filter((order)=>order.status!=="carrito").map(order=>{
                        return (
                        <tr key={order.id_order}>
                            <td></td>
                            <td className="num-orden">{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{`${order.createdAt.slice(0,10).split("-").reverse().join("-")} - ${order.createdAt.slice(11,16)} `}</td>
                            <td>{order.spenthc}</td>
                            <td>{order.givenhc}</td>
                            <td>{`  $ ${total * localStorage.getItem("currency")}`}</td>
                            <td className="icon-eye"><Link to={`/home/myorders/${order.id_order}`} ><MdRemoveRedEye/></Link></td> 
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