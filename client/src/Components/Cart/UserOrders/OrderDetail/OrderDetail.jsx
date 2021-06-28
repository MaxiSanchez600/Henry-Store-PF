import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_DETAIL_ORDER } from "../../../../Config/index";
import PostReview from '../../../Reviews/PostReview'
import "./OrderDetail.scss"

const OrderDetail = (props) => {
  const idUrl = props.match.params.id;
  const [detailOrder, setDetailOrder] = useState({});

  useEffect(() => {
    axios.get(`${GET_DETAIL_ORDER}?idUrl=${idUrl}`)
      .then((response) => {
        setDetailOrder(response.data)
      })
      .catch((e) => {
        alert(e);
      })
  }, []);


// ! MODAL REVIEWS
const [show, setshow] = useState(false)
const [idproductReview, setidproductReview] = useState(0)

const closeModalHandler = () => setshow(false)


  // !  CONTENT
  return (
    <div className={show ? 'back_drop' : 'content_ordel_detail detail2'}>
      <div className="container-table-UserOrder detail_orders" >
        <h1>{`Detalle Orden # ${detailOrder.id_order}`}</h1>
        <h3>{`Estatus: ${detailOrder.status}`}</h3>
        <h3>{`Fecha Actualizacion: ${detailOrder.updatedAt}`}</h3>
        <h3>{`Total Pagado: $${detailOrder.totalprice}`}</h3>
        {/* <h4>Cantidad de productos comprados: {detailOrder.products.length}</h4>  */}

        <table className="content-table-UserOrder">
          <tr className={show ? 'back_drop' : "content-row-Title"}>
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
            <th>Califica!</th>
          </tr>
          {
            detailOrder.products?.map((prod) => {
              return (
                <tr key={prod.id_product} className={show ? 'back_drop' : ""} >
                  <td>{prod.id_product}</td>
                  <td>{prod.name}</td>
                  <td><img className="img-prod-table" src={prod.Images[0].name_image} alt="not" /></td>
                  <td>{prod.description}</td>
                  <td>
                    {prod.Caracteristics.map((characteristic) =>
                      <p>{characteristic.name_caracteristic} : {characteristic.values_caracteristic}</p>
                    )}
                  </td>
                  <td>{`$ ${prod.price}`}</td>
                  <td>{prod.product_amount}</td>
                  <td>{prod.price * prod.product_amount}</td>
                  <td>{prod.percentage_discount} %</td>
                  <td>{(prod.price * prod.product_amount) - ((prod.price * prod.product_amount) * prod.percentage_discount) / 100}</td>
                  <td>  <button onClick={()=>{
                    setshow(true);
                    setidproductReview(prod.id_product)
                    }}> Open </button> </td>
                </tr>)
            })
          }
        </table>
      </div>
      <div className="contain_modal">
      <PostReview  show={show} closeModalHandler={closeModalHandler} id_product={idproductReview}  />
      </div>

    </div>
  );
};

export default OrderDetail;