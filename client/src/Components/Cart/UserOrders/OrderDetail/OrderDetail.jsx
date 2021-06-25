import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {GET_DETAIL_ORDER} from "../../../../Config/index";

const orderDetail =
[
    {
        id_order: "13509980d47a11eb8cb72df2b289b295",
        status:"pagada",
        date:"2021-06-23 18:23:54",
        totalPrice:"200",
        hcSpent:"5",
        hcEarned:"2",
        products:[

            {
                id_product:1,
                name:"Buso Henry",
                description:"Buzo elaborado en algodón perchado, de suave textura, estilo moderno , amplio bolsillo delantero, con estampado de Henry",
                price:1500,
                weight:100,
                size:50,
                percentage_discount:0,
                promotion:0,
                Categories: [
                    {
                      id_category: 1,
                      name_category: 'Ropa'
                    }
                  ],
                  Images: [
                    {
                      id_image: 4,
                      name_image: 'https://raw.githubusercontent.com/mathfalcon/Henry-Store-e-commerce/master/client/public/products/henryHoodie.png'
                    }
                  ],
                  Caracteristics: [
                    {
                      id_caracteristic: 1,
                      name_caracteristic: 'color',
                      values_caracteristic: [
                        'Rojo'
                      ]
                    },
                    {
                      id_caracteristic: 3,
                      name_caracteristic: 'genero',
                      values_caracteristic: [
                        'Unisex'
                      ]
                    },
                    {
                      id_caracteristic: 4,
                      name_caracteristic: 'type',
                      values_caracteristic: [
                        'Buso'
                      ]
                    },
                    {
                      id_caracteristic: 2,
                      name_caracteristic: 'size',
                      values_caracteristic: [
                        'M',
                      ]
                    }
                  ]
            },
            {
                id_product: 3,
                name: 'Gorra Cohete Henry',
                description: 'Gorra Negra Henry Acrílica (Dirl Grueso) Adulto Con cierre en Hebilla. Ideal para uso diario.',
                price: 500,
                unit_stock: 5,
                henry_coin: 5,
                weight: 80,
                size: 20,
                percentage_discount: 0,
                promotion: 0,
                Tags: [],
                Categories: [
                {
                    id_category: 1,
                    name_category: 'Ropa'
                }
                ],
                Images: [
                {
                    id_image: 2,
                    name_image: 'https://raw.githubusercontent.com/mathfalcon/Henry-Store-e-commerce/master/client/public/products/henryCap.png'
                }
                ],
                Caracteristics: [
                {
                    id_caracteristic: 1,
                    name_caracteristic: 'color',
                    values_caracteristic: [
                    'Blanco',
                    ]
                },
                {
                    id_caracteristic: 4,
                    name_caracteristic: 'type',
                    values_caracteristic: [
                    'Gorra'
                    ]
                }
                ]
            }
        ]
    },
]

const OrderDetail = (props) => {
    const idUrl = props.match.params.id;
    //console.log(idUrl)
    const [detailOrder, setDetailOrder] = useState([]);

    useEffect(() => {
    axios.get(`${GET_DETAIL_ORDER}?id=${idUrl}`)
    .then((response) => {
        // setDetailOrder(orderDetail)
    })
    .catch((e)=>{
      alert(e);
      setDetailOrder(orderDetail);
        })
    }, []);

    return (
        <div>
          <div className="container-table">
            { detailOrder.map(detail=>{
                        return (
                          <>
                          <h1>Detalle de la orden numero :{detail.id_order}</h1> 
                          <h2>Estatus:{detail.status}</h2>
                          <h2>Fecha Actualizacion:{detail.date}</h2>
                          <h2>Total Pagado:{detail.totalPrice}</h2>
                          <h2>HenryCoints Gastados:{detail.hcSpent}</h2>
                          <h2>HenryCoints Ganados:{detail.hcEarned}</h2>  
                          </>
                        )
              })}
           
          {/* <h4>Cantidad de productos comprados: {productsCount}</h4> */}
          <div className="content-products">
            <div>
                <table className="content-table">
                    <tr>
                        <th>Numero</th>
                        <th>Titulo</th>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Caracteristicas</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Precio Total</th>    
                    </tr>   
                    {
                      console.log(detailOrder[0].products)
                    // [detailOrder].products.map((prod)=>{
                    //     return (
                    //     <tr key={prod.id_product}>
                    //       <td>{prod.id_product}</td>
                    //       <td>{prod.name}</td>
                    //       <td><img className="img-prod-table" src={prod.Images[0].name_image} alt="not"/></td>
                    //       <td>{prod.description}</td>
                    //       {
                    //       prod.Caracteristics.map((characteristic)=>
                    //         <td>{characteristic.name_caracteristic} : {characteristic.values_caracteristic}</td>
                          
                    //       )}
                    //     </tr>)
                    // })
                    } 
                </table>
            </div>
          </div>
          </div>
        </div>
    );
};

export default OrderDetail;