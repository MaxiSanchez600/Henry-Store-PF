import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import './Products.scss'
import ListProducts from '../../Assets/products.json'

function Products() {

    useEffect(() => {

    }, [])

    // ! CONTENT   
    return <div className="content cards_container_products">
        {ListProducts.map((product, index) => {
            return <Link to={`/item/${product.id}`}>
                <div className="product_body">
                    <div className="product_name">{product.name}</div>
                    <img src={product.image[0]} alt="" className="product_image" id={product.index} />
                    <div className="product_price">{product.price} USD </div>
                    <div className="product_stock">{product.unit_stock} Units</div>
                    <div className="product_henry_coin">{product.henry_coin} Henry Coin</div>
                </div>
            </Link>
        })
        }

    </div>

}

export default Products
