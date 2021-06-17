import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import GeoLocation from '../../Components/GeoLocation/GeoLocation'
import Footer from '../../Components/Footer/Footer'

import { connect } from 'react-redux'
import { getAllFilteredProducts } from '../../Redux/actions/actions';
import { useParams } from 'react-router-dom'

function Product_Detail({ ListProducts, getAllFilteredProducts }) {

  const { id } = useParams();
  const ID_Product = ListProducts.filter(el => el.id_product == id)[0]
  console.log("ID:", ID_Product)
  useEffect(() => {
    if (!ListProducts.length) getAllFilteredProducts();
  }, [])

  return (
    <div className="content_Home">
      <Header />
      {/* <Navbar /> */}
      <GeoLocation />
      <SearchBar />
      <div className="body_Home">
        <div className="webcontent_home">

          <div class="card-wrapper">
            <div class="card">
              <div class="product-imgs">
                <div class="img-display">
                  <div class="img-showcase">
                    <img src={ID_Product.Images[0].name_image} alt="dont found" />
                  </div>
                </div>

              </div>
              <div class="product-content">
                <h2 class="product-title">{ID_Product.name}</h2>
                <div class="product-rating">
                  <span class="iconify" data-icon="noto:star" data-inline="false"></span>
                  <span class="iconify" data-icon="noto:star" data-inline="false"></span>
                  <span class="iconify" data-icon="noto:star" data-inline="false"></span>
                  <span class="iconify" data-icon="noto:star" data-inline="false"></span>
                  <span class="iconify" data-icon="noto:star" data-inline="false"></span>
                  <span>4.7(21)</span>
                </div>
                <div class="product-price">
                  <p class="last-price">Old Price: <span>{ID_Product.price}</span></p>
                  <p class="new-price">New Price: <span>{ID_Product.price * 0.9} (10%)</span></p>
                </div>

                <div class="product-detail">
                  <h2>Descripción: </h2>
                  <p>{ID_Product.description}</p>
                  <ul>
                    <li>Color: <span>Black</span></li>
                    <li>Disponibilidad:: <span>in stock</span></li>
                    <li>Categoria(s): <span>Shoes</span></li>
                    <li>Áreas Envío: <span>All over the world</span></li>
                    <li>Precio Envío: <span>Free</span></li>
                  </ul>
                </div>

                <div class="purchase-info">
                  <input type="number" min="0" value="1" />
                  <button type="button" class="btn">
                    Add to Cart <i class="fas fa-shopping-cart"></i>
                  </button>
                  <button type="button" class="btn">Compare</button>
                </div>

                <div class="social-links">
                  <p>Share At: </p>
                  <a href="#">
                  <span class="iconify" data-icon="logos:facebook" data-inline="false"></span>
                  </a>
                  <a href="#">
                    <span class="iconify" data-icon="logos:twitter" data-inline="false"></span>
                  </a>
                  <a href="#">
                    <span class="iconify" data-icon="uil:instagram-alt" data-inline="false"></span>
                  </a>
                  <a href="#">
                    <span class="iconify" data-icon="logos:whatsapp" data-inline="false"></span>
                  </a>
                  <a href="#">
                    <span class="iconify" data-icon="logos:pinterest" data-inline="false"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />

    </div>
  )
}

function mapStateToProps(state) {
  return { ListProducts: state.products }
}

function mapDispatchToProps(dispatch) {
  return {
    // getProducts: products_list =>   dispatch(getProducts(products_list)),
    getAllFilteredProducts: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product_Detail);

