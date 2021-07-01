import React, { useState, useEffect } from 'react';
import { URL_BASE } from '../../Config/index.js'
import { connect } from 'react-redux';
import { getAllFilteredProducts, addProductToCart, getAllReviews,  } from '../../Redux/actions/actionsProducts';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import SliderCarousel from '../../Components/SliderCarrousel/SliderCarrousel';
import AllReviews from '../../Components/Reviews/AllReviews'
import StarRating from '../../Components/Reviews/StarRating'
import NotFound from '../../Components/NotFound/NotFound';

function Product_Detail({ ListProducts, getAllFilteredProducts, currencyactual, currencyactualname, getAllReviews, ReviewsProduct }) {

  const { id } = useParams();
  const ID_Product = ListProducts.find(el => el.id_product === parseInt(id));

  const [productCaracteristics, setProductCaracteristics] = useState({
    caracteristics: {}
  });

  let sendproduct = async () => {
    if (localStorage.getItem('userlogged') !== null) {
      //Esta logeado
      productCaracteristics.user_id = localStorage.getItem('userlogged')
      const options = {
        method: 'POST',
        body: JSON.stringify(productCaracteristics),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      await fetch(URL_BASE + 'cart/addproducttocart', options)
        .then(() =>
          Swal.fire({
            title:`Producto agregado al Carrito.`,
            icon:'success',
            iconColor: "#49AF41",
            showConfirmButton: false,
            timer:1500,
            customClass:{
              popup: 'popup-addCart',
              title: 'title-addCart',
            },
          })
          )
    }
    else {
      if (localStorage.getItem('userid') === null) {
        //No esta lgoeado y no hay guest => Lo creo
        const userguest = await fetch(URL_BASE + 'cart/adduserguest', { method: 'PUT' })
        const userguestresponse = await userguest.json()
        localStorage.setItem('userid', userguestresponse.userid)
        productCaracteristics.user_id = userguestresponse.userid
        const options = {
          method: 'POST',
          body: JSON.stringify(productCaracteristics),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        await fetch(URL_BASE + 'cart/addproducttocart', options)
          .then(() =>
            Swal.fire({
              title:`Producto agregado al carrito.`,
              icon:'success',
              iconColor: "#49AF41",
              showConfirmButton: false,
              timer:1500,
              customClass:{
                popup: 'popup-addCart',
                title: 'title-addCart',
              },
            }))
      }
      else {
        //No esta logeado pero hay guest
        productCaracteristics.user_id = localStorage.getItem('userid')
        const options = {
          method: 'POST',
          body: JSON.stringify(productCaracteristics),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        await fetch(URL_BASE + 'cart/addproducttocart', options)
          .then(() =>
          Swal.fire({
            title:`Producto agregado .`,
            icon:'success',
            iconColor: "#49AF41",
            showConfirmButton: false,
            timer:1500,
            customClass:{
              popup: 'popup-addCart',
              title: 'title-addCart',
            },
           })
            )
      }
    }
  }

  useEffect(() => {
    if (!ListProducts.length) getAllFilteredProducts();
    getAllReviews(id)
  }, []);


  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (ID_Product && ID_Product.unit_stock > 0) {

      setProductCaracteristics((previousState) => {
        const initialState = {
          product_id: ID_Product.id_product,
          amount: 1,
          caracteristics: {}
        }
        ID_Product.Caracteristics.forEach(caracteristic => {
          initialState.caracteristics[caracteristic.name_caracteristic] = caracteristic.values_caracteristic[0];
        })
        return initialState;
      });
    }
  }, [ID_Product]);

  let handleproductCaracteristics = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name").split("_")[0];
    if (e.target.getAttribute("name") !== "amount") {
      setProductCaracteristics({
        ...productCaracteristics,
        caracteristics: {
          ...productCaracteristics.caracteristics,
          [name]: e.target.getAttribute("value")
        }
      });
    }
    else if (e.target.getAttribute("name") === "amount") {
      if (e.target.getAttribute("value") > ID_Product.unit_stock) {
        setProductCaracteristics({
          ...productCaracteristics,
          [e.target.getAttribute("name")]: ID_Product.unit_stock
        });
      }
      else {
        setProductCaracteristics({
          ...productCaracteristics,
          [e.target.getAttribute("name")]: parseInt(e.target.getAttribute("value"))
        });
      }
    }
  }

  function handleproductCaracteristicsInput(e) {
    e.preventDefault();
    const name = e.target.name.split("_")[0];
    if (e.target.name !== "amount") {
      setProductCaracteristics({
        ...productCaracteristics,
        caracteristics: {
          ...productCaracteristics.caracteristics,
          [name]: e.target.value
        }
      });
    }
    else if (e.target.name === "amount") {
      if (e.target.value > ID_Product.unit_stock) {
        setProductCaracteristics({
          ...productCaracteristics,
          [e.target.name]: ID_Product.unit_stock
        });
      }
      else {
        setProductCaracteristics({
          ...productCaracteristics,
          [e.target.name]: parseInt(e.target.value)
        });
      }
    }
  }



  let total_reviews = ReviewsProduct && ReviewsProduct.length !== 0 ? ReviewsProduct.length : 0;
  let averageScore = 0;
  ReviewsProduct && ReviewsProduct.map(review => {
    averageScore += review.score;
  })
  let score = total_reviews === 0 ? 0 : averageScore / total_reviews;





  //! SOCIAL SHARE
  let postUrl = ID_Product && encodeURI(document.location.href);
  let postTitle = ID_Product && encodeURI(ID_Product.name)
  let postImg = ID_Product && encodeURI(ID_Product.Images[0].name_image)
  let hasgtag = ["SoyHenry"]


  //! CONTENT 
  return (



    <div className="content_product_detail" >
      {
        ID_Product ?
          <div className="body_Home_detail">
            <div className="webcontent_home">

              <div className="card-wrapper">
                <div className="card">
                  <div className="product-imgs">
                    <div className="img-display">
                      <div className="img-showcase">
                        <SliderCarousel imageList={ID_Product.Images} isBanner={false} />
                      </div>
                    </div>

                  </div>
                  <div className="product-content">
                    <h2 className="product-title">{ID_Product.name}</h2>
                    <div className="product-rating">
                      <StarRating size_star="20" score={score} editable="off" completeinfo="no" />
                      <span>{score.toFixed(1)}({total_reviews})</span>
                    </div>
                    <div className="product-price">
                      <span>${ID_Product.price * currencyactual}</span>
                      <label>{currencyactualname}</label>
                    </div>

                    <div className="product-detail">
                      <p>{ID_Product.description}</p>
                      {
                        ID_Product.Caracteristics.map(caracteristic => (
                          caracteristic.name_caracteristic !== "type" ?
                            <div key={caracteristic.name_caracteristic}>
                              <h4 className='H4_Produtc_Detail'>Elige tu {caracteristic.name_caracteristic}:</h4>
                              <div className='LabelConteiner_Product_Detail'>
                                {
                                  caracteristic.values_caracteristic.map(value => (
                                    (productCaracteristics.caracteristics[caracteristic.name_caracteristic] === value) ?
                                      <label
                                        className='LabelCarac_Product_Detail_Chosen'
                                        key={value}
                                        name={`${caracteristic.name_caracteristic}_caracteristic`}
                                        value={value}
                                        onClick={handleproductCaracteristics}
                                      >{value}</label>
                                      :
                                      <label
                                        className='LabelCarac_Product_Detail'
                                        key={value}
                                        name={`${caracteristic.name_caracteristic}_caracteristic`}
                                        value={value}
                                        onClick={handleproductCaracteristics}
                                      >{value}</label>
                                  ))
                                }
                              </div>
                            </div> : ""
                        ))
                      }
                    </div>
                    {
                      ID_Product.unit_stock > 0 ?
                        <div className="purchase-info">
                          <div className='Cantidad_ProductDetail'>
                            <h4 className="Cantidad_Product_Detail">
                              Cantidad:
                            </h4>
                            <input
                              type="number"
                              name="amount"
                              min="1"
                              max={ID_Product.unit_stock}
                              value={productCaracteristics.amount}
                              onChange={e => handleproductCaracteristicsInput(e)}
                            />
                          </div>
                          <button type="button" className="btn" onClick={sendproduct}>
                            <b className="fas fa-shopping-cart">Agregar al carrito</b>
                          </button>
                        </div> :
                        <div className="purchase-info">
                          <button type="button" className="btn">
                            <b className="fas fa-shopping-cart">Agregar a tu wishlist</b>
                          </button>
                          <button type="button" className="btn">Comparar</button>
                        </div>
                    }
                    <div className="social-links">
                      <p>Share At: </p>
                      <a href={`https://www.facebook.com/sharer.php?u=${postUrl}`} target="_blank" className="facebook-btn" rel="noreferrer">
                        <span className="iconify" data-icon="logos:facebook" data-inline="false"></span>
                      </a>
                      <a href={`https://twitter.com/share?url${postUrl}&text=${postTitle}&via=HenryStore&hashtags=${hasgtag}`} target="_blank" className="twitter-btn" rel="noreferrer">
                        <span className="iconify" data-icon="logos:twitter" data-inline="false"></span>
                      </a>
                      <a href={`https://api.whatsapp.com/send?text= ${postTitle} ${postUrl}`} target="_blank" className="whatsapp-btn" rel="noreferrer">
                        <span className="iconify" data-icon="logos:whatsapp" data-inline="false"></span>
                      </a>
                      <a href={`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`} target="_blank" className="linkedin-btn" rel="noreferrer">
                        <span class="iconify" data-icon="logos:linkedin-icon" data-inline="false"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#sec-2">
                <div class={ReviewsProduct && ReviewsProduct.length !== 0 ? "scroll-down" : ''}></div>
              </a>
            </div>
            <section id="sec-2">
              <AllReviews ReviewsProduct={ReviewsProduct} />
            </section>
          {/* </div> : "" */}
          </div> : <NotFound message="Lo sentimos, este producto parece haber sido borrado por el administrador"/>
      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    ListProducts: state.products.products,
    userid: state.user_id,
    currencyactual: state.products.currency,
    currencyactualname: state.products.currencyname,
    ReviewsProduct: state.products.reviews,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllFilteredProducts: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
    sendProductDetailsToActions: (product) => dispatch(addProductToCart(product)),
    getAllReviews: (Id_Product) => dispatch(getAllReviews(Id_Product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product_Detail);