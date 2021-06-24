import axios from "axios"
import { useEffect, useState } from "react"
import { ADMIN_ORDERS } from "../../../Config"
import { RiSettings4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { VscRefresh } from "react-icons/vsc";
import actionsUponOrders from "./actionsUponOrders/actionsUponOrders"
import "./Orders.scss"


export default function Orders () {
    const [orders,setOrders] = useState([])
    const [reset,setReset] = useState (false)

    useEffect(()=>{
        axios.get(ADMIN_ORDERS)
        .then(res=>{
            setOrders(res.data)
            setReset(false)
        })
    },[reset])

    let refreshOrders = () => {
        setReset(true)
    }

    return <div>
    <div className="container-table-order">
    <h1>Panel de Ordenes</h1>
    <div className = "order-refresh-qty">
    <h4>Cantidad de ordenes totales: {orders.length}</h4>
    <button className= "button-refresh-order" onClick={()=>setReset(true)}><VscRefresh/></button>
    </div>
    <table className="content-table-order">
        <tr className="column-names">
            <th></th>
            <th>ID Orden</th>
            <th>Estado</th>
            <th>Fecha de Creacion</th>
            <th>Comprador</th>
            <th>Email</th>
            <th>Telefono</th>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
            <th>HenryCoins Gastados</th>
            <th>HenryCoins Otorgados</th>
            <th>Precio Total</th>
        </tr>
        {orders?.map(order=>{
            return (<tr className= "order-rows">
                <td><div className="action-wheel-order"><RiSettings4Fill onClick={()=>actionsUponOrders(order.id_order, order.UserIdUser, order.User.name, order.status, order.spenthc, order.givenhc, refreshOrders )}/></div></td>
                <td>{order.id_order}</td>
                <td>{(order.status === "completa")?"Despachada":(order.status[0].toUpperCase().concat(order.status.slice(1)))}</td>
                <td>{order.createdAt}</td>
                <td>{order.User.name?order.User.name:"Incompleto"}</td>
                <td>{order.User.email?order.User.email:"Incompleto"}</td>
                <td>{order.User.phone?order.User.phone:"Incompleto"}</td>
                <tr className="row-product">{order.OrderDetails?.map(item=>{
                    return (
                            <tr className="row-product2">
                                <td><img className="img-product-order" src={item.Product.Images[0].name_image} alt={item.Product.name}/></td>
                                <Link to= {`/home/item/${item.ProductIdProduct}`} ><td>{item.Product.name}</td></Link>
                                <td>{item.product_amount}</td>
                                <td>{item.Product.price}</td>
                            </tr>
                    )
                })}
                </tr>
                <td>{order.spenthc}</td>
                <td>{order.givenhc}</td>
                <td>{order.totalprice}</td>
            </tr>)
        })}
    </table>
    </div>
</div>
}