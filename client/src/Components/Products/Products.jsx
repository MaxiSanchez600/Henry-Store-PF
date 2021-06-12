import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import ListProducts from '../../Assets/products.json'

function Products() {

    useEffect(() => {

    }, [])

    // ! CONTENT   
    return <div className="content cards_container_products">
        {ListProducts.map((product, index) => {
            return <Link to={`/item/${product.id}`}>
                <div className="product_card">
                    <img src={product.image[0]} alt="" className="product_image" id={product.index} />
                    <div className="product_name">{product.name}</div>
                    <div class="iconify icon_heart" data-icon="ant-design:heart-outlined" data-inline="false"></div>
                    
                    <div className="product_price"><h5>{product.price} USD</h5> </div>
                    <div className="product_stock"><h5>{product.unit_stock} Units</h5></div>
                    <div className="product_henry_coin"><h5>{product.henry_coin} Henry Coin</h5></div>
                    <button className="button_addCart"><h4>ADD TO CARD <span className="iconify icon_cart" data-icon="emojione:shopping-cart" data-inline="false"></span></h4></button>
                </div>
            </Link>
        })
        }

    </div>

}

export default Products