import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import { URL_BASE } from '../../Config/index.js'
import { connect } from 'react-redux';
import { getAllFilteredProducts, addProductToCart } from '../../Redux/actions/actionsProducts';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import SliderCarousel from '../../Components/SliderCarrousel/SliderCarrousel';

function Product_Detail({ ListProducts, getAllFilteredProducts, sendProductDetailsToActions, currencyactual, currencyactualname}) {

  const { id } = useParams();
  const ID_Product = ListProducts.find(el => el.id_product === parseInt(id));
  
  const [productCaracteristics, setProductCaracteristics] = useState({
    caracteristics: {}
  });

  let sendproduct = async () =>{
    if(localStorage.getItem('userlogged') !== null){
      //Esta logeado
      productCaracteristics.user_id = localStorage.getItem('userlogged')
      const options = {
        method: 'POST',
        body: JSON.stringify(productCaracteristics),
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      await fetch(URL_BASE + 'cart/addproducttocart', options)
      .then(()=>
        Swal.fire({
        title:`Producto agregado al Carrito &#128076`,
        icon:'success',
        showConfirmButton: false,
        timer:1500
      }))
    }
    else{
      if(localStorage.getItem('userid') === null){
          //No esta lgoeado y no hay guest => Lo creo
          const userguest = await fetch(URL_BASE + 'cart/adduserguest', {method: 'PUT'})
          const userguestresponse = await userguest.json()
          localStorage.setItem('userid', userguestresponse.userid)
          productCaracteristics.user_id = userguestresponse.userid
          const options = {
            method: 'POST',
            body: JSON.stringify(productCaracteristics),
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
          await fetch(URL_BASE + 'cart/addproducttocart', options)
          .then(()=>
          Swal.fire({
          title:`Producto agregado al Carrito`,
          icon:'success',
          showConfirmButton: false,
          timer:1500
          }))
      }
      else{
          //No esta logeado pero hay guest
          productCaracteristics.user_id = localStorage.getItem('userid')
          const options = {
            method: 'POST',
            body: JSON.stringify(productCaracteristics),
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
          await fetch(URL_BASE + 'cart/addproducttocart', options)
          .then(()=>
          Swal.fire({
          title:`Producto agregado al Carrito`,
          icon:'success',
          showConfirmButton: false,
          timer:1500
          }))
      }
    }
  }

  useEffect(() => {
    if (!ListProducts.length) getAllFilteredProducts();
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

  let handleproductCaracteristics  = (e) => {
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
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   sendProductDetailsToActions(productCaracteristics);
  // }

  return (
    <div >
      <Navbar />
      {
        ID_Product ?
          <div className="body_Home">
            <div className="webcontent_home">

              <div className="card-wrapper">
                <div className="card">
                  <div className="product-imgs">
                    <div className="img-display">
                      <div className="img-showcase">
                        {/* <img src={ID_Product.Images[0].name_image} alt="dont found" /> */}
                        <SliderCarousel imageList={ID_Product.Images}/>
                      </div>
                    </div>

                  </div>
                  <div className="product-content">
                    <h2 className="product-title">{ID_Product.name}</h2>
                    <div className="product-rating">
                      <span className="iconify" data-icon="noto:star" data-inline="false"></span>
                      <span className="iconify" data-icon="noto:star" data-inline="false"></span>
                      <span className="iconify" data-icon="noto:star" data-inline="false"></span>
                      <span className="iconify" data-icon="noto:star" data-inline="false"></span>
                      <span className="iconify" data-icon="noto:star" data-inline="false"></span>
                      <span>4.7(21)</span>
                    </div>
                    <div className="product-price">
                      {/* <p className="last-price">Old Price: <span>{ID_Product.price}</span></p> */}
                      {/* <p className="new-price">New Price: <span>{ID_Product.price * 0.9} (10%)</span></p> */}
                      <span>${ID_Product.price * currencyactual}</span>
                      <label>{currencyactualname}</label>
                    </div>

                    <div className="product-detail">
                      <p>{ID_Product.description}</p>
                      {
                        ID_Product.Caracteristics.map(caracteristic => (
                          caracteristic.name_caracteristic !== "type" ? 
                          <div key={caracteristic.name_caracteristic}>
                            <h4 className = 'H4_Produtc_Detail'>Elige tu {caracteristic.name_caracteristic}:</h4>
                            <div className = 'LabelConteiner_Product_Detail'>
                            {
                              caracteristic.values_caracteristic.map(value => (
                                 (productCaracteristics.caracteristics[caracteristic.name_caracteristic] === value) ?
                                 <label
                                   className = 'LabelCarac_Product_Detail_Chosen'
                                   key={value}
                                   name= {`${caracteristic.name_caracteristic}_caracteristic`}
                                   value= {value}
                                   onClick = {handleproductCaracteristics}
                                 >{value}</label>
                                 :
                                <label
                                  className = 'LabelCarac_Product_Detail'
                                  key={value}
                                  name= {`${caracteristic.name_caracteristic}_caracteristic`}
                                  value= {value}
                                  onClick = {handleproductCaracteristics}
                                >{value}</label>
                              ))
                            }
                            </div>
                          </div> : ""
                        ))
                      }
                      {/* <ul>
                        <li>Color: <span>Black</span></li>
                        <li>Disponibilidad:: <span>in stock</span></li>
                        <li>Categoria(s): <span>Shoes</span></li>
                        <li>Áreas Envío: <span>All over the world</span></li>
                        <li>Precio Envío: <span>Free</span></li>
                      </ul> */}

                    </div>
                    {
                      ID_Product.unit_stock > 0 ?
                        <div className="purchase-info">
                          <div className = 'Cantidad_ProductDetail'>
                            <h4 className = "Cantidad_Product_Detail">
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
                          {/* <button type="button" className="btn">Comparar</button> */}
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
                      <a href="#">
                        <span className="iconify" data-icon="logos:facebook" data-inline="false"></span>
                      </a>
                      <a href="#">
                        <span className="iconify" data-icon="logos:twitter" data-inline="false"></span>
                      </a>
                      <a href="#">
                        <span className="iconify" data-icon="uil:instagram-alt" data-inline="false"></span>
                      </a>
                      <a href="#">
                        <span className="iconify" data-icon="logos:whatsapp" data-inline="false"></span>
                      </a>
                      <a href="#">
                        <span className="iconify" data-icon="logos:pinterest" data-inline="false"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div> : ""
      }
      <Footer />

    </div>
  )
}

function mapStateToProps(state) {
  return { ListProducts: state.products.products,
           userid : state.user_id,
           currencyactual: state.products.currency,
           currencyactualname: state.products.currencyname }
          }


function mapDispatchToProps(dispatch) {
  return {
    // getProducts: products_list =>   dispatch(getProducts(products_list)),
    getAllFilteredProducts: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
    sendProductDetailsToActions: (product) => dispatch(addProductToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product_Detail);