import axios from "axios"
import { useEffect, useState } from "react"
import { PRODUCTS_URL} from "../../../Config/index"
import './Products.scss'
import { RiSettings4Fill } from "react-icons/ri";
import { actionsUponProducts } from "./ActionsUponProducts/ActionsUponProducts";
import {Link} from "react-router-dom"

export default function Products () {
    const [products,setProducts] = useState([])
    const [reset,setReset] = useState (false)


    useEffect(()=>{
        axios.get(PRODUCTS_URL)
        .then(response=>{
            setProducts(response.data.data)
            setReset(false)
        })
    },[reset])

    return <div className="container-table-product">
            <div className = "product-refresh-qty">
                <div>
                    <h1 className="title-panel-products">Panel de Productos</h1>
                    <div className="title_stripe_products"></div>
                </div>
                <h4 className="qty-panel-products">Cantidad de productos creados: {products.length}</h4>
            </div>
            <div className="content-products">
                <div>
                    <table className="content-table-product">
                        <tr>
                            <th></th>
                            <th>Imagen</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Stock</th>     
                        </tr>
                        {products.slice(0,products.length/2).map((prod, i)=>{
                            return (
                            <tr key={i}>
                                {<td className="wheel-products-table"><RiSettings4Fill onClick={()=>actionsUponProducts(prod.id_product,setReset)}/></td>}
                                <td><img className="img-product-table" src={ prod.Images[0].name_image } alt="Not found"/></td>
                                <td><Link  className="ontableclickeableprod" to= {`/home/item/${prod.id_product}`} >{prod.name}</Link></td>
                                <td>{prod.price+" USD"}</td>
                                <td>{prod.unit_stock+" U."}</td>
                            </tr>)
                        })}
                    </table>
                </div>
                <div>
                    <table className="content-table-product">
                        <tr>
                            <th></th>
                            <th>Imagen</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            
                        </tr>
                        {products.slice(products.length/2).map((prod, i)=>{
                            return (
                            <tr key={i}>
                                {<td className="wheel-products-table"><RiSettings4Fill onClick={()=>actionsUponProducts(prod.id_product,setReset)}/></td>}
                                <td><img className="img-product-table" src={prod.Images[0].name_image } alt="Not found"/></td>
                                <td className="ontableclickeableprod"><Link className="ontableclickeableprod" to= {`/home/item/${prod.id_product}`} >{prod.name}</Link></td>
                                <td>{prod.price+" USD"}</td>
                                <td>{prod.unit_stock+" U."}</td>
                            </tr>)
                        })}
                    </table>
                </div>
            </div>
        </div>
}