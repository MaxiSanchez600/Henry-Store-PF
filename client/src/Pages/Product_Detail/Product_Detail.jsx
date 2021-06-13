import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Footer from '../../Components/Footer/Footer'

import './script'


function Product_Detail() {
    return (
        <div className="content_Home">
           <Header />
            <Navbar />
            <SearchBar />
            <div className="body_Home">
                <div className="webcontent_home">
                  
    <div class = "card-wrapper">
      <div class = "card">
        <div class = "product-imgs">
          <div class = "img-display">
            <div class = "img-showcase">
              <img src ='https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_1.jpg' alt = "shoe image1"/>
              <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_2.jpg" alt = "shoe image2"/> 
              <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_3.jpg" alt = "shoe image3"/> 
               <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_4.jpg" alt = "shoe image4"/> 
            </div>
          </div>
          <div class = "img-select">
            <div class = "img-item">
              <a href = "#" data-id = "1">
                <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_1.jpg" alt = "shoe image"/>
              </a>
            </div>
            <div class = "img-item">
              <a href = "#" data-id = "2">
                <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_2.jpg" alt = "shoe image"/>
              </a>
            </div>
            <div class = "img-item">
              <a href = "#" data-id = "3">
                <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_3.jpg" alt = "shoe image"/>
              </a>
            </div>
            <div class = "img-item">
              <a href = "#" data-id = "4">
                <img src = "https://raw.githubusercontent.com/prabinmagar/product-detail-card-slider/master/shoes_images/shoe_4.jpg" alt = "shoe image"/>
              </a>
            </div>
          </div>
        </div>
        <div class = "product-content">
          <h2 class = "product-title">nike shoes</h2>
          <a href = "#" class = "product-link">visit nike store</a>
          <div class = "product-rating">
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star"></i>
            <i class = "fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div class = "product-price">
            <p class = "last-price">Old Price: <span>$257.00</span></p>
            <p class = "new-price">New Price: <span>$249.00 (5%)</span></p>
          </div>

          <div class = "product-detail">
            <h2>about this item: </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>Shoes</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div class = "purchase-info">
            <input type = "number" min = "0" value = "1"/>
            <button type = "button" class = "btn">
              Add to Cart <i class = "fas fa-shopping-cart"></i>
            </button>
            <button type = "button" class = "btn">Compare</button>
          </div>

          <div class = "social-links">
            <p>Share At: </p>
            <a href = "#">
              <i class = "fab fa-facebook-f"></i>
            </a>
            <a href = "#">
              <i class = "fab fa-twitter"></i>
            </a>
            <a href = "#">
              <i class = "fab fa-instagram"></i>
            </a>
            <a href = "#">
              <i class = "fab fa-whatsapp"></i>
            </a>
            <a href = "#">
              <i class = "fab fa-pinterest"></i>
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

export default Product_Detail
