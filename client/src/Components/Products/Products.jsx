import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import { getAllFilteredProducts, getProducts } from '../../Redux/actions/actions';


function Products({ ListProducts, getAllFilteredProducts, getProducts }) {

    useEffect(() => {
        if (!ListProducts.length) getAllFilteredProducts();
        // getProducts()
    }, [])


    // ! ************ PAGINATION ******************
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 3
    const pagesVisited = pageNumber * productPerPage
    const displayProducts = ListProducts.slice(pagesVisited, pagesVisited + productPerPage).map((product, index) => {
        return <Link to={`/item/${product.id_product}`} key={product.id_product}>
            <div className="product_card">
                {/* <img src={product.image[0]} alt="" className="product_image" id={product.index} /> */}
                <img src="https://brantford.es/wp-content/uploads/2018/10/Camisa-530.jpg" alt="" className="product_image" id={product.index} />
                <div className="product_name">{product.name}</div>
                <div class="iconify icon_heart" data-icon="ant-design:heart-outlined" data-inline="false"></div>
                <div className="product_price"><h5>{product.price} USD</h5> </div>
                <div className="product_stock"><h5>{product.unit_stock} Units</h5></div>
                <div className="product_henry_coin"><h5>{product.henry_coin} Henry Coin</h5></div>
                <button className="button_addCart"><h4>ADD TO CARD <span className="iconify icon_cart" data-icon="emojione:shopping-cart" data-inline="false"></span></h4></button>
            </div>
        </Link>
    })
    const pageCount = Math.ceil(ListProducts.length / productPerPage)
    const changePage = ({ selected }) => { setPageNumber(selected) }


    // ! CONTENT   
    return <div className="cards_container_products">
        {displayProducts}

        <div className="pagination">
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(Products);