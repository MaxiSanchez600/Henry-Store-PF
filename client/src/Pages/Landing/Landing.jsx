import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { PRODUCTS_URL } from "../../Config/index";
import NavBar from '../../Components/NavBar/NavBar';
import SliderCarrousel from '../../Components/SliderCarrousel/SliderCarrousel';
import Footer from '../../Components/Footer/Footer';
import { AiFillHeart } from 'react-icons/ai';
import "./Landing.scss";

function Landing({ actualCurrency, actualCurrencyName }) {

  const [productsWithHighestDiscount, setProductsWithHighestDiscount] = useState([]);

  async function getProductsWithHigherDiscount() {
    setProductsWithHighestDiscount(await axios.get(`${PRODUCTS_URL}orderType=percentage_discount&orderDirection=DESC&limit=6`).then(res => res.data.data));
  }

  useEffect(() => {
    if (!productsWithHighestDiscount.length) getProductsWithHigherDiscount();
  }, []);

  return (
    <div>
      <NavBar />
      <SliderCarrousel isBanner={true} />
      <div className="catalogue_link_container">
        <h2 className="subtitle_landing">Nuestro Catálogo<div className="subtitle_stripe"></div></h2>
        <Link className="catalogue_link" to="/home">¡Ver todo el catálogo!</Link>
      </div>
      <div className="discounted_products_container">
        <h2 className="subtitle_landing">Nuestros productos Destacados<div className="subtitle_stripe"></div></h2>
        <div className="all_products_discounted">
          {
            productsWithHighestDiscount.length ?
              productsWithHighestDiscount.map(product => (
                <div className={product.unit_stock > 0 ? "discounted_product_card" : "discounted_product_card_disabled"}>
                  <div className="discounted_heart_product"><AiFillHeart /></div>
                  <img src={product.Images.length ? product.Images[0].name_image : ""} alt="" className="discounted_product_image" id={product.index} />
                  <h3 className="discounted_product_name">
                    {product.name}
                    <div className="discounted_product_stripe"></div>
                  </h3>
                  <div className="older_price_container">
                    <div className="discounted_product_price">
                      <h5 className="discounted_product_number">
                        <div className="discount_stripe"></div>
                        {`${product.price * actualCurrency} ${actualCurrencyName}`}
                      </h5>
                    </div>
                    <p className="discount_percentage">{`%${product.percentage_discount} OFF`}</p>
                  </div>
                  <div className="discounted_newer_product_price">
                    <h5 className="discounted_product_number">
                      {
                          `${((product.price * actualCurrency) - (((product.price * actualCurrency) * product.percentage_discount) / 100)).toFixed(2)} ${actualCurrencyName}`
                      }
                    </h5>
                  </div>
                  <div className="discounted_product_stock">
                    <h5>
                      {product.unit_stock ? `${product.unit_stock} Unidades` : <p className="discounted_no_stock">SIN STOCK</p>}
                    </h5>
                  </div>
                  <div className="discounted_product_henry_coin">
                    <h5>{product.henry_coin} Henry Coins</h5>
                  </div>
                  <Link className="discounted_link" to={`/home/item/${product.id_product}`} key={product.id_product}>
                    <button className="discounted_button_detail"><h4>Detalle</h4></button>
                  </Link>
                </div>
              )) : ""
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    actualCurrency: state.products.currency,
    actualCurrencyName: state.products.currencyname
  }
}

export default connect(mapStateToProps, null)(Landing);