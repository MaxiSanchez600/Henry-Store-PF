import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {GET_DETAIL_ORDER} from "../../../../Config/index";
import "./OrderDetail.scss"
// const orderDetail =

//     {   
//         id_order: "13509980d47a11eb8cb72df2b289b295",
//         status:"pagada",
//         createdAt:"2021-06-23 18:23:54",
//         updateAt:"2021-06-23 18:23:54",
//         totalprice:"200",
//         spenthc:"5",
//         givenhc:"2",
        
//         products:[
//             {
//                 id_product:1,
//                 name:"Buso Henry",
//                 description:"Buzo elaborado en algodón perchado, de suave textura, estilo moderno , amplio bolsillo delantero, con estampado de Henry",
//                 price:1500,
//                 percentage_discount:20,
//                 product_amount:"2",
//                   Images: [
//                     {
//                       id_image: 4,
//                       name_image: 'https://raw.githubusercontent.com/mathfalcon/Henry-Store-e-commerce/master/client/public/products/henryHoodie.png'
//                     }
//                   ],
//                   Caracteristics: [
//                     {
//                       id_caracteristic: 1,
//                       name_caracteristic: 'color',
//                       values_caracteristic: [
//                         'Rojo'
//                       ]
//                     },
//                     {
//                       id_caracteristic: 3,
//                       name_caracteristic: 'genero',
//                       values_caracteristic: [
//                         'Unisex'
//                       ]
//                     },
//                     {
//                       id_caracteristic: 4,
//                       name_caracteristic: 'type',
//                       values_caracteristic: [
//                         'Buso'
//                       ]
//                     },
//                     {
//                       id_caracteristic: 2,
//                       name_caracteristic: 'size',
//                       values_caracteristic: [
//                         'M',
//                       ]
//                     }
//                   ]
//             },
//             {
//                 id_product: 3,
//                 name: 'Gorra Cohete Henry',
//                 description: 'Gorra Negra Henry Acrílica (Dirl Grueso) Adulto Con cierre en Hebilla. Ideal para uso diario.',
//                 price: 500,
//                 unit_stock: 5,
//                 spenthc:"10",
//                 givenhc:"20",
//                 percentage_discount: 10,
//                 product_amount:"5",
          
//                 Images: [
//                 {
//                     id_image: 2,
//                     name_image: 'https://raw.githubusercontent.com/mathfalcon/Henry-Store-e-commerce/master/client/public/products/henryCap.png'
//                 }
//                 ],
//                 Caracteristics: [
//                 {
//                     id_caracteristic: 1,
//                     name_caracteristic: 'color',
//                     values_caracteristic: [
//                     'Blanco',
//                     ]
//                 },
//                 {
//                     id_caracteristic: 4,
//                     name_caracteristic: 'type',
//                     values_caracteristic: [
//                     'Gorra'
//                     ]
//                 }
//                 ]
//             }
//         ]
//     }


const OrderDetail = (props) => {
    const idUrl = props.match.params.id;
    const [detailOrder, setDetailOrder] = useState({});
    
    useEffect(() => {
      axios.get(`${GET_DETAIL_ORDER}?idUrl=${idUrl}`)
      .then((response) => {
      setDetailOrder(response.data)
      })
      .catch((e)=>{
        alert(e);
      })
    }, []);


    
    return (
        <div>
          <div className="container-table">
            {console.log(detailOrder)}
            <h1>{`Detalle Orden # ${detailOrder.id_order}`}</h1> 
            <h3>{`Estatus: ${detailOrder.status}`}</h3>
            <h3>{`Fecha Actualizacion: ${detailOrder.updatedAt}`}</h3>
            <h3>{`Total Pagado: $${detailOrder.totalprice}`}</h3>
            {/* <h4>Cantidad de productos comprados: {detailOrder.products.length}</h4>  */}
          <div className="content-products">
            <div>
              <table className="content-table">
              < tbody > 
                <tr>
                    <th>Id Producto</th>
                    <th>Titulo</th>
                    <th>Imagen</th>
                    <th>Descripcion</th>
                    <th>Caracteristicas</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Descuento</th>
                    <th>Precio Total</th>    
                </tr>   
                {   
               
                detailOrder.products?.map((prod)=>{
                    return (
                    <tr key={prod.id_product}>
                      <td>{prod.id_product}</td>
                      <td>{prod.name}</td>
                      <td><img className="img-prod-table" src={prod.Images[0].name_image} alt="not"/></td>
                      <td>{prod.description}</td>
                       <td>
                         {prod.Caracteristics.map((characteristic)=>
                       <p>{characteristic.name_caracteristic} : {characteristic.values_caracteristic}</p>      
                      )}
                      </td>
                      <td>{`$ ${prod.price}`}</td>
                      <td>{prod.product_amount}</td>
                      <td>{prod.price*prod.product_amount}</td>
                      <td>{prod.percentage_discount} %</td>
                      <td>{(prod.price*prod.product_amount)-((prod.price*prod.product_amount)*prod.percentage_discount)/100}</td>
                    </tr>)  
                })
                }
                </tbody > 
              </table>
            </div>
          </div>
          </div>
        </div>
    );
};

export default OrderDetail;