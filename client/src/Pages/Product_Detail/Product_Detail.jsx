import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import GeoLocation from '../../Components/GeoLocation/GeoLocation';
import Footer from '../../Components/Footer/Footer';

import { connect } from 'react-redux';
import { getAllFilteredProducts, addProductToCart } from '../../Redux/actions/actionsProducts';
import { useParams } from 'react-router-dom';

function Product_Detail({ ListProducts, getAllFilteredProducts, sendProductDetailsToActions }) {

  const { id } = useParams();
  const ID_Product = ListProducts.find(el => el.id_product === parseInt(id));

  const [productCaracteristics, setProductCaracteristics] = useState({
    // product_id: ID_Product,
    // amount: 1,
    // caracteristics: {
    //   // genero: "",
    //   // size: "",
    //   // type: "",
    //   // color: "",
    // }
  });

  useEffect(() => {
    if (!ListProducts.length) getAllFilteredProducts();

    // console.log("ListProducts:", ListProducts);
    // console.log("ID_Product:", ID_Product);
  }, []);

  useEffect(() => {
    if (ID_Product && ID_Product.unit_stock > 0) {
      console.log("hay ID_Product:", ID_Product);
      setProductCaracteristics((previousState) => {
        // console.log("previousState: ", previousState);
        const initialState = {
          product_id: ID_Product.id_product,
          amount: 1,
          caracteristics: {}
        }
        ID_Product.Caracteristics.forEach(caracteristic => {
          // console.log("caracteristic.name_caracteristic: ", caracteristic.name_caracteristic);
          initialState.caracteristics[caracteristic.name_caracteristic] = caracteristic.values_caracteristic[0];
        })
        console.log("initialState: ", initialState);
        return initialState;
      });
    }
    // else console.log("no hay id product");
  }, [ID_Product]);

  function handleproductCaracteristics(e) {
    e.preventDefault();
    const name = e.target.name.split("_")[0];
    // console.log("name: ", name);
    // console.log("e.target.name: ", e.target.name);
    // console.log("e.target.value: ", e.target.value);
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

  function handleSubmit(e) {
    e.preventDefault();
    sendProductDetailsToActions(productCaracteristics);
  }

  return (
    <div className="content_Home">
      <Header />
      <Navbar />
      <GeoLocation />
      <SearchBar />
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
                      <h2 className="new-price">Precio: <span>${ID_Product.price}</span></h2>
                    </div>

                    <div className="product-detail">
                      <h3>Descripción: <span>{ID_Product.description}</span></h3>
                      <h3>Caracteristicas:</h3>
                      {
                        ID_Product.Caracteristics.map(caracteristic => (
                          caracteristic.name_caracteristic !== "type" ? 
                          <div key={caracteristic.name_caracteristic}>
                            <h4>{caracteristic.name_caracteristic}</h4>
                            {
                              caracteristic.values_caracteristic.map(value => (
                                <button
                                  key={value}
                                  name={`${caracteristic.name_caracteristic}_caracteristic`}
                                  value={value}
                                  onClick={e => handleproductCaracteristics(e)}
                                >{value}</button>
                              ))
                            }
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
                          <h3>
                            Cantidad:
                            <input
                              type="number"
                              name="amount"
                              min="1"
                              max={ID_Product.unit_stock}
                              value={productCaracteristics.amount}
                              onChange={e => handleproductCaracteristics(e)}
                            />
                          </h3>
                          <button type="button" className="btn" onClick={e => handleSubmit(e)}>
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
  return { ListProducts: state.products.products }
}

function mapDispatchToProps(dispatch) {
  return {
    // getProducts: products_list =>   dispatch(getProducts(products_list)),
    getAllFilteredProducts: (allQueries) => dispatch(getAllFilteredProducts(allQueries)),
    sendProductDetailsToActions: (product) => dispatch(addProductToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product_Detail);