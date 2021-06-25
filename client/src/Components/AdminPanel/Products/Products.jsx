import axios from "axios"
import { useEffect, useState } from "react"
import { PRODUCTS_URL} from "../../../Config/index"
import { VscRefresh } from "react-icons/vsc";
import './Products.scss'
import { RiSettings4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Products () {
    const [products,setProducts] = useState([])
    const [productsCount,setProductsCount] = useState ("cargando...")
    const [reset,setReset] = useState (false)

    useEffect(()=>{
        axios.get(PRODUCTS_URL)
        .then(response=>{
            setProducts(response.data.data)
            setProductsCount(response.data.data.length);
            setReset(false)
        })
    },[reset])

    return <div>
        <div className="container-table">
        <h1>Panel de Productos</h1>
         <h4>Cantidad de productos creados: {productsCount}</h4><button onClick={()=>setReset(true)}><VscRefresh/></button>
         <div className="content-products">
         <div>
            <table className="content-table">
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
                        {<td><Link to={`editProduct/${prod.id_product}`}><RiSettings4Fill/></Link></td>}
                        <td><img className="img-prod-table" src={ prod.Images[0].name_image } alt="not"/></td>
                        <td>{prod.name}</td>
                        <td>{prod.price}</td>
                        <td>{prod.unit_stock}</td>
                </tr>)
                })}
            </table>
        </div>
        <div>
            <table className="content-table">
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
                        <td><Link to={`editProduct/${prod.id_product}`}><RiSettings4Fill/></Link></td>
                        <td><img className="img-prod-table" src={prod.Images[0].name_image } alt="not"/></td>
                        <td>{prod.name}</td>
                        <td>{prod.price}</td>
                        <td>{prod.unit_stock}</td>
                    </tr>)
                })}
            </table>
        </div>
        </div>
        </div>
    </div>
}