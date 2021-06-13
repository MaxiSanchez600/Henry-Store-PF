import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
// import ListProducts from '../../Assets/products.json'
import { getAllFilteredProducts } from '../../Redux/actions/actions';


function Products({ ListProducts, getAllFilteredProducts }) {

    useEffect(() => {
        if (!ListProducts.length) getAllFilteredProducts();
    }, [ListProducts, getAllFilteredProducts])

    // ! CONTENT   
    return <div className="content cards_container_products">
        {ListProducts.map((product, index) => {
            return <Link to={`/item/${product.id}`}  key={product.id}>
                <div className="product_card">
                    <img src={product.image[0]} alt="" className="product_image" id={product.index} />
                    <div className="product_name">{product.name}</div>
                    <div className="iconify icon_heart" data-icon="ant-design:heart-outlined" data-inline="false"></div>
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

function mapStateToProps(state) {
    return {
        ListProducts: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllFilteredProducts: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);