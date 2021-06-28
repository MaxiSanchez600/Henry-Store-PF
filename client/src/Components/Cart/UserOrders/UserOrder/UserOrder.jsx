import React,{useEffect,useState} from 'react';
import Sidebar from "../../../Sidebar/Sidebar";
import axios from 'axios';
import {GET_MYORDERS} from "../../../../Config/index";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import './UserOrder.scss'
import { FaFilter } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

const UserOrder = () => {

var userLogged = localStorage.getItem('userlogged');
const [stateOrder, setStateOrder] = useState("");
const [orders, setOrders] = useState([]);
const [sortOrders, setSortOrders] = useState(false);
const [title, setTitle] = useState("");
const [searchOrder, setSearchOrder] = useState([]);

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

useEffect(() => {
    if(!title){
        setSearchOrder([]);
    }
}, [title]);

const filter = (event) => {
    setTitle(event.target.value);
    const searchText=title.toLowerCase();
    for (const order of orders) {
        let idOrder = order.id_order.toLowerCase();
        if(idOrder.indexOf(searchText) !== -1){
            let orders=[]
            orders.push(order)
            setSearchOrder(orders);
        }
    }
  };


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
                    <tr className="content-row-Filter">
                        <th className="icon-Filter" onClick={()=>{setTitle("");setStateOrder("")}}><FaFilter/></th>
                        <th className="input-Filter-order" ><input type="text" name="title" id="title" placeholder="Ingrese Num Orden..." value={title} onChange={filter}/>
                            <span onClick={()=>{setTitle("")}}><GrClearOption/></span>
                        </th>
                        <th>
                          <div>
                            <select name="nacionality" onChange={(e)=>setStateOrder(e.target.value)} defaultValue="" >
                                <option value="">Seleccione</option>
                                <option value="">Todas</option>
                                <option value="pagada">Pagada</option>
                                <option value="a coordinar">Coordinar</option>
                                <option value="despachada">Despachada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                          </div>
                        </th>
                        <th>
                            <button className="button-Filter-order" onClick={orderReverse}>{sortOrders?"recientes":"mas antiguas"}</button>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    < tbody className = 'Contenedor_UserOrder'> 
                    {
                    searchOrder.length!==0?searchOrder.filter((order)=>order.status!=="carrito").map(order=>{ 
                        return (
                        <tr key={order.id_order}>
                            <td></td>
                            <td className="num-orden">{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{`${order.createdAt.slice(0,10).split("-").reverse().join("-")} - ${order.createdAt.slice(11,16)} `}</td>
                            <td>{order.spenthc}</td>
                            <td>{order.givenhc}</td>
                            <td>{`  $ ${order.totalprice}`}</td>
                            <td className="icon-eye"><Link to={`/home/myorders/${order.id_order}`} ><MdRemoveRedEye/></Link></td> 
                            <td></td>
                        </tr>)
                    }):(
                     stateOrder?orders.filter((order)=>order.status===stateOrder && order.status!=="carrito").map((order)=>{
                        return (
                        <tr key={order.id_order}  >
                            <td></td>
                            <td className="num-orden">{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{`${order.createdAt.slice(0,10).split("-").reverse().join("-")} - ${order.createdAt.slice(11,16)} `}</td>
                            <td>{order.spenthc}</td>
                            <td>{order.givenhc}</td>
                            <td>{` $ ${order.totalprice}`}</td>
                            <td className="icon-eye"><Link to={`/home/myorders/${order.id_order}`}><MdRemoveRedEye/></Link></td> 
                            <td></td>
                        </tr>)
                    }):
                    orders.filter((order)=>order.status!=="carrito").map(order=>{
                        return (
                        <tr key={order.id_order}>
                            <td></td>
                            <td className="num-orden">{order.id_order}</td>
                            <td>{order.status}</td>
                            <td>{`${order.createdAt.slice(0,10).split("-").reverse().join("-")} - ${order.createdAt.slice(11,16)} `}</td>
                            <td>{order.spenthc}</td>
                            <td>{order.givenhc}</td>
                            <td>{`  $ ${order.totalprice}`}</td>
                            <td className="icon-eye"><Link to={`/home/myorders/${order.id_order}`} ><MdRemoveRedEye/></Link></td> 
                            <td></td>
                        </tr>)
                    })
                    )
                    }
                      </tbody > 
                </table>
            </div>
            <Sidebar />
        </div>

    );
};

export default UserOrder;