import axios from "axios"
import { useEffect, useState } from "react"
import { ADMIN_ORDERS } from "../../../Config"
import { RiSettings4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import actionsUponOrders from "./actionsUponOrders/actionsUponOrders"
import "./Orders.scss"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export default function Orders () {

    const [orders,setOrders] = useState([])
    const [totalOrders,setTotalOrders] = useState("cargando...")
    const [filter,setFilter] = useState ("")
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(5)
    const [order,setOrder] = useState('DESC')
    const [reset,setReset] = useState(false);

    useEffect(()=>{
        axios.get(`${ADMIN_ORDERS}?${filter?`filter=${filter}&`:""}page=${page}&limit=${limit}&order=${order}`)
        .then(res=>{
            setOrders(res.data.results)
            setTotalOrders(res.data.total)
            setReset(false)
        })
        .catch(e=>console.log(e))
    },[ filter, limit, page, order, reset ])

    let refreshOrders = () => {
        setReset(true)
    }

    let infoUser = (name,phone,email) => {
        Swal.fire({
            buttonsStyling:false,
            customClass:{
                popup: 'popup-order-infouser',
                title: 'title-order-infouser',
                input: 'input-order-infouser',
                htmlContainer: 'content-order-infouser',
                validationMessage: 'validationMessage-order-infouser',
                actions: 'actions-order-infouser',
                confirmButton: 'confirmButton-order-infouser',
            },
            title:`Contacto de${name?` ${name}`:"l Usuario"}`,
            html:`Email: ${email?email:"Aún no tiene un email cargado"}<br>Teléfono: ${phone?phone:"Aún no tiene un teléfono cargado"} `
        })
    }

    return <div className='orderWrap'>
    <div className="container-table-order">
    <div className = "order-refresh-qty">
        <div>
            <h1 className="title-panel-orders">Panel de Ordenes</h1>
            <div className="title_stripe_orders"></div>
        </div>  
    <h4 className="qty-panel-orders">Cantidad de ordenes totales: {totalOrders}</h4>
    </div>
    <div className="divbuttons">
        {page===1?<button className="buttons-pagination-orders-disabled" disabled><IoIosArrowBack /></button>:<button className="buttons-pagination-orders" onClick={()=>setPage(page-1)}><IoIosArrowBack /></button>}
        {(page===(Math.ceil(totalOrders/limit)))?<button className="buttons-pagination-orders-disabled" disabled><IoIosArrowForward /></button>:<button className="buttons-pagination-orders" onClick={()=>setPage(page+1)}><IoIosArrowForward /></button>}
        <label>Ordenes por página:</label>
        <select className="list_select_orders" onChange={(e)=>setLimit(e.target.value)} >
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        <label>Ordenamiento</label>
        <select className="list_select_orders" onChange={(e)=>setOrder(e.target.value)} >
            <option value="DESC">Mas recientes</option>
            <option value="ASC">Menos recientes</option>
        </select>
        <label>Filtrado</label>
        <select className="list_select_orders" onChange={(e)=>setFilter(e.target.value)}>
            <option value="">Filtrar por...</option>
            <option value="cancelada">Canceladas</option>
            <option value="carrito">Carrito</option>
            <option value="pagada">Pagas</option>
            <option value="coordinar">A coordinar</option>
            <option value="completa">Completas</option>
        </select>
    </div>
    <table className="content-table-order">
        <tr className="column-names">
            <th></th>
            <th>ID Orden</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Comprador</th>
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
                <td><div className="action-wheel-order"><RiSettings4Fill onClick={()=>actionsUponOrders(order.id_order, order.UserIdUser, order.User.name, order.status, order.spenthc, order.givenhc, refreshOrders, order.User.email )}/></div></td>
                <td>{order.id_order}</td>
                <td>{(order.status === "completa")?"Despachada":(order.status[0].toUpperCase().concat(order.status.slice(1)))}</td>
                <td>
                    <div>
                        <p>{order.createdAt.slice(11,16)}</p>
                        <p>{order.createdAt.slice(0,10).split("-").reverse().join("-")}</p>
                    </div>
                </td>
                <td><div className="ontableclickeable" onClick={()=>infoUser(order.User.name, order.User.phone, order.User.email)}>{order.User.name?order.User.name:"Incompleto"}</div></td>
                <tr className="row-product">{order.OrderDetails?.map(item=>{
                    return (
                        <tr className="row-product2">
                            <td><img className="img-product-order" src={item.Product.Images[0].name_image} alt={item.Product.name}/></td>
                            <Link to= {`/home/item/${item.ProductIdProduct}`} ><td className="ontableclickeable">{item.Product.name}</td></Link>
                            <td>{item.product_amount+" "+"U."}</td>
                            <td>{`${item.Product.price} USD`}</td>
                        </tr>
                    )
                })}
                </tr>
                <td>{order.spenthc?order.spenthc:0}</td>
                <td>{order.givenhc?order.givenhc:0}</td>
                <td>{order.totalprice?`${order.totalprice} USD`:"No especif."}</td>
            </tr>)
        })}
    </table>
    </div>
</div>
}