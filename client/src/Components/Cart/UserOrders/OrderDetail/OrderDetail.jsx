import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_DETAIL_ORDER } from "../../../../Config/index";
import PostReview from '../../../Reviews/PostReview'
import "./OrderDetail.scss"
import Sidebar from "../../../Sidebar/Sidebar";
import { getAllReviews } from '../../../../Redux/actions/actionsProducts';

const OrderDetail = ({ getAllReviews, ReviewsProduct, match, REVIEWS_ORDER }) => {
  const idUrl = match.params.id;
  const [detailOrder, setDetailOrder] = useState({});

  useEffect(() => {
    axios.get(`${GET_DETAIL_ORDER}?idUrl=${idUrl}`)
      .then((response) => {
        setDetailOrder(response.data)
        // console.log(response.data)
      })
      .catch((e) => {
        // console.log(e)
      })
  }, []);

  // ! MODAL REVIEWS
  const [show, setshow] = useState(false)
  const [idproductReview, setidproductReview] = useState(0)

  const closeModalHandler = () => {
    document.getElementById("formpost").reset();
    setshow(false)
  }

  // !  CONTENT
  return (
    <div className='content_ordel_detail detail2'>
      <div className={show ? 'content_ordel_detail back_drop' : "container-table-UserOrder detail_orders"} >
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
            detailOrder.products?.map((prod, index) => {
              let OneReview = detailOrder.products.filter(e => e.id_product == prod.id_product)
              console.log(OneReview[0].UserReviews)

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

                  {(OneReview[0].UserReviews && OneReview[0].UserReviews.length === 0) ?
                    <td>
                      <div className="btnforPost">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                          <defs>
                            <filter id="gooey">
                              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="highContrastGraphic" />
                              <feComposite in="SourceGraphic" in2="highContrastGraphic" operator="atop" />
                            </filter>
                          </defs>
                        </svg>
                        <button id="gooey-button" onClick={() => {
                          window.scrollTo(1000, 0, 'smooth')
                          setshow(true);
                          setidproductReview(prod.id_product)
                        }}>
                        ¡CALIFICA!
                          <span className="bubbles">
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                            <span className="bubble"></span>
                          </span>
                        </button>

                      </div>
                    </td> :
                    <td>
                      <div className="btnforPost2">
                        <div><span class="iconify" data-icon="emojione:white-heavy-check-mark" data-inline="false"></span> Ya calificaste! </div>
                      </div>
                    </td>}

                </tr>)
            })
          }
        </table>
      </div>
      <div className={show ? 'contain_modal' : ""}>
        <PostReview show={show} closeModalHandler={closeModalHandler} id_product={idproductReview} />
      </div>
      <Sidebar />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    REVIEWS_ORDER: state.products.reviews,
  }
}


function mapDispatchToProps(dispatch) {
  return {

    getAllReviews: (Id_Product) => dispatch(getAllReviews(Id_Product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);