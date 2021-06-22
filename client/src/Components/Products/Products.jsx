import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';
import {AiFillHeart} from 'react-icons/ai'
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"


function Products({ ListProducts, getAllFilteredProducts, currencyactual, currencyactualname}) {

    useEffect(() => {
        if (!ListProducts.length) getAllFilteredProducts();
    },[ListProducts.length])

    // ! ************ PAGINATION ******************
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;
    //agrego un ? para hacer condicional y no explote el map
    
    const displayProducts = ListProducts?.slice(pagesVisited, pagesVisited + productPerPage).map((product, index) => {
        return (
            <div className={product.unit_stock > 0 ? "product_card" : "product_card_disabled"}>
                <div className="heart_product"><AiFillHeart/></div>
                <img src={product.Images[0].name_image} alt="" className="product_image" id={product.index} />
                <div className="product_name">{product.name}<div className= "product_stripe"></div></div>
                <div className="product_price">
                <h5 className="product_number">{product.price * currencyactual}</h5>
                <h5 className="product_usd"> {currencyactualname}</h5>
                </div>
                <div className="product_stock"><h5>{product.unit_stock?`${product.unit_stock} Unidades`:<p className="no_stock">SIN STOCK</p>}</h5></div>
                <div className="product_henry_coin"><h5>{product.henry_coin} Henry Coins</h5></div>
                <Link className="link" to={`/home/item/${product.id_product}`} key={product.id_product}><button className="button_detail"><h4>Detalle</h4></button>
        </Link>
            </div>
            )
    })
    const pageCount = Math.ceil(ListProducts.length / productPerPage)
    const changePage = ({ selected }) => { setPageNumber(selected) }

    // ! CONTENT   
    return <div className="cards_container_products">
        <div className="all_Cards">
            {displayProducts}
        </div>

        {displayProducts.length !== 0 ? <div className="pagination">
            <ReactPaginate
                previousLabel={<IoIosArrowBack/>}
                nextLabel={<IoIosArrowForward/>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div> : ""}

    </div >

}

function mapStateToProps(state) {
    return { ListProducts: state.products.products,
             currencyactual: state.products.currency,
             currencyactualname: state.products.currencyname }
}

function mapDispatchToProps(dispatch) {
    return {
        // getProducts: products_list =>   dispatch(getProducts(products_list)),
        getAllFilteredProducts: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);