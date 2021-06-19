import React from 'react';
import { connect } from 'react-redux';

import { getAllFilteredProducts } from '../../Redux/actions/actionsProducts';
import Products from '../../Components/Products/Products';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Filters from '../../Components/Filters/Filters';
import GeoLocation from '../../Components/GeoLocation/GeoLocation';
import Order from '../../Components/Order/Order';

function Home({ queriesFromReducer, getProductsWithoutFilters }) {

    function handleResetFilters(e) {
        e.preventDefault();
        console.log("typeof getProductsWithoutFilters: ", typeof getProductsWithoutFilters);
        getProductsWithoutFilters({});
    }

    return (
        <div className="content_Home" >
            <Header />
            <GeoLocation />
            <Navbar />
            <SearchBar />
            <div className="body_Home">
                <div className="webcontent_home">
                    {
                        Object.keys(queriesFromReducer).length ?
                            <button onClick={e => handleResetFilters(e)}>Resetea tus filtros</button> : ""
                    }
                    <Filters />
                    <Order />
                    <Products />
                </div>
            </div>
            <Footer />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        queriesFromReducer: state.products.queries
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsWithoutFilters: (allQueries) => dispatch(getAllFilteredProducts(allQueries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);