import axios from "axios"
import { useEffect, useState } from "react"
import { ADMIN_ORDERS } from "../../../Config"
import { RiSettings4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import actionsUponOrders from "./actionsUponOrders/actionsUponOrders"
import "./Orders.scss"


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
    <h1>Panel de Ordenes</h1>
    <div className = "order-refresh-qty">
    <h4>Cantidad de ordenes totales: {totalOrders}</h4>
    </div>
    <div>
        {page===1?<button disabled>PREV</button>:<button onClick={()=>setPage(page-1)}>PREV</button>}
        {(page===(Math.ceil(totalOrders/limit)))?<button disabled>NEXT</button>:<button onClick={()=>setPage(page+1)}>NEXT</button>}
        <label>Ordenes por pagina:</label>
        <select onChange={(e)=>setLimit(e.target.value)} >
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        <label>Ordenamiento</label>
        <select onChange={(e)=>setOrder(e.target.value)} >
            <option value="DESC">Descendente</option>
            <option value="ASC">Ascendente</option>
        </select>
        <label>Filtrado</label>
        <select onChange={(e)=>setFilter(e.target.value)}>
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
            <th>
                <p>Estado</p>
            </th>
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
                <td><div className="action-wheel-order"><RiSettings4Fill onClick={()=>actionsUponOrders(order.id_order, order.UserIdUser, order.User.name, order.status, order.spenthc, order.givenhc, refreshOrders )}/></div></td>
                <td>{order.id_order}</td>
                <td>{(order.status === "completa")?"Despachada":(order.status[0].toUpperCase().concat(order.status.slice(1)))}</td>
                <td>
                    <div>
                        <p>{order.createdAt.slice(11,16)}</p>
                        <p>{order.createdAt.slice(0,10).split("-").reverse().join("-")}</p>
                    </div>
                </td>
                <td><div onClick={()=>infoUser(order.User.name, order.User.phone, order.User.email)}>{order.User.name?order.User.name:"Incompleto"}</div></td>
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